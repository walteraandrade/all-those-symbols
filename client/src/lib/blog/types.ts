export type BlogCategory =
  | "Cinema"
  | "Philosophy"
  | "Code"
  | "Life"
  | "Project"
  | "Music";

export type PostLang = "en" | "pt";

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
