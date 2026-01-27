import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { blogPosts, BlogCategory } from "@/lib/data";
import { CategoryTabs, BlogCard, BlogFeaturedCard } from "@/components/blog";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Blog() {
  useDocumentMeta({
    title: "Blog | Walter Andrade",
    description: "Thoughts on logic, code, cinema, and life. Essays and reflections by Walter Andrade.",
    canonical: "/blog",
  });

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
    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <header>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Writings
          </h1>
          <p className="text-muted-foreground">
            Thoughts on logic, code, and life.
          </p>
        </header>

        <section aria-label="Filter by category">
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        </section>

        {featuredPost && activeCategory === null && (
          <section aria-label="Featured post">
            <BlogFeaturedCard post={featuredPost} />
          </section>
        )}

        <section aria-label="Post list">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No posts in this category yet.
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}
