import { Link } from "wouter";
import { isOwn, projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog/metadata";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { localizePost } from "@/lib/blog/metadata";
import { useLanguage } from "@/contexts/LanguageContext";
import { slugify } from "@/lib/utils";
import { Sprite, WheelScene, WaterfallScene, MARK, CUBE, POLY_PAL } from "@/components/escher/sprites";
import { CONSTRUCTIONS, STAIRS_MAP } from "@/components/escher/constructions";
import { KindLegend } from "@/components/escher/KindLegend";

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
  const { lang } = useLanguage();
  const readings = blogPosts.slice(0, 4).map((p) => localizePost(p, lang));

  return (
    <div>
      <section className="esc-hero">
        <div className="art"><WaterfallScene /></div>
        <div className="copy">
        <h1>
          Code is a staircase <br />
          that <span className="accent">only goes up</span>, <br />
          seen from the right angle.
        </h1>
        <p className="tagline">
          I'm Walter Andrade, a senior software engineer who ships AI agents
          and full-stack products. Philosophy degree in logic, based in
          Bahia, Brazil.
        </p>
        <div className="esc-actions">
          <Link className="esc-btn" href="/projects">See the work</Link>
          <Link className="esc-btn ghost" href="/blog">Read the essays</Link>
        </div>
        </div>
      </section>

      <section className="esc-section" aria-labelledby="home-fall-h">
        <div className="esc-fall">
        <div className="art"><WheelScene /></div>
        <div>
          <h2 id="home-fall-h">The waterfall</h2>
          <p>
            I did not arrive at code through a computer science degree.
            I arrived through philosophy, and from the outside that path
            looks like water flowing uphill.
          </p>
          <p className="dim">
            From the inside it was always the same stream: formal logic,
            careful arguments, systems that hold together. The water has
            been running the whole time.
          </p>
          <Link className="esc-link" href="/bio">The full story</Link>
        </div>
        </div>
      </section>

      <section className="esc-section" aria-labelledby="home-work-h">
        <h2 id="home-work-h" className="esc-h2">Constructions</h2>
        <p className="esc-sub">Selected work, each drawn as what it does and marked by how it was built.</p>
        <KindLegend />
        <div className="esc-grid">
          {featured.map((p) => (
            <article key={p.title} className="esc-cell">
              <div className="cube">
                <Sprite map={CONSTRUCTIONS[p.title] ?? (isOwn(p) ? CUBE : MARK)} palette={POLY_PAL} scale={3} />
              </div>
              <h3>{p.title}</h3>
              <p className="note">
                <Sprite map={isOwn(p) ? CUBE : MARK} palette={POLY_PAL} scale={1} />
                <span><span className="sr-only">{isOwn(p) ? "Built on my own. " : "Shipped with a team. "}</span>{p.role}</span>
              </p>
              <Link href={`/projects#${slugify(p.title)}`} aria-label={`See ${p.title} in projects`} />
            </article>
          ))}
        </div>
        <p className="esc-more">
          <Link className="esc-link" href="/projects">All constructions</Link>
        </p>
      </section>

      <section className="esc-section" aria-labelledby="home-read-h">
        <h2 id="home-read-h" className="esc-h2">Ascending readings</h2>
        <p className="esc-sub">Essays on film, logic and the work in between.</p>
        <div className="esc-readings">
        <ul className="esc-steps">
          {readings.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="esc-steplink"
                style={{ "--i": readings.length - 1 - i } as React.CSSProperties}
              >
                <span lang={post.activeLang}>{post.title}</span>
                {post.activeLang !== lang && <span className="esc-lang"><span className="sr-only">Language: </span>{post.activeLang.toUpperCase()}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="art"><Sprite map={STAIRS_MAP} palette={POLY_PAL} scale={3} /></div>
        </div>
        <p className="esc-more">
          <Link className="esc-link" href="/blog">All writings</Link>
        </p>
      </section>
    </div>
  );
}
