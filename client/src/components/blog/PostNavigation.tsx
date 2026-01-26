import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/data";

interface PostNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-border"
    >
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="flex-1">
          <div className="group p-4 bg-card/30 border border-border rounded-sm hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Previous
            </div>
            <div className="font-display text-sm group-hover:text-primary transition-colors line-clamp-1">
              {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="flex-1">
          <div className="group p-4 bg-card/30 border border-border rounded-sm hover:border-primary/50 transition-colors cursor-pointer text-right">
            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-2">
              Next
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-display text-sm group-hover:text-primary transition-colors line-clamp-1">
              {next.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </motion.nav>
  );
}
