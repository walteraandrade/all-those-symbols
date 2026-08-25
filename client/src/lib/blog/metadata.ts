import type { BlogCategory, BlogPost, LocalizedPost, PostLang } from "./types";

export const postLangs = (post: BlogPost): PostLang[] => [
  post.lang,
  ...(Object.keys(post.translations ?? {}) as PostLang[]),
];

export const localizePost = (post: BlogPost, lang: PostLang): LocalizedPost => {
  const version = lang === post.lang ? null : post.translations?.[lang];
  if (!version) return { ...post, activeLang: post.lang };
  return {
    ...post,
    ...version,
    activeLang: lang,
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-benefits-of-stupidity",
    title: "The Benefits of Stupidity",
    date: "Aug 24, 2026",
    category: "Philosophy",
    lang: "en",
    image: "/blog/the-benefits-of-stupidity.jpg",
    imageAlt:
      "Turing and Gödel, drawn in a dim study, grinning at a monitor whose AI prompt reads SPAM MY CRITICS while thousands of envelopes pour into stacked inboxes.",
    excerpt:
      "All content about AI seems to start from the same assumption: intelligence is a scalar value, like a school grade. If we are flooded with intelligence and this is the result, what is valuable is stupidity.",
    readingTime: 3,
    featured: true,
    translations: {
      pt: {
        title: "O Benefício da Burrice",
        imageAlt:
          "Turing e Gödel, desenhados num escritório escuro, sorrindo diante de um monitor cujo prompt de IA diz SPAM MY CRITICS enquanto milhares de envelopes caem em caixas de entrada empilhadas.",
        excerpt:
          "Todo conteúdo sobre IA parte do mesmo pressuposto: a inteligência é um valor escalar, como uma nota escolar. Se estamos inundados de inteligência e esse é o resultado, valiosa é a burrice.",
        readingTime: 3,
      },
    },
    tags: [
      "ai",
      "agentic-ai",
      "philosophy",
      "software-engineering",
      "critical-thinking",
    ],
  },
  {
    slug: "through-a-glass-darkly-bergman",
    title: "Through a Glass Darkly",
    date: "Jul 20, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "This must be the third or fourth time I watch Ingmar Bergman's Through a Glass Darkly and it still holds up as one of the best films I've ever seen. The paradox between human desire and sin is the key to understanding this film.",
    readingTime: 3,
    tags: [
      "bergman",
      "schizophrenia",
      "freud",
      "christianity",
      "film-analysis",
    ],
  },
  {
    slug: "no-country-for-old-men",
    title: "No Country for Old Men",
    date: "Aug 31, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "No Country for Old Men is a film about the randomness of destiny and the inability to deal with it whether you are an experienced person or not. Or if you prefer, it's about the innocence of the idea of maturity itself.",
    readingTime: 4,
    tags: ["coen-brothers", "destiny", "western", "philosophy"],
  },
  {
    slug: "the-thin-red-line",
    title: "The Thin Red Line",
    date: "Nov 10, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Malick likes to make you think. He raises more questions than answers. If you start watching this movie knowing that Malick wants to make you contemplate each image as you would contemplate Van Gogh's pair of shoes, you're going in the right way.",
    readingTime: 3,
    tags: ["malick", "war", "philosophy", "heidegger"],
  },
  {
    slug: "the-sacrifice-tarkovsky",
    title: "The Sacrifice (Offret)",
    date: "Aug 7, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Although the cinematography is gorgeous, absolutely wonderful, a real proof that Nykvist was one of the best DoP ever, the screenplay was seriously damaged by Tarkovsky's own spiritual and moral beliefs.",
    readingTime: 3,
    tags: ["tarkovsky", "christianity", "sacrifice", "nietzsche"],
  },
  {
    slug: "masculin-feminin-godard",
    title: "Masculin Féminin",
    date: "Jun 11, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Every single time I watch a Godard film I get more and more involved by his ability to develop cinema in all sorts of situations. His attempt to depict the life of youngsters is the best part of the film.",
    readingTime: 3,
    tags: ["godard", "french-new-wave", "youth", "60s"],
  },
  {
    slug: "harakiri-kobayashi",
    title: "Harakiri (切腹)",
    date: "May 23, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Masterpiece. Losing the respect for Bushido is the theme of this movie. It shows a samurai walking on the border of this ancient code, facing it, questioning it, criticizing it.",
    readingTime: 2,
    tags: ["samurai", "bushido", "kobayashi", "japanese-cinema", "anti-hero"],
  },
  {
    slug: "love-exposure-sono",
    title: "Love Exposure (愛のむきだし)",
    date: "May 4, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "This is not an easy-digest movie. This vision of love this movie shows is exactly the vision we had as a child and that we lost when we became adults.",
    readingTime: 5,
    tags: ["sion-sono", "japanese-cinema", "love", "religion", "sexuality"],
  },
  {
    slug: "madadayo-kurosawa",
    title: "Madadayo (まあだだよ)",
    date: "Apr 17, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "The last legacy from Kurosawa. A movie about how to love things in life, about how to not be afraid from your emotions.",
    readingTime: 2,
    tags: ["kurosawa", "japanese-cinema", "life", "farewell"],
  },
  {
    slug: "barravento-rocha",
    title: "Barravento",
    date: "May 26, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Barravento is about tradition versus vanguard. Brazilian culture (well) represented by European ways.",
    readingTime: 3,
    tags: ["glauber-rocha", "brazilian-cinema", "modernism", "religion"],
  },
  {
    slug: "in-the-mood-for-love-wong",
    title: "In the Mood for Love (花樣年華)",
    date: "Aug 16, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "One of the finest dramas about love ever. An amazing aesthetic exercise of the most fiery moment of seduction.",
    readingTime: 3,
    tags: ["wong-kar-wai", "hong-kong", "romance", "seduction"],
  },
  {
    slug: "la-strada-fellini",
    title: "La Strada",
    date: "Aug 16, 2012",
    category: "Cinema",
    lang: "en",
    excerpt:
      "Almost a fairy-tale. A touching movie with an absolutely charming Chaplin-like performance from Giulietta Masina.",
    readingTime: 1,
    tags: ["fellini", "italian-cinema", "neo-realism", "circus"],
  },
  {
    slug: "agricultura-sintropica",
    title: "Agricultura Sintrópica",
    date: "Feb 11, 2026",
    category: "Philosophy",
    lang: "pt",
    excerpt:
      "Os sistemas de agrofloresta e agricultura sintrópica me encantam pelos seus fundamentos filosóficos. Acho que o ser humano é algo como uma célula num corpo maior.",
    readingTime: 3,
    tags: [
      "agrofloresta",
      "agricultura-sintropica",
      "spinoza",
      "michael-levin",
      "ernst-gotsch",
      "ecologia",
      "cell-memory",
    ],
  },
  {
    slug: "paisagem-da-janela-milton-nascimento",
    title: "Paisagem da Janela",
    date: "Feb 11, 2026",
    category: "Music",
    lang: "pt",
    excerpt:
      "Paisagem da Janela é sobre essa coisa de menino de se imaginar como guerreiro, e a dificuldade das meninas de entenderem esse impulso. Uma herança evolutiva impressa no corpo.",
    readingTime: 2,
    tags: [
      "milton-nascimento",
      "mpb",
      "fantasia",
      "masculinidade",
      "infância",
      "análise",
      "cell-memory",
    ],
  },
  {
    slug: "aqui-e-agora-gilberto-gil",
    title: "Aqui e Agora",
    date: "Nov 11, 2023",
    category: "Music",
    lang: "pt",
    excerpt:
      "A análise de 'Aqui e Agora' revela a maior qualidade de Gilberto Gil: a capacidade de conceber música e letra como um conjunto indissociável, transitando entre vida e morte.",
    readingTime: 2,
    tags: ["gilberto-gil", "mpb", "refavela", "análise"],
  },
  {
    slug: "um-gilverso-para-explorar",
    title: "Um Gilverso para se Explorar",
    date: "Nov 11, 2023",
    category: "Music",
    lang: "pt",
    excerpt:
      "O paradoxo é tema e ferramenta da obra de Gilberto Gil. Em Gil, os paradoxos se completam, se misturam e só podem ser entendidos na sua relação de simultânea tensão e harmonia.",
    readingTime: 7,
    tags: ["gilberto-gil", "mpb", "paradoxo", "taoísmo", "análise"],
  },
];

export const blogCategories: BlogCategory[] = [
  ...new Set(blogPosts.map((post) => post.category)),
];
