import { expect, test } from "bun:test";
import { readBlogPosts, splitFrontmatter } from "./blog-content";

test("all posts parse, newest first", async () => {
  const posts = await readBlogPosts();
  expect(posts).toHaveLength(17);
  expect(posts.map((p) => p.date)).toEqual(posts.map((p) => p.date).toSorted().reverse());
  expect(posts.find((p) => p.slug === "philosophy-really")?.translations?.pt?.title).toBe("Filosofia, sério?");
});

test("frontmatter is split from body", () => {
  expect(splitFrontmatter("---\ntitle: A\n---\n\nbody\n", "a.md")).toEqual({ data: { title: "A" }, body: "\nbody\n" });
  expect(() => splitFrontmatter("no frontmatter", "a.md")).toThrow("a.md: missing frontmatter");
});
