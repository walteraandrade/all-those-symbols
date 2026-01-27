import { useMemo, useEffect } from "react";
import { useParams, Redirect } from "wouter";
import { blogPosts } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  ReadingProgress,
  BackToTop,
  BlogHero,
  BlogContent,
  TableOfContents,
  PostNavigation,
} from "@/components/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

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

  useDocumentMeta({
    title: post ? `${post.title} | Walter Andrade` : "Blog | Walter Andrade",
    description: post?.excerpt,
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
  });

  if (!post) {
    return <Redirect to="/blog" />;
  }

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <div className="container mx-auto px-4 max-w-5xl">
        <BlogHero post={post} />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <main className="flex-1 min-w-0">
            <TableOfContents content={post.content} />
            <BlogContent content={post.content} />
            <PostNavigation prev={prevPost} next={nextPost} />
          </main>

          <TableOfContents content={post.content} />
        </div>
      </div>
    </>
  );
}
