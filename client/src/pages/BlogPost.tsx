import { use, useEffect, useMemo, useRef, useState } from "react";
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
  const shownSlug = useRef(slug);

  useEffect(() => {
    if (shownSlug.current === slug) return;
    shownSlug.current = slug;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

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
      <div data-load-failed className="esc-page" style={{ minHeight: "70dvh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <p className="esc-sub" style={{ maxWidth: 460, marginBottom: 18 }}>
          {CHROME[post.activeLang].loadFailed}
        </p>
        <button
          className="esc-btn"
          onClick={() => {
            if (isBlogSlug(slug)) forgetBlogContent(slug);
            rerender((n) => n + 1);
          }}
        >
          {CHROME[post.activeLang].tryAgain}
        </button>
        <Link className="esc-sub" href="/blog" style={{ marginTop: 18 }}>{CHROME[post.activeLang].backToBlog}</Link>
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
      className={`block text-[19px] transition-colors ${level === 3 ? "pl-4" : ""} ${
        activeId === id
          ? "text-[var(--accent)] border-l-2 border-[var(--accent)] pl-3"
          : "text-[#8b8778] hover:text-[#ece6d4]"
      }`}
    >
      {text}
    </a>
  );

  return (
    <PostLanguage lang={post.activeLang}>
      <div className="esc-page" style={{ maxWidth: 1180 }}>
        <ReadingProgress />
        <BackToTop />

        <header className="esc-pagehead">
          <Link href="/blog" className="esc-steplink" style={{ padding: "4px 0", fontSize: 22 }}>
            {chrome.backToWritings}
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-4 mt-6 text-[19px] text-[#8b8778]">
            <span className="text-[var(--accent)] border-2 border-[#3a382f] px-2">{post.category}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readingTime} {chrome.minRead}</span>
          </div>

          <h1 lang={post.activeLang}>{post.title}</h1>

          <div className="mt-5">
            <LanguageToggle langs={postLangs(post)} />
          </div>

          {post.tags && (
            <div className="flex flex-wrap gap-3 mt-5">
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
              className="w-full mb-12 border-[3px] border-[#3a382f]"
            />
          </picture>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <div className="flex-1 min-w-0">
            {headings.length > 0 && (
              <div className="lg:hidden mb-8">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="esc-tag w-full text-left"
                  aria-expanded={tocOpen}
                >
                  {chrome.contents} {tocOpen ? "-" : "+"}
                </button>
                {tocOpen && (
                  <nav className="px-4 py-3 border-2 border-t-0 border-[#3a382f] space-y-2">
                    {headings.map(({ id, text, level }) => tocLink(id, text, level, () => setTocOpen(false)))}
                  </nav>
                )}
              </div>
            )}

            <div lang={post.activeLang}>
              <BlogContent content={content} lang={post.activeLang} />
            </div>

            {(prevPost || nextPost) && (
              <nav className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t-[3px] border-[#3a382f]">
                <h2 className="sr-only">{chrome.moreWritings}</h2>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="esc-postcard flex-1">
                    <div className="meta"><span>{chrome.previous}</span></div>
                    <h3>{prevPost.title}</h3>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="esc-postcard flex-1 text-right items-end">
                    <div className="meta"><span>{chrome.next}</span></div>
                    <h3>{nextPost.title}</h3>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </nav>
            )}
          </div>

          {(headings.length > 0 || hasTimeline) && (
            <div className="max-lg:contents lg:sticky lg:top-24 lg:w-64 lg:shrink-0 lg:self-start">
              {headings.length > 0 && (
                <div className="hidden lg:block">
                  <div className="text-[19px] text-[#8b8778] mb-4">{chrome.contents}</div>
                  <nav className="space-y-2">
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
