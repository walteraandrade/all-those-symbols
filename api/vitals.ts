import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";
import { z } from "zod";

const vitalsSchema = z.object({
  metric: z.enum(["LCP", "INP", "CLS", "TTFB"]),
  value: z.number().finite().min(0),
  path: z.string().max(200),
  device: z.enum(["mobile", "desktop"]),
});

let pool: Pool | undefined;

function getPool(): Pool | undefined {
  if (!process.env.DATABASE_URL) return undefined;
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return pool;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

  const dbPool = getPool();
  if (!dbPool) {
    return res.status(503).json({ error: "storage not configured" });
  }

  const { metric, value, path, device } = parsed.data;

  try {
    await dbPool.query(
      "INSERT INTO web_vitals (metric, value, path, device) VALUES ($1, $2, $3, $4)",
      [metric, value, path, device],
    );

    return res.status(204).end();
  } catch (error) {
    console.error("Failed to store web vital:", error);
    return res.status(500).json({ error: "storage failed" });
  }
}
