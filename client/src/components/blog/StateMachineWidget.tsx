import { type ComponentProps, type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Sprite } from "@/components/escher/sprites";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "data" | "error";
type MachineEvent = "ask" | "ok" | "fail";
type Note = { kind: "hint" } | { kind: "moved" } | { kind: "refused"; event: MachineEvent; times: number };

const STATES: State[] = ["idle", "loading", "data", "error"];
const FLAGS = ["loading", "data", "error"] as const;
const COMBOS = Array.from({ length: 8 }, (_, n) => n);

type Flag = (typeof FLAGS)[number];

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
      refused: (s: string, e: string, times: number) =>
        `"${e}" has no arrow out of ${s}. Nothing happens.${times > 1 ? ` (${times}x)` : ""}`,
      map: (s: string, arrows: string) => `State diagram. Now: ${s}. Arrows out: ${arrows}.`,
      arrow: (e: string, s: string) => `${e}, to ${s}`,
      back: "Back to the switches",
    },
  },
  pt: {
    screen: { empty: "Sem fotos ainda", loading: "Carregando", error: "Algo deu errado" },
    states: { idle: "Parada", loading: "Carregando", data: "Tem dados", error: "Erro" },
    events: { ask: "Pedir fotos", ok: "Responder", fail: "Falhar" },
    edges: { ask: "pede", ok: "responde", fail: "falha" },
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
      refused: (s: string, e: string, times: number) =>
        `"${e}" não tem seta saindo de ${s}. Nada acontece.${times > 1 ? ` (${times}x)` : ""}`,
      map: (s: string, arrows: string) => `Diagrama de estados. Agora: ${s}. Setas de saída: ${arrows}.`,
      arrow: (e: string, s: string) => `${e}, para ${s}`,
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

const NODE_W = 90;
const NODE_H = 36;
const NODES: Record<State, { x: number; y: number }> = {
  idle: { x: 47, y: 115 },
  loading: { x: 178, y: 115 },
  data: { x: 313, y: 30 },
  error: { x: 313, y: 200 },
};

const EDGES: {
  from: State;
  event: MachineEvent;
  to: State;
  d: string;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { from: "idle", event: "ask", to: "loading", d: "M94 115 L131 115", lx: 112, ly: 107, anchor: "middle" },
  { from: "loading", event: "ok", to: "data", d: "M223 103 L266 42", lx: 252, ly: 88, anchor: "start" },
  { from: "loading", event: "fail", to: "error", d: "M223 127 L266 188", lx: 252, ly: 150, anchor: "start" },
  { from: "data", event: "ask", to: "loading", d: "M268 22 Q190 8 178 94", lx: 182, ly: 45, anchor: "end" },
  { from: "error", event: "ask", to: "loading", d: "M268 208 Q190 222 178 136", lx: 182, ly: 195, anchor: "end" },
];

const TONE = { live: "var(--bone)", dim: "var(--mid)", last: "var(--accent)" };

const CELLS = {
  unseen: { label: "?", className: "bg-[var(--ink)] text-[var(--mid)]" },
  conflict: { label: "x", className: "bg-[var(--bone)] text-[var(--ink)]" },
  ok: { label: "ok", className: "bg-[var(--mid)] text-[var(--ink)]" },
};

const flagBit = (flag: Flag) => 1 << FLAGS.indexOf(flag);

const countOn = (combo: number) => FLAGS.filter((flag) => combo & flagBit(flag)).length;

const Lead = ({ children, focusOnMount }: { children: ReactNode; focusOnMount?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (focusOnMount) ref.current?.focus();
  }, [focusOnMount]);

  return (
    <span
      ref={ref}
      tabIndex={focusOnMount ? -1 : undefined}
      className="block scroll-mt-24 text-center font-['League_Spartan',sans-serif] text-lg font-bold leading-snug text-[var(--bone)] outline-none sm:text-xl"
    >
      {children}
    </span>
  );
};

const Status = ({ children }: { children: ReactNode }) => (
  <span aria-live="polite" className="block min-h-[3rem] max-w-md text-center font-mono text-sm leading-snug text-[var(--mid)]">
    {children}
  </span>
);

const Btn = ({
  active,
  cta,
  className,
  ...props
}: ComponentProps<"button"> & { active?: boolean; cta?: boolean }) => (
  <button
    type="button"
    {...props}
    className={cn(
      "min-h-11 cursor-pointer border-[3px] px-3 py-2 font-bold leading-tight hover:border-[var(--bone)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
      cta ? "font-['League_Spartan',sans-serif] text-base" : "font-mono text-sm",
      active
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
        : "border-[var(--dark)] bg-[var(--ink)] text-[var(--bone)]",
      className,
    )}
  />
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
  const reducedMotion = useReducedMotion();
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
                animate={reducedMotion ? undefined : { opacity: [0.2, 1, 0.2] }}
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

const MachineMap = ({
  state,
  last,
  copy,
}: {
  state: State;
  last: (typeof EDGES)[number] | null;
  copy: Copy;
}) => {
  const reducedMotion = useReducedMotion();
  const arrows = EDGES.filter((edge) => edge.from === state)
    .map((edge) => copy.machine.arrow(copy.edges[edge.event], copy.states[edge.to]))
    .join("; ");

  return (
    <svg
      viewBox="0 0 360 230"
      className="block h-auto w-full min-w-0 flex-1"
      role="img"
      aria-label={copy.machine.map(copy.states[state], arrows)}
    >
      <defs>
        {Object.entries(TONE).map(([tone, color]) => (
          <marker key={tone} id={`sm-arrow-${tone}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 z" fill={color} />
          </marker>
        ))}
      </defs>
      {EDGES.map((edge) => {
        const tone = last === edge ? "last" : edge.from === state ? "live" : "dim";
        return (
          <g key={`${edge.from}:${edge.event}`}>
            <path d={edge.d} fill="none" stroke={TONE[tone]} strokeWidth="2" markerEnd={`url(#sm-arrow-${tone})`} />
            <text
              x={edge.lx}
              y={edge.ly}
              textAnchor={edge.anchor}
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              fill={TONE[tone]}
            >
              {copy.edges[edge.event]}
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
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeInOut" }}
      />
      {STATES.map((s) => (
        <text
          key={s}
          x={NODES[s].x}
          y={NODES[s].y + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
          fill={s === state ? "var(--ink)" : "var(--bone)"}
          style={{ transition: reducedMotion ? undefined : "fill 0.35s" }}
        >
          {copy.states[s]}
        </text>
      ))}
    </svg>
  );
};

const Switches = ({
  copy,
  focusLead,
  onSwap,
}: {
  copy: Copy;
  focusLead: boolean;
  onSwap: () => void;
}) => {
  const [combo, setCombo] = useState(0);
  const [seen, setSeen] = useState([0]);
  const on = (flag: Flag) => Boolean(combo & flagBit(flag));
  const count = countOn(combo);
  const names = FLAGS.filter(on).map((flag) => copy.states[flag]).join(" + ");

  const cellKind = (n: number): keyof typeof CELLS =>
    !seen.includes(n) ? "unseen" : countOn(n) > 1 ? "conflict" : "ok";

  const toggle = (flag: Flag) => {
    const next = combo ^ flagBit(flag);
    setCombo(next);
    setSeen((s) => (s.includes(next) ? s : [...s, next]));
  };

  return (
    <>
      <Lead focusOnMount={focusLead}>{copy.switches.lead}</Lead>
      <span className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row">
        <Screen loading={on("loading")} data={on("data")} error={on("error")} copy={copy.screen} />
        <span className="flex w-full max-w-[220px] flex-col gap-2">
          {FLAGS.map((flag) => (
            <Btn
              key={flag}
              role="switch"
              aria-checked={on(flag)}
              onClick={() => toggle(flag)}
              className="flex items-center justify-between gap-3"
            >
              {copy.switches.flags[flag]}
              <span aria-hidden className={cn("flex h-4 w-8 border-2 border-[var(--mid)] p-[1px]", on(flag) && "justify-end border-[var(--accent)]")}>
                <span className={cn("block h-full w-3", on(flag) ? "bg-[var(--accent)]" : "bg-[var(--mid)]")} />
              </span>
            </Btn>
          ))}
        </span>
      </span>
      <Status>{count > 1 ? copy.switches.many(names, count) : copy.switches.ok}</Status>
      <span className="flex flex-col items-center gap-2">
        <span aria-hidden className="grid grid-cols-8 gap-[3px]">
          {COMBOS.map((n) => (
            <span
              key={n}
              className={cn(
                "flex h-6 w-6 items-center justify-center font-mono text-xs font-bold",
                CELLS[cellKind(n)].className,
                n === combo && "outline-2 outline-offset-1 outline-[var(--bone)]",
              )}
            >
              {CELLS[cellKind(n)].label}
            </span>
          ))}
        </span>
        <span className="text-center font-mono text-xs text-[var(--mid)]">{copy.switches.tally}</span>
      </span>
      <Btn cta active={COMBOS.some((n) => cellKind(n) === "conflict")} onClick={onSwap}>
        {copy.switches.swap}
      </Btn>
    </>
  );
};

const Machine = ({ copy, onBack }: { copy: Copy; onBack: () => void }) => {
  const reducedMotion = useReducedMotion();
  const shake = useAnimationControls();
  const [state, setState] = useState<State>("idle");
  const [last, setLast] = useState<(typeof EDGES)[number] | null>(null);
  const [note, setNote] = useState<Note>({ kind: "hint" });

  const fire = (event: MachineEvent) => {
    const edge = EDGES.find((e) => e.from === state && e.event === event);
    if (!edge) {
      if (!reducedMotion) shake.start({ x: [0, -7, 7, -5, 5, 0], transition: { duration: 0.3 } });
      setLast(null);
      setNote((n) => ({
        kind: "refused",
        event,
        times: n.kind === "refused" && n.event === event ? n.times + 1 : 1,
      }));
      return;
    }
    setLast(edge);
    setState(edge.to);
    setNote({ kind: "moved" });
  };

  const noteText =
    note.kind === "hint"
      ? copy.machine.hint
      : note.kind === "moved"
        ? copy.machine.moved(copy.states[state])
        : copy.machine.refused(copy.states[state], copy.edges[note.event], note.times);

  return (
    <>
      <Lead focusOnMount>{copy.machine.lead}</Lead>
      <span className="flex w-full flex-col items-center gap-3 sm:flex-row">
        <motion.span className="inline-flex" animate={shake}>
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
      <Status>{noteText}</Status>
      <Btn onClick={onBack}>{copy.machine.back}</Btn>
    </>
  );
};

export function StateMachineWidget({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [machine, setMachine] = useState(false);
  const [swapped, setSwapped] = useState(false);

  const swap = () => {
    setSwapped(true);
    setMachine((m) => !m);
  };

  return (
    <span
      role="group"
      aria-label={label}
      className="mx-auto my-8 flex max-w-[560px] flex-col items-center gap-5 border-[3px] border-[var(--dark)] bg-[var(--ink-2)] px-4 py-6"
    >
      {machine ? (
        <Machine copy={copy} onBack={swap} />
      ) : (
        <Switches copy={copy} focusLead={swapped} onSwap={swap} />
      )}
    </span>
  );
}
