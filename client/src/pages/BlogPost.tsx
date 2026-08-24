import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { useParams, Redirect, Link } from "wouter";
import { blogPosts, localizePost, postLangs } from "@/lib/blog/metadata";
import { isBlogSlug, loadBlogContent } from "@/lib/blog/loaders";
import type { PostContent } from "@/lib/blog/types";
import { slugify } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BackToTop } from "@/components/blog/BackToTop";
import { BlogContent } from "@/components/blog/BlogContent";
import { LanguageToggle } from "@/components/blog/LanguageToggle";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const extractHeadings = (markdown: string) => {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
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
  const [loadedContent, setLoadedContent] = useState<{
    slug: string;
    content: PostContent;
  } | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const postIndex = useMemo(
    () => blogPosts.findIndex((p) => p.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (postIndex < 0 || !isBlogSlug(slug)) return;

    let cancelled = false;
    setLoadFailed(false);
    loadBlogContent(slug)
      .then((content) => {
        if (!cancelled) setLoadedContent({ slug, content });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [postIndex, slug, retry]);

  const post = useMemo(
    () => (postIndex >= 0 ? localizePost(blogPosts[postIndex], lang) : null),
    [postIndex, lang]
  );
  const prevPost = postIndex > 0 ? localizePost(blogPosts[postIndex - 1], lang) : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? localizePost(blogPosts[postIndex + 1], lang) : null;
  const content =
    loadedContent?.slug === slug && post
      ? loadedContent.content[post.activeLang] ?? loadedContent.content[post.lang]
      : null;
  const headings = useMemo(
    () => (content ? extractHeadings(content) : []),
    [content]
  );

  useDocumentMeta({
    title: post ? `${post.title} | Walter Andrade` : "Blog | Walter Andrade",
    description: post?.excerpt,
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
    ogImage: post?.image ? `https://all-those-symbols.vercel.app${post.image}` : undefined,
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
    return <Redirect to="/blog" />;
  }

  if (loadFailed) {
    return (
      <div className="esc-page" style={{ minHeight: "70dvh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <p className="esc-sub" style={{ maxWidth: 460, marginBottom: 18 }}>
          This post did not load. The connection dropped, or the page is running an older build.
        </p>
        <button className="esc-btn" onClick={() => setRetry((n) => n + 1)}>TRY AGAIN</button>
        <Link className="esc-sub" href="/blog" style={{ marginTop: 18 }}>Back to the blog</Link>
      </div>
    );
  }

  if (!content) {
    return <LoadingSpinner />;
  }

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
    <div className="esc-page" style={{ maxWidth: 1180 }}>
      <ReadingProgress />
      <BackToTop />

      <header className="mb-12">
        <Link href="/blog" className="esc-steplink" style={{ padding: "4px 0", fontSize: 22 }}>
          Back to writings
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-4 mt-6 text-[19px] text-[#8b8778]">
          <span className="text-[var(--accent)] border-2 border-[#3a382f] px-2">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1
          lang={post.activeLang}
          className="pixfont"
          style={{ fontSize: "clamp(1rem, 2.6vw, 1.6rem)", lineHeight: 1.7 }}
        >
          {post.title}
        </h1>

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

      {post.image && (
        <img
          src={post.image}
          alt={post.imageAlt ?? ""}
          width={1600}
          height={900}
          className="w-full mb-12 border-[3px] border-[#3a382f]"
        />
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
                Contents {tocOpen ? "-" : "+"}
              </button>
              {tocOpen && (
                <nav className="px-4 py-3 border-2 border-t-0 border-[#3a382f] space-y-2">
                  {headings.map(({ id, text, level }) => tocLink(id, text, level, () => setTocOpen(false)))}
                </nav>
              )}
            </div>
          )}

          <div lang={post.activeLang}>
            <BlogContent content={content} />
          </div>

          {(prevPost || nextPost) && (
            <nav className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t-[3px] border-[#3a382f]">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="esc-postcard flex-1">
                  <div className="meta"><span>Previous</span></div>
                  <h3>{prevPost.title}</h3>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="esc-postcard flex-1 text-right items-end">
                  <div className="meta"><span>Next</span></div>
                  <h3>{nextPost.title}</h3>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </nav>
          )}
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block sticky top-24 w-64 shrink-0 self-start">
            <div className="text-[19px] text-[#8b8778] mb-4">Contents</div>
            <nav className="space-y-2">
              {headings.map(({ id, text, level }) => tocLink(id, text, level))}
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}

export default function BlogPost() {
  return (
    <MotionConfig reducedMotion="user">
      <BlogPostContent />
    </MotionConfig>
  );
}
