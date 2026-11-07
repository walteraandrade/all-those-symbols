import type { PostLang } from "./types";

export const CHROME: Record<
  PostLang,
  {
    backToTop: string;
    postLanguage: string;
    backToWritings: string;
    minRead: string;
    contents: string;
    moreWritings: string;
    previous: string;
    next: string;
    loadFailed: string;
    tryAgain: string;
    backToBlog: string;
    footnotes: string;
    footnoteBack: string;
  }
> = {
  en: {
    backToTop: "Back to top",
    postLanguage: "Post language",
    backToWritings: "Back to writings",
    minRead: "min read",
    contents: "Contents",
    moreWritings: "More writings",
    previous: "Previous",
    next: "Next",
    loadFailed: "This post did not load. The connection dropped, or the page is running an older build.",
    tryAgain: "TRY AGAIN",
    backToBlog: "Back to the blog",
    footnotes: "Footnotes",
    footnoteBack: "Back to content",
  },
  pt: {
    backToTop: "Voltar ao topo",
    postLanguage: "Idioma do texto",
    backToWritings: "Voltar aos textos",
    minRead: "min de leitura",
    contents: "Índice",
    moreWritings: "Mais textos",
    previous: "Anterior",
    next: "Próximo",
    loadFailed: "Este texto não carregou. A conexão caiu ou a página está em uma versão antiga.",
    tryAgain: "TENTAR DE NOVO",
    backToBlog: "Voltar ao blog",
    footnotes: "Notas de rodapé",
    footnoteBack: "Voltar ao texto",
  },
};
