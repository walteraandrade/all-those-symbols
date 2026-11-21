import { useEffect, useState } from "react";
import { isOwn, projects, type Project } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { slugify } from "@/lib/utils";
import { Sprite, MARK, CUBE, POLY_PAL } from "@/components/escher/sprites";

const FILTERS = ["TypeScript", "React", "Next.js", "NestJS", "PostgreSQL", "Python", "Go", "Rust", "Azure", "TUI"];

export default function Projects() {
  useDocumentMeta({
    title: "Projects | Walter Andrade",
    description: "Full-stack applications, platforms, and systems built by Walter Andrade.",
    canonical: "/projects",
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [picked, setPicked] = useState("");

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    setPicked(id);
    document.getElementById(id)?.scrollIntoView({ block: "center" });
  }, []);

  const filtered = activeFilter
    ? projects.filter((p) => p.tech.includes(activeFilter))
    : projects;

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Constructions</h1>
        <p className="sub">
          Products I shipped with teams for clients and employers, and tools I
          built on my own. Most of the solo tools are open source on GitHub.
        </p>
      </header>

      <div className="esc-tagrow scroll" role="group" aria-label="Filter by technology">
        <button className={`esc-tag ${activeFilter === null ? "on" : ""}`} aria-pressed={activeFilter === null} onClick={() => setActiveFilter(null)}>
          All
        </button>
        {FILTERS.map((cat) => (
          <button
            key={cat}
            className={`esc-tag ${activeFilter === cat ? "on" : ""}`}
            aria-pressed={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="esc-countrow">
        <p className="esc-count" role="status">
          {activeFilter
            ? `${filtered.length} of ${projects.length} constructions use ${activeFilter}`
            : `${projects.length} constructions`}
        </p>
        {filtered.some(isOwn) && filtered.some((p) => !isOwn(p)) && (
          <a className="esc-link" href="#proj-own-h">Jump to solo tools</a>
        )}
      </div>

      {[
        { key: "team", title: "Shipped with a team", sub: "Client and company work.", items: filtered.filter((p) => !isOwn(p)) },
        { key: "own", title: "Built on my own", sub: "Side projects and tools, most with source you can read.", items: filtered.filter(isOwn) },
      ]
        .filter((group) => group.items.length > 0)
        .map((group) => (
          <section key={group.key} className="esc-block" aria-labelledby={`proj-${group.key}-h`}>
            <h2 id={`proj-${group.key}-h`} className="esc-h2 esc-grouphead">
              <Sprite map={group.key === "own" ? CUBE : MARK} palette={POLY_PAL} scale={2} />
              <span>
                {group.title} <span className="n">{group.items.length}</span>
              </span>
            </h2>
            <p className="esc-sub">{group.sub}</p>
            <div className={`esc-projgrid ${group.key}`}>
              {group.items.map((p) => (
                <ProjectCard key={p.title} p={p} picked={picked} />
              ))}
            </div>
          </section>
        ))}

      {filtered.length === 0 && (
        <p className="esc-sub">Nothing built with that yet. The staircase keeps going.</p>
      )}
    </div>
  );
}

function ProjectCard({ p, picked }: { p: Project; picked: string }) {
  const id = slugify(p.title);
  return (
    <article id={id} className={`esc-projcard ${p.link ? "linked" : ""} ${picked === id ? "on" : ""}`}>
      <div>
        <div className="head">
          <div>
            <h3 className="esc-card-title">{p.title}</h3>
            <p className="esc-card-kicker">{p.role}</p>
          </div>
          <Sprite map={isOwn(p) ? CUBE : MARK} palette={POLY_PAL} scale={1} className="kind" />
        </div>
        {p.lead && <p className="esc-card-lead">{p.lead}</p>}
        <p className="esc-card-body">{p.description}</p>
        <div className="esc-chips">
          {p.tech.map((t) => (
            <span key={t} className="esc-chip">{t}</span>
          ))}
        </div>
        {p.link && <span className="src" aria-hidden="true">Source on GitHub &#8599;</span>}
      </div>
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.title}: source on GitHub (opens in a new tab)`}
        />
      )}
    </article>
  );
}
