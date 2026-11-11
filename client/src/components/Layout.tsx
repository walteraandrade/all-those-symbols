import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { cvUrl, socialLinks } from "@/lib/data";
import { Sprite, WIRECUBE, POLY_PAL, POLY_PAL_ACCENT } from "@/components/escher/sprites";

interface LayoutProps {
  children: ReactNode;
}

const LINKS = [
  { href: "/bio", label: "Bio" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function TopNav() {
  const [location] = useLocation();
  return (
    <header className="esc-topnav">
      <Link href="/" className="brand" aria-label="Walter Andrade, home">
        <span className="full">WALTER ANDRADE</span>
        <span className="short">WA</span>
      </Link>
      <nav aria-label="Main">
        {LINKS.map((l) => {
          const active = location === l.href || location.startsWith(`${l.href}/`);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={active ? "on" : ""}
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </Link>
          );
        })}
        <a className="cv" href={cvUrl} download aria-label="Download CV (PDF)">CV</a>
      </nav>
    </header>
  );
}

function GemNav() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="esc-gemnav" ref={box}>
      {open && (
        <nav aria-label="Quick">
          {LINKS.map((l, i) => (
            <Link key={l.href} href={l.href} style={{ animationDelay: `${i * 60}ms` }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
      <button aria-expanded={open} aria-label="Quick menu" onClick={() => setOpen(!open)}>
        <Sprite map={WIRECUBE} palette={open ? POLY_PAL_ACCENT : POLY_PAL} scale={3} />
      </button>
    </div>
  );
}

function useRouteReset(main: React.RefObject<HTMLElement | null>) {
  const [location] = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [location, main]);
}

export function Layout({ children }: LayoutProps) {
  const main = useRef<HTMLElement>(null);
  useRouteReset(main);

  return (
    <div className="esc">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--ink)]"
      >
        Skip to main content
      </a>

      <TopNav />
      <GemNav />

      <main id="main-content" ref={main} tabIndex={-1}>{children}</main>

      <footer className="esc-footer">
        <p className="quote">Impossible objects, shippable software. {import.meta.env.VITE_BUILD_YEAR}.</p>
        <nav aria-label="Elsewhere">
          <a href={`mailto:${socialLinks.email}`}>Email</a>
          <a href={`https://github.com/${socialLinks.github.replace("@", "")}`} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`https://linkedin.com${socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}
