"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { AnimatedBorder } from "@/components/animated-border";

export function Projects() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="projects" className="section">
      <h2 className="text-3xl font-bold mb-12 text-white">
        Featured Projects
      </h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <AnimatedBorder
          key={project.title}
          >
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
            className="bg-background p-6"
          >
              <span className="inline-block px-3 py-1 text-xs rounded-full mb-3 bg-cyan-500/10 text-primary">
                {project.role}
              </span>
              <h3 className="text-2xl font-bold mb-2 text-white">
                {project.title}
              </h3>
              <p className="mb-4 text-subtext">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs border border-white/10 px-3 py-1 rounded text-subtext"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                aria-label={`Visit ${project.title} (opens in new tab)`}
              >
                Live Site <span aria-hidden="true">→</span>
              </a>
          </motion.div>
            </AnimatedBorder>
        ))}
      </div>
    </section>
  );
}
