import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { BlogPost } from "@/lib/data";

interface BlogHeroProps {
  post: BlogPost;
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <Link href="/blog">
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Back to Writings
        </span>
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-primary uppercase tracking-wider px-2 py-1 border border-primary/30 rounded-sm">
          ░ {post.category} ░
        </span>
        <span className="text-muted-foreground text-sm">{post.date}</span>
        <span className="flex items-center gap-1 text-muted-foreground text-sm">
          <Clock className="w-4 h-4" />
          {post.readingTime} min read
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      {post.tags && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.header>
  );
}
