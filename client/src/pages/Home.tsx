import { Link } from "wouter";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog/metadata";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Sprite, TribarScene, MINI_TRIBAR, WIRECUBE, POLY_PAL, POLY_PAL_ACCENT } from "@/components/escher/sprites";

const FEATURED_TITLES = [
  "SmartHow Workspace Agent",
  "Document Asset Ingestion",
  "Mr. Argus",
  "Smells Like Job Spirit",
  "Arachne",
  "NaPorta Platform",
];

export default function Home() {
  useDocumentMeta({
    title: "Walter Andrade | Developer & Thinker",
    description: "Software developer with a background in philosophy and logic. Building rigorous, elegant systems. Exploring ideas at the intersection of code and thought.",
    canonical: "/",
  });

  const featured = FEATURED_TITLES
    .map((t) => projects.find((p) => p.title === t))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  const readings = blogPosts.slice(0, 4);

  return (
    <div>
      <section className="esc-hero">
        <Sprite map={MINI_TRIBAR} palette={POLY_PAL} scale={3} className="floatcube" style={{ top: "12%", right: "8%" }} />
        <Sprite map={WIRECUBE} palette={POLY_PAL} scale={4} className="floatcube" style={{ bottom: "16%", right: "30%", animationDelay: "1.2s" }} />
        <h1>
          Code is a staircase<br />
          that <span className="accent">only goes up</span>,<br />
          seen from the right angle.
        </h1>
        <p className="tagline">Walter Andrade. Logic / Philosophy / Code.</p>
      </section>

      <section className="esc-fall" aria-labelledby="home-fall-h">
        <TribarScene />
        <div>
          <h2 id="home-fall-h">The waterfall</h2>
          <p>
            I did not arrive at code through a computer science degree.
            I arrived through philosophy, and from the outside that path
            looks like water flowing uphill.
          </p>
          <p className="dim">
            From the inside it was always the same stream: formal logic,
            careful arguments, systems that hold together. The wheel has
            been turning the whole time.
          </p>
          <Link className="esc-link" href="/bio">The full story</Link>
        </div>
      </section>

      <section className="esc-page" aria-labelledby="home-work-h" style={{ paddingTop: 0 }}>
        <h2 id="home-work-h" className="esc-h2">Constructions</h2>
        <p className="esc-sub">Selected structures, each one solid from every side you look at it.</p>
        <div className="esc-grid">
          {featured.map((p, i) => (
            <article key={p.title} className="esc-cell">
              <div className="cube">
                <Sprite map={i % 2 === 0 ? MINI_TRIBAR : WIRECUBE} palette={POLY_PAL} scale={i % 2 === 0 ? 2 : 5} className="bonecube" />
                <Sprite map={i % 2 === 0 ? MINI_TRIBAR : WIRECUBE} palette={POLY_PAL_ACCENT} scale={i % 2 === 0 ? 2 : 5} className="accentcube" />
              </div>
              <h3>{p.title}</h3>
              <p className="note">{p.role}</p>
              <Link href="/projects" aria-label={`See ${p.title} in projects`} />
            </article>
          ))}
        </div>
        <p style={{ marginTop: 48 }}>
          <Link className="esc-link" href="/projects">All constructions</Link>
        </p>
      </section>

      <section className="esc-page" aria-labelledby="home-read-h" style={{ paddingTop: 0 }}>
        <h2 id="home-read-h" className="esc-h2">Ascending readings</h2>
        <p className="esc-sub">Essays on film and thought. Each step is higher than the last, forever.</p>
        <ul style={{ listStyle: "none", maxWidth: 700 }}>
          {readings.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="esc-steplink"
                style={{ marginLeft: Math.min(i * 48, 144) }}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 28 }}>
          <Link className="esc-link" href="/blog">All writings</Link>
        </p>
      </section>
    </div>
  );
}
