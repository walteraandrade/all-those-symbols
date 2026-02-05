import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Projects() {
  useDocumentMeta({
    title: "Projects | Walter Andrade",
    description: "Full-stack applications, platforms, and systems built by Walter Andrade.",
    canonical: "/projects",
  });

  const isMobile = useIsMobile();
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
              Projects<span className="cursor-blink text-red-500">_</span>
            </h1>
            <p className="font-mono text-sm text-black/60 uppercase tracking-wider">
              &gt; Full-stack applications, platforms, and systems
            </p>
          </header>

          <section aria-label="Filter by technology">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-brutal transition-colors ${
                  activeFilter === null
                    ? "bg-black text-white border-red-500"
                    : "bg-white/50 text-black hover:bg-black hover:text-white"
                }`}
              >
                &gt; All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-brutal transition-colors ${
                    activeFilter === cat
                      ? "bg-black text-white border-red-500"
                      : "bg-white/50 text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Project list">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group border-brutal bg-white/50 hover:bg-black hover:text-white transition-colors"
                >
                  <div className="p-4 border-b-2 border-black group-hover:border-red-500 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-red-500" />
                      <span className="font-mono text-xs text-black/50 group-hover:text-white/50">
                        project_{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
                        className="p-1 hover:text-red-500 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-mono text-lg uppercase tracking-wider font-bold mb-1">
                      {project.title}
                    </h2>
                    <p className="font-mono text-xs text-red-500 group-hover:text-red-400 mb-3">
                      {project.role}
                    </p>
                    <p className="font-mono text-sm text-black/60 group-hover:text-white/60 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] uppercase tracking-wider font-mono bg-black/5 text-black/70 group-hover:bg-white/10 group-hover:text-white/70 cursor-pointer border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveFilter(t);
                          }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
