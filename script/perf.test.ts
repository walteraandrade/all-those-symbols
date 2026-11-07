import { expect, test } from "bun:test";
import { checkBudget } from "./perf";

const budget = {
  bundle: { mainChunkKb: 110 },
  lab: { performanceScore: 95, lcpMs: 2000, tbtMs: 200, cls: 0.1 },
  field: { lcpMs: 2500, inpMs: 200, cls: 0.1 },
};
const bundle = { mainChunkKb: 100 };
const lab = {
  source: "psi" as const,
  strategy: "mobile" as const,
  performanceScore: 99,
  lcpMs: 1000,
  tbtMs: 50,
  cls: 0,
  fcpMs: 0,
  speedIndexMs: 0,
  ttfbMs: 0,
};

test("complete lab passes", () => {
  expect(checkBudget(budget, bundle, lab, null).pass).toBe(true);
});

test("missing audits are violations", () => {
  const res = checkBudget(budget, bundle, { ...lab, lcpMs: null, tbtMs: null }, null);
  expect(res.violations.map((v) => v.metric)).toEqual(["lcpMs", "tbtMs"]);
});

test("null lab is a violation in measure mode only", () => {
  expect(checkBudget(budget, bundle, null, null).pass).toBe(true);
  expect(checkBudget(budget, bundle, null, null, true).violations.map((v) => v.metric)).toEqual(["unavailable"]);
});
