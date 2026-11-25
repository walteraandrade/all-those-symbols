import type { VercelRequest, VercelResponse } from "@vercel/node";

// The old vercel.app address stays allowed while it redirects to the new domain.
const PRODUCTION_ORIGINS = ["https://walterfall.space", "https://all-those-symbols.vercel.app"];

const allowedOrigins = (): string[] => [
  ...PRODUCTION_ORIGINS,
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
