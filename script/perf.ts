import { appendFile, mkdir, readdir, readFile, stat } from "fs/promises";
import path from "path";
import { gzipSync } from "zlib";
import { z } from "zod";

type LabResult = {
  source: "psi";
  strategy: "mobile";
  performanceScore: number | null;
  lcpMs: number | null;
  tbtMs: number | null;
  cls: number | null;
  fcpMs: number;
  speedIndexMs: number;
  ttfbMs: number;
} | null;

type CruxResult = {
  p75: { lcpMs: number | null; inpMs: number | null; cls: number | null };
} | null;

type FieldP75 = { lcpMs: number | null; inpMs: number | null; cls: number | null; ttfbMs: number | null };

type FieldResult = {
  source: "rum";
  windowDays: 28;
  sampleCount: number;
  p75: FieldP75;
  byRoute: Record<string, { sampleCount: number; p75: FieldP75 }>;
} | null;

type Violation = { scope: "bundle" | "lab" | "lab:blog" | "field"; metric: string; value: number | null; limit: number };

const budgetSchema = z.object({
  bundle: z.object({ mainChunkKb: z.number(), blogPostChunkGzipKb: z.number() }),
  lab: z.object({ performanceScore: z.number(), lcpMs: z.number(), tbtMs: z.number(), cls: z.number() }),
  field: z.object({ lcpMs: z.number(), inpMs: z.number(), cls: z.number() }),
});

type Budget = z.infer<typeof budgetSchema>;

type BundleResult = {
  mainChunkKb: number;
  blogPostChunkGzipKb: number;
};

type HistoryEntry = {
  date: string;
  commit: string;
  bundle: BundleResult;
  lab: LabResult;
  labBlog: LabResult;
  field: FieldResult;
  crux: CruxResult;
  budget: { pass: boolean; violations: Violation[] };
};

const auditSchema = z.object({ numericValue: z.number().optional() });

const psiResponseSchema = z.object({
  error: z.object({ message: z.string().optional() }).optional(),
  lighthouseResult: z
    .object({
      audits: z
        .object({
          "largest-contentful-paint": auditSchema.optional(),
          "total-blocking-time": auditSchema.optional(),
          "cumulative-layout-shift": auditSchema.optional(),
          "first-contentful-paint": auditSchema.optional(),
          "speed-index": auditSchema.optional(),
          "server-response-time": auditSchema.optional(),
        })
        .optional(),
      categories: z
        .object({
          performance: z.object({ score: z.number().nullable().optional() }).optional(),
        })
        .optional(),
    })
    .optional(),
  loadingExperience: z
    .object({
      metrics: z
        .object({
          LARGEST_CONTENTFUL_PAINT_MS: z.object({ percentile: z.number() }).optional(),
          INTERACTION_TO_NEXT_PAINT: z.object({ percentile: z.number() }).optional(),
          CUMULATIVE_LAYOUT_SHIFT_SCORE: z.object({ percentile: z.number() }).optional(),
        })
        .optional(),
    })
    .optional(),
});

const SITE_URL = process.env.SITE_URL ?? "https://all-those-symbols.vercel.app";
const BLOG_PATH = "/blog/philosophy-really";
const ROOT = path.resolve(import.meta.dirname, "..");

const round = (n: number) => Math.round(n);

async function chunkKb(files: string[], pattern: RegExp, label: string, gzip = false) {
  const matches = files.filter((file) => pattern.test(file));
  if (matches.length !== 1) {
    throw new Error(`Expected one ${label} JavaScript chunk, found ${matches.length}; run \`bun run build\` first`);
  }
  const file = path.join(ROOT, "dist/public/assets", matches[0]);
  const size = gzip ? gzipSync(await readFile(file)).length : (await stat(file)).size;
  return Math.round(size / 10) / 100;
}

async function collectBundle(): Promise<BundleResult> {
  const files = await readdir(path.join(ROOT, "dist/public/assets")).catch(() => {
    throw new Error("Entry JavaScript chunk not found; run `bun run build` first");
  });
  return {
    mainChunkKb: await chunkKb(files, /^index-[\w-]+\.js$/, "entry"),
    blogPostChunkGzipKb: await chunkKb(files, /^BlogPost-[\w-]+\.js$/, "BlogPost", true),
  };
}

async function collectLab(pagePath = "/"): Promise<{ lab: LabResult; crux: CruxResult }> {
  const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  url.searchParams.set("url", new URL(pagePath, SITE_URL).toString());
  url.searchParams.set("strategy", "mobile");
  url.searchParams.set("category", "PERFORMANCE");
  if (process.env.PSI_API_KEY) url.searchParams.set("key", process.env.PSI_API_KEY);

  try {
    const res = await fetch(url.toString());
    const parsed = psiResponseSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.error("PSI returned an invalid response");
      return { lab: null, crux: null };
    }

    const data = parsed.data;
    if (!res.ok || data.error) {
      console.error("PSI request failed:", data.error?.message ?? res.statusText);
      return { lab: null, crux: null };
    }

    const audits = data.lighthouseResult?.audits ?? {};
    const score = data.lighthouseResult?.categories?.performance?.score;
    const lcp = audits["largest-contentful-paint"]?.numericValue;
    const tbt = audits["total-blocking-time"]?.numericValue;
    const lab: LabResult = {
      source: "psi",
      strategy: "mobile",
      performanceScore: score === null || score === undefined ? null : round(score * 100),
      lcpMs: lcp === undefined ? null : round(lcp),
      tbtMs: tbt === undefined ? null : round(tbt),
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      fcpMs: round(audits["first-contentful-paint"]?.numericValue ?? 0),
      speedIndexMs: round(audits["speed-index"]?.numericValue ?? 0),
      ttfbMs: round(audits["server-response-time"]?.numericValue ?? 0),
    };

    const metrics = data.loadingExperience?.metrics;
    const cls = metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;
    const crux: CruxResult = metrics
      ? {
          p75: {
            lcpMs: metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
            inpMs: metrics.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
            cls: cls === undefined ? null : cls / 100,
          },
        }
      : null;

    return { lab, crux };
  } catch (err) {
    console.error("PSI request failed:", err instanceof Error ? err.message : err);
    return { lab: null, crux: null };
  }
}

export const routeGroup = (p: string) => {
  const n = p.length > 1 ? p.replace(/\/+$/, "") : p;
  return n === "/" ? "/" : n.startsWith("/blog/") ? "/blog/*" : "other";
};

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
      "SELECT metric, value, path FROM web_vitals WHERE created_at >= datetime('now', '-28 days')"
    )) as { metric: string; value: number; path: string }[];

    const summarize = (rs: typeof rows) => {
      const pick = (name: string) => p75(rs.filter((r) => r.metric === name).map((r) => r.value));
      const ms = (n: number | null) => (n === null ? null : round(n));
      return {
        sampleCount: rs.length,
        p75: { lcpMs: ms(pick("LCP")), inpMs: ms(pick("INP")), cls: pick("CLS"), ttfbMs: ms(pick("TTFB")) },
      };
    };
    const groups = [...new Set(rows.map((r) => routeGroup(r.path)))];

    return {
      source: "rum",
      windowDays: 28,
      ...summarize(rows),
      byRoute: Object.fromEntries(groups.map((g) => [g, summarize(rows.filter((r) => routeGroup(r.path) === g))])),
    };
  } catch (err) {
    console.error("field data query failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

export function checkBudget(
  budget: Budget,
  bundle: BundleResult,
  lab: LabResult,
  field: FieldResult,
  labBlog: LabResult = null,
  measured = false,
) {
  const violations: Violation[] = [];

  if (bundle.mainChunkKb > budget.bundle.mainChunkKb) {
    violations.push({
      scope: "bundle",
      metric: "mainChunkKb",
      value: bundle.mainChunkKb,
      limit: budget.bundle.mainChunkKb,
    });
  }

  if (bundle.blogPostChunkGzipKb > budget.bundle.blogPostChunkGzipKb) {
    violations.push({
      scope: "bundle",
      metric: "blogPostChunkGzipKb",
      value: bundle.blogPostChunkGzipKb,
      limit: budget.bundle.blogPostChunkGzipKb,
    });
  }

  for (const [scope, l] of [["lab", lab], ["lab:blog", labBlog]] as const) {
    if (!l) {
      if (measured) violations.push({ scope, metric: "unavailable", value: null, limit: 0 });
      continue;
    }
    const check = (metric: "performanceScore" | "lcpMs" | "tbtMs" | "cls", below = false) => {
      const value = l[metric];
      const limit = budget.lab[metric];
      if (value === null || (below ? value < limit : value > limit)) {
        violations.push({ scope, metric, value, limit });
      }
    };
    check("performanceScore", true);
    check("lcpMs");
    check("tbtMs");
    check("cls");
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

  console.log(`bundle:`);
  console.log(`  mainChunkKb       ${entry.bundle.mainChunkKb} kB`);
  console.log(`  blogPostChunkGzipKb ${entry.bundle.blogPostChunkGzipKb} kB`);
  console.log("");
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

  if (entry.labBlog) {
    console.log(`lab blog (PSI mobile, ${BLOG_PATH}):`);
    console.log(`  performanceScore  ${entry.labBlog.performanceScore}`);
    console.log(`  lcpMs             ${entry.labBlog.lcpMs}`);
    console.log(`  tbtMs             ${entry.labBlog.tbtMs}`);
    console.log(`  cls               ${entry.labBlog.cls}`);
  } else {
    console.log("lab blog: unavailable");
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
    for (const [group, g] of Object.entries(entry.field.byRoute)) {
      console.log(`  ${group} (n=${g.sampleCount}) lcpMs ${g.p75.lcpMs} inpMs ${g.p75.inpMs} cls ${g.p75.cls}`);
    }
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
  const budget = budgetSchema.parse(JSON.parse(budgetRaw));
  const gate = process.argv.includes("--gate");
  const bundle = await collectBundle();
  const none = { lab: null, crux: null };
  const { lab, crux } = gate ? none : await collectLab();
  const { lab: labBlog } = gate ? none : await collectLab(BLOG_PATH);
  const field = gate ? null : await collectField();

  const entry: HistoryEntry = {
    date: new Date().toISOString().slice(0, 10),
    commit: getCommit(),
    bundle,
    lab,
    labBlog,
    field,
    crux,
    budget: checkBudget(budget, bundle, lab, field, labBlog, !gate),
  };

  if (!gate) {
    const perfDir = path.join(ROOT, "perf");
    await mkdir(perfDir, { recursive: true });
    await appendFile(path.join(perfDir, "history.jsonl"), `${JSON.stringify(entry)}\n`);
  }

  printSummary(entry);

  if (!entry.budget.pass && gate) process.exit(1);
  process.exit(0);
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
