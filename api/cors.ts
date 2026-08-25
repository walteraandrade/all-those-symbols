import type { VercelRequest, VercelResponse } from "@vercel/node";

const PRODUCTION_ORIGIN = "https://all-those-symbols.vercel.app";

const allowedOrigins = (): string[] => [
  PRODUCTION_ORIGIN,
  ...[
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ]
    .filter((host): host is string => Boolean(host))
    .map((host) => `https://${host}`),
];

export function applyCors(req: VercelRequest, res: VercelResponse): void {
  res.setHeader("Vary", "Origin");
  const origin = req.headers.origin;
  if (!origin || !allowedOrigins().includes(origin)) return;
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
