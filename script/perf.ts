import { mkdir, appendFile, readFile } from "fs/promises";
import path from "path";

type LabResult = {
  source: "psi";
  strategy: "mobile";
  performanceScore: number;
  lcpMs: number;
  tbtMs: number;
  cls: number;
  fcpMs: number;
  speedIndexMs: number;
  ttfbMs: number;
} | null;

type CruxResult = {
  p75: { lcpMs: number; inpMs: number; cls: number };
} | null;

type FieldResult = {
  source: "rum";
  windowDays: 28;
  sampleCount: number;
  p75: { lcpMs: number | null; inpMs: number | null; cls: number | null; ttfbMs: number | null };
} | null;

type Violation = { scope: "lab" | "field"; metric: string; value: number; limit: number };

type Budget = {
  lab: { performanceScore: number; lcpMs: number; tbtMs: number; cls: number };
  field: { lcpMs: number; inpMs: number; cls: number };
};

type HistoryEntry = {
  date: string;
  commit: string;
  lab: LabResult;
  field: FieldResult;
  crux: CruxResult;
  budget: { pass: boolean; violations: Violation[] };
};

const SITE_URL = process.env.SITE_URL ?? "https://all-those-symbols.vercel.app";
const ROOT = path.resolve(import.meta.dirname, "..");

const round = (n: number) => Math.round(n);

async function collectLab(): Promise<{ lab: LabResult; crux: CruxResult }> {
  const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  url.searchParams.set("url", SITE_URL);
  url.searchParams.set("strategy", "mobile");
  url.searchParams.set("category", "PERFORMANCE");
  if (process.env.PSI_API_KEY) url.searchParams.set("key", process.env.PSI_API_KEY);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("PSI request failed:", data.error?.message ?? res.statusText);
      return { lab: null, crux: null };
    }

    const audits = data.lighthouseResult?.audits ?? {};
    const lab: LabResult = {
      source: "psi",
      strategy: "mobile",
      performanceScore: round((data.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
      lcpMs: round(audits["largest-contentful-paint"]?.numericValue ?? 0),
      tbtMs: round(audits["total-blocking-time"]?.numericValue ?? 0),
      cls: audits["cumulative-layout-shift"]?.numericValue ?? 0,
      fcpMs: round(audits["first-contentful-paint"]?.numericValue ?? 0),
      speedIndexMs: round(audits["speed-index"]?.numericValue ?? 0),
      ttfbMs: round(audits["server-response-time"]?.numericValue ?? 0),
    };

    const metrics = data.loadingExperience?.metrics;
    const crux: CruxResult = metrics
      ? {
          p75: {
            lcpMs: metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
            inpMs: metrics.INTERACTION_TO_NEXT_PAINT?.percentile,
            cls: metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile / 100,
          },
        }
      : null;

    return { lab, crux };
  } catch (err) {
    console.error("PSI request failed:", err instanceof Error ? err.message : err);
    return { lab: null, crux: null };
  }
}

function p75(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil(sorted.length * 0.75) - 1];
}

async function collectField(): Promise<FieldResult> {
  if (!process.env.TURSO_DATABASE_URL) {
    console.log("TURSO_DATABASE_URL not set, skipping field data");
    return null;
  }

  try {
    const { connect } = await import("@tursodatabase/serverless");
    const conn = connect({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const rows = (await conn.all(
      "SELECT metric, value FROM web_vitals WHERE created_at >= datetime('now', '-28 days')"
    )) as { metric: string; value: number }[];

    const byMetric = (name: string) => rows.filter((r) => r.metric === name).map((r) => r.value);
    const lcp = p75(byMetric("LCP"));
    const inp = p75(byMetric("INP"));
    const cls = p75(byMetric("CLS"));
    const ttfb = p75(byMetric("TTFB"));

    return {
      source: "rum",
      windowDays: 28,
      sampleCount: rows.length,
      p75: {
        lcpMs: lcp === null ? null : round(lcp),
        inpMs: inp === null ? null : round(inp),
        cls,
        ttfbMs: ttfb === null ? null : round(ttfb),
      },
    };
  } catch (err) {
    console.error("field data query failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

function checkBudget(budget: Budget, lab: LabResult, field: FieldResult) {
  const violations: Violation[] = [];

  if (lab) {
    if (lab.performanceScore < budget.lab.performanceScore) {
      violations.push({ scope: "lab", metric: "performanceScore", value: lab.performanceScore, limit: budget.lab.performanceScore });
    }
    if (lab.lcpMs > budget.lab.lcpMs) {
      violations.push({ scope: "lab", metric: "lcpMs", value: lab.lcpMs, limit: budget.lab.lcpMs });
    }
    if (lab.tbtMs > budget.lab.tbtMs) {
      violations.push({ scope: "lab", metric: "tbtMs", value: lab.tbtMs, limit: budget.lab.tbtMs });
    }
    if (lab.cls > budget.lab.cls) {
      violations.push({ scope: "lab", metric: "cls", value: lab.cls, limit: budget.lab.cls });
    }
  }

  if (field) {
    if (field.p75.lcpMs !== null && field.p75.lcpMs > budget.field.lcpMs) {
      violations.push({ scope: "field", metric: "lcpMs", value: field.p75.lcpMs, limit: budget.field.lcpMs });
    }
    if (field.p75.inpMs !== null && field.p75.inpMs > budget.field.inpMs) {
      violations.push({ scope: "field", metric: "inpMs", value: field.p75.inpMs, limit: budget.field.inpMs });
    }
    if (field.p75.cls !== null && field.p75.cls > budget.field.cls) {
      violations.push({ scope: "field", metric: "cls", value: field.p75.cls, limit: budget.field.cls });
    }
  }

  return { pass: violations.length === 0, violations };
}

function getCommit(): string {
  const result = Bun.spawnSync(["git", "rev-parse", "--short", "HEAD"], { cwd: ROOT });
  return result.success ? result.stdout.toString().trim() : "unknown";
}

function printSummary(entry: HistoryEntry) {
  console.log(`\nperf report — ${entry.date} (${entry.commit})`);
  console.log(`site: ${SITE_URL}\n`);

  if (entry.lab) {
    console.log("lab (PSI mobile):");
    console.log(`  performanceScore  ${entry.lab.performanceScore}`);
    console.log(`  lcpMs             ${entry.lab.lcpMs}`);
    console.log(`  tbtMs             ${entry.lab.tbtMs}`);
    console.log(`  cls               ${entry.lab.cls}`);
    console.log(`  fcpMs             ${entry.lab.fcpMs}`);
    console.log(`  speedIndexMs      ${entry.lab.speedIndexMs}`);
    console.log(`  ttfbMs            ${entry.lab.ttfbMs}`);
  } else {
    console.log("lab: unavailable");
  }

  console.log("");
  if (entry.crux) {
    console.log("crux p75:");
    console.log(`  lcpMs  ${entry.crux.p75.lcpMs}`);
    console.log(`  inpMs  ${entry.crux.p75.inpMs}`);
    console.log(`  cls    ${entry.crux.p75.cls}`);
  } else {
    console.log("crux: unavailable");
  }

  console.log("");
  if (entry.field) {
    console.log(`field (rum, ${entry.field.windowDays}d, n=${entry.field.sampleCount}):`);
    console.log(`  lcpMs  ${entry.field.p75.lcpMs}`);
    console.log(`  inpMs  ${entry.field.p75.inpMs}`);
    console.log(`  cls    ${entry.field.p75.cls}`);
    console.log(`  ttfbMs ${entry.field.p75.ttfbMs}`);
  } else {
    console.log("field: unavailable");
  }

  console.log(`\nbudget: ${entry.budget.pass ? "PASS" : "FAIL"}`);
  for (const v of entry.budget.violations) {
    console.log(`  violation [${v.scope}] ${v.metric}: ${v.value} (limit ${v.limit})`);
  }
}

async function main() {
  const budgetRaw = await readFile(path.join(ROOT, "perf/budget.json"), "utf-8");
  const budget: Budget = JSON.parse(budgetRaw);

  const [{ lab, crux }, field] = await Promise.all([collectLab(), collectField()]);

  const entry: HistoryEntry = {
    date: new Date().toISOString().slice(0, 10),
    commit: getCommit(),
    lab,
    field,
    crux,
    budget: checkBudget(budget, lab, field),
  };

  const perfDir = path.join(ROOT, "perf");
  await mkdir(perfDir, { recursive: true });
  await appendFile(path.join(perfDir, "history.jsonl"), `${JSON.stringify(entry)}\n`);

  printSummary(entry);

  const gate = process.argv.includes("--gate");
  if (!entry.budget.pass && gate) process.exit(1);
  process.exit(0);
}

main();
