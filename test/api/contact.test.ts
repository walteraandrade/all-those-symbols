import { expect, test } from "bun:test";
import { contactSchema } from "../../api/contact.js";

const valid = { name: "Jane", email: "jane@example.com", message: "Hello there, long enough." };

test("accepts a normal message", () => {
  expect(contactSchema.safeParse(valid).success).toBe(true);
});

test("rejects oversized fields", () => {
  expect(contactSchema.safeParse({ ...valid, name: "x".repeat(101) }).success).toBe(false);
  expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false);
});

test("rejects CR/LF in name", () => {
  expect(contactSchema.safeParse({ ...valid, name: "Jane\r\nBcc: a@b.c" }).success).toBe(false);
});
