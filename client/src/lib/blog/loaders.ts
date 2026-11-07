import type { PostContent } from "./types";

type ContentModule = { default: PostContent };
type ContentLoader = () => Promise<ContentModule>;

const contentLoaders = {
  "philosophy-really": () => import("./content/philosophy-really"),
  "the-benefits-of-stupidity": () => import("./content/the-benefits-of-stupidity"),
  "through-a-glass-darkly-bergman": () => import("./content/through-a-glass-darkly-bergman"),
  "no-country-for-old-men": () => import("./content/no-country-for-old-men"),
  "the-thin-red-line": () => import("./content/the-thin-red-line"),
  "the-sacrifice-tarkovsky": () => import("./content/the-sacrifice-tarkovsky"),
  "masculin-feminin-godard": () => import("./content/masculin-feminin-godard"),
  "harakiri-kobayashi": () => import("./content/harakiri-kobayashi"),
  "love-exposure-sono": () => import("./content/love-exposure-sono"),
  "madadayo-kurosawa": () => import("./content/madadayo-kurosawa"),
  "barravento-rocha": () => import("./content/barravento-rocha"),
  "in-the-mood-for-love-wong": () => import("./content/in-the-mood-for-love-wong"),
  "la-strada-fellini": () => import("./content/la-strada-fellini"),
  "agricultura-sintropica": () => import("./content/agricultura-sintropica"),
  "paisagem-da-janela-milton-nascimento": () => import("./content/paisagem-da-janela-milton-nascimento"),
  "aqui-e-agora-gilberto-gil": () => import("./content/aqui-e-agora-gilberto-gil"),
  "um-gilverso-para-explorar": () => import("./content/um-gilverso-para-explorar"),
} satisfies Record<string, ContentLoader>;

export type BlogSlug = keyof typeof contentLoaders;

export const blogSlugs = Object.keys(contentLoaders) as BlogSlug[];

export const isBlogSlug = (slug: string): slug is BlogSlug =>
  Object.hasOwn(contentLoaders, slug);

const contentCache = new Map<BlogSlug, Promise<PostContent | null>>();

export const readBlogContent = (slug: BlogSlug): Promise<PostContent | null> => {
  const cached = contentCache.get(slug);
  if (cached) return cached;
  const pending = contentLoaders[slug]().then(
    (module) => module.default,
    () => null
  );
  contentCache.set(slug, pending);
  return pending;
};

export const forgetBlogContent = (slug: BlogSlug) => {
  contentCache.delete(slug);
};
