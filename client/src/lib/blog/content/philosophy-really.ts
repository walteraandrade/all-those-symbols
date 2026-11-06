import type { PostContent } from "../types";

const content = {
  en: `
The startup bubble brought, in its eagerness to thrive, a new class of engineer to the world. That is a well-established fact, I believe. Whether good or bad, I cannot say. It is a fact that they are different, and that by being so, they bring different things to the world of engineering, even if it is a shitload of garbage JavaScript code for the new e-commerce. I came as one of those. Got robbed by a company that promised to teach me full-stack web development in 6 months (6 years later and I'm still trying) but I was lucky enough to get the best job I could at the time.

At the time, meaning September of 2020, I had a Philosophy BA I did not know what to do with. Everyone I knew already had a career going, some had children, and I was 30, broke and with a BA in Philosophy from UFBA. Hurray! I had learned from the full stack bootcamp that there were those things such as HTML, CSS and JavaScript. That for some reason we would use React instead. And that we would write JavaScript only on the frontend, and TypeScript only on the backend. To me, that idea sounded insane at the time. TypeScript? JavaScript, but harder? Thanks, no.

It was the first month in the new job. The pay, at the time, was insane for someone who was previously making $0/year. It would allow me to explore things I could never do before, plus I could move to São Paulo, a city I always loved. It was COVID, sure, but COVID wouldn't last forever.

I loved every second of my job, until the second day, when they asked me to build a very simple state machine to handle the request life cycle in a React app. Add a loading state, a "there is data" state, handle the error. I panicked. I did not know what to do. Their code was written with classes to this day? Are they monkeys? I asked myself, trying to project the monkey in the mirror onto someone else. Anyone. Three weeks is what it took me to write my first PR.

![Interactive widget: three loose switches let a screen show loading, data and an error all at once; a state machine allows one state at a time, changing only along its arrows.](#state-machine)

At the beginning of the fourth week, the company CEO called me to give me my feedback. I did not know what to expect. Up to that point, he had shown some distance and some impatience, but never cruelty, so I felt it would be alright. The first thing he said to me, in a calm and almost serene tone, was:

'We have a three month contract. If I had to decide between keeping you and not keeping you now, I would choose not keeping you.'

I don't even remember how I reacted. My memories of that are like stone worn smooth by time. I don't remember particularly showing any emotions, but I remember, as if it were yesterday, the bath I took that day, when emotions finally came. I knew, inside, that this time I could not blame anyone other than myself. I like this memory. It reminded me of the thing my CEO was best at: unfiltered honesty, and of what I learned from him: I needed to step up. The next year was my real path to learning to be a programmer. The company was deliberately and intelligently loosely structured, and so were its projects, and all engineers had to know a little bit of the whole stack to contribute.

My broad curiosity never allowed me to specialize in any one part of the development work, but I became somewhat of a generalist, and I'm proud to be able to contribute to a project in many different ways other than by simply coding. I eventually fell in love with TypeScript, and read with profound interest about the hardships of scaling Instagram and Twitter, about how GraphQL came to be, what Docker is, read the infamous blazingly fast Javascript framework wars, about the rendering strategy wars. I fell in love with React and the beautiful abstraction of the DOM, and how it maps to our own relationship with the concrete world (we interact with it through a filtered layer, that is, our senses), and how people work for free so that these amazing systems keep improving every single day. My CEO became a real personal friend and someone whose advice I'll follow blindly to this day.

That's how everything started, really. But eventually my career took me in many different directions. COVID also forced us to do everything online, and as bad as meetings are, they also allow us to skip Geography, so I met and still meet many people online: software engineers, hardware engineers, product owners, designers, recruiters, etc. And there is one question that always comes up:

"Philosophy, really?", or "Why Philosophy?!"

To which I, over the years, have learned how to answer in many different ways. I find the curiosity that sparks this question something so valuable that it would be a shame not to do the most I can to honor it. I had never tried to give these explanations any structure, but I finally have a reason to, so here goes.

The first thing is to try to clarify that whatever you think Philosophy is, you are wrong[^1]. Philosophers are confusing people, and they are the most confusing when they have to talk about themselves -- a trait I share with them. To avoid messing with any definition of philosophy that would get me in trouble with my friends at academia, let's assume that to philosophize is simply to **wonder about the hardest questions humanity has to answer**, the questions for which we have a hard time even using words to formulate, like "what is freedom?", "what is truth?", "what is good?". Some of the questions Philosophy asks tend to become new ways of understanding the world, and sometimes they grow to become full-fledged sciences. It was Aristotle (4th century BC), a well-known philosopher, who first wrote about the very philosophical question:

"What is motion?"

That then gave birth to Physics. Physics is the name of the book, by Aristotle, wondering about the laws of motion. Aristotle is also considered the father of Biology, Zoology and Logic.

Francis Bacon (16th–17th centuries), a not that well-known philosopher, trying to answer the famous question: "what is this relation between humanity and nature?" offered the solution "nature is a place where we make experiments, evaluate and validate the outcome" that eventually became what we know as Science. Bacon was fighting those that saw in nature something obscure and sacred, such as traditions and some religious expressions.

Leibniz (17th–18th centuries), a special kind of philosopher, also happened to be one of the greatest mathematicians who ever lived (both math and philosophy departments all over the world still praise his name to this day), and he asked a mathematical question about the limits of math, which is profoundly philosophical: "Can we calculate with something smaller than any number?" His answer, reached independently of Newton, was the infinitesimal calculus: slice a change into pieces so small they are almost nothing, then add them back up. Every bridge that stays up, every circuit that doesn't burn and every rocket that lands owes something to that idea. Engineers still write it in his notation: the dy/dx and the ∫ are his. But he had a stranger dream: a symbolic language in which any dispute could be settled by calculation. *Calculemus*, let us calculate. Two centuries later, Frege (19th–20th centuries) picked up that dream.

So you see the trend here. But to get to the point, we have to time-travel to the end of the 1800s, when Frege, another not-so-well-known philosopher, started asking a very different question:

"How can we represent reasoning in a formal language, where its logical structure is explicit enough to be evaluated through precise rules?"

Frege's project was to build a logical tool that could evaluate any sentence just like arithmetic evaluates numbers. He wanted to test whether an argument was valid purely through the rules of its structure (syntax), regardless of what the words actually referred to in the world (semantics). Frege never fully got there, but by proposing this separation between syntax and semantics, he provided the exact framework for modern computers.

![Interactive slider: three if-then sentences about rain, a switch and a key lose their meaning and merge into one form, "if A then B".](#if-then)

A few decades earlier, a mathematician named Boole (19th century) had developed his studies, which were similar to Frege's, except that Boole was trying to express sentences as algebra.

And when Claude Shannon, in his master's thesis, mapped the behavior of electric circuits, he realized that switches turning on and off were doing the exact same thing as the true-and-false rules philosophers and mathematicians had discovered to validate language with pure logic, born of the work of Frege, Boole, and also Whitehead (19th–20th centuries) and Russell (19th–20th centuries).[^2]

![Interactive widget: two switches wired in a row, side by side, or with one reversed behave like "and", "or" and "if then"; a lamp lights while the sentence is true.](#logic-circuit)

So, yes, Computer Science is also a child of Philosophy. I always had a hard time explaining this connection to people, though, as you do not want to bring up Claude Shannon and Wittgenstein (19th–20th centuries) in your day-to-day. In my personal journey through Philosophy I felt in love first for the Logic. The idea of adding verifiable structures to language seemed wild and revolutionary to me. Imagine being able to resolve a discussion about religion or about Freud with mathematical certainty? Moved by this promise, I delve into Philosophy of Mathematics, and if I had to put them into one question, would be: How can we extract meaningful and important information out of working purely with algebraic structures? Eventually, I ended my BA with a work on Abstractions, a word that philosophers and Engineers share with very similar meaning, but my work was more related to Epistemology than Logic. The work was intended to be a preparation to get into a Philosophy of Mathematics Masters Degree, which was the original plan.

The answer I usually give is much simpler. I have found over the years that trying to explain words and their references, truth tables and naming old books in Google Meet tends to get really boring really fast, so I take a shortcut with a well-known trivia: that Plato (5th–4th centuries BC), one of the greatest names in Ancient Philosophy, had this saying at his school:

"Only those who know geometry are allowed"

Which is a known myth, but the symbology is strong: Math and Philosophy tied to the cradle in western thought. I tend to add that the mathematical way of thinking is something philosophers have always treasured, because it brings certainty. We can wonder about "freedom" as much as we want, and the word "freedom" itself will have very different shades whether you are on a hot sunny day in Belo Horizonte, in a cold café in New York or in a remote part of northern Ukraine at this very moment. But in all of these places, the mathematical truths hold.

![Comparison titled "Method: the search for certainty": geometry goes from definitions to theorems to proofs; philosophy goes from premises to arguments to validity.](#certainty-method)

In order to bring this kind of determinism to language, philosophers opened the portal that brought Computer Science into the game. And by watching, reading and feeling their striving for this kind of rigor in natural language, I, by the same drive that moved all these people, heard the call of Software Engineering. When I first started, programming was as simple as the exercises in the formal logic classes. It was what I loved about it. The pure structure of syntax, not dirtied by the impurities of the real world, is really something to behold, and people make real art with it.

This is where AI changed my relationship with programming. It writes much of the code I used to write myself, but it hasn’t taken the craft away from me. It has moved my attention elsewhere: toward deciding what the code should mean, what assumptions it can rely on, and how to tell whether it is doing the right thing.

I noticed early on how much ambiguous language could trouble my work with AI agents. That felt familiar. I had spent years learning, through philosophy, to notice how much can hide inside a word; later, I recognized the same problem in Eric Evans’s _Domain-Driven Design_. In both cases, the challenge is not merely to choose the right words, but to make sure that everyone involved is using them in the same way.

For my own work, I think about this in three layers:

1. Clear definitions;
2. Operations on those definitions;
3. Systems built from those operations.

That is how I make a problem precise enough to work with—whether I’m writing the code myself or guiding an AI agent to write it.

Frege wanted to separate the structure of a sentence from what its words refer to. More than a century later, that distinction has become part of my everyday work. AI can produce much of the syntax. I still have to care about what the words refer to, whether the people in the room mean the same thing by them, and whether the system we build reflects that meaning.

It’s a funny twist of fate. I spent six years trying to leave Philosophy behind to become a "real" programmer—only for the machines to take over the code and leave me right back where I started: worrying about what words mean.

[^1]: For my favorite text on the subject: *What Is Philosophy?*, Martin Heidegger (19th–20th centuries), 1955 lecture.
[^2]: The accounts of Leibniz, Frege, Boole and Shannon were simplified here to fit this format, and each deserves far more nuance than a blog post allows. To read more: [Gottfried Leibniz](https://plato.stanford.edu/entries/leibniz/), [Gottlob Frege](https://plato.stanford.edu/entries/frege/) and [George Boole](https://plato.stanford.edu/entries/boole/) in the Stanford Encyclopedia of Philosophy; for Shannon, his master's thesis, [A Symbolic Analysis of Relay and Switching Circuits](https://dspace.mit.edu/handle/1721.1/11173) (MIT, 1937), and the SEP entry on [Information](https://plato.stanford.edu/entries/information/).
`,
  pt: `
A bolha das startups trouxe, em sua ânsia de prosperar, uma nova classe de engenheiros para o mundo. Acredito que esse seja um fato bem estabelecido. Se isso é bom ou ruim, não sei dizer. É fato que eles são diferentes e que, por serem assim, trazem coisas diferentes para o mundo da engenharia — mesmo que seja uma caralhada de código JavaScript lixo para o mais novo e-commerce. Eu surgi como um deles. Fui roubado por uma empresa que prometeu me ensinar desenvolvimento web full-stack em 6 meses (6 anos depois e ainda estou tentando), mas tive a sorte de conseguir o melhor emprego que eu poderia ter na época.

Na época — ou seja, setembro de 2020 —, eu tinha um bacharelado em Filosofia com o qual não sabia o que fazer. Todo mundo que eu conhecia já tinha uma carreira encaminhada, alguns tinham filhos, e eu estava com 30 anos, quebrado e com um diploma de Filosofia pela UFBA. Viva! Eu tinha aprendido no bootcamp full-stack que existiam coisas como HTML, CSS e JavaScript. Que, por algum motivo, usaríamos React em vez disso. E que escreveríamos JavaScript apenas no frontend, e TypeScript apenas no backend. Para mim, aquela ideia parecia insana na época. TypeScript? JavaScript, só que mais difícil? Não, valeu.

Era o primeiro mês no emprego novo. O salário, na época, era insano para quem antes ganhava R$ 0 por ano. Aquilo me permitiria explorar coisas que nunca pude fazer antes, além de me mudar para São Paulo, uma cidade que sempre amei. Era pandemia de COVID, claro, mas a COVID não duraria para sempre.

Amei cada segundo do meu trabalho até o segundo dia, quando me pediram para construir uma máquina de estados bem simples para lidar com o ciclo de vida de requisições em um app React. Adicionar um estado de carregamento (*loading*), um estado de "há dados" e tratar o erro. Entrei em pânico. Eu não sabia o que fazer. O código deles ainda era escrito com classes até hoje? Eles são macacos? Perguntei a mim mesmo, tentando projetar o macaco do espelho em outra pessoa. Qualquer pessoa. Três semanas foi o tempo que levei para escrever meu primeiro PR.

![Controle interativo: três interruptores soltos deixam uma tela mostrar carregando, dados e erro ao mesmo tempo; uma máquina de estados permite um estado por vez, que só muda seguindo suas setas.](#state-machine)

No início da quarta semana, o CEO da empresa me chamou para dar meu feedback. Eu não sabia o que esperar. Até aquele momento, ele havia demonstrado certa distância e alguma impaciência, mas nunca crueldade, então achei que ficaria tudo bem. A primeira coisa que ele me disse, em um tom calmo e quase sereno, foi:

'Temos um contrato de três meses. Se eu tivesse que decidir entre manter você ou não manter você agora, eu escolheria não manter.'

Nem lembro como reagi. Minhas memórias disso são como pedras polidas pelo tempo. Não me lembro de ter demonstrado nenhuma emoção em particular, mas lembro, como se fosse ontem, do banho que tomei naquele dia, quando as emoções finalmente vieram. Eu sabia, lá no fundo, que desta vez não podia culpar ninguém além de mim mesmo. Gosto dessa memória. Ela me lembra daquilo em que meu CEO era melhor: honestidade sem filtro; e do que aprendi com ele: eu precisava dar o sangue e evoluir. O ano seguinte foi o meu verdadeiro caminho para aprender a ser programador. A empresa tinha uma estrutura propositalmente e inteligentemente flexível, assim como seus projetos, e todos os engenheiros precisavam conhecer um pouco de toda a *stack* para contribuir.

Minha ampla curiosidade nunca me permitiu me especializar em uma única parte do desenvolvimento, mas me tornei uma espécie de generalista, e tenho orgulho de poder contribuir para um projeto de muitas maneiras diferentes, além de simplesmente programar. Acabei me apaixonando pelo TypeScript e li com profundo interesse sobre as dificuldades de escalar o Instagram e o Twitter, sobre como o GraphQL surgiu, o que é o Docker, li sobre as infames guerras de frameworks JavaScript *blazingly fast* e sobre as guerras de estratégias de renderização. Eu me apaixonei pelo React e pela bela abstração do DOM, e por como isso se conecta com a nossa própria relação com o mundo concreto (interagimos com ele através de uma camada filtrada, isto é, nossos sentidos), e por como as pessoas trabalham de graça para que esses sistemas incríveis continuem melhorando todos os dias. Meu CEO se tornou um grande amigo pessoal e alguém cujos conselhos sigo de olhos fechados até hoje.

Foi assim que tudo começou, na verdade. Mas, com o tempo, minha carreira me levou a muitas direções diferentes. A COVID também nos forçou a fazer tudo online e, por piores que sejam as reuniões, elas também nos permitem pular a Geografia. Assim, conheci e ainda conheço muita gente online: engenheiros de software, engenheiros de hardware, *product owners*, designers, recrutadores, etc. E há uma pergunta que sempre surge:

"Filosofia, sério?", ou "Por que Filosofia?!"

À qual eu, ao longo dos anos, aprendi a responder de muitas maneiras diferentes. Acho a curiosidade que desperta essa pergunta algo tão valioso que seria uma pena não fazer o meu melhor para honrá-la. Eu nunca tinha tentado dar uma estrutura a essas explicações, mas finalmente tenho um motivo para isso, então lá vai.

A primeira coisa é tentar esclarecer que, seja lá o que você pense que é Filosofia, você está errado[^1]. Filósofos são pessoas confusas, e são ainda mais confusos quando precisam falar sobre si mesmos -- um traço que compartilho com eles. Para evitar mexer com qualquer definição de filosofia que possa me causar problemas com meus amigos da academia, vamos assumir que filosofar é simplesmente **se questionar sobre as perguntas mais difíceis que a humanidade tem para responder**, aquelas perguntas para as quais temos dificuldade até mesmo de encontrar palavras para formular, como "o que é a liberdade?", "o que é a verdade?", "o que é o bem?". Algumas das perguntas que a Filosofia faz tendem a se tornar novas maneiras de entender o mundo e, às vezes, crescem para se tornar ciências completas. Foi Aristóteles (século IV a.C.), um filósofo bem conhecido, quem primeiro escreveu sobre a questão bastante filosófica:

"O que é o movimento?"

Isso acabou dando origem à Física. Física é o nome do livro de Aristóteles que reflete sobre as leis do movimento. Aristóteles também é considerado o pai da Biologia, da Zoologia e da Lógica.

Francis Bacon (séculos XVI–XVII), um filósofo não tão conhecido assim, tentando responder à famosa pergunta: "qual é essa relação entre a humanidade e a natureza?", ofereceu a solução: "a natureza é um lugar onde fazemos experimentos, avaliamos e validamos o resultado", o que acabou se tornando o que conhecemos como Ciência. Bacon lutava contra aqueles que viam na natureza algo obscuro e sagrado, como tradições e algumas expressões religiosas.

Leibniz (séculos XVII–XVIII), um tipo especial de filósofo, por acaso também foi um dos maiores matemáticos que já existiram (departamentos de matemática e de filosofia do mundo inteiro ainda louvam seu nome até hoje), e fez uma pergunta matemática sobre os limites da matemática, que é profundamente filosófica: "É possível calcular com algo menor que qualquer número?" Sua resposta, alcançada independentemente de Newton, foi o cálculo infinitesimal: fatiar uma mudança em pedaços tão pequenos que quase não são nada, e depois somá-los de volta. Toda ponte que fica de pé, todo circuito que não queima e todo foguete que pousa deve algo a essa ideia. Engenheiros ainda escrevem isso na notação dele: o dy/dx e o ∫ são dele. Mas ele tinha um sonho mais estranho: uma linguagem simbólica em que qualquer disputa pudesse ser resolvida por cálculo. *Calculemus*, calculemos. Dois séculos depois, Frege (séculos XIX–XX) retomou esse sonho.

Então dá para ver a tendência aqui. Mas, para ir direto ao ponto, temos que viajar no tempo até o final do século XIX, quando Frege, outro filósofo não tão conhecido, começou a fazer uma pergunta muito diferente:

"Como podemos representar o raciocínio em uma linguagem formal, onde sua estrutura lógica seja explícita o suficiente para ser avaliada por meio de regras precisas?"

O projeto de Frege era construir uma ferramenta lógica capaz de avaliar qualquer frase, assim como a aritmética avalia os números. Ele queria testar se um argumento era válido puramente pelas regras de sua estrutura (sintaxe), independentemente do que as palavras realmente representavam no mundo (semântica). Frege nunca chegou totalmente lá, mas, ao propor essa separação entre sintaxe e semântica, ele forneceu a base exata para os computadores modernos.

![Controle interativo: três frases "se, então" sobre chuva, interruptor e chave perdem o sentido e se fundem em uma só forma, "se A então B".](#if-then)

Algumas décadas antes, um matemático chamado Boole (século XIX) havia desenvolvido seus estudos, que eram semelhantes aos de Frege, exceto pelo fato de que Boole tentava expressar frases como álgebra.

E quando Claude Shannon, em sua dissertação de mestrado, mapeou o comportamento dos circuitos elétricos, ele percebeu que interruptores ligando e desligando faziam exatamente a mesma coisa que as regras de verdadeiro e falso que filósofos e matemáticos haviam descoberto para validar a linguagem com pura lógica, fruto do trabalho de Frege, Boole e também de Whitehead (séculos XIX–XX) e Russell (séculos XIX–XX).[^2]

![Controle interativo: dois interruptores ligados em fila, lado a lado ou com um invertido se comportam como "e", "ou" e "se, então"; uma lâmpada acende enquanto a frase é verdadeira.](#logic-circuit)

Então, sim, a Ciência da Computação também é filha da Filosofia. Sempre tive dificuldade em explicar essa conexão para as pessoas, já que você não quer citar Claude Shannon e Wittgenstein (séculos XIX–XX) no seu dia a dia. Na minha jornada pessoal pela Filosofia, me apaixonei primeiro pela Lógica. A ideia de adicionar estruturas verificáveis à linguagem me parecia selvagem e revolucionária. Já imaginou poder resolver uma discussão sobre religião ou sobre Freud com certeza matemática? Movido por essa promessa, mergulhei na Filosofia da Matemática e, se eu tivesse que resumi-la em uma pergunta, seria: Como podemos extrair informações significativas e importantes trabalhando puramente com estruturas algébricas? No fim, concluí meu bacharelado com um trabalho sobre Abstrações, uma palavra que filósofos e engenheiros compartilham com um significado muito semelhante, embora meu trabalho estivesse mais relacionado à Epistemologia do que à Lógica. O trabalho tinha a intenção de ser uma preparação para ingressar em um mestrado em Filosofia da Matemática, que era o plano original.

A resposta que costumo dar é muito mais simples. Descobri ao longo dos anos que tentar explicar as palavras e suas referências, tabelas-verdade e citar livros antigos no Google Meet tende a ficar muito chato, muito rápido. Então, pego um atalho com uma curiosidade bem conhecida: a de que Platão (séculos V–IV a.C.), um dos maiores nomes da Filosofia Antiga, tinha os seguintes dizeres na entrada de sua escola:

"Que não entre quem não souber geometria"

O que é um mito conhecido, mas de forte simbologia: Matemática e Filosofia unidas desde o berço no pensamento ocidental. Costumo acrescentar que a maneira matemática de pensar é algo que os filósofos sempre valorizaram, porque traz certeza. Podemos refletir sobre a "liberdade" o quanto quisermos, e a própria palavra "liberdade" terá nuances muito diferentes se você estiver em um dia quente e ensolarado em Belo Horizonte, em um café frio em Nova York ou em uma área remota no norte da Ucrânia neste exato momento. Mas, em todos esses lugares, as verdades matemáticas se mantêm.

![Comparação intitulada "Método: a busca pela certeza": a geometria vai de definições a teoremas e provas; a filosofia vai de premissas a argumentos e validade.](#certainty-method)

Para trazer esse tipo de determinismo para a linguagem, os filósofos abriram o portal que colocou a Ciência da Computação no jogo. E ao observar, ler e sentir a busca deles por esse tipo de rigor na linguagem natural, eu, movido pelo mesmo impulso que moveu todas essas pessoas, ouvi o chamado da Engenharia de Software. Quando comecei, programar era tão simples quanto os exercícios das aulas de lógica formal. Era o que eu amava naquilo. A pura estrutura da sintaxe, não maculada pelas impurezas do mundo real, é realmente algo de se admirar, e as pessoas fazem verdadeira arte com isso.

Foi aqui que a IA mudou minha relação com a programação. Ela escreve boa parte do código que eu costumava escrever sozinho, mas não tirou o ofício de mim. Ela mudou meu foco para outro lugar: decidir o que o código deve significar, em quais premissas ele pode se apoiar e como saber se ele está fazendo a coisa certa.

Percebi logo cedo o quanto a linguagem ambígua podia atrapalhar meu trabalho com agentes de IA. Aquilo me pareceu familiar. Passei anos aprendendo, através da filosofia, a notar o quanto pode se esconder dentro de uma palavra; mais tarde, reconheci o mesmo problema no _Domain-Driven Design_ de Eric Evans. Em ambos os casos, o desafio não é meramente escolher as palavras certas, mas garantir que todos os envolvidos as estejam usando da mesma maneira.

No meu próprio trabalho, penso nisso em três camadas:

1. Definições claras;
2. Operações sobre essas definições;
3. Sistemas construídos a partir dessas operações.

É assim que torno um problema preciso o suficiente para ser trabalhado—seja escrevendo o código eu mesmo ou guiando um agente de IA para escrevê-lo.

Frege queria separar a estrutura de uma frase daquilo a que suas palavras se referem. Mais de um século depois, essa distinção se tornou parte do meu trabalho diário. A IA pode produzir grande parte da sintaxe. Eu ainda preciso me importar com o que as palavras representam, se as pessoas na sala querem dizer a mesma coisa com elas e se o sistema que construímos reflete esse significado.

É uma ironia engraçada do destino. Passei seis anos tentando deixar a Filosofia para trás para me tornar um programador "de verdade" — só para as máquinas assumirem o código e me deixarem exatamente onde comecei: preocupado com o que as palavras significam.

[^1]: Para o meu texto favorito sobre o assunto: *Que é isto – A Filosofia?*, Martin Heidegger (séculos XIX–XX), palestra de 1955.
[^2]: Os relatos sobre Leibniz, Frege, Boole e Shannon foram simplificados aqui para caber neste formato, e cada um merece muito mais nuances do que um post de blog permite. Para ler mais: [Gottfried Leibniz](https://plato.stanford.edu/entries/leibniz/), [Gottlob Frege](https://plato.stanford.edu/entries/frege/) e [George Boole](https://plato.stanford.edu/entries/boole/) na Stanford Encyclopedia of Philosophy; sobre Shannon, sua dissertação de mestrado, [A Symbolic Analysis of Relay and Switching Circuits](https://dspace.mit.edu/handle/1721.1/11173) (MIT, 1937), e o verbete da SEP sobre [Information](https://plato.stanford.edu/entries/information/).
`,
} satisfies PostContent;

export default content;