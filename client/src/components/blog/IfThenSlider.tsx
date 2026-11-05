import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Sprite } from "@/components/escher/sprites";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const COPY = {
  en: {
    if: "IF",
    then: "THEN",
    caption: "Drag: the meaning leaves, the form stays.",
    drag: "Drag:",
    sentences: [
      "if it rains, then the street is wet",
      "if the switch flips, then the light turns on",
      "if the key turns, then the door opens",
    ],
    clauses: [
      { article: ["the", "the"], word: ["meaning", "semantics"], verb: "leaves," },
      { article: ["the", "the"], word: ["form", "syntax"], verb: "stays." },
    ],
    stages: {
      sentences: "Three if-then sentences: about rain, a switch and a key.",
      dissolving: "The meaning is leaving the sentences.",
      merging: "Only the syntax is left: if A then B, three times, merging.",
      merged: "One form remains: if A then B.",
    },
  },
  pt: {
    if: "SE",
    then: "ENTÃO",
    caption: "Arraste: o sentido sai, a forma fica.",
    drag: "Arraste:",
    sentences: [
      "se chove, então a rua fica molhada",
      "se o interruptor muda, então a luz acende",
      "se a chave gira, então a porta abre",
    ],
    clauses: [
      { article: ["o", "a"], word: ["sentido", "semântica"], verb: "sai," },
      { article: ["a", "a"], word: ["forma", "sintaxe"], verb: "fica." },
    ],
    stages: {
      sentences: "Três frases \"se, então\": sobre chuva, interruptor e chave.",
      dissolving: "O sentido está saindo das frases.",
      merging: "Só a sintaxe restou: se A então B, três vezes, se fundindo.",
      merged: "Resta uma só forma: se A então B.",
    },
  },
};

const ACCENT = "var(--accent)";
const PALETTE = { w: "--bone", m: "--mid", a: "--accent" };

const CLOUD = [
  "..............",
  ".....wwww.....",
  "...wwwwwwww...",
  "..wwwwwwwwwww.",
  ".wwwwwwwwwwww.",
  ".mmmmmmmmmmmm.",
  "..mmmmmmmmmm..",
  "..............",
  "...w...w...w..",
  "..m...m...m...",
  "..............",
  "...w...w...w..",
  "..m...m...m...",
  "..............",
];

const DROP = [
  "......ww......",
  "......ww......",
  ".....wwww.....",
  "....wwwwww....",
  "...wwwwwwww...",
  "..wwwwwwwwmm..",
  "..wwwwwwwwmm..",
  "..wwwwwwwmmm..",
  "...wwwwwmmm...",
  "....mmmmmm....",
  "..............",
  ".mmmmmmmmmmmm.",
  ".m.mm.mm.mm.m.",
  "..............",
];

const SWITCH = [
  "..............",
  "...wwwwwwww...",
  "...w......m...",
  "...w.wwww.m...",
  "...w.wwww.m...",
  "...w.wwww.m...",
  "...w.mmmm.m...",
  "...w......m...",
  "...w......m...",
  "...w......m...",
  "...w......m...",
  "...mmmmmmmm...",
  "..............",
  "..............",
];

const BULB = [
  ".....wwww.....",
  "...wwwwwwww...",
  "..wwwwwwwwww..",
  "..wwwwwwwwmm..",
  "..wwwwwwwwmm..",
  "..wwwwwwwmmm..",
  "...wwwwwmmm...",
  "....wwwmmm....",
  ".....wwmm.....",
  "..............",
  ".....mmmm.....",
  "..............",
  ".....mmmm.....",
  "......mm......",
];

const KEY = [
  "..............",
  "..............",
  "..............",
  "..wwww........",
  ".ww..ww.......",
  ".w....wwwwwww.",
  ".m....mmmmmmm.",
  ".mm..mm...m.m.",
  "..mmmm....m.m.",
  "..............",
  "..............",
  "..............",
  "..............",
  "..............",
];

const DOOR = [
  "..............",
  "...wwwwwwww...",
  "...wmmmmmmw...",
  "...wm....mw...",
  "...wm....mw...",
  "...wmmmmmmw...",
  "...wmmmmwmw...",
  "...wmmmmmmw...",
  "...wm....mw...",
  "...wm....mw...",
  "...wmmmmmmw...",
  "...wmmmmmmw...",
  ".wwwwwwwwwwww.",
  "..............",
];

const LETTER_A = [
  "..............",
  "..............",
  ".....aaaa.....",
  "....aaaaaa....",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "...aaaaaaaa...",
  "...aaaaaaaa...",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "..............",
  "..............",
];

const LETTER_B = [
  "..............",
  "..............",
  "...aaaaaaa....",
  "...aaaaaaaa...",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "...aaaaaaa....",
  "...aaaaaaa....",
  "...aaa..aaa...",
  "...aaa..aaa...",
  "...aaaaaaaa...",
  "...aaaaaaa....",
  "..............",
  "..............",
];

const EXAMPLES = [
  [CLOUD, DROP],
  [SWITCH, BULB],
  [KEY, DOOR],
];

const ROW = 100;
const TRACK_CELLS = 24;

const clamp = (n: number) => Math.min(1, Math.max(0, n));

const threshold = (x: number, y: number, seed: number) =>
  (((x * 73 + y * 151 + seed * 41) ^ (x * y * 17)) % 97) / 97;

const dissolve = (from: string[], to: string[], t: number, seed: number) =>
  from.map((row, y) =>
    [...row].map((ch, x) => (t > threshold(x, y, seed) ? to[y][x] : ch)).join(""),
  );

const morphText = (from: string, to: string, t: number, seed: number) =>
  Array.from({ length: Math.max(from.length, to.length) }, (_, i) =>
    t > threshold(i + 1, i * 2 + seed, seed) ? (to[i] ?? "") : (from[i] ?? ""),
  ).join("");

const stageOf = (t: number) =>
  t === 0 ? "sentences" : t < 0.5 ? "dissolving" : t < 1 ? "merging" : "merged";

const Sentence = ({ copy, t }: { copy: (typeof COPY)["en"]; t: number }) => (
  <span
    aria-hidden
    className="block text-center font-['League_Spartan',sans-serif] text-lg font-bold leading-[1.9] text-[var(--bone)] sm:text-xl"
  >
    <span className="text-[var(--mid)]">{copy.drag}</span>
    {copy.clauses.map(({ article, word, verb }, i) => (
      <Fragment key={word[0]}>
        {" "}
        <span className="inline-block whitespace-nowrap">
          {morphText(article[0], article[1], t, i)}{" "}
          <span
            className="inline-block bg-[var(--ink)] px-1.5 text-center font-mono text-base font-bold leading-[1.6] text-[var(--accent)]"
            style={{ minWidth: `calc(${Math.max(word[0].length, word[1].length)}ch + 0.75rem)` }}
          >
            {morphText(word[0], word[1], t, i + 3)}
          </span>{" "}
          {verb}
        </span>
      </Fragment>
    ))}
  </span>
);

const Chip = ({ map, done }: { map: string[]; done: boolean }) => (
  <span
    className="flex border-2 bg-[var(--ink)] p-1.5 [transition:border-color_.2s_steps(3)]"
    style={{ borderColor: done ? ACCENT : "var(--dark)" }}
  >
    <Sprite map={map} palette={PALETTE} scale={3} />
  </span>
);

const MiniChip = ({ map }: { map: string[] }) => (
  <span className="flex shrink-0 border-2 border-[var(--dark)] bg-[var(--ink)] p-0.5">
    <Sprite map={map} palette={PALETTE} scale={2} />
  </span>
);

const Word = ({ children }: { children: string }) => (
  <span className="font-['League_Spartan',sans-serif] text-lg font-extrabold leading-none tracking-wide text-[var(--bone)] sm:text-2xl">
    {children}
  </span>
);

const Bracket = ({ side, opacity }: { side: "left" | "right"; opacity: number }) => (
  <span
    aria-hidden
    className={cn(
      "absolute -top-2 -bottom-2 w-2 border-y-[3px] border-[var(--bone)]",
      side === "left" ? "-left-3 border-l-[3px]" : "-right-3 border-r-[3px]",
    )}
    style={{ opacity }}
  />
);

export function IfThenSlider({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [t, setT] = useState(0);
  const [touched, setTouched] = useState(false);
  const merge = clamp(t * 2 - 1);
  const filled = Math.round(t * TRACK_CELLS);

  return (
    <span
      role="group"
      aria-label={label}
      className="mx-auto my-8 flex max-w-[560px] flex-col items-center gap-5 border-[3px] border-[var(--dark)] bg-[var(--ink-2)] px-4 py-6"
    >
      <Sentence copy={copy} t={clamp(t * 2)} />

      <span className="relative block w-full" style={{ height: ROW * 3 }}>
        {EXAMPLES.map(([a, b], i) => {
          const morph = clamp((t - i * 0.05) / 0.4);
          const y = i * ROW + (1 - i) * ROW * merge;
          return (
            <span
              key={i}
              className="absolute inset-x-0 top-0 flex items-center justify-center"
              style={{
                height: ROW,
                transform: `translateY(${y}px)`,
                visibility: merge === 1 && i !== 1 ? "hidden" : "visible",
              }}
            >
              <span className="relative flex items-center gap-2 sm:gap-3">
                <Word>{copy.if}</Word>
                <Chip map={dissolve(a, LETTER_A, morph, i)} done={morph === 1} />
                <Word>{copy.then}</Word>
                <Chip map={dissolve(b, LETTER_B, morph, i + 5)} done={morph === 1} />
                {i === 1 && <Bracket side="left" opacity={clamp(merge * 5 - 4)} />}
                {i === 1 && <Bracket side="right" opacity={clamp(merge * 5 - 4)} />}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-pre font-['League_Spartan',sans-serif] text-xs font-bold leading-4 text-[var(--bone)] sm:text-sm"
                >
                  {[...copy.sentences[i]].map((ch, j) => (
                    <span key={j} style={{ visibility: morph > threshold(j + 1, j * 2 + i, i) ? "hidden" : "visible" }}>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          );
        })}
      </span>

      <span className="flex w-full max-w-sm items-center gap-3">
        <MiniChip map={CLOUD} />
        <span className="relative flex h-8 w-full items-center">
          <input
            type="range"
            min={0}
            max={100}
            value={t * 100}
            aria-label={copy.caption}
            aria-valuetext={copy.stages[stageOf(t)]}
            onChange={(e) => {
              setTouched(true);
              setT(Number(e.target.value) / 100);
            }}
            className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          />
          <span className="flex h-2 w-full gap-[2px]">
            {Array.from({ length: TRACK_CELLS }, (_, i) => (
              <span key={i} className="flex-1" style={{ background: i < filled ? ACCENT : "var(--dark)" }} />
            ))}
          </span>
          <motion.span
            aria-hidden
            className="absolute h-7 w-4 border-[3px] border-[var(--dark)] bg-[var(--bone)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]"
            style={{ left: `calc(${t} * (100% - 1rem))` }}
            animate={touched ? { x: 0 } : { x: [0, 10, 0] }}
            transition={touched ? { duration: 0 } : { duration: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />
        </span>
        <MiniChip map={LETTER_A} />
      </span>
    </span>
  );
}
