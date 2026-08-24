import type { PostContent } from "./types";

export const blogSlugs = [
  "the-benefits-of-stupidity",
  "through-a-glass-darkly-bergman",
  "no-country-for-old-men",
  "the-thin-red-line",
  "the-sacrifice-tarkovsky",
  "masculin-feminin-godard",
  "harakiri-kobayashi",
  "love-exposure-sono",
  "madadayo-kurosawa",
  "barravento-rocha",
  "in-the-mood-for-love-wong",
  "la-strada-fellini",
  "agricultura-sintropica",
  "paisagem-da-janela-milton-nascimento",
  "aqui-e-agora-gilberto-gil",
  "um-gilverso-para-explorar",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

type ContentModule = { default: PostContent };
type ContentLoader = () => Promise<ContentModule>;

const contentLoaders = {
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
} satisfies Record<BlogSlug, ContentLoader>;

export const isBlogSlug = (slug: string): slug is BlogSlug =>
  Object.hasOwn(contentLoaders, slug);

export const loadBlogContent = async (slug: BlogSlug): Promise<PostContent> =>
  (await contentLoaders[slug]()).default;
