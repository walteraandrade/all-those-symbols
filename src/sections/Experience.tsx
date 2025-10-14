"use client";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export function Experience() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="experience" className="section">
      <h2 className="text-3xl font-bold mb-12 text-white">
        Experience
      </h2>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="border-l-2 border-primary pl-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold text-white">
              {exp.title}
            </h3>
            <p className="mb-2 text-primary">
              {exp.company}
            </p>
            <p className="text-sm mb-3 text-subtext">
              {exp.period}
            </p>
            <p className="text-subtext">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
