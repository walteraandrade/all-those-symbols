import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const READ_LINE = 0.6;
const PROSE = ".blog-prose";
const HIGHLIGHT = "century-name";
const LEAVING_HIGHLIGHT = "century-name-leaving";
const HIGHLIGHT_FADE_MS = 450;

const CENTURIES = [-4, -3, -2, -1, ...Array.from({ length: 21 }, (_, i) => i + 1)];

const STOPS = [
  {
    from: -4,
    to: -4,
    en: {
      phrase: "Aristotle (4th century BC)",
      label: "4th century BC",
      brief: "Philosophy asks what motion is",
    },
    pt: {
      phrase: "Aristóteles (século IV a.C.)",
      label: "Século IV a.C.",
      brief: "A filosofia pergunta o que é o movimento",
    },
  },
  {
    from: 16,
    to: 17,
    en: {
      phrase: "Francis Bacon (16th–17th centuries)",
      label: "16th–17th centuries",
      brief: "Philosophy brings science to life",
    },
    pt: {
      phrase: "Francis Bacon (séculos XVI–XVII)",
      label: "Séculos XVI–XVII",
      brief: "A filosofia dá vida à ciência",
    },
  },
  {
    from: 17,
    to: 18,
    en: {
      phrase: "Leibniz (17th–18th centuries)",
      label: "17th–18th centuries",
      brief: "Philosophy dreams of calculating arguments",
    },
    pt: {
      phrase: "Leibniz (séculos XVII–XVIII)",
      label: "Séculos XVII–XVIII",
      brief: "A filosofia sonha em calcular argumentos",
    },
  },
  {
    from: 19,
    to: 20,
    en: {
      phrase: "Frege (19th–20th centuries)",
      label: "19th–20th centuries",
      brief: "Philosophy splits form from meaning",
    },
    pt: {
      phrase: "Frege (séculos XIX–XX)",
      label: "Séculos XIX–XX",
      brief: "A filosofia separa forma de sentido",
    },
  },
  {
    from: 19,
    to: 19,
    en: {
      phrase: "Boole (19th century)",
      label: "19th century",
      brief: "Logic becomes algebra",
    },
    pt: {
      phrase: "Boole (século XIX)",
      label: "Século XIX",
      brief: "A lógica vira álgebra",
    },
  },
  {
    from: 20,
    to: 21,
    en: {
      phrase: "Claude Shannon",
      label: "20th–21st centuries",
      brief: "Logic becomes circuits",
    },
    pt: {
      phrase: "Claude Shannon",
      label: "Séculos XX–XXI",
      brief: "A lógica vira circuito",
    },
  },
];

const COPY = {
  en: { end: "So, yes, Computer Science", oldest: "4 BC", now: "now" },
  pt: { end: "Então, sim, a Ciência da Computação", oldest: "IV a.C.", now: "hoje" },
};

const fadeColor = (root: Element, property: string, from: string, to: string) =>
  root.animate([{ [property]: from }, { [property]: to }], {
    duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : HIGHLIGHT_FADE_MS,
    easing: "ease-in-out",
    fill: "forwards",
  });

const findPhrase = (root: Element, phrase: string) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const start = node.textContent?.indexOf(phrase) ?? -1;
    if (start >= 0) {
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, start + phrase.length);
      return range;
    }
  }
  return null;
};

export function CenturyTimeline({ content }: { content: string }) {
  const { lang } = useLanguage();
  const [view, setView] = useState({ index: 0, visible: false });
  const ranges = useRef<(Range | null)[]>([]);

  useEffect(() => {
    const root = document.querySelector(PROSE);
    if (!root) return;
    const end = findPhrase(root, COPY[lang].end);
    ranges.current = STOPS.map((stop) => findPhrase(root, stop[lang].phrase));

    if (import.meta.env.DEV) {
      [COPY[lang].end, ...STOPS.map((stop) => stop[lang].phrase)]
        .filter((phrase) => !findPhrase(root, phrase))
        .forEach((phrase) => console.warn(`CenturyTimeline: phrase not found in post: "${phrase}"`));
    }

    if (!end) return;

    const measure = () => {
      const line = window.innerHeight * READ_LINE;
      const passed = ranges.current.reduce(
        (last, range, i) => (range && range.getBoundingClientRect().top <= line ? i : last),
        -1,
      );
      const visible = passed >= 0 && end.getBoundingClientRect().top > line;

      setView((current) =>
        !visible
          ? current.visible ? { ...current, visible: false } : current
          : current.visible && current.index === passed ? current : { index: passed, visible: true },
      );
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [lang, content]);

  useEffect(() => {
    const range = view.visible ? ranges.current[view.index] : null;
    const root = document.querySelector(PROSE);
    if (!range || !root || !("highlights" in CSS)) return;

    CSS.highlights.set(HIGHLIGHT, new Highlight(range));
    fadeColor(root, "--century-name-bg", "transparent", "var(--accent-dark)");

    return () => {
      const leaving = new Highlight(range);
      const currentColor = getComputedStyle(root).getPropertyValue("--century-name-bg");
      CSS.highlights.delete(HIGHLIGHT);
      CSS.highlights.set(LEAVING_HIGHLIGHT, leaving);
      fadeColor(root, "--century-name-leaving-bg", currentColor, "transparent").onfinish = () => {
        if (CSS.highlights.get(LEAVING_HIGHLIGHT) === leaving) CSS.highlights.delete(LEAVING_HIGHLIGHT);
      };
    };
  }, [view, lang, content]);

  const stop = STOPS[view.index];
  const { label, brief } = stop[lang];
  const isLit = (century: number) => century >= stop.from && century <= stop.to;
  const isMajor = (century: number) => century === -4 || century === 1 || century % 5 === 0 || century === 21;

  return (
    <aside
      aria-label={label}
      className={cn(
        "z-40 border-2 border-[var(--accent)] bg-[var(--ink-2)] px-3 py-2.5 font-mono lg:mt-6",
        "pointer-events-none transition-[opacity,visibility] duration-[180ms] ease-[steps(3)]",
        "max-lg:fixed max-lg:bottom-20 max-lg:left-4 max-sm:right-4",
        view.visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <strong className="block font-['League_Spartan',sans-serif] text-base leading-tight font-bold text-[var(--bone)]">
        {label}
      </strong>
      <span aria-hidden="true" className="mt-2 grid h-2.5 grid-cols-[repeat(25,1fr)] items-end gap-px">
        {CENTURIES.map((century) => (
          <span
            key={century}
            className={cn(
              isLit(century)
                ? "h-2.5 bg-[var(--accent)]"
                : isMajor(century)
                  ? "h-[7px] bg-[var(--mid)]"
                  : "h-[5px] bg-[var(--dark)]",
            )}
          />
        ))}
      </span>
      <span aria-hidden="true" className="mt-0.5 flex justify-between text-[0.75rem] text-[var(--mid)]">
        <span>{COPY[lang].oldest}</span>
        <span>{COPY[lang].now}</span>
      </span>
      <p className="mt-1.5 text-xs leading-snug text-[var(--bone)]">{brief}</p>
    </aside>
  );
}
