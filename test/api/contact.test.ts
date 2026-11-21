import { beforeEach, expect, mock, test } from "bun:test";
import { db, mockReq, mockRes } from "./test-utils.js";

const send = mock(async () => ({ error: null }));
mock.module("resend", () => ({ Resend: class { emails = { send }; } }));
mock.module("@tursodatabase/serverless", () => ({ connect: () => db }));

const { default: handler, contactSchema } = await import("../../api/contact.js");

const valid = { name: "Jane", email: "jane@example.com", message: "Hello there, long enough." };

const call = async (method: string, body?: unknown) => {
  const { res, out } = mockRes();
  await handler(mockReq(method, body), res);
  return out;
};

beforeEach(() => {
  process.env.RESEND_API_KEY = "key";
  process.env.CONTACT_EMAIL = "me@example.com";
  process.env.TURSO_DATABASE_URL = "libsql://test";
  send.mockClear();
  db.get.mockImplementation(async () => ({ request_count: 1, retry_after: 60 }));
});

test("405 on wrong method", async () => {
  expect((await call("GET")).code).toBe(405);
});

test("400 on bad input without schema details", async () => {
  const out = await call("POST", { name: "J", email: "nope", message: "x" });
  expect(out.code).toBe(400);
  expect(out.body).toEqual({ error: "Invalid request" });
  expect(send).not.toHaveBeenCalled();
});

test("400 on CR/LF in name", async () => {
  expect((await call("POST", { ...valid, name: "Jane\r\nBcc: a@b.c" })).code).toBe(400);
});

test("503 when CONTACT_EMAIL missing", async () => {
  delete process.env.CONTACT_EMAIL;
  expect((await call("POST", valid)).code).toBe(503);
});

test("503 when limiter unavailable", async () => {
  db.get.mockImplementation(async () => {
    throw new Error("down");
  });
  expect((await call("POST", valid)).code).toBe(503);
  expect(send).not.toHaveBeenCalled();
});

test("429 with Retry-After when limited", async () => {
  db.get.mockImplementation(async () => ({ request_count: 99, retry_after: 42 }));
  const out = await call("POST", valid);
  expect(out.code).toBe(429);
  expect(out.headers["Retry-After"]).toBe("42");
});

test("200 sends the email", async () => {
  expect((await call("POST", valid)).code).toBe(200);
  expect(send).toHaveBeenCalledTimes(1);
});

test("schema rejects oversized fields", () => {
  expect(contactSchema.safeParse({ ...valid, name: "x".repeat(101) }).success).toBe(false);
  expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false);
});
