"use client";
import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { GradientHeading } from "@/components/gradient-heading";

export function Experience() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="experience" className="section">
      <GradientHeading className="text-3xl font-bold mb-12">
        Experience
      </GradientHeading>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="border-l-2 pl-6"
            style={{
              borderImageSource: 'linear-gradient(180deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
              borderImageSlice: 1,
            }}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
          >
            <GradientHeading as="h3" className="text-xl font-bold">
              {exp.title}
            </GradientHeading>
            <p className="mb-2">
              <span
                className="inline-block px-2 py-0.5 rounded"
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
                  {exp.company}
                </span>
              </span>
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
