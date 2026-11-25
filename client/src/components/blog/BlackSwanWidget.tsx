import { useState } from "react";
import { Sprite } from "@/components/escher/sprites";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIDGET_BOX } from "./widgetBox";
import { Btn, Lead, Status } from "./widgetParts";
import { cn } from "@/lib/utils";

const SWAN = [
  ".....ww...",
  "....wwwb..",
  "....w.....",
  "....w.....",
  "w...w.....",
  "wwwwww....",
  "wwwwwww...",
  ".wwwww....",
];

const WHITE = { w: "--bone", b: "--mid" };
const BLACK = { w: "--shadow", b: "--danger" };
const SHOWN = 24;

const COPY = {
  en: {
    lead: { europe: "Europe, for centuries. Every swan anyone sees is white.", australia: "1697, Western Australia." },
    theory: "T: all swans are white.",
    europe: {
      rule: "If T, the swans we see are white.",
      seen: (n: number) => `The swans we see are white. (${n})`,
      therefore: "Therefore, T.",
    },
    australia: {
      rule: "If T, the swans we see are white.",
      seen: "This swan is black.",
      therefore: "Therefore, not T.",
    },
    invalid: "invalid",
    valid: "valid",
    observe: "Observe another swan",
    sail: "Sail to Australia",
    back: "Back to Europe",
    hint: "Observe a few swans.",
    count: (n: number) => `${n} white ${n === 1 ? "swan" : "swans"}. The theory gets support, never proof.`,
    refuted: (n: number) => `${n} confirmations proved nothing. One refutation is enough.`,
    lake: (white: number, black: boolean) =>
      `A lake with ${white} white ${white === 1 ? "swan" : "swans"}${black ? " and one black swan" : ""}.`,
  },
  pt: {
    lead: { europe: "Europa, durante séculos. Todo cisne que alguém vê é branco.", australia: "1697, oeste da Austrália." },
    theory: "T: todos os cisnes são brancos.",
    europe: {
      rule: "Se T, os cisnes que vemos são brancos.",
      seen: (n: number) => `Os cisnes que vemos são brancos. (${n})`,
      therefore: "Logo, T.",
    },
    australia: {
      rule: "Se T, os cisnes que vemos são brancos.",
      seen: "Este cisne é negro.",
      therefore: "Logo, não T.",
    },
    invalid: "inválido",
    valid: "válido",
    observe: "Observar outro cisne",
    sail: "Navegar até a Austrália",
    back: "Voltar à Europa",
    hint: "Observe alguns cisnes.",
    count: (n: number) => `${n} ${n === 1 ? "cisne branco" : "cisnes brancos"}. A teoria ganha apoio, nunca prova.`,
    refuted: (n: number) => `${n} confirmações não provaram nada. Uma refutação basta.`,
    lake: (white: number, black: boolean) =>
      `Um lago com ${white} ${white === 1 ? "cisne branco" : "cisnes brancos"}${black ? " e um cisne negro" : ""}.`,
  },
};

const Stamp = ({ ok, children }: { ok: boolean; children: string }) => (
  <span
    className={cn(
      "inline-block -rotate-3 border-[3px] px-2 py-0.5 font-['League_Spartan',sans-serif] text-sm font-bold uppercase tracking-wider",
      ok ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--danger)] text-[var(--danger)]",
    )}
  >
    {children}
  </span>
);

export function BlackSwanWidget({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [whites, setWhites] = useState(0);
  const [black, setBlack] = useState(false);

  const shown = Math.min(whites, SHOWN);
  const lines = black ? copy.australia : copy.europe;

  return (
    <span role="group" aria-label={label} className={WIDGET_BOX}>
      <Lead>{black ? copy.lead.australia : copy.lead.europe}</Lead>

      <span
        role="img"
        aria-label={copy.lake(whites, black)}
        className="flex min-h-[7.5rem] w-full flex-wrap content-start items-end gap-x-2 gap-y-1 border-[3px] border-[var(--dark)] bg-[var(--accent-mid)] p-3"
      >
        {Array.from({ length: shown }, (_, i) => (
          <Sprite key={i} map={SWAN} palette={WHITE} scale={3} />
        ))}
        {whites > SHOWN && (
          <span className="self-center font-mono text-sm font-bold text-[var(--ink)]">+{whites - SHOWN}</span>
        )}
        {black && <Sprite map={SWAN} palette={BLACK} scale={5} className="ml-auto" />}
      </span>

      <span className="flex w-full flex-col gap-1 border-[3px] border-[var(--dark)] bg-[var(--ink)] p-4 font-mono text-sm leading-snug text-[var(--soft)]">
        <span className={cn("text-[var(--bone)]", black && "line-through decoration-[var(--danger)] decoration-2")}>
          {copy.theory}
        </span>
        <span>{lines.rule}</span>
        <span>{black ? copy.australia.seen : copy.europe.seen(whites)}</span>
        <span className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t-2 border-[var(--dark)] pt-2 text-[var(--bone)]">
          {lines.therefore}
          <Stamp ok={black}>{black ? copy.valid : copy.invalid}</Stamp>
        </span>
      </span>

      <Status>{black ? copy.refuted(whites) : whites === 0 ? copy.hint : copy.count(whites)}</Status>

      <span className="flex flex-wrap justify-center gap-3">
        {black ? (
          <Btn
            cta
            onClick={() => {
              setBlack(false);
              setWhites(0);
            }}
          >
            {copy.back}
          </Btn>
        ) : (
          <>
            <Btn onClick={() => setWhites((n) => n + 1)}>{copy.observe}</Btn>
            {whites >= 3 && (
              <Btn cta active onClick={() => setBlack(true)}>
                {copy.sail}
              </Btn>
            )}
          </>
        )}
      </span>
    </span>
  );
}
