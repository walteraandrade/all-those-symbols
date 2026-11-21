import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

const DIST = "dist/public";
if (!existsSync(`${DIST}/sitemap.xml`)) throw new Error("dist/public missing: run `bun run build` before `bun test`");

const read = (file: string) => readFileSync(`${DIST}/${file}`, "utf8");

const routes = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc!));

test("sitemap lists routes", () => {
  expect(routes.length).toBeGreaterThan(0);
});

test.each(routes.map((url) => [url.pathname, url] as const))("%s is fully prerendered", (_, url) => {
  const html = read(url.pathname === "/" ? "index.html" : `${url.pathname.slice(1)}/index.html`);
  expect(html).toMatch(/<div id="root">(?!<\/div>)\S/);
  expect(html).toMatch(/<title>[^<]+<\/title>/);
  expect(html).toMatch(/<meta name="description" content="[^"]+"/);
  expect(html).toContain(`<link rel="canonical" href="${url.href}"`);
});

test("blog posts have ISO lastmod", () => {
  const entries = [...read("sitemap.xml").matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, url]) => url!);
  const posts = entries.filter((url) => /<loc>[^<]+\/blog\/[^<]+<\/loc>/.test(url));
  expect(posts.length).toBeGreaterThan(0);
  for (const url of posts) expect(url).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
});

test("404.html exists", () => {
  expect(existsSync(`${DIST}/404.html`)).toBe(true);
});
