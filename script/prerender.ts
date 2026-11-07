import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
import { blogPosts } from "../client/src/lib/blog/metadata";
import { blogSlugs } from "../client/src/lib/blog/loaders";
import type { BlogPost } from "../client/src/lib/blog/types";

const BASE_URL = "https://all-those-symbols.vercel.app";
const DIST_PATH = path.resolve(import.meta.dirname, "..", "dist", "public");
const SERVER_ENTRY = path.resolve(import.meta.dirname, "..", "dist", "server", "entry-server.js");

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
}

const staticPages: Record<string, PageMeta> = {
  "/": {
    title: "Walter Andrade | Developer & Thinker",
    description:
      "Software developer with a background in philosophy and logic. Building rigorous, elegant systems. Exploring ideas at the intersection of code and thought.",
    canonical: "/",
  },
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

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const generateMetaTags = (meta: PageMeta): string => {
  const ogImage = `${BASE_URL}/opengraph.jpg`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${BASE_URL}${meta.canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="${meta.ogType || "website"}" />
    <meta property="og:url" content="${BASE_URL}${meta.canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@walteraandrade" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
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

const ROOT_TAG = '<div id="root"></div>';

const injectBody = (html: string, body: string): string => {
  if (!html.includes(ROOT_TAG)) throw new Error("index.html has no empty #root to fill.");
  return html.replace(ROOT_TAG, () => `<div id="root">${body}</div>`);
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

type SitemapUrl = {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
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
  const urls: SitemapUrl[] = [
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
  const { render }: { render: (url: string) => Promise<string> } = await import(
    pathToFileURL(SERVER_ENTRY).href
  );

  const writePage = async (file: string, url: string, meta: PageMeta) => {
    const html = injectBody(injectMeta(template, meta), await render(url));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`  ${path.relative(DIST_PATH, file)}`);
  };

  for (const [route, meta] of Object.entries(staticPages)) {
    await writePage(path.join(DIST_PATH, route, "index.html"), route, meta);
  }

  for (const post of blogPosts) {
    await writePage(path.join(DIST_PATH, "blog", post.slug, "index.html"), `/blog/${post.slug}`, {
      title: `${post.title} | Walter Andrade`,
      description: post.excerpt,
      canonical: `/blog/${post.slug}`,
      ogType: "article",
    });
  }

  await writePage(path.join(DIST_PATH, "404.html"), "/404", {
    title: "Not found | Walter Andrade",
    description: "This page only exists from an angle we have not built yet.",
    canonical: "/",
  });

  const sitemap = generateSitemap(blogPosts);
  await writeFile(path.join(DIST_PATH, "sitemap.xml"), sitemap);
  console.log("  sitemap.xml");

  const robots = generateRobots();
  await writeFile(path.join(DIST_PATH, "robots.txt"), robots);
  console.log("  robots.txt");

  console.log("Pre-rendering complete!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerender().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
