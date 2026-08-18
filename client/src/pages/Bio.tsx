import { bio, cvUrl, experience, skills, socialLinks } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { TribarScene } from "@/components/escher/sprites";

export default function Bio() {
  useDocumentMeta({
    title: "Bio | Walter Andrade",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems.",
    canonical: "/bio",
  });

  const allSkills = [...skills.languages, ...skills.frontend, ...skills.backend, ...skills.cloud];

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>The waterfall</h1>
        <p className="sub">
          Philosophy first, code second. From the outside it looks like water
          flowing uphill; from the inside it was always the same stream.
        </p>
      </header>

      <section className="esc-fall" style={{ padding: "0 0 64px" }} aria-label="About">
        <TribarScene />
        <div>
          {bio.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="dim">
            Bahia, Brazil. Degree in philosophy with a focus on logic.
            The wheel has been turning the whole time.
          </p>
          <a className="esc-btn" href={cvUrl} download>DOWNLOAD CV</a>
        </div>
      </section>

      <section aria-labelledby="bio-xp-h" style={{ marginBottom: 64 }}>
        <h2 id="bio-xp-h" className="esc-h2">Where the water ran</h2>
        <p className="esc-sub">Experience, most recent first.</p>
        <div className="esc-xp">
          {experience.map((exp) => (
            <article key={`${exp.company}-${exp.period}`}>
              <h3>{exp.role}</h3>
              <p className="where">{exp.company} · {exp.period}</p>
              <p className="what">{exp.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="bio-skills-h" style={{ marginBottom: 64 }}>
        <h2 id="bio-skills-h" className="esc-h2">Tools of the trade</h2>
        <p className="esc-sub">Languages, frameworks, and platforms in active use.</p>
        <div className="esc-tagrow" style={{ marginBottom: 0 }}>
          {allSkills.map((skill) => (
            <span key={skill} className="esc-chip" style={{ fontSize: 20, padding: "2px 10px" }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="bio-connect-h">
        <h2 id="bio-connect-h" className="esc-h2">Connect</h2>
        <p className="esc-sub">The next train leaves whenever you write.</p>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a className="esc-link" href={`mailto:${socialLinks.email}`}>Email</a>
          <a className="esc-link" href={`https://linkedin.com${socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="esc-link" href={`https://github.com/${socialLinks.github.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
