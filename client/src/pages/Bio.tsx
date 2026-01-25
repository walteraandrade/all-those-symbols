import { motion } from "framer-motion";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bio, experience, skills, socialLinks } from "@/lib/data";

export default function Bio() {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <header>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Bio <span className="text-primary">/</span> Philosophy
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {bio}
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-accent" aria-hidden="true" />
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <article key={i} className="border-l-2 border-primary/20 pl-4 py-1">
                <h3 className="font-bold text-foreground">{exp.role}</h3>
                <p className="text-sm text-accent mb-2">
                  {exp.company} | {exp.period}
                </p>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-display font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[...skills.languages, ...skills.frontend, ...skills.backend, ...skills.cloud].map(
              (skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </Badge>
              )
            )}
          </div>
        </section>

        <section className="pt-6 border-t border-border">
          <h2 className="sr-only">Contact</h2>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href={`mailto:${socialLinks.email}`} aria-label="Email Walter">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href={`https://linkedin.com${socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Walter's LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href={`https://github.com/${socialLinks.github.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Walter's GitHub profile"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
