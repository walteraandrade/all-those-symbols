import { HeroSection } from "./components/sections/hero-section.component";
import { AboutSection } from "./components/sections/about-section.component";
import { ProjectsSection } from "./components/sections/projects-section.component";
import { GitHubProjectsSection } from "./components/sections/github-projects.section";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-[32px]">
      <HeroSection />

      <div className="container">
        <AboutSection />
        <ProjectsSection />
        <GitHubProjectsSection />
      </div>
    </main>
  );
}
