"use client";
import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";

export function TechStack() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="tech" className="section">
      <h2 className="text-3xl font-bold mb-12 text-white">
        Tech Stack
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(techStack).map(([category, items], index) => (
          <motion.div
            key={category}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 capitalize text-primary">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
