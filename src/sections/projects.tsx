"use client";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { AnimatedBorder } from "@/components/animated-border";
import { GradientHeading } from "@/components/gradient-heading";

export function Projects() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="projects" className="section">
      <GradientHeading className="text-3xl font-bold mb-12">
        Featured Projects
      </GradientHeading>
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
              <span 
                className="inline-block px-3 py-1 text-xs rounded-full mb-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {project.role}
                </span>
              </span>
              <GradientHeading as="h3" className="text-2xl font-bold mb-2">
                {project.title}
              </GradientHeading>
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
                className="inline-block px-3 py-1 rounded relative group"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label={`Visit ${project.title} (opens in new tab)`}
              >
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Live Site <span aria-hidden="true">→</span>
                </span>
                <span 
                  className="absolute bottom-1 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    background: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
                  }}
                />
              </a>
          </motion.div>
            </AnimatedBorder>
        ))}
      </div>
    </section>
  );
}
