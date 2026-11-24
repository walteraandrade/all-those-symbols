import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIDGET_BOX } from "./widgetBox";
import { Btn, Lead, Status } from "./widgetParts";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2;

const PRICE = 12;
const STEPS: Step[] = [0, 1, 2];

const CODE: Record<Step, string> = {
  0: `const [items, setItems] = useState([])

useEffect(() => {
  setItems(items.map(withPrice))
}, [items])`,
  1: `const { items } = useCartStore()
const [cart, setCart] = useState(items)

const add = (item) =>
  setCart([...cart, item])`,
  2: `const [cart, dispatch] =
  useReducer(cartReducer, [])

const add = (item) =>
  dispatch({ type: "add", item })`,
};

const COPY = {
  en: {
    lead: "The same cart, written by AI over the years. Add a few items.",
    steps: ["Bad useEffect", "Second source of truth", "The rewrite"],
    add: "Add item",
    header: "Header",
    cart: "Cart",
    renders: "Renders",
    hint: "Press Add item.",
    status: {
      0: "The effect sets the state it depends on, so it runs again. And again. The total is right; the tab is on fire.",
      1: (h: number, c: number) => `Header says $${h}, cart says $${c}. Which one is true?`,
      2: (t: number) => `One source of truth. Header and cart agree: $${t}.`,
    },
  },
  pt: {
    lead: "O mesmo carrinho, escrito pela IA ao longo dos anos. Adicione alguns itens.",
    steps: ["useEffect ruim", "Segunda fonte da verdade", "A reescrita"],
    add: "Adicionar item",
    header: "Cabeçalho",
    cart: "Carrinho",
    renders: "Renders",
    hint: "Aperte Adicionar item.",
    status: {
      0: "O efeito altera o estado do qual depende, então roda de novo. E de novo. O total está certo; a aba está pegando fogo.",
      1: (h: number, c: number) => `O cabeçalho diz $${h}, o carrinho diz $${c}. Qual dos dois é verdade?`,
      2: (t: number) => `Uma fonte da verdade só. Cabeçalho e carrinho concordam: $${t}.`,
    },
  },
};

const Row = ({ name, value, warn }: { name: string; value: string; warn?: boolean }) => (
  <span className="flex items-baseline justify-between gap-4 border-b-2 border-[var(--dark)] py-2 last:border-b-0">
    <span className="font-mono text-sm text-[var(--mid)]">{name}</span>
    <span
      className={cn(
        "font-['League_Spartan',sans-serif] text-xl font-bold tabular-nums",
        warn ? "text-[var(--danger)]" : "text-[var(--bone)]",
      )}
    >
      {value}
    </span>
  </span>
);

export function AiBugLadder({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [step, setStep] = useState<Step>(0);
  const [count, setCount] = useState(0);
  const [renders, setRenders] = useState(1);

  const looping = step === 0 && count > 0;

  useEffect(() => {
    if (!looping) return;
    const timer = setInterval(() => setRenders((r) => Math.min(r + 37, 99999)), 50);
    return () => clearInterval(timer);
  }, [looping]);

  const pick = (next: Step) => {
    setStep(next);
    setCount(0);
    setRenders(1);
  };

  const cartTotal = count * PRICE;
  const headerTotal = step === 1 ? 0 : cartTotal;

  const status =
    count === 0
      ? copy.hint
      : step === 0
        ? copy.status[0]
        : step === 1
          ? copy.status[1](headerTotal, cartTotal)
          : copy.status[2](cartTotal);

  return (
    <span role="group" aria-label={label} className={WIDGET_BOX}>
      <Lead>{copy.lead}</Lead>

      <span className="flex flex-wrap justify-center gap-2">
        {STEPS.map((s) => (
          <Btn key={s} active={step === s} aria-pressed={step === s} onClick={() => pick(s)}>
            {s + 1}. {copy.steps[s]}
          </Btn>
        ))}
      </span>

      <span className="flex w-full flex-col gap-4 sm:flex-row">
        <pre className="m-0 min-w-0 flex-1 overflow-x-auto border-[3px] border-[var(--dark)] bg-[var(--ink)] p-3 font-mono text-xs leading-relaxed text-[var(--soft)]">
          <code>{CODE[step]}</code>
        </pre>
        <span className="flex flex-col justify-center border-[3px] border-[var(--mid)] bg-[var(--ink)] px-4 py-2 sm:w-48">
          <Row name={copy.header} value={`$${headerTotal}`} warn={step === 1 && count > 0} />
          <Row name={copy.cart} value={`$${cartTotal}`} />
          {step === 0 && (
            <Row name={copy.renders} value={renders >= 99999 ? "99999+" : String(renders)} warn={looping} />
          )}
        </span>
      </span>

      <Status>{status}</Status>

      <Btn cta active onClick={() => setCount((c) => c + 1)}>
        {copy.add}
      </Btn>
    </span>
  );
}
