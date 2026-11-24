import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIDGET_BOX } from "./widgetBox";
import { Btn, Lead, Status } from "./widgetParts";
import { cn } from "@/lib/utils";

type Kind = "rule" | "ask" | "reply" | "code" | "logs" | "summary" | "outcome";
type Block = { id: number; kind: Kind; tokens: number };
type Mode = "loose" | "pinned";
type Phase = "filling" | "compacted" | "done";

const CAP = 128;
const STEP = 22;
const RULE = 4;
const SUMMARY = 10;
const SEQ: Kind[] = ["ask", "reply", "code", "logs", "reply", "code"];

const COPY = {
  en: {
    kinds: {
      rule: "IMPORTANT: never touch payments",
      ask: "you",
      reply: "model",
      code: "code",
      logs: "logs",
      summary: "summary",
      outcome: "model",
    },
    skill: "skill.md",
    context: "context window",
    lead: {
      loose: "Your first message: IMPORTANT, never touch the payments module. Now keep the conversation going.",
      pinned: "Same rule, now in a skill file that goes back in with every request.",
    },
    send: "Send another message",
    pin: "Put the rule in a skill file",
    unpin: "Back to the loose rule",
    filling: (left: number) => `Every message takes room. ${left}k left.`,
    compacted: {
      loose: (n: number) => `Full. Compaction squeezed ${n} messages into one summary. The IMPORTANT line didn't make it.`,
      pinned: (n: number) => `Full. Compaction squeezed ${n} messages into one summary. The skill file was never in the pile.`,
    },
    outcome: {
      loose: "Refactored payments/charge.ts",
      pinned: "Refactored checkout, left payments alone",
    },
    done: {
      loose: "It touched the payments module. As far as it can see, nobody said not to.",
      pinned: "Same conversation, same compaction. The rule survived.",
    },
    meter: (total: number, names: string) => `Context window, ${total}k of ${CAP}k used: ${names}.`,
  },
  pt: {
    kinds: {
      rule: "IMPORTANTE: nunca mexa em pagamentos",
      ask: "você",
      reply: "modelo",
      code: "código",
      logs: "logs",
      summary: "resumo",
      outcome: "modelo",
    },
    skill: "skill.md",
    context: "janela de contexto",
    lead: {
      loose: "Sua primeira mensagem: IMPORTANTE, nunca mexa no módulo de pagamentos. Agora siga a conversa.",
      pinned: "A mesma regra, agora num arquivo de skill que volta junto com cada pedido.",
    },
    send: "Mandar outra mensagem",
    pin: "Pôr a regra num arquivo de skill",
    unpin: "Voltar à regra solta",
    filling: (left: number) => `Cada mensagem ocupa espaço. Restam ${left}k.`,
    compacted: {
      loose: (n: number) => `Encheu. A compactação espremeu ${n} mensagens num resumo. A linha IMPORTANTE ficou de fora.`,
      pinned: (n: number) => `Encheu. A compactação espremeu ${n} mensagens num resumo. O arquivo de skill nunca esteve na pilha.`,
    },
    outcome: {
      loose: "Refatorei payments/charge.ts",
      pinned: "Refatorei o checkout, não mexi em pagamentos",
    },
    done: {
      loose: "Mexeu no módulo de pagamentos. Até onde ele enxerga, ninguém disse que não podia.",
      pinned: "Mesma conversa, mesma compactação. A regra sobreviveu.",
    },
    meter: (total: number, names: string) => `Janela de contexto, ${total}k de ${CAP}k usados: ${names}.`,
  },
};

const FILL: Record<Kind, string> = {
  rule: "bg-[var(--accent)]",
  ask: "bg-[var(--soft)]",
  reply: "bg-[var(--mid)]",
  code: "bg-[var(--line)]",
  logs: "bg-[var(--dark)]",
  summary: "bg-[repeating-linear-gradient(135deg,var(--bone)_0_4px,var(--mid)_4px_8px)]",
  outcome: "bg-[var(--bone)]",
};

const total = (blocks: Block[]) => blocks.reduce((sum, b) => sum + b.tokens, 0);

const start = (): Block[] => [{ id: 0, kind: "rule", tokens: RULE }];

export function ContextWindowWidget({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [mode, setMode] = useState<Mode>("loose");
  const [blocks, setBlocks] = useState(start);
  const [phase, setPhase] = useState<Phase>("filling");
  const [sent, setSent] = useState(0);
  const [squeezed, setSqueezed] = useState(0);

  const used = total(blocks);
  const outcomeBad = mode === "loose";

  const send = () => {
    const id = sent + 1;
    setSent(id);
    if (phase === "compacted") {
      setBlocks([...blocks, { id, kind: "outcome", tokens: STEP }]);
      setPhase("done");
      return;
    }
    const next = [...blocks, { id, kind: SEQ[(id - 1) % SEQ.length], tokens: STEP }];
    if (total(next) <= CAP) {
      setBlocks(next);
      return;
    }
    const rule = next[0];
    const last = next[next.length - 1];
    const pile = next.slice(1, -1);
    const summary: Block = { id: -id, kind: "summary", tokens: SUMMARY };
    setSqueezed(mode === "pinned" ? pile.length : pile.length + 1);
    setBlocks(mode === "pinned" ? [rule, summary, last] : [summary, last]);
    setPhase("compacted");
  };

  const restart = (nextMode: Mode) => {
    setMode(nextMode);
    setBlocks(start());
    setPhase("filling");
    setSent(0);
  };

  const status =
    phase === "filling"
      ? copy.filling(CAP - used)
      : phase === "compacted"
        ? copy.compacted[mode](squeezed)
        : copy.done[mode];

  const name = (b: Block) =>
    b.kind === "outcome" ? `${copy.kinds.outcome}: ${copy.outcome[mode]}` : b.kind === "rule" && mode === "pinned" ? `${copy.skill}: ${copy.kinds.rule}` : copy.kinds[b.kind];

  return (
    <span role="group" aria-label={label} className={WIDGET_BOX}>
      <Lead>{copy.lead[mode]}</Lead>

      <span className="flex w-full flex-col gap-2">
        <span className="flex items-baseline justify-between font-mono text-sm text-[var(--mid)]">
          <span>{copy.context}</span>
          <span className={cn(used > CAP * 0.85 && "text-[var(--danger)]")}>
            {used}k / {CAP}k
          </span>
        </span>
        <span
          role="img"
          aria-label={copy.meter(used, blocks.map(name).join(", "))}
          className="flex h-12 w-full gap-[3px] border-[3px] border-[var(--mid)] bg-[var(--ink)] p-[3px]"
        >
          {blocks.map((b) => (
            <motion.span
              key={b.id}
              layout
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ width: `${(b.tokens / CAP) * 100}%`, transformOrigin: "left" }}
              className={cn(
                "block h-full shrink-0",
                b.kind === "outcome" ? (outcomeBad ? "bg-[var(--danger)]" : "bg-[var(--accent)]") : FILL[b.kind],
              )}
            />
          ))}
        </span>
        <span aria-hidden className="flex min-h-[4.5rem] flex-wrap content-start gap-x-3 gap-y-1 font-mono text-xs leading-snug text-[var(--soft)]">
          {blocks.map((b) => (
            <span key={b.id} className="flex items-center gap-1">
              <span
                className={cn(
                  "inline-block h-3 w-3 shrink-0",
                  b.kind === "outcome" ? (outcomeBad ? "bg-[var(--danger)]" : "bg-[var(--accent)]") : FILL[b.kind],
                )}
              />
              <span className={cn(b.kind === "rule" && "text-[var(--accent)]", b.kind === "outcome" && "text-[var(--bone)]")}>{name(b)}</span>
            </span>
          ))}
        </span>
      </span>

      <Status>{status}</Status>

      <span className="flex flex-wrap justify-center gap-3">
        <Btn onClick={send} disabled={phase === "done"} className="disabled:cursor-not-allowed disabled:opacity-50">
          {copy.send}
        </Btn>
        {phase === "done" &&
          (mode === "loose" ? (
            <Btn cta active onClick={() => restart("pinned")}>
              {copy.pin}
            </Btn>
          ) : (
            <Btn cta onClick={() => restart("loose")}>
              {copy.unpin}
            </Btn>
          ))}
      </span>
    </span>
  );
}
