import type { PostContent } from "../types";

const content = {
  en: `
Last week, on Martin Fowler's blog, I read a passage that stayed in my head the whole week:

> "Increasing intelligence is not so much like 'making the tower taller', it's more like 'making the ball rounder'. At some point it's already pretty damn spherical and any improvement is marginal."

All content about AI, no matter if from fans or haters, seems to start from this assumption: intelligence is a scalar value, like a school grade. As if we could say: "In intelligence, Turing is a 10, but Gödel is an 8". Observe, for an instant, the strangeness of that sentence. What criterion could permit such a claim? They were two thinkers of completely distinct natures, and they enriched humanity not by what they had in common (their absurdly powerful intellects), but by what made them different: the form their intelligences assumed, and the place where they lived.

The advances in AI models prove this: intelligence is not a grade, not an IQ value, not a benchmark score. Accepting that computers are intelligent (and creative, see AlphaGo's famous move 37) is banal. But where has all this intelligence been going? Slop is not the code your AI spits out, slop is your idea. Nothing smells more like slop than that video on your feed: "New model changes everything", "New harness improved my productivity by 100%". Humans produce slop, and AIs are excellent tools for multiplying the slop that is already in us, but where are the results?

Well, if we are flooded with intelligence and this is the result, it seems we need to turn in another direction. If intelligence is in excess, what is valuable is stupidity.

But not any stupidity. Berys Gaut, a contemporary British philosopher, points to a marvelous fact: every creative act requires ignorance of the means, of the ends, or of both.

Back to move 37, because two different ignorances live together there. The first one AlphaGo had: nobody, not even the engineers, knew which move would come out of the search. The move emerged from thousands of simulations measured against a fixed criterion. And it is the criterion that reveals the second ignorance, the one AlphaGo did not have and could not have: it never asked itself what the value of winning a game of Go was.

Without the capacity to evaluate value, every product is slop. It is like the supermarket calculator: it sums the cart in microseconds, but it will never choose what goes in it. What chooses is need, and need is not calculated: it is felt. The machine receives its objective ready-made; the lack, only someone who lives the problem has.

The valuable stupidity is this one: that of someone who feels the lack of something they cannot yet name, and starts searching without knowing what would count as an answer. No optimizer starts from there. We do.
`,
  pt: `
Semana passada, no blog do Martin Fowler, li uma passagem que rodou minha cabeça a semana inteira:

> "Increasing intelligence is not so much like 'making the tower taller', it's more like 'making the ball rounder'. At some point it's already pretty damn spherical and any improvement is marginal."

Todo conteúdo sobre IA, não importa se de fãs ou haters, parece partir desse pressuposto: a inteligência é um valor escalar, como uma nota escolar. Como se a gente pudesse dizer: "Em inteligência, Turing é nota 10, mas Gödel é 8". Observa, por um instante, a esquisitice dessa frase. Que critério pode permitir tal afirmação? Eram dois pensadores de natureza completamente distinta, e que enriqueceram a humanidade não pelo que tinham em comum (seus intelectos absurdamente poderosos), mas pelo que tinham de diferente: a forma que assumiram e o lugar onde viveram suas inteligências.

Os avanços nos modelos de IA provam isso: inteligência não é uma nota, não é um valor de QI nem pontuação em benchmark. Aceitar que computadores são inteligentes (e criativos, vide o famoso movimento 37 do AlphaGo) é banal. Mas para onde tem ido toda essa inteligência? Slop não é o código que sua IA cospe, slop é sua ideia. Nada cheira mais a slop do que aquele vídeo no seu feed "Novo modelo muda tudo", "Nova harness melhorou 100% minha produtividade". Humanos produzem slop, e IAs são ferramentas excelentes de multiplicar o slop que está em nós mesmos, mas cadê os resultados?

Ora, se estamos inundados de inteligência e esse é o resultado, parece que precisamos virar em outra direção. Se inteligência está em excesso, valiosa é a burrice.

Mas não é qualquer burrice. Berys Gaut, um filósofo britânico contemporâneo, aponta para o fato maravilhoso: todo ato criativo requer ignorância dos meios, dos fins ou de ambos.

Voltamos ao movimento 37, porque ali convivem duas ignorâncias diferentes. A primeira o AlphaGo tinha: ninguém, nem os engenheiros, sabia qual lance ia sair da busca. O lance emergiu de milhares de simulações medidas contra um critério fixo. E é o critério que revela a segunda ignorância, a que o AlphaGo não tinha nem poderia ter: ele nunca se perguntou qual o valor de vencer uma partida de Go.

Sem a capacidade de avaliar valor, todo produto é slop. É como a calculadora do supermercado: ela soma o carrinho em microssegundos, mas nunca vai escolher o que entra nele. Quem escolhe é a necessidade, e necessidade não se calcula: se sente. Objetivo, a máquina recebe pronto; falta, só quem vive o problema tem.

A burrice valiosa é essa: a de quem sente falta de algo que ainda não sabe nomear, e começa a procurar sem saber o que contaria como resposta. Nenhum otimizador começa daí. Nós começamos.
`,
} satisfies PostContent;

export default content;
