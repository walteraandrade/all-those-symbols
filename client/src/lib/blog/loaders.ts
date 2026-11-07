import type { PostContent, PostLang } from "./types";

const bodyLoaders = import.meta.glob<string>("./content/*/*.md", { query: "?body", import: "default" });

const bodies = Object.entries(bodyLoaders).map(([file, load]) => {
  const [, slug, lang] = file.match(/^\.\/content\/([^/]+)\/([^/]+)\.md$/) ?? [];
  return { slug, lang: lang as PostLang, load };
});

export const isBlogSlug = (slug: string) => bodies.some((b) => b.slug === slug);

const contentCache = new Map<string, Promise<PostContent | null>>();

export const readBlogContent = (slug: string): Promise<PostContent | null> => {
  const cached = contentCache.get(slug);
  if (cached) return cached;
  const pending = Promise.all(
    bodies.filter((b) => b.slug === slug).map(async (b) => [b.lang, await b.load()] as const)
  ).then(
    (entries): PostContent => Object.fromEntries(entries),
    () => null
  );
  contentCache.set(slug, pending);
  return pending;
};

export const forgetBlogContent = (slug: string) => {
  contentCache.delete(slug);
};
