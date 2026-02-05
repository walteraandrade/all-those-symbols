import { useMemo, useEffect } from "react";
import { useParams, Redirect, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BackToTop } from "@/components/blog/BackToTop";
import { BlogContent } from "@/components/blog/BlogContent";
import { useState } from "react";

const extractHeadings = (markdown: string) => {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[0].indexOf(" ");
    const text = match[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const postIndex = useMemo(
    () => blogPosts.findIndex((p) => p.slug === slug),
    [slug]
  );

  const post = postIndex >= 0 ? blogPosts[postIndex] : null;
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const headings = post ? extractHeadings(post.content) : [];

  useDocumentMeta({
    title: post ? `${post.title} | Walter Andrade` : "Blog | Walter Andrade",
    description: post?.excerpt,
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
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

  return (
    <div className="relative min-h-[calc(100vh-10rem)] bg-[#F5F5F0]">
      {!isMobile && <BrutalistBackground />}
      <ReadingProgress />
      <BackToTop />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors mb-8 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Writings
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs text-red-500 uppercase tracking-wider px-2 py-1 border-brutal">
              {post.category}
            </span>
            <span className="font-mono text-xs text-black/50">{post.date}</span>
            <span className="flex items-center gap-1 font-mono text-xs text-black/50">
              <Clock className="w-3 h-3" />
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-black mb-6 leading-tight glitch-hover">
            {post.title}<span className="cursor-blink text-red-500">_</span>
          </h1>

          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-black/50 hover:text-red-500 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Mobile TOC */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white/50 border-brutal font-mono text-xs uppercase tracking-wider"
                >
                  <span>&gt; Table of Contents</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                </button>
                {tocOpen && (
                  <nav className="px-4 py-3 bg-white/30 border-brutal border-t-0 space-y-2">
                    {headings.map(({ id, text, level }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                          setTocOpen(false);
                        }}
                        className={`block font-mono text-xs transition-colors ${
                          level === 3 ? "pl-4" : ""
                        } ${
                          activeId === id
                            ? "text-red-500"
                            : "text-black/60 hover:text-black"
                        }`}
                      >
                        {text}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            )}

            <BlogContent content={post.content} />

            {/* Post Navigation */}
            {(prevPost || nextPost) && (
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t-2 border-black"
              >
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex-1">
                    <div className="group p-4 bg-white/50 border-brutal hover:bg-black hover:text-white transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 font-mono text-xs text-black/50 group-hover:text-white/50 mb-2">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Previous
                      </div>
                      <div className="font-mono text-sm uppercase tracking-wider line-clamp-1">
                        {prevPost.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="flex-1">
                    <div className="group p-4 bg-white/50 border-brutal hover:bg-black hover:text-white transition-colors cursor-pointer text-right">
                      <div className="flex items-center justify-end gap-2 font-mono text-xs text-black/50 group-hover:text-white/50 mb-2">
                        Next
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="font-mono text-sm uppercase tracking-wider line-clamp-1">
                        {nextPost.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </motion.nav>
            )}
          </main>

          {/* Desktop TOC sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block sticky top-24 w-64 shrink-0 self-start">
              <div className="font-mono text-xs text-black/50 uppercase tracking-wider mb-4">
                &gt; Contents
              </div>
              <nav className="space-y-2">
                {headings.map(({ id, text, level }) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block font-mono text-xs transition-colors ${
                      level === 3 ? "pl-4" : ""
                    } ${
                      activeId === id
                        ? "text-red-500 border-l-2 border-red-500 pl-3 -ml-[2px]"
                        : "text-black/60 hover:text-black"
                    }`}
                    whileHover={{ x: 2 }}
                  >
                    {text}
                  </motion.a>
                ))}
              </nav>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
