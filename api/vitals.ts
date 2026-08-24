import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { checkRateLimit, getDatabaseConnection } from "./rate-limit";

const ALLOWED_ORIGIN = "https://all-those-symbols.vercel.app";

const vitalsSchema = z.object({
  metric: z.enum(["LCP", "INP", "CLS", "TTFB"]),
  value: z.number().finite().min(0),
  path: z.string().max(200),
  device: z.enum(["mobile", "desktop"]),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Vary", "Origin");
  if (req.headers.origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = vitalsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
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

    return res.status(204).end();
  } catch (error) {
    console.error("Failed to store web vital:", error);
    return res.status(500).json({ error: "storage failed" });
  }
}
