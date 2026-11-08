import { afterEach, expect, mock, test } from "bun:test";
import { db, mockReq } from "./test-utils.js";

mock.module("@tursodatabase/serverless", () => ({ connect: () => db }));

const { clientKey, checkRateLimit } = await import("../../api/_lib/rate-limit.js");

const realRandom = Math.random;
afterEach(() => {
  Math.random = realRandom;
  db.run.mockReset();
  db.run.mockImplementation(async () => undefined);
});

test("ipv4 passes through, first forwarded value wins", () => {
  expect(clientKey("1.2.3.4, 5.6.7.8")).toBe("1.2.3.4");
  expect(clientKey("::ffff:1.2.3.4")).toBe("1.2.3.4");
});

test("ipv6 grouped by /64", () => {
  expect(clientKey("2001:db8:1:2:aaaa:bbbb:cccc:dddd")).toBe("2001:db8:1:2::/64");
  expect(clientKey("2001:db8:1:2:1::9")).toBe("2001:db8:1:2::/64");
  expect(clientKey("2001:DB8::1")).toBe("2001:db8:0:0::/64");
});

test("missing ip", () => {
  expect(clientKey(undefined)).toBeUndefined();
  expect(clientKey("")).toBeUndefined();
});

test("brackets, zone id, port and v4-mapped forms", () => {
  expect(clientKey("[2001:db8:1:2::9]:443")).toBe("2001:db8:1:2::/64");
  expect(clientKey("fe80::1%eth0")).toBe("fe80:0:0:0::/64");
  expect(clientKey("fe80::1%eth0%x")).toBe("fe80:0:0:0::/64");
  expect(clientKey("1.2.3.4:5678")).toBe("1.2.3.4");
  expect(clientKey("::ffff:1.2.3.4")).toBe("1.2.3.4");
  expect(clientKey("::ffff:102:304")).toBe("1.2.3.4");
  expect(clientKey("garbage")).toBe("garbage");
});

test("sweep runs and a failing DELETE does not change the verdict", async () => {
  process.env.TURSO_DATABASE_URL = "libsql://test";
  Math.random = () => 0;
  db.get.mockImplementation(async () => ({ request_count: 1, retry_after: 60 }));
  db.run.mockImplementation(async () => {
    throw new Error("delete failed");
  });
  expect(await checkRateLimit(mockReq("POST"), "contact")).toEqual({ status: "allowed" });
  expect(db.run.mock.calls.some(([sql]) => String(sql).startsWith("DELETE FROM api_rate_limits"))).toBe(true);
});
