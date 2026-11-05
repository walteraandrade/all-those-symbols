import { MINI_TRIBAR, POLY_PAL, Sprite, WIRECUBE } from "@/components/escher/sprites";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const COPY = {
  en: {
    title: "Method: the search for certainty",
    geometry: "Geometry",
    philosophy: "Philosophy",
    rows: [
      {
        geometry: { term: "Definitions", text: "A triangle is a figure with three sides." },
        philosophy: { term: "Premises", text: "What we accept before the argument starts." },
      },
      {
        geometry: { term: "Theorems", text: "What must follow from definitions and axioms." },
        philosophy: { term: "Arguments", text: "Reasoning from premises to a conclusion." },
      },
      {
        geometry: { term: "Proofs", text: "Why it cannot be otherwise." },
        philosophy: { term: "Validity", text: "If the premises are true, the conclusion cannot be false." },
      },
    ],
  },
  pt: {
    title: "Método: a busca pela certeza",
    geometry: "Geometria",
    philosophy: "Filosofia",
    rows: [
      {
        geometry: { term: "Definições", text: "Um triângulo é uma figura de três lados." },
        philosophy: { term: "Premissas", text: "O que aceitamos antes de o argumento começar." },
      },
      {
        geometry: { term: "Teoremas", text: "O que decorre necessariamente das definições e dos axiomas." },
        philosophy: { term: "Argumentos", text: "O raciocínio que vai das premissas à conclusão." },
      },
      {
        geometry: { term: "Provas", text: "Por que não pode ser de outro jeito." },
        philosophy: { term: "Validade", text: "Se as premissas são verdadeiras, a conclusão não pode ser falsa." },
      },
    ],
  },
};

const GRID = "grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_1fr]";
const DISPLAY = "font-['League_Spartan',sans-serif] font-bold text-[var(--bone)]";

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    role="columnheader"
    className={cn("flex items-center gap-3 px-4 py-3 text-lg leading-none", DISPLAY, className)}
  >
    {children}
  </span>
);

const Entry = ({
  columnLabel,
  term,
  text,
  className,
}: {
  columnLabel: string;
  term: string;
  text: string;
  className?: string;
}) => (
  <span role="cell" className={cn("col-start-2 block px-4 py-4 sm:col-start-auto", className)}>
    <span className="mb-2 block font-mono text-xs leading-none text-[var(--mid)] sm:hidden">
      {columnLabel}
    </span>
    <span className={cn("block text-xl leading-tight", DISPLAY)}>{term}</span>
    <span className="mt-1 block font-mono text-sm leading-snug text-[var(--mid)]">{text}</span>
  </span>
);

export function CertaintyMethod({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <span
      role="table"
      aria-label={label}
      className="mx-auto my-8 block max-w-[720px] border-[3px] border-[var(--dark)] bg-[var(--ink-2)]"
    >
      <span className={cn("block px-4 py-5 text-center text-xl leading-tight sm:text-2xl", DISPLAY)}>
        {copy.title}
      </span>

      <span role="row" className={cn(GRID, "hidden border-t-[3px] border-[var(--dark)] sm:grid")}>
        <span role="presentation" />
        <Heading>
          <Sprite map={MINI_TRIBAR} palette={POLY_PAL} scale={1} />
          {copy.geometry}
        </Heading>
        <Heading className="border-l-2 border-[var(--dark)]">
          <Sprite map={WIRECUBE} palette={POLY_PAL} scale={3} />
          {copy.philosophy}
        </Heading>
      </span>

      {copy.rows.map(({ geometry, philosophy }, i) => (
        <span key={geometry.term} role="row" className={cn(GRID, "border-t-2 border-[var(--dark)]")}>
          <span
            role="rowheader"
            className={cn(
              "row-span-2 flex items-start justify-center border-r-2 border-[var(--dark)] pt-4 text-2xl leading-none sm:row-span-1",
              DISPLAY,
              "text-[var(--accent)]",
            )}
          >
            {i + 1}
          </span>
          <Entry columnLabel={copy.geometry} {...geometry} />
          <Entry
            columnLabel={copy.philosophy}
            {...philosophy}
            className="border-t-2 border-[var(--dark)] sm:border-t-0 sm:border-l-2"
          />
        </span>
      ))}
    </span>
  );
}
