import { connect } from "@tursodatabase/serverless";

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("TURSO_DATABASE_URL not set");
  process.exit(1);
}

const conn = connect({ url, authToken: process.env.TURSO_AUTH_TOKEN });

await conn.batch([
  `CREATE TABLE IF NOT EXISTS web_vitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    metric TEXT NOT NULL,
    value REAL NOT NULL,
    path TEXT NOT NULL,
    device TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_created ON web_vitals (metric, created_at)`,
]);

console.log("web_vitals table ready");
