import { use, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import { blogPosts, localizePost, postLangs } from "@/lib/blog/metadata";
import { CHROME, formatPostDate } from "@/lib/blog/chrome";
import { forgetBlogContent, isBlogSlug, readBlogContent } from "@/lib/blog/loaders";
import { BASE_URL } from "@/lib/site";
import { slugify } from "@/lib/utils";
import { PostLanguage, useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BackToTop } from "@/components/blog/BackToTop";
import { BlogContent } from "@/components/blog/BlogContent";
import { CenturyTimeline } from "@/components/blog/CenturyTimeline";
import { LanguageToggle } from "@/components/blog/LanguageToggle";
import NotFound from "@/pages/not-found";

const extractHeadings = (markdown: string) => {
  const headingRegex = /^#{2,3}[ \t]+(\S.*)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[0].indexOf(" ");
    const text = match[1];
    const id = slugify(text);
    headings.push({ id, text, level });
  }
  return headings;
};

function BlogPostContent() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);
  const [, rerender] = useState(0);

  const postIndex = useMemo(
    () => blogPosts.findIndex((p) => p.slug === slug),
    [slug]
  );

  const post = useMemo(
    () => (postIndex >= 0 ? localizePost(blogPosts[postIndex], lang) : null),
    [postIndex, lang]
  );
  const prevPost = postIndex > 0 ? localizePost(blogPosts[postIndex - 1], lang) : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? localizePost(blogPosts[postIndex + 1], lang) : null;
  const loaded = post && isBlogSlug(slug) ? use(readBlogContent(slug)) : null;
  const content = loaded && post ? loaded[post.activeLang] ?? loaded[post.lang] : null;
  const headings = useMemo(
    () => (content ? extractHeadings(content) : []),
    [content]
  );

  useDocumentMeta({
    title: post ? `${post.title} | Walter Andrade` : "Blog | Walter Andrade",
    description: post?.excerpt,
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
    ogImage: post?.image ? `${BASE_URL}${post.image}` : undefined,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return <NotFound />;
  }

  if (!content) {
    return (
      <div data-load-failed className="esc-page esc-center">
        <p role="alert">{CHROME[post.activeLang].loadFailed}</p>
        <button
          className="esc-btn"
          onClick={() => {
            if (isBlogSlug(slug)) forgetBlogContent(slug);
            rerender((n) => n + 1);
          }}
        >
          {CHROME[post.activeLang].tryAgain}
        </button>
        <Link className="esc-back" href="/blog">{CHROME[post.activeLang].backToBlog}</Link>
      </div>
    );
  }

  const chrome = CHROME[post.activeLang];
  const hasTimeline = slug === "philosophy-really";
  const image = post.image;
  const imageSrcSet = image
    ? [480, 960, 1600]
        .map((width) => `${image.replace(/\.jpe?g$/i, `-${width}.webp`)} ${width}w`)
        .join(", ")
    : undefined;

  const tocLink = (id: string, text: string, level: number, onPick?: () => void) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        onPick?.();
      }}
      className={`${level === 3 ? "sub" : ""} ${activeId === id ? "on" : ""}`}
      aria-current={activeId === id ? "location" : undefined}
    >
      {text}
    </a>
  );

  return (
    <PostLanguage lang={post.activeLang}>
      <div className="esc-page">
        <ReadingProgress />
        <BackToTop />

        <header className="esc-pagehead">
          <Link href="/blog" className="esc-back">
            {chrome.backToWritings}
          </Link>

          <div className="esc-postmeta">
            <span className="esc-cat">{post.category}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readingTime} {chrome.minRead}</span>
          </div>

          <h1 lang={post.activeLang}>{post.title}</h1>

          <div className="esc-posthead-row empty:hidden">
            <LanguageToggle langs={postLangs(post)} />
          </div>

          {post.tags && (
            <div className="esc-chips esc-posthead-row">
              {post.tags.map((tag) => (
                <span key={tag} className="esc-chip">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        {image && (
          <picture>
            <source
              type="image/webp"
              srcSet={imageSrcSet}
              sizes="(max-width: 860px) calc(100vw - 40px), calc(min(100vw, 1180px) - 12vw)"
            />
            <img
              src={image}
              alt={post.imageAlt ?? ""}
              width={1600}
              height={900}
              fetchPriority="high"
              className="esc-postcover"
            />
          </picture>
        )}

        <div className="esc-postbody">
          <div className="main">
            {headings.length > 0 && (
              <div className="esc-toc-mobile">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="esc-tag"
                  aria-expanded={tocOpen}
                >
                  <span>{chrome.contents}</span>
                  <span aria-hidden="true">{tocOpen ? "-" : "+"}</span>
                </button>
                {tocOpen && (
                  <nav className="esc-toc" aria-label={chrome.contents}>
                    {headings.map(({ id, text, level }) => tocLink(id, text, level, () => setTocOpen(false)))}
                  </nav>
                )}
              </div>
            )}

            <div lang={post.activeLang}>
              <BlogContent content={content} lang={post.activeLang} />
            </div>

            {(prevPost || nextPost) && (
              <nav className="esc-postnav" aria-label={chrome.moreWritings}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="esc-postcard">
                    <span className="esc-card-meta">&lt; {chrome.previous}</span>
                    <span className="esc-card-title pixfont">{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="esc-postcard next">
                    <span className="esc-card-meta">{chrome.next} &gt;</span>
                    <span className="esc-card-title pixfont">{nextPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            )}
          </div>

          {(headings.length > 0 || hasTimeline) && (
            <div className="esc-rail">
              {headings.length > 0 && (
                <div className="esc-toc-desktop">
                  <div className="esc-toc-label" aria-hidden="true">{chrome.contents}</div>
                  <nav className="esc-toc" aria-label={chrome.contents}>
                    {headings.map(({ id, text, level }) => tocLink(id, text, level))}
                  </nav>
                </div>
              )}
              {hasTimeline && <CenturyTimeline content={content} />}
            </div>
          )}
        </div>
      </div>
    </PostLanguage>
  );
}

export default function BlogPost() {
  return (
    <BlogPostContent />
  );
}
