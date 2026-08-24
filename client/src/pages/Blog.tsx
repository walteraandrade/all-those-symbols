import { useMemo, useState } from "react";
import { Link } from "wouter";
import { blogPosts, BlogCategory, blogCategories, localizePost } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Sprite, MINI_TRIBAR, POLY_PAL_ACCENT } from "@/components/escher/sprites";

export default function Blog() {
  useDocumentMeta({
    title: "Blog | Walter Andrade",
    description: "Thoughts on logic, code, cinema, and life. Essays and reflections by Walter Andrade.",
    canonical: "/blog",
  });

  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);
  const { lang } = useLanguage();

  const filteredPosts = useMemo(() => {
    const posts = activeCategory
      ? blogPosts.filter((p) => p.category === activeCategory)
      : blogPosts;
    return posts.map((p) => localizePost(p, lang));
  }, [activeCategory, lang]);

  const featuredPost = useMemo(
    () => filteredPosts.find((p) => p.featured),
    [filteredPosts]
  );

  const regularPosts = useMemo(
    () => filteredPosts.filter((p) => !featuredPost || p.slug !== featuredPost.slug),
    [filteredPosts, featuredPost]
  );

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Ascending readings</h1>
        <p className="sub">
          Essays on film, logic, and life. Most were written around 2021 as a
          personal diary while studying cinema; others are scattered texts from
          over the years.
        </p>
      </header>

      <div className="esc-tagrow" role="group" aria-label="Filter by category">
        <button className={`esc-tag ${activeCategory === null ? "on" : ""}`} onClick={() => setActiveCategory(null)}>
          All
        </button>
        {blogCategories.map((cat) => (
          <button
            key={cat}
            className={`esc-tag ${activeCategory === cat ? "on" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="esc-postgrid">
        {featuredPost && activeCategory === null && (
          <Link href={`/blog/${featuredPost.slug}`} className="esc-postcard esc-featured">
            <Sprite map={MINI_TRIBAR} palette={POLY_PAL_ACCENT} scale={2} className="gem" />
            <div>
              <div className="meta">
                <span className="cat">{featuredPost.category}</span>
                <span>{featuredPost.date}</span>
                <span>{featuredPost.readingTime} min</span>
              </div>
              <h3 lang={featuredPost.activeLang}>{featuredPost.title}</h3>
              <p className="excerpt" lang={featuredPost.activeLang}>
                {featuredPost.excerpt}
              </p>
            </div>
          </Link>
        )}

        {regularPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="esc-postcard">
            <div className="meta">
              <span className="cat">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readingTime} min</span>
            </div>
            <h3 lang={post.activeLang}>{post.title}</h3>
            <p className="excerpt" lang={post.activeLang}>
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="esc-sub">Nothing written in this category yet.</p>
      )}
    </div>
  );
}
