import { ReactNode, useState } from "react";
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
      <Link href="/" className="brand">WALTER ANDRADE</Link>
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
        <a className="cv" href={cvUrl} download>CV</a>
      </nav>
    </header>
  );
}

function GemNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="esc-gemnav">
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

export function Layout({ children }: LayoutProps) {
  return (
    <div className="esc">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[#14130f]"
      >
        Skip to main content
      </a>

      <TopNav />
      <GemNav />

      <main id="main-content">{children}</main>

      <footer className="esc-footer">
        <p className="quote">Impossible objects, shippable software. {new Date().getFullYear()}.</p>
        <a className="esc-btn" href={`mailto:${socialLinks.email}`}>SAY HELLO</a>
      </footer>
    </div>
  );
}
