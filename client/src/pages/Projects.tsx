import { useEffect, useState } from "react";
import { isOwn, projects, type Project } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { slugify } from "@/lib/utils";
import { Sprite, MARK, CUBE, POLY_PAL } from "@/components/escher/sprites";
import { CONSTRUCTIONS } from "@/components/escher/constructions";

const FILTERS = ["TypeScript", "React", "Next.js", "NestJS", "PostgreSQL", "Python", "Go", "Rust", "Azure", "TUI"];

const kind = (p: Project) => (isOwn(p) ? "Built on my own" : "Shipped with a team");

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
  const featured = filtered.filter((p) => p.tier === "featured");
  const team = filtered.filter((p) => !isOwn(p));
  const own = filtered.filter((p) => isOwn(p) && !p.tier);
  const minor = filtered.filter((p) => p.tier === "minor");

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Constructions</h1>
        <p className="sub">
          Products I shipped with teams for clients and employers, and tools I
          built on my own. The ones I would show first come with notes on how
          they are built.
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
        {featured.length > 0 && team.length > 0 && (
          <a className="esc-link" href="#proj-team-h">Jump to team work</a>
        )}
      </div>

      {featured.length > 0 && (
        <section className="esc-block" aria-labelledby="proj-featured-h">
          <h2 id="proj-featured-h" className="esc-h2 esc-grouphead">
            <span>Selected <span className="n">{featured.length}</span></span>
          </h2>
          <p className="esc-sub">Solo work I would show first, each with how it works and what I decided along the way.</p>
          <div className="esc-dossiers">
            {featured.map((p) => (
              <Dossier key={p.title} p={p} picked={picked} />
            ))}
          </div>
        </section>
      )}

      {[
        { key: "team", title: "Shipped with a team", sub: "Client and company work.", items: team },
        { key: "own", title: "Built on my own", sub: "More side projects and tools, most with source you can read.", items: own },
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

      {minor.length > 0 && (
        <section className="esc-block" aria-labelledby="proj-minor-h">
          <h2 id="proj-minor-h" className="esc-h2 esc-grouphead">
            <span>Sketches <span className="n">{minor.length}</span></span>
          </h2>
          <p className="esc-sub">Small or retired tools, kept for the record.</p>
          <ul className="esc-sketches">
            {minor.map((p) => (
              <Sketch key={p.title} p={p} picked={picked} />
            ))}
          </ul>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="esc-sub">Nothing built with that yet. The staircase keeps going.</p>
      )}
    </div>
  );
}

function Chips({ tech }: { tech: string[] }) {
  return (
    <div className="esc-chips">
      {tech.map((t) => (
        <span key={t} className="esc-chip">{t}</span>
      ))}
    </div>
  );
}

function Specs({ specs }: { specs: [string, string][] }) {
  return (
    <dl className="esc-specs">
      {specs.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Dossier({ p, picked }: { p: Project; picked: string }) {
  const id = slugify(p.title);
  const art = CONSTRUCTIONS[p.title];
  return (
    <article id={id} className={`esc-dossier ${picked === id ? "on" : ""}`} aria-labelledby={`${id}-h`}>
      <div className="art">
        {art && <Sprite map={art} palette={POLY_PAL} scale={3} />}
      </div>
      <div className="main">
        <p className="esc-card-kicker kind">
          <Sprite map={isOwn(p) ? CUBE : MARK} palette={POLY_PAL} scale={1} />
          {kind(p)}
        </p>
        <h3 id={`${id}-h`} className="esc-card-title">{p.title}</h3>
        {p.lead && <p className="esc-card-lead">{p.lead}</p>}
        <p className="esc-card-body">{p.description}</p>
        {p.specs && <Specs specs={p.specs} />}
        <Chips tech={p.tech} />
        {(p.link || p.live) && (
          <p className="esc-linkrow">
            {p.live && <a className="esc-link" href={p.live} target="_blank" rel="noopener noreferrer">Live site</a>}
            {p.link && <a className="esc-link" href={p.link} target="_blank" rel="noopener noreferrer">Source on GitHub</a>}
          </p>
        )}
      </div>
      {(p.how || p.notes) && (
        <details className="esc-hood" open={picked === id || undefined}>
          <summary>How it's built</summary>
          <div className="cols">
            {p.how && (
              <div>
                <h4>How it works</h4>
                <ol className="esc-card-body">
                  {p.how.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            )}
            {p.notes && (
              <div>
                <h4>Decisions and findings</h4>
                <ul className="esc-card-body">
                  {p.notes.map((note) => <li key={note}>{note}</li>)}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}
    </article>
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
        {p.specs && <Specs specs={p.specs} />}
        <Chips tech={p.tech} />
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

function Sketch({ p, picked }: { p: Project; picked: string }) {
  const id = slugify(p.title);
  return (
    <li id={id} className={picked === id ? "on" : ""}>
      <h3>
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer">
            {p.title}<span className="sr-only"> (source on GitHub, opens in a new tab)</span>
          </a>
        ) : (
          p.title
        )}
      </h3>
      <p className="esc-card-body">{p.description}</p>
      <Chips tech={p.tech} />
    </li>
  );
}
