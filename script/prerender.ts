import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { blogPosts } from "../client/src/lib/blog/metadata";
import { blogSlugs } from "../client/src/lib/blog/loaders";
import type { BlogPost } from "../client/src/lib/blog/types";

const BASE_URL = "https://all-those-symbols.vercel.app";
const DIST_PATH = path.resolve(import.meta.dirname, "..", "dist", "public");

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
}

const staticPages: Record<string, PageMeta> = {
  "/bio": {
    title: "Bio | Walter Andrade",
    description:
      "Software developer with a background in philosophy and logic. Building rigorous, elegant systems.",
    canonical: "/bio",
  },
  "/projects": {
    title: "Projects | Walter Andrade",
    description:
      "Full-stack applications, platforms, and systems built by Walter Andrade.",
    canonical: "/projects",
  },
  "/blog": {
    title: "Blog | Walter Andrade",
    description:
      "Thoughts on logic, code, cinema, and life. Essays and reflections by Walter Andrade.",
    canonical: "/blog",
  },
  "/contact": {
    title: "Contact | Walter Andrade",
    description:
      "Get in touch with Walter Andrade. Send a message for collaborations, questions, or just to say hello.",
    canonical: "/contact",
  },
};

const generateMetaTags = (meta: PageMeta): string => {
  const ogImage = `${BASE_URL}/opengraph.jpg`;
  return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${BASE_URL}${meta.canonical}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:type" content="${meta.ogType || "website"}" />
    <meta property="og:url" content="${BASE_URL}${meta.canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@walteraandrade" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${ogImage}" />`;
};

const injectMeta = (template: string, meta: PageMeta): string => {
  let html = template;
  html = html.replace(/<title>.*?<\/title>\n?/, "");
  html = html.replace(/<meta name="description"[^>]*>\n?/, "");
  html = html.replace(/<link rel="canonical"[^>]*>\n?/, "");
  html = html.replace(/<meta property="og:title"[^>]*>\n?/, "");
  html = html.replace(/<meta property="og:description"[^>]*>\n?/, "");
  html = html.replace(/<meta property="og:type"[^>]*>\n?/, "");
  html = html.replace(/<meta property="og:image"[^>]*>\n?/, "");
  html = html.replace(/<meta name="twitter:card"[^>]*>\n?/, "");
  html = html.replace(/<meta name="twitter:site"[^>]*>\n?/, "");
  html = html.replace(/<meta name="twitter:title"[^>]*>\n?/, "");
  html = html.replace(/<meta name="twitter:description"[^>]*>\n?/, "");
  html = html.replace(/<meta name="twitter:image"[^>]*>\n?/, "");
  const metaTags = generateMetaTags(meta);
  html = html.replace("<!--ssr-meta-->", metaTags);
  return html;
};

const parseDate = (dateStr: string): Date => {
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const parts = dateStr.split(" ");
  const month = months[parts[0]];
  const day = parseInt(parts[1].replace(",", ""));
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};

const assertBlogDataIntegrity = (): void => {
  const loaderSlugs: readonly string[] = blogSlugs;
  if (blogPosts.length === 0) {
    throw new Error("Blog metadata is empty; refusing to prerender.");
  }
  if (loaderSlugs.length === 0) {
    throw new Error("Blog loader slugs are empty; refusing to prerender.");
  }

  const metadataSlugs = blogPosts.map((post) => post.slug);
  const duplicateMetadataSlugs = metadataSlugs.filter(
    (slug, index) => metadataSlugs.indexOf(slug) !== index
  );
  const duplicateLoaderSlugs = loaderSlugs.filter(
    (slug, index) => loaderSlugs.indexOf(slug) !== index
  );

  if (duplicateMetadataSlugs.length > 0) {
    throw new Error(
      `Duplicate blog metadata slugs: ${[...new Set(duplicateMetadataSlugs)].join(", ")}`
    );
  }
  if (duplicateLoaderSlugs.length > 0) {
    throw new Error(
      `Duplicate blog loader slugs: ${[...new Set(duplicateLoaderSlugs)].join(", ")}`
    );
  }

  const metadataOnly = metadataSlugs.filter((slug) => !loaderSlugs.includes(slug));
  const loadersOnly = loaderSlugs.filter((slug) => !metadataSlugs.includes(slug));
  if (metadataOnly.length > 0 || loadersOnly.length > 0) {
    throw new Error(
      `Blog metadata and loaders do not match. Metadata only: ${metadataOnly.join(", ") || "none"}; loaders only: ${loadersOnly.join(", ") || "none"}.`
    );
  }
};

const generateSitemap = (posts: BlogPost[]): string => {
  const urls = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/bio", priority: "0.8", changefreq: "monthly" },
    { loc: "/projects", priority: "0.8", changefreq: "monthly" },
    { loc: "/blog", priority: "0.9", changefreq: "weekly" },
    { loc: "/contact", priority: "0.7", changefreq: "yearly" },
    ...posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: parseDate(post.date).toISOString().split("T")[0],
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;
};

const generateRobots = (): string => `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

export async function prerender() {
  console.log("Pre-rendering pages...");
  assertBlogDataIntegrity();

  const template = await readFile(path.join(DIST_PATH, "index.html"), "utf-8");

  for (const [route, meta] of Object.entries(staticPages)) {
    const dir = path.join(DIST_PATH, route);
    await mkdir(dir, { recursive: true });
    const html = injectMeta(template, meta);
    await writeFile(path.join(dir, "index.html"), html);
    console.log(`  ${route}/index.html`);
  }

  for (const post of blogPosts) {
    const meta: PageMeta = {
      title: `${post.title} | Walter Andrade`,
      description: post.excerpt,
      canonical: `/blog/${post.slug}`,
      ogType: "article",
    };
    const dir = path.join(DIST_PATH, "blog", post.slug);
    await mkdir(dir, { recursive: true });
    const html = injectMeta(template, meta);
    await writeFile(path.join(dir, "index.html"), html);
    console.log(`  /blog/${post.slug}/index.html`);
  }

  const sitemap = generateSitemap(blogPosts);
  await writeFile(path.join(DIST_PATH, "sitemap.xml"), sitemap);
  console.log("  sitemap.xml");

  const robots = generateRobots();
  await writeFile(path.join(DIST_PATH, "robots.txt"), robots);
  console.log("  robots.txt");

  console.log("Pre-rendering complete!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerender().catch(console.error);
}
