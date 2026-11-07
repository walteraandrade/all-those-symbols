import { expect, test } from "bun:test";
import { checkBudget, routeGroup } from "./perf";

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

test("blog lab is checked with its own scope", () => {
  const res = checkBudget(budget, bundle, lab, null, { ...lab, lcpMs: 3000 });
  expect(res.violations).toEqual([{ scope: "lab:blog", metric: "lcpMs", value: 3000, limit: 2000 }]);
});

test("route groups", () => {
  expect(["/", "/blog/a", "/blog/a/", "/blog", "/blog/", "/contact"].map(routeGroup)).toEqual(["/", "/blog/*", "/blog/*", "other", "other", "other"]);
});

test("null labs are violations in measure mode only", () => {
  expect(checkBudget(budget, bundle, null, null).pass).toBe(true);
  const res = checkBudget(budget, bundle, null, null, null, true);
  expect(res.violations.map((v) => v.scope)).toEqual(["lab", "lab:blog"]);
});
