import { afterEach, describe, expect, test } from "bun:test";
import { mkdtemp, mkdir, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { readBlogPosts, splitFrontmatter } from "./blog-content";
import { formatPostDate } from "../client/src/lib/blog/chrome";

const dirs: string[] = [];

const fixture = async (files: Record<string, string>) => {
  const dir = await mkdtemp(path.join(tmpdir(), "blog-"));
  dirs.push(dir);
  await Promise.all(
    Object.entries(files).map(async ([file, source]) => {
      await mkdir(path.dirname(path.join(dir, file)), { recursive: true });
      await writeFile(path.join(dir, file), source);
    })
  );
  return dir;
};

const primary = (extra = "", date = "2024-01-02") =>
  `---\ntitle: T\ndate: ${date}\ncategory: Cinema\nexcerpt: E\nreadingTime: 2\n${extra}---\n\nbody\n`;

const translation = (extra = "") => `---\ntitle: T\nexcerpt: E\nreadingTime: 2\n${extra}---\n\ncorpo\n`;

afterEach(async () => {
  await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("readBlogPosts", () => {
  test("real content parses", async () => {
    const posts = await readBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
  });

  test("builds post with translations", async () => {
    const dir = await fixture({ "a/en.md": primary("tags: [x, y]\n"), "a/pt.md": translation() });
    expect(await readBlogPosts(dir)).toEqual([
      {
        slug: "a",
        lang: "en",
        title: "T",
        date: "2024-01-02",
        category: "Cinema",
        excerpt: "E",
        readingTime: 2,
        tags: ["x", "y"],
        translations: { pt: { title: "T", excerpt: "E", readingTime: 2 } },
      },
    ]);
  });

  test("sorts newest first, slug breaks ties", async () => {
    const dir = await fixture({
      "old/en.md": primary("", "2020-05-01"),
      "b/en.md": primary("", "2024-01-02"),
      "a/en.md": primary("", "2024-01-02"),
    });
    expect((await readBlogPosts(dir)).map((p) => p.slug)).toEqual(["a", "b", "old"]);
  });

  test("ignores dotfiles", async () => {
    const dir = await fixture({ ".DS_Store": "", "a/.DS_Store": "", "a/en.md": primary() });
    expect(await readBlogPosts(dir)).toHaveLength(1);
  });

  test("accepts CRLF files", async () => {
    const dir = await fixture({ "a/en.md": primary().replace(/\n/g, "\r\n") });
    expect((await readBlogPosts(dir))[0].title).toBe("T");
  });

  test.each([
    ["unknown category", { "a/en.md": primary().replace("Cinema", "Cinemaa") }, "a/en.md: invalid frontmatter"],
    ["bad date", { "a/en.md": primary("", "2024-13-45") }, "date: invalid date"],
    ["string readingTime", { "a/en.md": primary().replace("readingTime: 2", 'readingTime: "2"') }, "readingTime"],
    ["extra key", { "a/en.md": primary("lang: en\n") }, "Unrecognized key(s) in object: 'lang'"],
    ["extra key in translation", { "a/en.md": primary(), "a/pt.md": translation("tags: [x]\n") }, "a/pt.md: invalid frontmatter"],
    ["no primary", { "a/en.md": translation() }, "a: expected exactly one primary lang file (the one with date, category); found: none"],
    ["two primaries", { "a/en.md": primary(), "a/pt.md": primary() }, "found: a/en.md, a/pt.md"],
    ["bad slug dir", { "Bad_Slug/en.md": primary() }, "invalid blog slug directory: Bad_Slug"],
    ["unknown lang", { "a/fr.md": primary() }, "a/fr.md: expected en.md or pt.md"],
    ["empty body", { "a/en.md": primary().replace("\nbody\n", "") }, "a/en.md: empty body"],
    ["missing frontmatter", { "a/en.md": "body" }, "a/en.md: missing frontmatter"],
    ["stray file", { "notes.txt": "", "a/en.md": primary() }, "unexpected files in blog content dir: notes.txt"],
    ["no posts", { ".keep": "" }, "no blog posts found"],
  ])("fails on %s", async (_, files, message) => {
    await expect(readBlogPosts(await fixture(files))).rejects.toThrow(message);
  });
});

describe("splitFrontmatter", () => {
  test("splits data from body", () => {
    expect(splitFrontmatter("---\ntitle: A\n---\n\nbody\n", "a.md")).toEqual({ data: { title: "A" }, body: "\nbody\n" });
  });

  test("keeps --- inside body", () => {
    expect(splitFrontmatter("---\ntitle: A\n---\none\n---\ntwo\n", "a.md").body).toBe("one\n---\ntwo\n");
  });

  test("closing fence at end of file", () => {
    expect(splitFrontmatter("---\ntitle: A\n---", "a.md")).toEqual({ data: { title: "A" }, body: "" });
  });

  test("throws without frontmatter", () => {
    expect(() => splitFrontmatter("no frontmatter", "a.md")).toThrow("a.md: missing frontmatter");
  });
});

describe("formatPostDate", () => {
  test.each([
    ["2026-11-03", "Nov 3, 2026"],
    ["2012-01-01", "Jan 1, 2012"],
    ["2023-12-31", "Dec 31, 2023"],
  ])("%s -> %s", (date, expected) => {
    expect(formatPostDate(date)).toBe(expected);
  });
});
