"use client";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/gradient-heading";

export function Contact() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="contact" className="section">
      <motion.div
        className="text-center"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
      >
        <GradientHeading className="text-3xl font-bold mb-6">
          Get In Touch
        </GradientHeading>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-subtext">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a
          href="mailto:walter@example.com"
          className="inline-block px-8 py-3 rounded-full text-black hover:opacity-90 transition-opacity font-semibold"
          style={{
            background: 'linear-gradient(90deg, rgba(58, 129, 180, 1) 0%, rgba(167, 73, 186, 1) 76%, rgba(0, 217, 25, 1) 100%)',
          }}
        >
          Send Me an Email
        </a>
      </motion.div>
    </section>
  );
}
