import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, []);

  const filtered = activeFilter
    ? projects.filter((p) => p.tech.includes(activeFilter))
    : projects;

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <header>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground">
            Full-stack applications, platforms, and systems I've built.
          </p>
        </header>

        <section aria-label="Filter by technology">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </section>

        <section aria-label="Project list">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="font-display text-xl">{project.title}</span>
                      {project.link && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription className="font-mono text-accent text-xs">
                      {project.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] uppercase tracking-wider font-mono cursor-pointer"
                          onClick={() => setActiveFilter(t)}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
