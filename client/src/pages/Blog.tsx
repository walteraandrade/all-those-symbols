import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
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

        <section className="space-y-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-b border-border pb-8"
            >
              <div className="text-xs font-mono text-primary mb-2">
                {post.date} • {post.category}
              </div>
              <h2 className="text-2xl font-display font-bold mb-4 hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              <Button variant="link" className="pl-0 mt-2 text-primary">
                Read more →
              </Button>
            </motion.article>
          ))}
        </section>
      </motion.div>
    </div>
  );
}
