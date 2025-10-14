import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { TechStack } from "@/sections/tech-stack";
import { Contact } from "@/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
    </>
  );
}
