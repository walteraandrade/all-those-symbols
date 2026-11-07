import blogPosts from "virtual:blog-posts";
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

export { blogPosts };

export const blogCategories: BlogCategory[] = [
  ...new Set(blogPosts.map((post) => post.category)),
];
