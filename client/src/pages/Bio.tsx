import { bio, cvUrl, experience, skills, socialLinks } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { NeckerScene } from "@/components/escher/sprites";

export default function Bio() {
  useDocumentMeta({
    title: "Bio | Walter Andrade",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems.",
    canonical: "/bio",
  });

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Two readings</h1>
        <p className="sub">
          Philosophy first, code second. Like the cube, the same career reads
          two ways: a leap from one field to another, or one line that never
          broke.
        </p>
      </header>

      <section className="esc-fall esc-block" aria-label="About">
        <div className="art"><NeckerScene flip /></div>
        <div>
          {bio.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="dim">
            Bahia, Brazil. Degree in philosophy with a focus on logic.
            One figure, two readings, like the cube.
          </p>
          <a className="esc-btn" href={cvUrl} download>DOWNLOAD CV</a>
        </div>
      </section>

      <section className="esc-block" aria-labelledby="bio-xp-h">
        <h2 id="bio-xp-h" className="esc-h2">Where the work happened</h2>
        <p className="esc-sub">Experience, most recent first.</p>
        <div className="esc-xp">
          {experience.map((exp) => (
            <article key={`${exp.company}-${exp.period}`}>
              <h3 className="esc-card-title">{exp.role}</h3>
              <p className="esc-card-kicker">{exp.company} · {exp.period}</p>
              <p className="esc-card-body">{exp.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="esc-block" aria-labelledby="bio-skills-h">
        <h2 id="bio-skills-h" className="esc-h2">Tools of the trade</h2>
        <p className="esc-sub">Languages, frameworks, and platforms in active use.</p>
        <dl className="esc-skills">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="contents">
              <dt>{group}</dt>
              <dd className="esc-chips">
                {items.map((skill) => (
                  <span key={skill} className="esc-chip">{skill}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="esc-block" aria-labelledby="bio-connect-h">
        <h2 id="bio-connect-h" className="esc-h2">Connect</h2>
        <p className="esc-sub">Email is the fastest way in. I answer within a few days.</p>
        <div className="esc-linkrow">
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
