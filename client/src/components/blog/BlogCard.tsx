import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock } from "lucide-react";
import { BlogPost } from "@/lib/data";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="h-full p-6 bg-card/50 border border-border rounded-sm hover:border-primary/50 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
              ░ {post.category} ░
            </span>
            <span className="text-muted-foreground text-xs">{post.date}</span>
          </div>

          <h2 className="text-lg font-display font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} min read
            </span>
            {post.tags && (
              <div className="flex gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="font-mono text-primary/70">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
