import { readdir, readFile } from "fs/promises";
import path from "path";
import type { Plugin } from "vite";
import { parse } from "yaml";
import { z } from "zod";
import type { BlogPost, PostLang } from "../client/src/lib/blog/types";

export const CONTENT_DIR = path.resolve(import.meta.dirname, "..", "client", "src", "lib", "blog", "content");

const VIRTUAL_ID = "virtual:blog-posts";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const LANGS = ["en", "pt"] as const satisfies readonly PostLang[];

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
    category: z.enum(["Cinema", "Philosophy", "Code", "Life", "Project", "Music"]),
    image: z.string().startsWith("/").optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string().min(1)).optional(),
  })
  .strict();

export const splitFrontmatter = (source: string, file: string) => {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  return { data: parse(match[1]) as unknown, body: source.slice(match[0].length) };
};

const parseOrThrow = <T>(schema: z.ZodType<T>, data: unknown, file: string): T => {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const issues = result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
  throw new Error(`${file}: invalid frontmatter\n  ${issues.join("\n  ")}`);
};

const readPost = async (slug: string): Promise<BlogPost> => {
  if (!SLUG.test(slug)) throw new Error(`invalid blog slug directory: ${slug}`);
  const names = (await readdir(path.join(CONTENT_DIR, slug))).sort();
  const files = await Promise.all(
    names.map(async (name) => {
      const file = path.join(slug, name);
      const lang = LANGS.find((l) => name === `${l}.md`);
      if (!lang) throw new Error(`${file}: expected ${LANGS.map((l) => `${l}.md`).join(" or ")}`);
      const source = await readFile(path.join(CONTENT_DIR, file), "utf-8");
      const { data, body } = splitFrontmatter(source, file);
      if (!body.trim()) throw new Error(`${file}: empty body`);
      return { file, lang, data };
    })
  );

  const primaries = files.filter((f) => typeof f.data === "object" && f.data !== null && "date" in f.data);
  if (primaries.length !== 1) {
    throw new Error(`${slug}: expected exactly one file with date/category (primary lang), found ${primaries.length}`);
  }
  const [primary] = primaries;
  const translations = files
    .filter((f) => f !== primary)
    .map((f) => [f.lang, parseOrThrow(translationSchema, f.data, f.file)] as const);

  return {
    slug,
    lang: primary.lang,
    ...parseOrThrow(primarySchema, primary.data, primary.file),
    ...(translations.length > 0 && { translations: Object.fromEntries(translations) }),
  };
};

export const readBlogPosts = async (): Promise<BlogPost[]> => {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  const stray = entries.filter((e) => !e.isDirectory()).map((e) => e.name);
  if (stray.length > 0) throw new Error(`unexpected files in blog content dir: ${stray.join(", ")}`);
  const posts = await Promise.all(entries.map((e) => readPost(e.name)));
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
