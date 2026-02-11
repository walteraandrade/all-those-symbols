import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Star, BookOpen } from "lucide-react";
import { blogPosts, BlogCategory, blogCategories } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Blog() {
  useDocumentMeta({
    title: "Blog | Walter Andrade",
    description: "Thoughts on logic, code, cinema, and life. Essays and reflections by Walter Andrade.",
    canonical: "/blog",
  });

  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = useMemo(
    () => filteredPosts.find((p) => p.featured),
    [filteredPosts]
  );

  const regularPosts = useMemo(
    () => filteredPosts.filter((p) => !p.featured || !featuredPost || p.slug !== featuredPost.slug),
    [filteredPosts, featuredPost]
  );

  return (
    <div className="relative min-h-[calc(100vh-10rem)] bg-[#F5F5F0]">
      {!isMobile && <BrutalistBackground />}

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header>
            <h1 className="font-mono text-4xl md:text-5xl tracking-tight uppercase mb-4 text-black glitch-hover">
              Writings<span className="cursor-blink text-red-500">_</span>
            </h1>
            <p className="font-mono text-sm text-black/60 uppercase tracking-wider">
              &gt; Thoughts on logic, code, and life
            </p>
            <p className="font-mono text-xs text-black/40 mt-3 max-w-xl leading-relaxed">
              Most of these were written around 2021 as a personal diary while studying cinema on my own. Others are scattered texts I've written here and there over the years.
            </p>
          </header>

          <section aria-label="Filter by category">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-brutal transition-colors ${
                  activeCategory === null
                    ? "bg-black text-white border-red-500"
                    : "bg-white/50 text-black hover:bg-black hover:text-white"
                }`}
              >
                &gt; All
              </button>
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-brutal transition-colors ${
                    activeCategory === cat
                      ? "bg-black text-white border-red-500"
                      : "bg-white/50 text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {featuredPost && activeCategory === null && (
            <section aria-label="Featured post">
              <Link href={`/blog/${featuredPost.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group border-brutal bg-white/50 hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <div className="p-3 border-b-2 border-black group-hover:border-red-500 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-red-500 fill-red-500" />
                      <span className="font-mono text-xs text-black/50 group-hover:text-white/50 uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                    <span className="font-mono text-xs text-red-500 uppercase">
                      {featuredPost.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-mono text-2xl md:text-3xl uppercase tracking-tight font-bold mb-3 group-hover:text-white">
                      {featuredPost.title}
                    </h2>
                    <p className="font-mono text-sm text-black/60 group-hover:text-white/60 mb-4 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 font-mono text-xs text-black/40 group-hover:text-white/40">
                      <span>{featuredPost.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readingTime} min
                      </span>
                      {featuredPost.tags && (
                        <div className="flex gap-2">
                          {featuredPost.tags.map((tag) => (
                            <span key={tag} className="text-red-500">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </section>
          )}

          <section aria-label="Post list">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regularPosts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group h-full border-brutal bg-white/50 hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="p-3 border-b-2 border-black group-hover:border-red-500 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-red-500" />
                        <span className="font-mono text-xs text-black/50 group-hover:text-white/50">
                          post_{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-red-500 uppercase">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h2 className="font-mono text-base uppercase tracking-wider font-bold mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="font-mono text-xs text-black/60 group-hover:text-white/60 mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 font-mono text-[10px] text-black/40 group-hover:text-white/40">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 font-mono text-black/50 uppercase tracking-wider">
                &gt; No posts in this category yet_
              </div>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  );
}
