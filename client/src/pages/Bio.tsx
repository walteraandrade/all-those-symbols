import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { bio, experience, skills, socialLinks } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Bio() {
  useDocumentMeta({
    title: "Bio | Walter Andrade",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems.",
    canonical: "/bio",
  });

  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-[calc(100vh-10rem)] bg-[#F5F5F0]">
      {!isMobile && <BrutalistBackground />}

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header>
            <h1 className="font-mono text-4xl md:text-5xl tracking-tight uppercase mb-4 text-black glitch-hover">
              Bio<span className="text-red-500">/</span>Philosophy
              <span className="cursor-blink text-red-500">_</span>
            </h1>
            <p className="text-base leading-loose text-black/70 font-mono">
              {bio}
            </p>
          </header>

          <section>
            <h2 className="font-mono text-xl uppercase tracking-wider mb-6 flex items-center gap-3 text-black">
              <Terminal className="w-5 h-5 text-red-500" aria-hidden="true" />
              <span className="text-black/50">&gt;</span> Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-brutal bg-white/50 p-4 hover:bg-black hover:text-white group transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-mono text-sm uppercase tracking-wider font-bold">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-red-500 group-hover:text-red-400 mt-1">
                        {exp.company} <span className="text-black/30 group-hover:text-white/30">|</span> {exp.period}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-mono text-xs text-black/60 group-hover:text-white/60 mt-2">
                    {exp.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-mono text-xl uppercase tracking-wider mb-4 text-black">
              <span className="text-black/50">&gt;</span> Tech_Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {[...skills.languages, ...skills.frontend, ...skills.backend, ...skills.cloud].map(
                (skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <Badge
                      variant="outline"
                      className="border-brutal bg-white/50 text-black font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white hover:border-red-500 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                )
              )}
            </div>
          </section>

          <section className="pt-6 border-t-2 border-black">
            <h2 className="font-mono text-sm uppercase tracking-wider mb-4 text-black/50">
              &gt; Connect
            </h2>
            <div className="flex gap-3">
              <a
                href={`mailto:${socialLinks.email}`}
                aria-label="Email Walter"
                className="p-3 border-brutal bg-white/50 hover:bg-black hover:text-white hover:border-red-500 transition-colors"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={`https://linkedin.com${socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Walter's LinkedIn profile"
                className="p-3 border-brutal bg-white/50 hover:bg-black hover:text-white hover:border-red-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={`https://github.com/${socialLinks.github.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Walter's GitHub profile"
                className="p-3 border-brutal bg-white/50 hover:bg-black hover:text-white hover:border-red-500 transition-colors"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
