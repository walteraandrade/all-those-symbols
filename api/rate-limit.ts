import { connect, type Connection } from "@tursodatabase/serverless";
import type { VercelRequest } from "@vercel/node";

const RATE_LIMITS = {
  contact: { limit: 10, windowSeconds: 600 },
  vitals: { limit: 600, windowSeconds: 60 },
} as const;

const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS api_rate_limits (
  bucket TEXT NOT NULL,
  ip TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  request_count INTEGER NOT NULL,
  PRIMARY KEY (bucket, ip)
)`;

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
let tableReady: Promise<void> | undefined;

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

function getForwardedIp(req: VercelRequest): string | undefined {
  const forwardedFor = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return value?.split(",")[0]?.trim() || undefined;
}

async function ensureTable(db: Connection): Promise<void> {
  if (!tableReady) {
    tableReady = db.run(CREATE_TABLE_SQL).then(() => undefined).catch((error: unknown) => {
      tableReady = undefined;
      throw error;
    });
  }
  return tableReady;
}

export async function checkRateLimit(
  req: VercelRequest,
  bucket: RateLimitBucket,
): Promise<RateLimitResult> {
  const db = getDatabaseConnection();
  const ip = getForwardedIp(req);
  if (!db || !ip) return { status: "unavailable" };

  const { limit, windowSeconds } = RATE_LIMITS[bucket];

  try {
    await ensureTable(db);
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

    if (row.request_count > limit) {
      return {
        status: "limited",
        retryAfter: row.retry_after,
      };
    }

    return { status: "allowed" };
  } catch (error) {
    console.error("Rate limiter unavailable:", error);
    return { status: "unavailable" };
  }
}
