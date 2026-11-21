import { afterEach, beforeEach, expect, mock, test } from "bun:test";
import { db, mockReq, mockRes } from "./test-utils.js";

mock.module("@tursodatabase/serverless", () => ({ connect: () => db }));

const { default: handler, vitalsSchema } = await import("../../api/vitals.js");

const valid = { metric: "LCP", value: 1200, path: "/blog/la-strada-fellini", device: "mobile" };

const call = async (method: string, body?: unknown) => {
  const { res, out } = mockRes();
  await handler(mockReq(method, body), res);
  return out;
};

beforeEach(() => {
  process.env.TURSO_DATABASE_URL = "libsql://test";
  db.run.mockClear();
  db.get.mockImplementation(async () => ({ request_count: 1, retry_after: 60 }));
});

const realRandom = Math.random;
afterEach(() => {
  Math.random = realRandom;
  db.run.mockImplementation(async () => undefined);
});

test("405 on wrong method", async () => {
  expect((await call("GET")).code).toBe(405);
});

test("400 on bad input without schema details", async () => {
  const out = await call("POST", { ...valid, value: 999999 });
  expect(out.code).toBe(400);
  expect(out.body).toEqual({ error: "Invalid request" });
});

test("429 with Retry-After when limited", async () => {
  db.get.mockImplementation(async () => ({ request_count: 31, retry_after: 7 }));
  const out = await call("POST", valid);
  expect(out.code).toBe(429);
  expect(out.headers["Retry-After"]).toBe("7");
});

test("204 stores a valid sample", async () => {
  expect((await call("POST", valid)).code).toBe(204);
  expect(db.run.mock.calls.some(([sql]) => String(sql).startsWith("INSERT INTO web_vitals"))).toBe(true);
});

test("schema accepts normal samples, rejects bad bounds and paths", () => {
  expect(vitalsSchema.safeParse({ ...valid, metric: "CLS", value: 0.1, path: "/" }).success).toBe(true);
  expect(vitalsSchema.safeParse({ ...valid, value: 60001 }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, metric: "CLS", value: 11 }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, path: "/<script>" }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, path: "x".repeat(300) }).success).toBe(false);
});

test("retention DELETE runs and its failure keeps the 204", async () => {
  Math.random = () => 0;
  db.run.mockImplementation(async (sql: unknown) => {
    if (String(sql).startsWith("DELETE")) throw new Error("delete failed");
  });
  expect((await call("POST", valid)).code).toBe(204);
  expect(db.run.mock.calls.some(([sql]) => String(sql).startsWith("DELETE FROM web_vitals"))).toBe(true);
});
