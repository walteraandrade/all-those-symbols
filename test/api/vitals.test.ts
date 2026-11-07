import { expect, test } from "bun:test";
import { vitalsSchema } from "../../api/vitals.js";

const valid = { metric: "LCP", value: 1200, path: "/blog/la-strada-fellini", device: "mobile" };

test("accepts a normal sample", () => {
  expect(vitalsSchema.safeParse(valid).success).toBe(true);
  expect(vitalsSchema.safeParse({ ...valid, metric: "CLS", value: 0.1, path: "/" }).success).toBe(true);
});

test("rejects out-of-bounds values", () => {
  expect(vitalsSchema.safeParse({ ...valid, value: 60001 }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, metric: "CLS", value: 11 }).success).toBe(false);
});

test("rejects arbitrary paths", () => {
  expect(vitalsSchema.safeParse({ ...valid, path: "/<script>" }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, path: "x".repeat(300) }).success).toBe(false);
  expect(vitalsSchema.safeParse({ ...valid, path: "no-slash" }).success).toBe(false);
});
