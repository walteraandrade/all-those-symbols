import { mock } from "bun:test";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const mockReq = (method: string, body?: unknown, headers: Record<string, string> = {}) =>
  ({ method, body, headers: { "x-vercel-forwarded-for": "192.0.2.1", ...headers } }) as unknown as VercelRequest;

export const mockRes = () => {
  const out: { code?: number; body?: unknown; headers: Record<string, string> } = { headers: {} };
  const res = {
    status: (code: number) => ((out.code = code), res),
    json: (body: unknown) => ((out.body = body), res),
    end: () => res,
    setHeader: (name: string, value: string) => ((out.headers[name] = value), res),
  };
  return { res: res as unknown as VercelResponse, out };
};

export const db = {
  get: mock(async () => ({ request_count: 1, retry_after: 60 }) as unknown),
  run: mock(async (..._args: unknown[]) => undefined),
};
