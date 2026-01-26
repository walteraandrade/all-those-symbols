import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Star } from "lucide-react";
import { BlogPost } from "@/lib/data";

interface BlogFeaturedCardProps {
  post: BlogPost;
}

export function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative p-8 bg-card border-2 border-primary/30 rounded-sm overflow-hidden cursor-pointer hover:border-primary/60 transition-colors">
          {/* CRT scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]" />

          {/* Featured badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-sm">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="font-mono text-[10px] text-accent uppercase">Featured</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-wider">
              ░░ {post.category} ░░
            </span>
            <span className="text-muted-foreground text-sm">{post.date}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-accent transition-colors">
            {post.title}
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
            {post.tags && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-primary/70">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        </div>
      </Link>
    </motion.article>
  );
}
