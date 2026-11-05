import { type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sprite } from "@/components/escher/sprites";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "data" | "error";
type Trigger = "ask" | "ok" | "fail";

const MACHINE: Record<State, Partial<Record<Trigger, State>>> = {
  idle: { ask: "loading" },
  loading: { ok: "data", fail: "error" },
  data: { ask: "loading" },
  error: { ask: "loading" },
};

const STATES: State[] = ["idle", "loading", "data", "error"];
const FLAGS = ["loading", "data", "error"] as const;
const COMBOS = Array.from({ length: 8 }, (_, n) => n);

const COPY = {
  en: {
    screen: { empty: "No photos yet", loading: "Loading", error: "Something went wrong" },
    states: { idle: "Idle", loading: "Loading", data: "Has data", error: "Error" },
    events: { ask: "Ask for photos", ok: "Reply", fail: "Fail" },
    edges: { ask: "ask", ok: "reply", fail: "fail" },
    switches: {
      lead: "A screen can show loading, data or an error. With three loose switches, try turning on more than one.",
      flags: { loading: "Loading?", data: "Has data?", error: "Error?" },
      ok: "This screen says one thing.",
      many: (names: string, count: number) =>
        `${names}: the screen says ${count === 2 ? "two" : "three"} things at once.`,
      tally: "8 possible screens. 4 say more than one thing.",
      swap: "Swap for a state machine",
    },
    machine: {
      lead: "With a state machine: one state at a time, and it only changes if there's an arrow.",
      you: "You:",
      net: "The internet:",
      hint: "Press anything, even the buttons that seem wrong.",
      moved: (s: string) => `Now: ${s}. That one, and no other.`,
      refused: (s: string, e: string) => `"${e}" has no arrow out of ${s}. Nothing happens.`,
      back: "Back to the switches",
    },
  },
  pt: {
    screen: { empty: "Sem fotos ainda", loading: "Carregando", error: "Algo deu errado" },
    states: { idle: "Parada", loading: "Carregando", data: "Tem dados", error: "Erro" },
    events: { ask: "Pedir fotos", ok: "Responder", fail: "Falhar" },
    edges: { ask: "pedir", ok: "responde", fail: "falha" },
    switches: {
      lead: "Uma tela pode mostrar carregando, dados ou erro. Com três interruptores soltos, experimente ligar mais de um.",
      flags: { loading: "Carregando?", data: "Tem dados?", error: "Deu erro?" },
      ok: "Essa tela diz uma coisa só.",
      many: (names: string, count: number) =>
        `${names}: a tela diz ${count === 2 ? "duas" : "três"} coisas ao mesmo tempo.`,
      tally: "8 telas possíveis. 4 dizem mais de uma coisa.",
      swap: "Trocar por uma máquina de estados",
    },
    machine: {
      lead: "Com uma máquina de estados: um estado por vez, e ele só muda se existir uma seta.",
      you: "Você:",
      net: "A internet:",
      hint: "Aperte qualquer coisa, até os botões que parecem errados.",
      moved: (s: string) => `Agora: ${s}. Só esse, nenhum outro.`,
      refused: (s: string, e: string) => `"${e}" não tem seta saindo de ${s}. Nada acontece.`,
      back: "Voltar aos interruptores",
    },
  },
};

type Copy = (typeof COPY)["en"];

const PALETTE = { w: "--bone", m: "--mid", a: "--accent" };

const PHOTO = [
  "wwwwwwwwww",
  "w........w",
  "w.a....m.w",
  "w.....mm.w",
  "w.m..mmmmw",
  "wmmmmmmmmw",
  "wwwwwwwwww",
];

const NODE_W = 88;
const NODE_H = 34;
const NODES: Record<State, { x: number; y: number }> = {
  idle: { x: 46, y: 100 },
  loading: { x: 178, y: 100 },
  data: { x: 308, y: 40 },
  error: { x: 308, y: 160 },
};

const EDGES: { from: State; event: Trigger; d: string; lx: number; ly: number }[] = [
  { from: "idle", event: "ask", d: "M90 100 L130 100", lx: 112, ly: 92 },
  { from: "loading", event: "ok", d: "M222 88 L258 50", lx: 246, ly: 78 },
  { from: "loading", event: "fail", d: "M222 112 L258 150", lx: 246, ly: 130 },
  { from: "data", event: "ask", d: "M262 30 Q190 12 178 79", lx: 196, ly: 22 },
  { from: "error", event: "ask", d: "M262 170 Q190 188 178 121", lx: 196, ly: 186 },
];

const TONE = { live: "var(--bone)", dim: "var(--dark)", last: "var(--accent)" };

const countOn = (combo: number) => FLAGS.filter((_, i) => combo & (1 << i)).length;

const Lead = ({ children }: { children: ReactNode }) => (
  <span className="block text-center font-['League_Spartan',sans-serif] text-lg font-bold leading-snug text-[var(--bone)] sm:text-xl">
    {children}
  </span>
);

const Note = ({ children }: { children: ReactNode }) => (
  <span aria-live="polite" className="block min-h-[3rem] max-w-md text-center font-mono text-sm leading-snug text-[var(--mid)]">
    {children}
  </span>
);

const Btn = ({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "min-h-11 cursor-pointer border-[3px] px-3 py-2 font-mono text-sm font-bold leading-tight hover:border-[var(--bone)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
      active
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
        : "border-[var(--dark)] bg-[var(--ink)] text-[var(--bone)]",
    )}
  >
    {children}
  </button>
);

const Screen = ({
  loading,
  data,
  error,
  copy,
  className,
}: {
  loading: boolean;
  data: boolean;
  error: boolean;
  copy: Copy["screen"];
  className?: string;
}) => {
  const still = useReducedMotion();
  return (
    <span
      className={cn(
        "flex h-[200px] w-[136px] shrink-0 flex-col items-center justify-center gap-2 border-[3px] border-t-[10px] border-[var(--dark)] bg-[var(--ink)] p-2 text-center font-mono text-xs font-bold leading-tight text-[var(--bone)]",
        className,
      )}
    >
      {!loading && !data && !error && <span className="text-[var(--mid)]">{copy.empty}</span>}
      {loading && (
        <span className="flex flex-col items-center gap-1">
          <span aria-hidden className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-2 w-2 bg-[var(--accent)]"
                animate={still ? undefined : { opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </span>
          {copy.loading}
        </span>
      )}
      {data && (
        <span className="grid grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <Sprite key={i} map={PHOTO} palette={PALETTE} scale={4} />
          ))}
        </span>
      )}
      {error && <span className="border-2 border-[var(--bone)] p-1">{copy.error}</span>}
    </span>
  );
};

const MachineMap = ({ state, last, copy }: { state: State; last: string | null; copy: Copy }) => {
  const still = useReducedMotion();
  return (
    <svg viewBox="0 0 360 200" className="block h-auto w-full min-w-0 flex-1" role="img" aria-label={copy.states[state]}>
      <defs>
        {Object.entries(TONE).map(([tone, color]) => (
          <marker key={tone} id={`sm-arrow-${tone}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 z" fill={color} />
          </marker>
        ))}
      </defs>
      {EDGES.map(({ from, event, d, lx, ly }) => {
        const tone = last === `${from}:${event}` ? "last" : from === state ? "live" : "dim";
        return (
          <g key={`${from}:${event}`}>
            <path d={d} fill="none" stroke={TONE[tone]} strokeWidth="2" markerEnd={`url(#sm-arrow-${tone})`} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="JetBrains Mono, monospace"
              fill={tone === "dim" ? "var(--mid)" : TONE[tone]}
            >
              {copy.edges[event]}
            </text>
          </g>
        );
      })}
      {STATES.map((s) => (
        <rect
          key={s}
          x={NODES[s].x - NODE_W / 2}
          y={NODES[s].y - NODE_H / 2}
          width={NODE_W}
          height={NODE_H}
          fill="var(--ink)"
          stroke="var(--dark)"
          strokeWidth="3"
        />
      ))}
      <motion.rect
        width={NODE_W}
        height={NODE_H}
        fill="var(--accent)"
        initial={false}
        animate={{ x: NODES[state].x - NODE_W / 2, y: NODES[state].y - NODE_H / 2 }}
        transition={{ duration: still ? 0 : 0.35, ease: "easeInOut" }}
      />
      {STATES.map((s) => (
        <text
          key={s}
          x={NODES[s].x}
          y={NODES[s].y + 4}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
          fill={s === state ? "var(--ink)" : "var(--bone)"}
          style={{ transition: still ? undefined : "fill 0.35s" }}
        >
          {copy.states[s]}
        </text>
      ))}
    </svg>
  );
};

const Switches = ({ copy, onSwap }: { copy: Copy; onSwap: () => void }) => {
  const [combo, setCombo] = useState(0);
  const [seen, setSeen] = useState([0]);
  const on = (i: number) => Boolean(combo & (1 << i));
  const count = countOn(combo);
  const names = FLAGS.filter((_, i) => on(i)).map((f) => copy.states[f]).join(" + ");

  const toggle = (i: number) => {
    const next = combo ^ (1 << i);
    setCombo(next);
    setSeen((s) => (s.includes(next) ? s : [...s, next]));
  };

  return (
    <>
      <Lead>{copy.switches.lead}</Lead>
      <span className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row">
        <Screen loading={on(0)} data={on(1)} error={on(2)} copy={copy.screen} />
        <span className="flex w-full max-w-[220px] flex-col gap-2">
          {FLAGS.map((flag, i) => (
            <button
              key={flag}
              type="button"
              role="switch"
              aria-checked={on(i)}
              onClick={() => toggle(i)}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-3 border-[3px] border-[var(--dark)] bg-[var(--ink)] px-3 py-2 font-mono text-sm font-bold text-[var(--bone)] hover:border-[var(--bone)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {copy.switches.flags[flag]}
              <span aria-hidden className={cn("flex h-4 w-8 border-2 border-[var(--mid)] p-[1px]", on(i) && "justify-end border-[var(--accent)]")}>
                <span className={cn("block h-full w-3", on(i) ? "bg-[var(--accent)]" : "bg-[var(--mid)]")} />
              </span>
            </button>
          ))}
        </span>
      </span>
      <Note>{count > 1 ? copy.switches.many(names, count) : copy.switches.ok}</Note>
      <span className="flex flex-col items-center gap-2">
        <span aria-hidden className="grid grid-cols-8 gap-[3px]">
          {COMBOS.map((n) => (
            <span
              key={n}
              className={cn(
                "flex h-6 w-6 items-center justify-center font-mono text-xs font-bold",
                !seen.includes(n)
                  ? "bg-[var(--ink)] text-[var(--dark)]"
                  : countOn(n) > 1
                    ? "bg-[var(--bone)] text-[var(--ink)]"
                    : "bg-[var(--accent)] text-[var(--ink)]",
                n === combo && "outline-2 outline-offset-1 outline-[var(--bone)]",
              )}
            >
              {!seen.includes(n) ? "?" : countOn(n) > 1 ? "x" : "ok"}
            </span>
          ))}
        </span>
        <span className="text-center font-mono text-xs text-[var(--mid)]">{copy.switches.tally}</span>
      </span>
      <Btn active={seen.some((n) => countOn(n) > 1)} onClick={onSwap}>
        {copy.switches.swap}
      </Btn>
    </>
  );
};

const Machine = ({ copy, onBack }: { copy: Copy; onBack: () => void }) => {
  const still = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const [last, setLast] = useState<string | null>(null);
  const [note, setNote] = useState(copy.machine.hint);
  const [bump, setBump] = useState(0);

  const fire = (event: Trigger) => {
    const next = MACHINE[state][event];
    if (!next) {
      setBump((n) => n + 1);
      setLast(null);
      setNote(copy.machine.refused(copy.states[state], copy.events[event]));
      return;
    }
    setLast(`${state}:${event}`);
    setState(next);
    setNote(copy.machine.moved(copy.states[next]));
  };

  return (
    <>
      <Lead>{copy.machine.lead}</Lead>
      <span className="flex w-full flex-col items-center gap-3 sm:flex-row">
        <motion.span
          key={bump}
          className="inline-flex"
          animate={bump && !still ? { x: [0, -7, 7, -5, 5, 0] } : undefined}
          transition={{ duration: 0.3 }}
        >
          <Screen
            loading={state === "loading"}
            data={state === "data"}
            error={state === "error"}
            copy={copy.screen}
            className="h-[120px] sm:h-[200px]"
          />
        </motion.span>
        <MachineMap state={state} last={last} copy={copy} />
      </span>
      <span className="flex flex-wrap items-center justify-center gap-2">
        <span className="font-mono text-xs text-[var(--mid)]">{copy.machine.you}</span>
        <Btn onClick={() => fire("ask")}>{copy.events.ask}</Btn>
        <span className="ml-2 font-mono text-xs text-[var(--mid)]">{copy.machine.net}</span>
        <Btn onClick={() => fire("ok")}>{copy.events.ok}</Btn>
        <Btn onClick={() => fire("fail")}>{copy.events.fail}</Btn>
      </span>
      <Note>{note}</Note>
      <Btn onClick={onBack}>{copy.machine.back}</Btn>
    </>
  );
};

export function StateMachineWidget({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [machine, setMachine] = useState(false);

  return (
    <span
      role="group"
      aria-label={label}
      className="mx-auto my-8 flex max-w-[560px] flex-col items-center gap-5 border-[3px] border-[var(--dark)] bg-[var(--ink-2)] px-4 py-6"
    >
      {machine ? (
        <Machine key={lang} copy={copy} onBack={() => setMachine(false)} />
      ) : (
        <Switches copy={copy} onSwap={() => setMachine(true)} />
      )}
    </span>
  );
}
