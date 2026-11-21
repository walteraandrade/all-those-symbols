import { readdir, readFile } from "fs/promises";
import path from "path";
import type { Plugin } from "vite";
import { parse } from "yaml";
import { z } from "zod";
import { BLOG_CATEGORIES, POST_LANGS, type BlogPost } from "../client/src/lib/blog/types";

export const CONTENT_DIR = path.resolve(import.meta.dirname, "..", "client", "src", "lib", "blog", "content");

const VIRTUAL_ID = "virtual:blog-posts";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const translationFields = {
  title: z.string().min(1),
  excerpt: z.string().min(1),
  readingTime: z.number().int().positive(),
  imageAlt: z.string().min(1).optional(),
};

const translationSchema = z.object(translationFields).strict();

const primarySchema = z
  .object({
    ...translationFields,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => !Number.isNaN(Date.parse(d)), "invalid date"),
    category: z.enum(BLOG_CATEGORIES),
    image: z.string().startsWith("/").optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string().min(1)).optional(),
  })
  .strict();

export const splitFrontmatter = (raw: string, file: string) => {
  const source = raw.replace(/\r\n/g, "\n");
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  return { data: parse(match[1]) as unknown, body: source.slice(match[0].length) };
};

const visible = (names: string[]) => names.filter((name) => !name.startsWith("."));

const parseOrThrow = <T>(schema: z.ZodType<T>, data: unknown, file: string): T => {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const issues = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
  throw new Error(`${file}: invalid frontmatter\n  ${issues.join("\n  ")}`);
};

const readPost = async (dir: string, slug: string): Promise<BlogPost> => {
  if (!SLUG.test(slug)) throw new Error(`invalid blog slug directory: ${slug}`);
  const names = visible(await readdir(path.join(dir, slug))).sort((a, b) => a.localeCompare(b));
  const files = await Promise.all(
    names.map(async (name) => {
      const file = path.join(slug, name);
      const lang = POST_LANGS.find((l) => name === `${l}.md`);
      if (!lang) throw new Error(`${file}: expected ${POST_LANGS.map((l) => `${l}.md`).join(" or ")}`);
      const source = await readFile(path.join(dir, file), "utf-8");
      const { data, body } = splitFrontmatter(source, file);
      if (!body.trim()) throw new Error(`${file}: empty body`);
      return { file, lang, data };
    })
  );

  const primaries = files.filter((f) => typeof f.data === "object" && f.data !== null && "date" in f.data);
  if (primaries.length !== 1) {
    const found = primaries.map((f) => f.file).join(", ") || "none";
    throw new Error(`${slug}: expected exactly one primary lang file (the one with date, category); found: ${found}`);
  }
  const [primary] = primaries;
  const translations = files
    .filter((f) => f !== primary)
    .map((f) => [f.lang, parseOrThrow(translationSchema, f.data, f.file)] as const);

  const primaryData = parseOrThrow(primarySchema, primary.data, primary.file);
  const translationsField = translations.length > 0 ? { translations: Object.fromEntries(translations) } : {};

  return {
    slug,
    lang: primary.lang,
    ...primaryData,
    ...translationsField,
  };
};

export const readBlogPosts = async (dir = CONTENT_DIR): Promise<BlogPost[]> => {
  const entries = (await readdir(dir, { withFileTypes: true })).filter((e) => !e.name.startsWith("."));
  const stray = entries.filter((e) => !e.isDirectory()).map((e) => e.name);
  if (stray.length > 0) throw new Error(`unexpected files in blog content dir: ${stray.join(", ")}`);
  const posts = await Promise.all(entries.map((e) => readPost(dir, e.name)));
  if (posts.length === 0) throw new Error("no blog posts found");
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
};

export const blogContent = (): Plugin => ({
  name: "blog-content",
  resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : null),
  async load(id) {
    if (id === RESOLVED_ID) return `export default ${JSON.stringify(await readBlogPosts())}`;
    const [file, query] = id.split("?");
    if (query !== "body" || !file.endsWith(".md")) return null;
    const { body } = splitFrontmatter(await readFile(file, "utf-8"), path.relative(CONTENT_DIR, file));
    return `export default ${JSON.stringify(body)}`;
  },
  configureServer(server) {
    const reload = (file: string) => {
      if (!file.startsWith(CONTENT_DIR) || !file.endsWith(".md")) return;
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) server.moduleGraph.invalidateModule(mod);
      server.ws.send({ type: "full-reload" });
    };
    server.watcher.on("add", reload).on("change", reload).on("unlink", reload);
  },
});
