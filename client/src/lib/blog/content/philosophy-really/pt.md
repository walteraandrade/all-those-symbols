---
title: Filosofia, sério?
excerpt: 'De um bacharelado em Filosofia à engenharia de software: como Aristóteles, Frege, Boole e Shannon conectam os dois, e por que a pergunta mais útil na engenharia continua sendo "o que queremos dizer com esta palavra?"'
readingTime: 9
---

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
[^2]: Os relatos sobre Leibniz, Frege, Boole e Shannon foram simplificados aqui para caber neste formato, e cada um merece muito mais nuances do que um post de blog permite. Para ler mais: [Gottfried Leibniz](https://plato.stanford.edu/entries/leibniz/), [Gottlob Frege](https://plato.stanford.edu/entries/frege/) e [George Boole](https://plato.stanford.edu/entries/boole/) na Stanford Encyclopedia of Philosophy; sobre Shannon, sua dissertação de mestrado, [A Symbolic Analysis of Relay and Switching Circuits](https://dspace.mit.edu/handle/1721.1/11173) (MIT, 1937), e [o verbete da SEP sobre Information](https://plato.stanford.edu/entries/information/).
