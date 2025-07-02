
const projects = [
  {
    title: "Modulart System",
    description: "Full-stack event sales and management platform.",
    role: "Project Lead, Technical Lead, Architect",
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Payload CMS", "GCP", "Prisma", "Apollo GraphQL", "Docker"],
    liveUrl: "https://modul.art.br",
  },
  {
    title: "NaPorta Website",
    description: "Complex, animated, responsive website for a delivery service.",
    role: "Full-Stack Developer",
    tech: ["Next.js", "Node.js", "Framer Motion", "Refine", "GSAP", "React Qeury", "Stripe CMS", "Typescript", "Tailwind CSS", "Material UI"],
    liveUrl: "https://naporta.digital",
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-20 lg:py-24 border-t border-border">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary mb-[16px] mt-[32px]">
          Visible Commercial Projects
        </h2>
      <div className="flex flex-col gap-12">
        {projects.map((project) => (
          <div key={project.title} className="p-6 border border-border rounded-lg px-[32px] py-[40px]">
            <span className="inline-block px-3 py-1 text-sm bg-border text-secondary rounded-full px-[16px] py-[8px]">
              {project.role}
            </span>
            <h3 className="text-2xl font-bold mb-2 text-primary">{project.title}</h3>
            <p className="text-secondary mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-xs text-secondary border border-border px-[16px] py-[8px] rounded-md">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-auto">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary font-medium hover:text-secondary transition-colors inline-block"
              >
                Live Site →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
