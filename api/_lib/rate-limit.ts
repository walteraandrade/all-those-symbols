import { connect, type Connection } from "@tursodatabase/serverless";
import type { VercelRequest } from "@vercel/node";
import { isIP } from "node:net";

const RATE_LIMITS = {
  contact: { limit: 10, windowSeconds: 600 },
  vitals: { limit: 30, windowSeconds: 60 },
} as const;

const SWEEP_PROBABILITY = 0.02;
const SWEEP_AGE_SECONDS = 86400;

const INCREMENT_SQL = `INSERT INTO api_rate_limits (bucket, ip, window_start, request_count)
VALUES (?, ?, (unixepoch() / ?) * ?, 1)
ON CONFLICT (bucket, ip) DO UPDATE SET
  window_start = CASE
    WHEN excluded.window_start > api_rate_limits.window_start
      THEN excluded.window_start
    ELSE api_rate_limits.window_start
  END,
  request_count = CASE
    WHEN excluded.window_start > api_rate_limits.window_start THEN 1
    WHEN excluded.window_start = api_rate_limits.window_start
      THEN api_rate_limits.request_count + 1
    ELSE api_rate_limits.request_count
  END
RETURNING
  request_count,
  MAX(1, window_start + ? - unixepoch()) AS retry_after`;

type RateLimitBucket = keyof typeof RATE_LIMITS;

export type RateLimitResult =
  | { status: "allowed" }
  | { status: "limited"; retryAfter: number }
  | { status: "unavailable" };

let connection: Connection | undefined;

export function getDatabaseConnection(): Connection | undefined {
  if (!process.env.TURSO_DATABASE_URL) return undefined;
  if (!connection) {
    connection = connect({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return connection;
}

const unmapIpv4 = (ip: string): string => {
  const match = ip.match(/^::ffff:(?:(\d+\.\d+\.\d+\.\d+)|([0-9a-f]{1,4}):([0-9a-f]{1,4}))$/i);
  if (!match) return ip;
  if (match[1]) return match[1];
  const [high, low] = [parseInt(match[2]!, 16), parseInt(match[3]!, 16)];
  return [high >> 8, high & 255, low >> 8, low & 255].join(".");
};

export function clientKey(value: string | undefined): string | undefined {
  const raw = value?.split(",")[0]?.trim();
  if (!raw) return undefined;
  const ip = unmapIpv4(
    raw
      .replace(/^\[([^\]]+)\](?::\d+)?$/, "$1")
      .replace(/%.*$/, "")
      .replace(/^(\d+\.\d+\.\d+\.\d+):\d+$/, "$1"),
  );
  if (isIP(ip) !== 6) return ip;
  const [head = "", tail = ""] = ip.split("::");
  const headGroups = head ? head.split(":") : [];
  const tailGroups = tail ? tail.split(":") : [];
  const groups = [
    ...headGroups,
    ...Array(Math.max(0, 8 - headGroups.length - tailGroups.length)).fill("0"),
    ...tailGroups,
  ];
  return `${groups
    .slice(0, 4)
    .map((group) => group.toLowerCase().replace(/^0+(?=.)/, ""))
    .join(":")}::/64`;
}

function getClientKey(req: VercelRequest): string | undefined {
  const header = req.headers["x-vercel-forwarded-for"] ?? req.headers["x-forwarded-for"];
  return clientKey(Array.isArray(header) ? header[0] : header);
}

export async function checkRateLimit(
  req: VercelRequest,
  bucket: RateLimitBucket,
): Promise<RateLimitResult> {
  const db = getDatabaseConnection();
  const ip = getClientKey(req);
  if (!db || !ip) return { status: "unavailable" };

  const { limit, windowSeconds } = RATE_LIMITS[bucket];

  try {
    const row: unknown = await db.get(
      INCREMENT_SQL,
      bucket,
      ip,
      windowSeconds,
      windowSeconds,
      windowSeconds,
    );
    if (
      typeof row !== "object" ||
      row === null ||
      !("request_count" in row) ||
      typeof row.request_count !== "number" ||
      !("retry_after" in row) ||
      typeof row.retry_after !== "number"
    ) {
      return { status: "unavailable" };
    }

    if (Math.random() < SWEEP_PROBABILITY) {
      await db
        .run("DELETE FROM api_rate_limits WHERE window_start < unixepoch() - ?", SWEEP_AGE_SECONDS)
        .catch(() => {});
    }

    return row.request_count > limit
      ? { status: "limited", retryAfter: row.retry_after }
      : { status: "allowed" };
  } catch (error) {
    console.error("Rate limiter unavailable:", error);
    return { status: "unavailable" };
  }
}
