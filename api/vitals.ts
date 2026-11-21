import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { checkRateLimit, getDatabaseConnection } from "./_lib/rate-limit.js";
import { applyCors } from "./_lib/cors.js";

const RETENTION_DAYS = 90;
const SWEEP_PROBABILITY = 0.02;
const MAX_VALUE = { LCP: 60000, INP: 60000, TTFB: 60000, CLS: 10 } as const;

export const vitalsSchema = z
  .object({
    metric: z.enum(["LCP", "INP", "CLS", "TTFB"]),
    value: z.number().finite().min(0),
    path: z.string().regex(/^\/[a-z0-9\/-]{0,120}$/),
    device: z.enum(["mobile", "desktop"]),
  })
  .refine(({ metric, value }) => value <= MAX_VALUE[metric]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = vitalsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const db = getDatabaseConnection();
  if (!db) {
    return res.status(503).json({ error: "storage not configured" });
  }

  const rateLimit = await checkRateLimit(req, "vitals");
  if (rateLimit.status === "unavailable") {
    return res.status(503).json({ error: "Rate limit service unavailable" });
  }
  if (rateLimit.status === "limited") {
    res.setHeader("Retry-After", String(rateLimit.retryAfter));
    return res.status(429).json({ error: "Too many requests" });
  }

  const { metric, value, path, device } = parsed.data;

  try {
    await db.run(
      "INSERT INTO web_vitals (metric, value, path, device) VALUES (?, ?, ?, ?)",
      metric, value, path, device,
    );
    if (Math.random() < SWEEP_PROBABILITY) {
      await db
        .run("DELETE FROM web_vitals WHERE created_at < datetime('now', ?)", `-${RETENTION_DAYS} days`)
        .catch(() => {});
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Failed to store web vital:", error);
    return res.status(500).json({ error: "storage failed" });
  }
}
