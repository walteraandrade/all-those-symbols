export const BLOG_CATEGORIES = ["Cinema", "Philosophy", "Code", "Life", "Project", "Music"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const POST_LANGS = ["en", "pt"] as const;

export type PostLang = (typeof POST_LANGS)[number];

export interface PostMetadata {
  title: string;
  excerpt: string;
  readingTime: number;
  imageAlt?: string;
}

export interface BlogPost extends PostMetadata {
  slug: string;
  date: string;
  category: BlogCategory;
  lang: PostLang;
  image?: string;
  translations?: Partial<Record<PostLang, PostMetadata>>;
  featured?: boolean;
  tags?: string[];
}

export interface LocalizedPost extends BlogPost {
  activeLang: PostLang;
}

export type PostContent = Partial<Record<PostLang, string>>;
