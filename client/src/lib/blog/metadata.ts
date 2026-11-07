import posts from "virtual:blog-posts";
import type { BlogCategory, BlogPost, LocalizedPost, PostLang } from "./types";

export const postLangs = (post: BlogPost): PostLang[] => [
  post.lang,
  ...(Object.keys(post.translations ?? {}) as PostLang[]),
];

export const localizePost = (post: BlogPost, lang: PostLang): LocalizedPost => {
  const version = lang === post.lang ? null : post.translations?.[lang];
  if (!version) return { ...post, activeLang: post.lang };
  return {
    ...post,
    ...version,
    activeLang: lang,
  };
};

export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const blogPosts: BlogPost[] = posts;

export const blogCategories: BlogCategory[] = [
  ...new Set(blogPosts.map((post) => post.category)),
];
