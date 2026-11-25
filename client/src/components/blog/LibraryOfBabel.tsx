import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WIDGET_BOX } from "./widgetBox";
import { Btn, Lead, Status } from "./widgetParts";
import { cn } from "@/lib/utils";

const ALPHABET = "abcdefghijlmnopqrstuvx ,.";
const COLS = 30;
const ROWS = 10;

const WORDS = [
  "the", "and", "art", "are", "god", "man", "map", "sun", "sea", "end", "one", "ten", "red", "car", "cat",
  "dog", "ice", "air", "lie", "fire", "rain", "star", "moon", "time", "love", "hate", "true", "fear", "bomb",
  "page", "word", "mind", "soul", "hope", "dream", "ghost", "light", "dark", "death", "life", "code", "human",
  "reason", "babel", "atlas", "mais", "amor", "medo", "arte", "vida", "mar", "sol", "rio", "lua", "deus",
  "livro", "nada", "tudo", "ser", "ter", "dor", "fim", "sim", "paz", "sonho", "luz", "noite", "dia", "sal",
  "pai", "mae", "fogo", "terra", "ceu", "ar", "mundo", "caos", "ordem", "verdade",
].filter((w) => w.length >= 3);

const COPY = {
  en: {
    lead: "Every possible page is on a shelf somewhere. Open one.",
    open: "Open a random book",
    empty: "The library is infinite. Pick any shelf.",
    stats: (pages: number, longest: string) =>
      `${pages} ${pages === 1 ? "page" : "pages"} read. Longest word found by chance: ${longest || "none yet"}.`,
    page: (text: string) => `A page of random letters: ${text}`,
  },
  pt: {
    lead: "Toda página possível está numa estante em algum lugar. Abra uma.",
    open: "Abrir um livro qualquer",
    empty: "A biblioteca é infinita. Escolha qualquer estante.",
    stats: (pages: number, longest: string) =>
      `${pages} ${pages === 1 ? "página lida" : "páginas lidas"}. Palavra mais longa achada por acaso: ${longest || "nenhuma ainda"}.`,
    page: (text: string) => `Uma página de letras aleatórias: ${text}`,
  },
};

const randomPage = () =>
  Array.from({ length: ROWS * COLS }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");

const findWords = (text: string) => {
  const marked = Array<boolean>(text.length).fill(false);
  const found: string[] = [];
  for (const word of WORDS) {
    for (let i = text.indexOf(word); i !== -1; i = text.indexOf(word, i + 1)) {
      found.push(word);
      for (let j = i; j < i + word.length; j++) marked[j] = true;
    }
  }
  return { marked, found };
};

const Line = ({ text, marked }: { text: string; marked: boolean[] }) => (
  <span className="block whitespace-pre">
    {[...text].map((ch, i) => (
      <span key={i} className={cn(marked[i] && "bg-[var(--accent)] font-bold text-[var(--ink)]")}>
        {ch}
      </span>
    ))}
  </span>
);

export function LibraryOfBabel({ label }: { label?: string }) {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [page, setPage] = useState("");
  const [pages, setPages] = useState(0);
  const [longest, setLongest] = useState("");

  const { marked } = findWords(page);

  const open = () => {
    const next = randomPage();
    const best = findWords(next).found.reduce((a, b) => (b.length > a.length ? b : a), longest);
    setPage(next);
    setPages((n) => n + 1);
    setLongest(best);
  };

  return (
    <span role="group" aria-label={label} className={WIDGET_BOX}>
      <Lead>{copy.lead}</Lead>

      <span
        role="img"
        aria-label={page ? copy.page(page) : copy.empty}
        className="flex min-h-[15rem] w-full max-w-[22rem] flex-col justify-center border-[3px] border-[var(--mid)] bg-[var(--ink)] px-4 py-4 font-mono text-sm leading-relaxed text-[var(--soft)]"
      >
        {page ? (
          Array.from({ length: ROWS }, (_, r) => (
            <Line key={r} text={page.slice(r * COLS, (r + 1) * COLS)} marked={marked.slice(r * COLS, (r + 1) * COLS)} />
          ))
        ) : (
          <span className="text-center text-[var(--mid)]">{copy.empty}</span>
        )}
      </span>

      <Status>{pages > 0 ? copy.stats(pages, longest) : " "}</Status>

      <Btn cta active onClick={open}>
        {copy.open}
      </Btn>
    </span>
  );
}
