import { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Sprite, WIRECUBE, POLY_PAL_ACCENT } from "@/components/escher/sprites";

export default function Projects() {
  useDocumentMeta({
    title: "Projects | Walter Andrade",
    description: "Full-stack applications, platforms, and systems built by Walter Andrade.",
    canonical: "/projects",
  });

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    projects.forEach((p) => p.tech.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)));
    return m;
  }, []);

  const categories = useMemo(
    () =>
      Array.from(counts.keys()).sort(
        (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b),
      ),
    [counts],
  );

  const shared = useMemo(
    () => categories.filter((t) => counts.get(t)! > 1),
    [categories, counts],
  );

  const visible = showAll
    ? categories
    : activeFilter && !shared.includes(activeFilter)
      ? [...shared, activeFilter]
      : shared;

  const filtered = activeFilter
    ? projects.filter((p) => p.tech.includes(activeFilter))
    : projects;

  return (
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Constructions</h1>
        <p className="sub">
          Full-stack applications, platforms, and systems. Every one of them
          solid from every side you look at it.
        </p>
      </header>

      <div className="esc-tagrow" role="group" aria-label="Filter by technology">
        <button className={`esc-tag ${activeFilter === null ? "on" : ""}`} onClick={() => setActiveFilter(null)}>
          All
        </button>
        {visible.map((cat) => (
          <button
            key={cat}
            className={`esc-tag ${activeFilter === cat ? "on" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <button
          className="esc-tag more"
          aria-expanded={showAll}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show less" : `+${categories.length - shared.length} more`}
        </button>
      </div>

      <div className="esc-projgrid">
        {filtered.map((p, i) => (
          <article key={p.title} className="esc-projcard">
            <Sprite map={WIRECUBE} palette={POLY_PAL_ACCENT} scale={2} className="gem" />
            <div>
              <h3>{p.title}</h3>
              <p className="role">{p.role}</p>
              <p className="desc">{p.description}</p>
              <div className="chips">
                {p.tech.map((t) => (
                  <span key={t} className="esc-chip">{t}</span>
                ))}
              </div>
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title}`}
              />
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="esc-sub">Nothing built with that yet. The staircase keeps going.</p>
      )}
    </div>
  );
}
