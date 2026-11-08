import { type KeyboardEvent, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIDGET_BOX } from "./widgetBox";

type Mode = "and" | "or" | "if";

const NEXT_MODE: Record<Mode, Mode> = { and: "or", or: "if", if: "and" };

const COPY = {
  en: {
    lead: "Press the switches and the word.",
    a: "it rains",
    b: "the key turns",
    yes: "true",
    no: "false",
    words: { and: "AND", or: "OR", if: "IF" },
    consequent: "THEN",
    opens: "true → opens",
    closes: "false → closes",
    rewire: "Change the connective",
    result: { on: "The sentence is true.", off: "The sentence is false." },
    legend: "closed = true · in a row = and · side by side = or",
    notes: {
      kept: "It rains and the key turns: promise kept.",
      broken: "The only way to break it: it rains and the key doesn't turn.",
      idle: "It doesn't rain, so nothing was promised. Still true.",
    },
  },
  pt: {
    lead: "Aperte os interruptores e a palavra.",
    a: "chove",
    b: "a chave gira",
    yes: "verdadeiro",
    no: "falso",
    words: { and: "E", or: "OU", if: "SE" },
    consequent: "ENTÃO",
    opens: "verdadeiro → abre",
    closes: "falso → fecha",
    rewire: "Trocar o conectivo",
    result: { on: "A frase é verdadeira.", off: "A frase é falsa." },
    legend: "fechado = verdadeiro · em fila = e · lado a lado = ou",
    notes: {
      kept: "Chove e a chave gira: promessa cumprida.",
      broken: "O único jeito de quebrar: chove e a chave não gira.",
      idle: "Não chove, então nada foi prometido. Continua verdadeira.",
    },
  },
};

const SPOTS: Record<Mode, Record<"a" | "b" | "word", { x: number; y: number }>> = {
  and: { a: { x: 92, y: 85 }, b: { x: 244, y: 85 }, word: { x: 168, y: 85 } },
  or: { a: { x: 180, y: 44 }, b: { x: 180, y: 165 }, word: { x: 180, y: 100 } },
  if: { a: { x: 180, y: 44 }, b: { x: 180, y: 165 }, word: { x: 122, y: 11 } },
};

const SPARK = 5;
const SPARK_GAP = 31;

const LAMP = [
  "..#####..",
  ".#ooooo#.",
  "#ooooooo#",
  "#ooooooo#",
  "#ooooooo#",
  ".#ooooo#.",
  "..#ooo#..",
  "..#####..",
  "..#.#.#..",
  "..#####..",
  "...###...",
];

const LAMP_COLORS = {
  on: { "#": "var(--bone)", o: "var(--accent)" },
  off: { "#": "var(--mid)", o: "var(--ink)" },
};

const RAYS = [
  [-23, -14],
  [20, -14],
  [-27, -3],
  [24, -3],
  [-23, 8],
  [20, 8],
];

const onPressKey = (action: () => void) => (e: KeyboardEvent) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault();
  action();
};

const Trace = ({
  d,
  live,
  visible,
  sparks,
}: {
  d: string;
  live: boolean;
  visible: boolean;
  sparks: boolean;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.g initial={false} animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
      <path d={d} fill="none" stroke={live ? "var(--accent)" : "var(--mid)"} strokeWidth="5" />
      {live && sparks && !reduced && (
        <motion.path
          d={d}
          fill="none"
          stroke="var(--bone)"
          strokeWidth="5"
          strokeDasharray={`${SPARK} ${SPARK_GAP}`}
          animate={{ strokeDashoffset: [0, -(SPARK + SPARK_GAP)] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.g>
  );
};

const Battery = ({ live }: { live: boolean }) => {
  const color = live ? "var(--accent)" : "var(--bone)";
  return (
    <g transform="translate(24 120)">
      <rect x={-16} y={-9} width={32} height={18} fill="var(--ink-2)" />
      <rect x={-14} y={-7} width={28} height={5} fill={color} />
      <rect x={-7} y={2} width={14} height={5} fill={color} />
    </g>
  );
};

const Lamp = ({ on }: { on: boolean }) => {
  const colors = LAMP_COLORS[on ? "on" : "off"];
  return (
    <g transform="translate(330 120)">
      <rect x={-14} y={-17} width={28} height={34} fill="var(--ink-2)" />
      {LAMP.flatMap((row, r) =>
        [...row].map((ch, c) =>
          ch === "." ? null : (
            <rect
              key={`${r}:${c}`}
              x={-13.5 + c * 3}
              y={-16.5 + r * 3}
              width={3}
              height={3}
              fill={colors[ch as keyof typeof colors]}
            />
          ),
        ),
      )}
      {on && RAYS.map(([x, y]) => <rect key={`${x}:${y}`} x={x} y={y} width={4} height={4} fill="var(--accent)" />)}
    </g>
  );
};

const Clause = ({
  x,
  y,
  closed,
  truth,
  live,
  text,
  prefix,
  state,
  onToggle,
}: {
  x: number;
  y: number;
  closed: boolean;
  truth: boolean;
  live: boolean;
  text: string;
  prefix?: string;
  state: string;
  onToggle: () => void;
}) => {
  const reduced = useReducedMotion();
  const metal = live ? "var(--accent)" : "var(--bone)";
  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={{ duration: reduced ? 0 : 0.45, ease: "easeInOut" }}
      role="switch"
      aria-checked={truth}
      aria-label={prefix ? `${prefix} ${text}` : text}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={onPressKey(onToggle)}
      className="cursor-pointer outline-none focus-visible:[&>.clause-ring]:stroke-[var(--accent)]"
    >
      <rect className="clause-ring" x={-62} y={-46} width={124} height={76} fill="transparent" strokeWidth="2" />
      <rect x={-27} y={-6} width={54} height={12} fill="var(--ink-2)" />
      <rect x={-29} y={-5} width={10} height={10} fill={metal} />
      <rect x={19} y={-5} width={10} height={10} fill={metal} />
      <motion.line
        x1={-24}
        y1={0}
        initial={false}
        animate={{ x2: closed ? 24 : 16, y2: closed ? 0 : -17 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
        stroke={metal}
        strokeWidth="5"
      />
      <text
        y={-27}
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fontFamily="League Spartan, sans-serif"
        fill={truth ? "var(--bone)" : "var(--mid)"}
      >
        {prefix && (
          <tspan fill="var(--accent)" fontWeight="800">
            {prefix}{" "}
          </tspan>
        )}
        {text}
      </text>
      <text
        y={23}
        textAnchor="middle"
        fontSize="17"
        fontFamily="JetBrains Mono, monospace"
        fill={truth ? "var(--accent)" : "var(--mid)"}
      >
        {state}
      </text>
    </motion.g>
  );
};

const Connective = ({
  x,
  y,
  text,
  label,
  onPress,
}: {
  x: number;
  y: number;
  text: string;
  label: string;
  onPress: () => void;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={{ duration: reduced ? 0 : 0.45, ease: "easeInOut" }}
      role="button"
      aria-label={`${text}. ${label}`}
      tabIndex={0}
      onClick={onPress}
      onKeyDown={onPressKey(onPress)}
      className="cursor-pointer outline-none [&:hover>.plate]:stroke-[var(--bone)] focus-visible:[&>.plate]:stroke-[var(--accent)]"
    >
      <rect x={-30} y={-26} width={60} height={52} fill="transparent" />
      <rect className="plate" x={-23} y={-14} width={46} height={28} fill="var(--ink)" stroke="var(--mid)" strokeWidth="3" />
      <text
        y={6}
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        fontFamily="League Spartan, sans-serif"
        fill="var(--bone)"
      >
        {text}
      </text>
    </motion.g>
  );
};

export function LogicCircuitWidget({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [mode, setMode] = useState<Mode>("and");
  const series = mode === "and";
  const conditional = mode === "if";
  const closedA = conditional ? !a : a;
  const lit = series ? closedA && b : closedA || b;
  const spots = SPOTS[mode];
  const truthWord = (on: boolean) => (on ? copy.yes : copy.no);
  const note = !conditional ? copy.legend : !a ? copy.notes.idle : b ? copy.notes.kept : copy.notes.broken;
  const sentence = (
    conditional ? `${copy.words.if} ${copy.a}, ${copy.consequent} ${copy.b}` : `${copy.a} ${copy.words[mode]} ${copy.b}`
  ).toLowerCase();
  const root = useRef<HTMLSpanElement>(null);
  const sparks = useInView(root);

  return (
    <span
      ref={root}
      role="group"
      aria-label={label}
      className={WIDGET_BOX}
    >
      <span className="block text-center font-['League_Spartan',sans-serif] text-lg font-bold leading-snug text-[var(--bone)] sm:text-xl">
        {copy.lead}
      </span>
      <svg viewBox="0 -8 360 223" className="block h-auto w-full touch-manipulation select-none" role="group" aria-label={copy.lead}>
        <Trace d="M24 112 L24 85 L330 85 L330 103" live={series && lit} visible={series} sparks={sparks} />
        <Trace d="M330 137 L330 185 L24 185 L24 128" live={series && lit} visible={series} sparks={sparks} />
        <Trace d="M24 112 L24 105 L70 105" live={!series && lit} visible={!series} sparks={sparks} />
        <Trace d="M70 105 L70 44 L290 44 L290 105" live={!series && closedA} visible={!series} sparks={sparks} />
        <Trace d="M70 105 L70 165 L290 165 L290 105" live={!series && b} visible={!series} sparks={sparks} />
        <Trace d="M290 105 L330 105" live={!series && lit} visible={!series} sparks={sparks} />
        <Trace d="M330 137 L330 205 L24 205 L24 128" live={!series && lit} visible={!series} sparks={sparks} />
        <Battery live={lit} />
        <Lamp on={lit} />
        <Clause
          {...spots.a}
          closed={closedA}
          truth={a}
          live={lit && closedA}
          text={copy.a}
          state={conditional ? (a ? copy.opens : copy.closes) : truthWord(a)}
          onToggle={() => setA(!a)}
        />
        <Clause
          {...spots.b}
          closed={b}
          truth={b}
          live={lit && b}
          text={copy.b}
          prefix={conditional ? copy.consequent : undefined}
          state={truthWord(b)}
          onToggle={() => setB(!b)}
        />
        <Connective {...spots.word} text={copy.words[mode]} label={copy.rewire} onPress={() => setMode(NEXT_MODE[mode])} />
      </svg>
      <span aria-live="polite" className="flex flex-col items-center gap-3 text-center">
        <span className="sr-only">{sentence}</span>
        <span
          className="block font-['League_Spartan',sans-serif] text-xl font-extrabold leading-tight"
          style={{ color: lit ? "var(--accent)" : "var(--mid)" }}
        >
          {lit ? copy.result.on : copy.result.off}
        </span>
        <span className="block min-h-[2.5em] font-mono text-xs leading-snug text-[var(--mid)]">{note}</span>
      </span>
    </span>
  );
}
