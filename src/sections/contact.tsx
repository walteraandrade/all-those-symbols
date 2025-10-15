"use client";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/gradient-heading";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:walteraandrade@gmail.com",
    label: "walteraandrade@gmail.com",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/walteraandrade/",
    label: "/in/walteraandrade",
  },
  {
    name: "GitHub",
    href: "https://github.com/walteraandrade",
    label: "@walteraandrade",
  },
  {
    name: "Discord",
    href: "#",
    label: "@walteraandrade",
    isDiscord: true,
  },
];

export function Contact() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <section id="contact" className="section">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? {} : { duration: 0.6 }}
      >
        <GradientHeading className="text-3xl font-bold mb-12">
          Get In Touch
        </GradientHeading>
        
        <div className="max-w-2xl">
          <p className="text-lg mb-12 text-subtext">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="space-y-6">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                className="flex items-baseline gap-4 group"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : { duration: 0.4, delay: index * 0.1 }}
              >
                <span className="text-gray-600 w-24 text-sm">
                  {link.name}
                </span>
                {link.isDiscord ? (
                  <span className="text-subtext text-base">
                    {link.label}
                  </span>
                ) : (
                  <a
                    href={link.href}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                    className="text-subtext hover:text-white transition-colors text-base relative"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
