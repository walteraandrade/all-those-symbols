import { LucideIcon, BookOpen, User, Code, Briefcase, Cpu, Layers, Terminal } from "lucide-react";

export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export const bio = `I build things end-to-end: AI-powered interview bots, fintech platforms, e-learning systems, mobile apps. At SmartHow I own DevOps, define architecture, and lead technical decisions while shipping features daily.

Philosophy degree in logic taught me to find clarity in complexity. I care about why we're building something, not just how.`;

export const projects: Project[] = [
  {
    title: "Modulart System",
    role: "Full Stack Developer & Product Owner",
    description: "Full-stack event sales and management platform with responsive webpage, robust PostgreSQL backend, and comprehensive admin panel.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Payload CMS", "GCP", "Prisma", "Apollo GraphQL", "Docker"]
  },
  {
    title: "NaPorta Platform",
    role: "Full-Stack Developer & Lead",
    description: "Animated landing page and responsive admin system for delivery management. Winner of national competition.",
    tech: ["Next.js", "Node.js", "Framer Motion", "Refine", "GSAP", "React Query", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Payssego Payment System",
    role: "Full-Stack Developer & Architect",
    description: "Node.js platform for employee salary advances with rigorous API security requirements and secure client integrations.",
    tech: ["Node.js", "Retool", "API Security", "PostgreSQL", "AWS"]
  },
  {
    title: "Vivenda Platform",
    role: "Full-Stack Developer & DevOps",
    description: "Astro-based platform connecting construction companies to at-risk individuals, simplifying bureaucracy and stakeholder connections.",
    tech: ["Astro", "AWS", "EC2", "Ubuntu", "Node.js"]
  },
  {
    title: "ioP Pet App",
    role: "Mobile Developer",
    description: "React Native application with Bluetooth integration for pet management, deployed on Apple Store and Google Play.",
    tech: ["React Native", "Bluetooth", "iOS", "Android"]
  },
  {
    title: "AI Decco Assistant",
    role: "Creator",
    description: "AI-powered assistant for interior decoration recommendations.",
    tech: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "HTML to DOCX Converter",
    role: "Creator",
    description: "Python tool for converting HTML documents to DOCX format.",
    tech: ["Python"],
    link: "https://github.com/walteraandrade/html-to-docx"
  },
  {
    title: "Aetheria",
    role: "Creator",
    description: "Game project built with Phaser.js and TypeScript.",
    tech: ["Phaser.js", "TypeScript"],
    link: "https://github.com/walteraandrade/aetheria"
  },
  {
    title: "Smells Like Job Spirit",
    role: "Creator",
    description: "Browser extension with Python backend and Ollama integration for job search assistance.",
    tech: ["Browser Extension", "Python", "Ollama"],
    link: "https://github.com/walteraandrade/smells-like-job-spirit"
  },
  {
    title: "The Thought Weaver",
    role: "Creator",
    description: "TypeScript project for thought organization and note-taking.",
    tech: ["TypeScript"],
    link: "https://github.com/walteraandrade/the-thought-weaver"
  }
];

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "SmartHow",
    period: "September 2025 - Present",
    description: "Own DevOps and infrastructure on Azure. Define architecture and lead technical decisions. Built AI interview automation with Recall.ai and ElevenLabs. Ship features across Node.js/NestJS, Next.js, Python/FastAPI, PostgreSQL/MongoDB."
  },
  {
    role: "Senior Full Stack Developer",
    company: "Instaq – Instituto Taqtile",
    period: "October 2023 - September 2025",
    description: "Led Modulart platform as Full Stack Dev & Product Owner. Built NaPorta landing page (won national competition). Architected Payssego payment system. Deployed Vivenda on AWS. Led Pence culture analytics platform with Neo4j."
  },
  {
    role: "Software Engineer",
    company: "Taqtile Brasil",
    period: "September 2020 - May 2023",
    description: "Built ioP Pet mobile app with Bluetooth, released on App Store & Play Store. Created Timesheet platform replacing Redmine (React, GraphQL, BigQuery, Looker). Led Gentelab e-learning with React, Relay, Firebase."
  }
];

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "GraphQL"],
  frontend: ["Next.js", "React", "React Native", "Astro", "Tailwind CSS", "Framer Motion", "GSAP", "Relay"],
  backend: ["Node.js", "PostgreSQL", "Prisma", "Apollo GraphQL", "Hasura", "REST APIs", "Firebase"],
  cloud: ["AWS", "EC2", "GCP", "Netlify", "Vercel", "Docker"]
};

export const socialLinks = {
  email: "walteraandrade@gmail.com",
  linkedin: "/in/walteraandrade",
  github: "@walteraandrade",
  discord: "@walteraandrade"
};

export interface NodeSection {
  id: string;
  title: string;
  icon: LucideIcon;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export const nodes: NodeSection[] = [
  { id: "bio", title: "Bio", icon: User, x: 20, y: 50 },
  { id: "projects", title: "Projects", icon: Code, x: 50, y: 30 },
  { id: "blog", title: "Blog", icon: BookOpen, x: 80, y: 50 },
];

export type BlogCategory = "Cinema" | "Philosophy" | "Code" | "Life" | "Project" | "Music";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  readingTime: number;
  featured?: boolean;
  tags?: string[];
}

const calculateReadingTime = (content: string): number =>
  Math.ceil(content.split(/\s+/).length / 200);

const throughAGlassDarklyContent = `
This must be the third or fourth time I watch Ingmar Bergman's *Through a Glass Darkly* and it still holds up as one of the best films I've ever seen.

Bergman's objective here was clear since the first frame after the credits, as they are walking out of the sea, they'll leave darkness and try to find their paths. Every single one of them has a particular point that needs to be freed.

## The Characters

**Karin** (Harriet Andersson): When the movie begins, she had been recently freed from the hospital due to some mental problems. This problem is never explicated, all we know is that it's almost incurable and she is still under treatment. This problem is apparently connected with desire, personal beliefs and guilt. Seems like she has some similarities with Bergman's mother—whose name was also Karin—and to whom he gave the following description: "She was a little bossy. She liked to give orders." Just the same thing they say about Karin in the beginning.

**Minus**: Karin's brother. In short, a teenager. Minus' hormones are exploding, he breathes sexuality and insecurity. He's on the border between childhood and maturity although he can only see maturity in a far horizon. Also, he feels the lack of a paternal image since his father is traveling all the time.

**David** (Gunnar Björnstrand): The father, a completely egoist man. This is told at the beginning of the movie and is proved in the middle of it. He is the character to whom I feel closer. He does not deny his egoism, he tries to understand egoism as a form of love as well even though he does not know what it means.

**Martin** (Max von Sydow): Karin's husband. He is the very representation of love in many ways. He had all the excuses to abandon Karin and move on with his life; apparently he is a successful doctor, a handsome and careful man. However, his decision is to stay by Karin's side and help her in her treatment. He seems to be the only one who really believes in the possibility of cure. His necessity seems to be Karin's freedom. He is arrested because he can't cure Karin nor comfort her.

## God and Sin

These characters and their paths will take you to the debate about God's existence. Bergman himself told this movie was the frontier between his Christianity and posterior skepticism. Karin's disease, from this point of view, might be seen as the fear from sin; when she's alone she expresses a vigorous sexuality that she has been hiding from her husband. The paradox between human desire and sin is the key to understanding this film.

## Technical Excellence

I don't need to talk about the cast. Come on! Everyone who is nearly familiar with Bergman's work knows about these actors. The only thing I'll leave for the record is that Harriet Andersson's performance in this movie is one of the best performances ever. In the whole film history, period.

The gorgeous cinematography from Sven Nykvist will interchange between light and shadow following the characters' paths of freedom. Every time they talk about a hidden and dark secret they walk into some illuminated spot, using opened doors and windows around the house.

The music is... indescribable. It's Bach. Played on a cello. The cello is known as the instrument whose timbre is closest to the human voice. Every time the cello starts playing we can hear a human crying.

*Through a Glass Darkly* is assuredly a masterpiece. One of my favorite movies of all time.
`;

const masculinFemininContent = `
*"I wanted to use cinema to speak of youth, or else I wanted to use youth to speak of cinema."* — Jean-Luc Godard, about *Masculin, Féminin*. *Les lettres*, June 1966

Impossible to describe better.

Every single time I watch a Godard film I get more and more involved by his ability to develop cinema in all sorts of situations. In this particular one, as he said in the same interview I quoted above, he thought he was losing his cinema and that he couldn't find it in the adults since the new generations "were people who had not been conditioned. Conditioned by their life, certainly, but not morally conditioned."

His attempt to depict the life of youngsters is the best part of the film. If you recall, the contraceptive methods were invented by that time - around the 60's. This sexual revolution is one of the themes they discuss. The role of women in society, the new freedom the contraceptive methods gave to them, the Vietnam war, and, of course, capitalism. This movie is great in every single part it forgets socialism. As a man, Paul, the main character, is a good character; but when the subject is politics, he is very annoying.

## Memorable Scenes

There are some special scenes that I absolutely loved. The first one, which I'll always remember, is when Elizabeth (the lovely Marlène Jobert) is talking to Paul's friend, the syndicalist. The major frame has her eating an apple, like she's some kind of Eve, very slowly, like she is afraid to bite it for real and talking about sex and men with some apprehension in her face. Awesome take. Also, the references to other movies were clever.

*"You are not Pierrot le Fou. He stole cars for his women."*

Not to forget, the mention of Truffaut's work, specially *The 400 Blows*. *Masculin, féminin* is, in some ways, an attempt to depict the youth that started with Doinel - Paul had just left the military service.

## The Word Games

I've read around that some people criticized the existence of man characters being the intellectual ones and the girls being the silly and superficial ones; this may be true. But you can't forget that Elizabeth is a smart girl, she just doesn't like politics. There is another point of view that puts in first place the game with the words Masculin and Féminin. Whilst "masculin" has in its composition both words "masque" (mask) and "cul" (ass), the "féminin" starts with "f" and ends with "in", which together make "fin" (end). Since the last scene is about Paul's death and both girls talking about how life is going to be, the interpretation that this trick with the word "féminin" means that females had the final word is valid.

Without all that crap about communism that sometimes really pissed me off and I almost gave up watching it, the film is wonderful and really worth watching once and maybe twice.
`;

const sacrificeContent = `
Finally, at the end of a very educational journey started in *The Mirror*, with *Offret* - or *The Sacrifice* - I can say proudly that I've seen all Tarkovsky's.

Unfortunately, I should say that *The Sacrifice* is the worst film in this talented Russian's career. Although the cinematography is gorgeous, absolutely wonderful, a real proof that Nykvist was one of the best DoP ever, the screenplay was seriously damaged by Tarkovsky's own spiritual and moral beliefs.

## The Flaw

The greatest thing about this filmmaker's scripts, in my humble opinion, is that he used to analyse subjects and problems without taking a real positioning about the themes surrounding it. His art consists in suggesting possibilities instead of determining them. That's exactly the flaw about *The Sacrifice*'s screenplay.

The story is about an atheist philosopher, critic, professor and journalist named Alexander (Erland Josephson in a brilliant performance) who needs to give up everything he has to save his family. When the moment of the crises comes, he suddenly prays to God. This moment itself is already forced; why is he praying if he does not believe in God? Because the moment is critical? But if he didn't believe in the first place this wouldn't be even an option. Tarkovsky failed creating this character so superficially. This scene seems artificial and morally innocent. After that, he is told by a mystic friend who "collects events" that he should make love with his part-time housemaid to save his family. He'll do that. Nevertheless, he'll also burn his own house. The idea of redemption is clear as water, but Tarkovsky didn't manage to elaborate it very well.

## The Symbols

In the beginning of the movie, we know it's Alexander's birthday and a friend of his (the same mystical, Otto) brings a great present: an old map of Europe. This symbolic event is a synecdoche to the movie's morality. Tarkovsky innocently believed that society was going to an end because we are forgetting spiritualism. Thus, the map is a representation of the "good times", when the people used to live "better". Nonetheless, Victor, the family's doctor and friend, gives to Alexander a book with pictures of the famous iconic Russian painter, Andrei Rublev. Both presents are representations a nostalgia feeling that the new times will only be right when it tries to be like the old times, spiritually speaking.

Otto, not by chance, says to Alexander: *"Every present is a sacrifice. What is a gift if not a sacrifice?"*. The idea of redemption, simplified, is that we need to suffer and lose things to gain a greater gift. However, it's never clear whether Alexander's sacrifice is his sex with the housemaid or the burning house. Tarkovsky said that he disliked the modern society specially for super appreciation of material things, so the second choice is more reasonable. Then, why did he need to sleep with Maria (suggestive name), the housemaid?

## The Nietzsche Reference

Plus, there is this reference to Nietzsche. Both by dialogues and by the scene in which the Little Man jumps into Alexander's back just like the dwarf in *Thus spoke Zarathustra*. The reference to the man who killed God's philosophy is unclear but I'll make sure I'll read *Thus spoke Zarathustra* again in attempt to understand it.

In the end, even though this morality is innocent and superficial, it was defended with passion and wisdom by the hands of the most poetic of all filmmakers.
`;

const thinRedLineContent = `
A very good and popular review in Letterboxd, if I'm not mistaken it's about *The Tree of Life* says that there is a Malick gene somewhere and it makes some people absolutely love him and other people don't. Well, I'm sorry but I have to disagree. Unless this gene is the one that controls one's intelligence, this is no acceptable explanation. Malick likes to make you think. He raises more questions than answers. He is not going to entertain you - he is no joker. He is not perfect, indeed, but if you say his films are boring, it's because you should be watching the new *Two and a Half Men*, you're no audience for him.

## Malick and Heidegger

An interesting and significant detail about Malick's biography is that he first wanted to become a philosopher and even graduated in Philosophy and started a PhD, but he gave up to start working with films. His work was mainly focused on Martin Heidegger's philosophy. Although Heidegger's most famous works are about the essence of being and some other ontological themes - which can also be found in Malick's films - it is very important how Heidegger's thoughts about art are visible in Malick's canon, specially the essence of the artistic image.

For example, in his book *The Origin of the Work of Art*, he explains how Van Gogh's *A Pair of Shoes* is a great work of art due to its semantic autonomy. For example: we can look at this figure and we know at once that this is a pair of shoes of a man who walks a lot; probably in some farm. The relationship between this simple object and the enormous quantity of thought we might have about it is very important in Heidegger's view of art, it is, essentially, not a shoe but instead the representation of a shoe. It is the simplicity of this shoe and its multiple meanings, stories etc.

## The Contemplative Image

If you start watching this movie knowing that Malick wants to make you contemplate each image as you would contemplate this pair of shoes, you're going in the right way. But as the cinematic language is pretty different from the paintings, of course. Here, the images are completed not by themselves but instead with voice-overs of soldiers talking about life and death. Also, there is an interesting work of decoupage which fills every image with the next one. The film is filled with paradoxical themes such as theism and atheism, solidarity and egoism, war and peace, leadership and cowardice, etc. All of them very well represented by each image, each dialogue. Each plant, each bullet, each fire, each blow of the wind in the grass.

If you don't like Malick, sorry to say but you don't like art. Lucky you, the new outsider's addiction is these series where you don't need to think to understand.
`;

const noCountryContent = `
One single reason made me rewatch this film in order to make a proper review about it: I've seen that some people whose opinion I respect saying the Coen brothers are overrated. Well, I don't think they are overrated, I just think people admire them for the wrong reasons. People tend to refer to the dialogues in their films as "cool" when in fact they are indeed profound and intelligent, and "intelligent" things are often very different from "cool" things.

This is, in my opinion, the greatest work of the Coen brothers. *No Country for Old Men* is a film about the randomness of destiny and the inability to deal with it whether you are an experienced person or not. Or if you prefer, *No Country for Old Men* is about the innocence of the idea of maturity itself. That's why the film starts with an old sheriff talking about the old times, when people didn't need to use guns. He is concerned that now violence is in every corner and he feels he can't handle it. He is, in fact, trying to make sense of things as he used to do when he was a kid.

## The Three Protagonists

The story has three different protagonists and they never really meet each other. Josh Brolin lives Llewelyn Moss, the typical Texan man, with the special ability to be always alert and prevented, he studies every single step he'll take, he plans every further action carefully. Tommy Lee Jones is, again, a Texan sheriff. In this story, he is the mediating element, he is the one trying to make things happen *as they "should" do*, he is some kind of anti-entropy element of the plot. Javier Bardem is the psychopath (really?) Anton Chigurh, a person "with no sense of humor". In fact, Chigurh is the entropy of the story, he is the ruthless, unpredictable and mortal element of fate, that's why the sheriff refers to him as "rather a ghost" and he'll never get him.

## The Unpredictable

Although Moss is a veteran from Vietnam, alert, cautious and intelligent, trying everything to escape, he can't run from the unpredictable because he can only be prepared for what he can foresee - obviously. That's why he'd never be able to escape from Chigurh. Contemporary philosophy (and I'm referring especially to people like Edgar Morin) says that the only thing capable of really changing one's destiny is the unpredictable, like the meteor that once destroyed the dinosaurs or the fusion of two protons giving birth to helium that later would construct our whole universe. Chigurh is exactly this element and there is nothing you can do to make it stop, you can only put some faith on luck, and he gives you the chance to do so by throwing a coin in the air *"there's nothing more I can do"*, he says.

## Negotiation and Entropy

In Coen's canon they're often using the negotiation as an element capable of structuring the human society (remember *Fargo*, the constant and frustrated negotiations of Jerry Lundegaard, or in *True Grit* where the negotiations always precede the shooting, etc) but it's impossible to negotiate with the unpredictable evil, it's hopeless to run away from it, you just have to learn how to live accepting that not everything is under your control. Much more than a reconstruction of the western genre, *No Country for Old Men* is the placement of this arid reality in the entropy of real life, where even the more talented and cautious can fail if they're out of luck.

In the end, sheriff Ed Tom Bell goes to his father home to say he is going to retire. He complains about the evilness of the world and his impotency to deal with it, but his father only says that this evil was always there and gives him the lesson that it's better to learn how to accept the unpredictable than to fight against it.

## Chigurh as Fate

Every single time Chigurh appears you know something bad is going to happen. His force can be felt every time and by everyone not only because Javier Bardem made a wonderful job, but also because the character itself holds one of the biggest mysteries in life. Destiny has all the weapons (Chigurh never has to look after it, he always has weapons in his hands) and all you can do is to accept it, there is no such a thing as maturity.
`;

const loveExposureContent = `
I've just watched it and my fingers are still shaking. I don't know for sure how to start it, I just know that I need to write something so I can always remember how I felt in the very first time I watched it. And I felt wonderful.

For those who didn't see it, I must say that this is not an easy-digest movie, nor a children kind of film despite the young actors. Although it sounds so cliché, it must be said: this is a movie about love. When I first heard about it, I remember that I thought: "Oh, must be a cute movie". Well, it isn't 'cute'. There is a reason for these young actors: this vision of love this movie shows is exactly the vision we had as a child and that we lost when we became adults. Teenagers are in the border of both times, that's why they are here as the main characters.

## Yu's Journey

First of all, we need to meet Yu, the protagonist. He loses his mother early, and see his own father becoming a priest. Before his mother passes away, she shows a little statue of Mary to Yu saying: "Look, you'll find a woman who's just like Mary." Yu will carry this moment to the rest of his life.

Ten years after his mother's death we find Yu as a shy, silent and innocent boy who feels guilty for killing a ant and who lives with his father, who now is a priest. Things look peaceful between them. Then, comes a woman, and the movie begins. Her name is Kaori. She throws herself into the priest's arms and he can't help but feel in love with her. They start to live together, away from the church, hidden. Kaori isn't happy with that, though. She wants to marry Yu's father and fights with him because he can't marry her.

Because he needed to put his own ideas and beliefs aside to stay with Kaori, Yu's father, Takahiro, falls into sadness when Kaori leaves. He starts to feel very guilty and to project it into his son. He says Yu has to confess, but Yu has nothing to say, he is too pure. However, for the sake of his father, Yu starts to do stupid things just to help his father. In the beginning he kills ants and destroys a classmate's eraser but it makes his father even more sad. Yu sees that and starts to do perverted things to have real hard stuff to confess and make his father feels better.

## The Meeting

It all comes to change when the second woman comes in. Yoko Osawa was raised by a sex maniac who tried to fuck his own daughter. Her father's madness made Yoko hate all men. It's interesting here that no single character is superficial. They all have reasons to be who they are.

The scene Yu and Yoko first see each other is simply brilliant. The whole sequence is filmed as a children's action picture, like Power Rangers. It seems to be a Sono's specific choice, to make links with his childhood pop icons. Yu was dressed like a woman and he helps Yoko to kick some punks out. When Yoko tries to talk with him, he says he is "Sasori-san" (an old Japanese heroine). Yu, so used to seeing other girls' panties, accidentally see Yoko's and has a hard-on for the very first time. Yoko, thinking that Yu is a girl, falls in love with him.

## Love and Madness

Now how can Yu say the truth to a girl who hates men? What will happen with his father, living sad and alone in the church? A lot of other characters are still to come and the story gets more and more complex and beautiful with the time.

It's simply inexplicable how Sono made 237 minutes look like 90. The rhythm here is nothing but perfect. The final cut does not leave holes behind nor make the story boring. The soundtrack, which travels from classical music to psychedelic, is brilliant, specially in the sequence when Yu is starting to commit sins and Ravel's Bolero is playing in the background.

Despite all the problems they go through, Yu's love is inflexible. And it reaches the point he guards himself in his own madness being Sasori to continue loving her. Yoko needs to know again the childhood dreams to realize that Yu is the only person for her.

Yu's father needs to leave catholicism to find love. The movie is also a critic to the excess of spiritualism because the priest finds love when he accepts his own body as a part of his spirit, as a potential form of love too. This can be seen with Yu too—all along the picture he only has hard-on with Yoko. This can't be seen as a dirty thing. This is love expressing itself with the spirit and the body at the same time, purity and sexuality.
`;

const madadayoContent = `
The last legacy that two elder Japanese left to us, Hayakken Uchida-sensei and Kurosawa Akira-san. Usually I don't like to connect artistic stories to real life, like the artistic one being some kind of goal to reach in reality. But, usually, specially in Cinema, I need to put this out and accept that art can also be some sort of advice. This movie has two kinds of advice: Hayakken's about how to love things in life, about how to not be afraid from your emotions, and for us, westerners, there are too many small things about society we should learn from the Japanese, like the huge respect for the elders and their experience.

## Pure Cinema

This movie reminds me of Hayao Miyazaki's pictures. There is no big special problem, there is no evil to defeat, there is no mystery to be revealed. It's simply about life itself, the problems that come with it, the unexpected, the chaos coming from our order. All those things are so well constructed here that time doesn't seem to pass for the viewer, it's two hours and fourteen minutes of pleasure; aesthetic, intellectual and emotional pleasure.

Tatsuo Matsumura is doing a great job as the professor, he is incredibly charming and lovely with all his jokes, the simple way to look at life, the ability to deal with problems like thieves, or having his own house destroyed by the war... You can't help looking up to him. And you indeed feel like his students, being by his side throughout the film.

## Kurosawa's Farewell

Kurosawa was, again, brilliant orchestrating all the good and bad times of this story with amazing music, from Vivaldi (the four seasons' scene is specially wonderful) to popular Japanese songs that make you cry easily.

Like the last message Hyakken gives to the children in the film, the film itself is Kurosawa's message to us. The last scene he drew is beautiful. Nobody but him could end his own career that way. The ending makes you really want to say: "MADADAYO!, KUROSAWA"
`;

const barraventoContent = `
In Brazil there is some kind of cult to Glauber Rocha among Cinema lovers. I'm not one of those who thinks he was a genius or something, however, I do think he had a lot of talent.

In the 20s we started an artistic movement named "Modernism". Of course, this is not a singular event at all. When the 20th century came this kind of movement occurred all around the world. For me, the problem is that trying to create a "Brazilian way to make art" they fell into a "how to depict Brazilian culture with European techniques" and that's what Glauber Rocha is: Brazilian culture (well) represented by European ways.

I'm not one of those who thinks this is bad, though. European Cinema *is* the best, so what's the problem with drinking from this source? Kurosawa did and he is still a genius.

## Tradition vs Vanguard

*Barravento* is about tradition versus vanguard.

In a peaceful village where they live only for fishing, a former villager who went to the city to get a better life comes back and he brings with him a lot of "revolutionary" ideas. His ideas will face the old ways that have always dominated the head of the fishermen. Ideas about religion, about submission, about independence, freedom. His ways to make the villagers understand and follow his ideas are questionable, sometimes even stupid and mean, but his intentions are good. Nevertheless, he'll need to face the elder villagers and the priests of the African religion that rules this village.

## Religion as Opium

The great deal about this movie is that it seems to imply that all the fishermen should free their minds from the old ideas (and the reason for me to believe that is that last frame with Aruã and his head getting involved by the infinity, or the sky) and to manage that, the film depicts this religion pejoratively. It is shown with the beauty of their song and dance (which helped to create Samba), their beautiful clothes, their good intentions, but all the time as a primitive way of living. The idea of "religion is the opium of the people" is present in every sequence of this film and is depicted with passion.

Very influenced by Italian cinema (how not to remember *Stromboli* fishing sequences?), film noir and also Nouvelle Vague, the images are beautiful and the lighting work is awesome.

It is a real Brazilian classic. With European techniques, of course.
`;

const inTheMoodForLoveContent = `
I have to tell that I was quite afraid of rewatching it. The first time I saw it, I really liked but I was so sleepy that I couldn't understand this film completely.

Well, I'm happy I've decided to watch it again because I can say for sure that this is one of the finest dramas about love ever.

## The Essence

Now, let's get to the film. What is the essence of the film?

Let's assume you're with a woman. You're chatting, you find out that she likes *2001: A Space Odyssey* as much as you do. The atmosphere is good, you two have a lot in common. Now, she also tilts her head a little bit to you. Obviously, she's trying to make you kiss her. However, you aren't sure about this, this might be your head thinking too much. What if it isn't?

This is the moment Wong Kar-Wai calls *in the mood for love*.

If you ever try to remember one scene like these in your past, you'll find one. You'll remember that they are often very contemplative, *like slow shots*.

## Visual Poetry

*In the Mood for Love* portrays this climax of the seduction all around the film, using a slow camera that often stares at apparently useless objects or parts of the body. Most of the time, the camera is placed in a medium distance from the character, suggesting more than showing. That, combined with this heartbreaking Tango that plays all around the film and that beautiful Bolero sung by Nat King Cole is simply stunning.

## The Story

So, basically, stylish details apart, the movie is about a man (Mr. Chow) that innocently moves to a certain building in Hong Kong with his wife; and a woman (Mrs. Chan) that is also moving to this same building with her husband; although in different apartments. Soon they'll find out that Mr. Chow's wife is betraying him with Mr. Chan. From this tragic discovery will be born a complex fellowship. However, from this fellowship, in both lonely hearts love will start to burn and they'll have to deal with it. Somehow. Moral codes will come up, the Chinese paternalistic society will try to spoil it, their own consciousness will drive them crazy.

Therefore, the movie is, basically, an amazing aesthetic exercise of the most fiery moment of seduction. And Wong Kar-Wai did it more than rightly.
`;

const aquiEAgoraContent = `
"Aqui e Agora" é a terceira música de *Refavela*, um disco onde Gilberto Gil mostra sua interpretação da música popular que permeia as regiões mais pobres das grandes cidades do Brasil, essa região que é definitivamente um dos pilares da nossa cultura. Nesse disco encontramos Gil ensaiando sambas (*Samba do Avião*), Ijexás (*Ilê Ayê*), reggae (*No Norte da Saudade*), orquestrações com forte base percussiva, especialmente inspiradas nas nossas matrizes africanas.

## Música e Letra como Conjunto Indissociável

A música em questão é um exemplo perfeito da maior qualidade de Gilberto Gil como compositor: a capacidade de conceber música e letra como um conjunto indissociável. A letra varia entre tons maiores e menores, entre partes com fortes dissonâncias, especialmente acentuadas pelo violão. Quandoquer que Gil cante os versos do refrão "O melhor lugar do mundo / é aqui e agora" ouvimos a melodia e a harmonia andando em perfeita comunhão.

## Vida e Morte

Assim também se dá quando a letra pensa no aqui e agora como algo positivo, como algo belo, a experiência singular de existir em cada momento, o valor de se estar vivo, de poder experimentar o ambiente como algo a se admirar "Aqui perto passa um rio / Agora ouvi um lagarto" e a frase mais genial de toda a música, talvez de toda a discografia de Gil: **"Morrer deve ser tão frio / quanto na hora do parto"**. A ironia da frase acentua a contradição harmônica do ciclo da vida: viver e morrer.

## Dissonância e Sentido

Nos pontos da música onde ouvimos os tons menores e as dissonâncias mais acentuadas Gil canta, contrariamente, de momentos onde a vida não tem sentido: "Aqui onde indefinido / Agora que é quase quando / Quando ser leve ou pesado / deixa de fazer sentido".

A música transita perfeitamente entre um momento e outro, a letra e a harmonia fazem tudo ser um só, e nos ensina a valorizar cada momento da nossa vida porque em cada momento vivemos a dualidade da vida e da morte, que só são opositoras na tibieza da lógica, escrava da linguagem.
`;

const gilversoContent = `
Uma das críticas mais comuns que são feitas por parte da direita conservadora, uma direita historicamente infértil para cultura, na sua forma brasileira, é a de que artistas como Chico Buarque, Caetano Veloso e Gilberto Gil falam sobre a pobreza de uma forma bastante poética e confortável, do alto dos seus apartamentos na Urca. Não é, é necessário admitir, uma crítica totalmente sem fundamento. Chico Buarque provavelmente sairia correndo com um grito estéril se o menino de *Meu Menino* pudesse abordá-lo na rua e tenho pra mim que buzinaria quando o operário de *Construção* caísse na pista, impedindo seu caminho para o futebolzinho de domingo.

Mas é preciso levar adiante a crítica, e para levá-la adiante teríamos que nos perguntar: então, o que fazemos com ela? Obrigamos os artistas a passarem fome para terem "lugar de fala"? E se, ao que parece, a premissa da muito válida crítica é: "tu não deves falar daquilo que não conheces" precisamos orientá-la de volta para seu lugar de origem: e que "lugar de fala" tem essas mesmas pessoas, que nunca foram capazes de parir um só filho cultural no nosso país?

## O Paradoxo

Não precisamos mais adentrar nesse balaio de gato. Acho que podemos tirar algo construtivo disso, a saber, que podemos ver a crítica menos como uma crítica porque não apresenta elementos construtivos e mais como um paradoxo. Um paradoxo, para dar uma definição formal, é algo que o mero som da palavra causa coceira aos lógicos, e que leva os meninos das escolas politécnicas a olharem pra você um olhar bovino de quem suspeita que você está sob efeito de substâncias ilegais:

> Situação ou afirmação que contém uma contradição ou uma falta de lógica.

Por exemplo, é um paradoxo dizer que Anitta é simultaneamente bonita e feia. É um paradoxo dizer que a direita é esquerda. Constitui paradoxo também dizer que paradoxo é lógico, ou que paradoxo é harmônico.

## Taoísmo e Pensamento Oriental

Alguns diriam até que paradoxos são parte constituinte do mundo que vivemos. O Taoísmo, por exemplo, da onde saiu o yin e yang que todos conhecemos, têm nesse símbolo uma representação do seu cosmos. Jung descreve breve e poeticamente o Tao assim, no início de *The Secret of the Golden Flower*:

> Eterna é apenas a Flor Dourada, que floresce da liberação de todo amarramento às coisas. Um homem que atinge esse estágio transpõe seu ego; ele não está mais limitado pela mônada; mas penetra no círculo mágico da dualidade polar de todos os fenômenos

Gilberto Gil sempre se interessou por pensamento oriental, isso nunca foi segredo. E você não precisava ler um tweet dele pra saber disso, basta olhar para sua obra. O paradoxo é tema e ferramenta da obra de Gilberto Gil, está presente em quase todas as suas músicas — se não todas.

## Metáfora

Podemos começar com uma música que muitos da minha geração leram nos livros didáticos:

> Uma lata existe para conter algo
> Mas quando o poeta diz: "lata"
> Pode estar querendo dizer: "o incontível"

"Metáfora" foi utilizada para falar de poesia como um todo, e de fato ele cumpre essa função, mas nem todos os poetas fazem uso de metáforas tão radicais. Gil faz. Chamar algo que significa "aquilo que existe para conter" algo para significar "incontível" é, na minha opinião, o grande talento lírico de Gil.

## Drão

> Drão, o amor da gente é como um grão
> Uma semente de ilusão
> **Tem que morrer pra germinar**
> Plantar n'algum lugar
> Ressuscitar no chão nossa semeadura

"Drão" é uma das minhas preferidas, e nela se observa em muitas partes como a linguagem poética de Gil é uma linguagem de harmonia de paradoxos; em Gil, os paradoxos se completam, se misturam e só podem ser entendidos quando vistos na sua relação de simultânea tensão e harmonia. Essa canção reflete isso em muitas camadas. O grão, parte inerte da planta, precisa ser arrancado daquilo que a ele concede vida. Um grão, efetivamente, é algo morto quando tirado da sua planta. Semeamos o chão com grãos mortos, que germinam e tornam-se em plantas, que tornamos a matar ao removermos ela do chão, ingerirmos e, por meio dela, nos mantemos vivos. Esse ciclo de vida e morte Gil traduz também para o relacionamento dele com Sandra, que era chamada de Sandrão e, por isso, Drão.

> Quem poderá fazer
> Aquele amor morrer?
> Nossa *caminhadura*?
> Cama de tatame
> Pela vida afora

Esse é o segundo refrão da música. Para contexto, no primeiro usa "caminhadura" logo antes de "dura caminhada", apontando o sentido desse caminhar: uma caminhada difícil, custosa. Nesse segundo refrão, "caminhadura" aponta para um novo horizonte de sentido: "cama de tatame", abrindo o sentido de "caminhadura" para "caminha dura", uma cama, um lugar de repouso e de amor para casais, aqui posto de frente para a realidade de um relacionamento intricado: a cama é dura, a cama é um tatame, é um lugar onde há embate físico também. Gil ainda finaliza essa segunda estrofe com um "Pela vida afora", que conserva a dualidade de sentido.

## Extra

Outras vezes vemos Gil apresentar o paradoxo não como parte da letra de uma música, mas como o ponto de partida lírico para ela. Acredito que esse seja o caso de "Extra", cuja melhor gravação com certeza é a que Gil fez participando do acústico do saudoso Cidade Negra. "Extra" é curiosa porque a chamada dela é a chamada de um jornal ordinário, chamando pela última notícia, a última fofoca, e a letra fala de eventos efetivamente apocalípticos, épicos, e pede a todos os deuses por salvação nos níveis mais altos e profundos: "acha nossa direção, flecha nosso coração, puxa pelo nosso amor".

## A Novidade

Voltamos agora ao ponto de que partimos porque tudo deve retornar à sua origem. Creio que Gilberto Gil tem consciência desse paradoxo do artista, e creio que ele fez com o paradoxo a única coisa que se pode fazer: contemplar. O resultado dessa contemplação é "A Novidade", e vou me atrever a falar de música de novo: a versão do acústico do Gilberto Gil é definitiva. Os paradoxos começam já desde o início:

> A novidade era o máximo do paradoxo
> Estendido na areia
> Alguns a desejar seus beijos de deusa,
> outros a desejar seu rabo pra ceia

A novidade, apresentada desde o início é um paradoxo, e um paradoxo que causa algo como um conflito. Digo "algo como um conflito" porque os assaltantes da novidade querem coisas diferentes dela.

> E a novidade que seria um sonho
> O milagre risonho da sereia
> Virava um pesadelo tão medonho
> Ali naquela praia, ali na areia

> A novidade era a guerra
> Entre o feliz poeta e o esfomeado
> Estraçalhando uma sereia bonita
> Despedaçando o sonho pra cada lado

Aqui o paradoxo está explícito. A novidade é simultaneamente um milagre e um pesadelo medonho, ela se tornava a guerra entre o feliz poeta, o próprio Gilberto Gil, e o esfomeado. A novidade, embora não tenha e não deva ter um significado preciso, pode ser vista, de um certo ângulo, como o sofrimento, o conflito, que o poeta vê como algo universal, que ele despedaça e espalha pelo mundo, unindo-nos em torno de algo que compartilhamos. "O poeta só é grande se sofrer", já dizia Vinicius de Moraes. E que o esfomeado, por sua vez, destrói já que na sua condição ele só vê a necessidade de realizar sua fome.

A novidade também pode ser vista, de outro ângulo, como o descobrimento de algo maravilhoso no mundo que é visto por alguns como fonte de encanto, onde o poeta pode ser o professor, e por outro como fonte de realização de ambições mesquinhas, onde o esfomeado por nunca ter passado fome. Em qualquer desses dois sentidos acredito que mora a leitura de Gil sobre a "crítica", o poeta observa algo e descreve como a ele lhe cabe. Isso que ele descreve pode ser uma sereia maravilhosa, que outro pode ler como uma baleia cujo rabo deve ser cortado para nossa ceia.
`;

const paisagemDaJanelaContent = `
Composição de **Lô Borges** e **Fernando Brant**.

Paisagem da Janela é sobre essa coisa de menino de se imaginar como guerreiro, como alguém que luta contra monstros e passa por situações épicas, e a dificuldade das meninas de entenderem esse nosso impulso. Cada vez mais acredito que esse tipo de comportamento é uma herança dos milhares e milhares de anos que passamos sendo responsáveis por sair de casa e trazer comida, enfrentando todo tipo de perigo que pra nós hoje só pode ser traduzido por essas figuras imaginárias de dragões, vampiros e todo tipo de quimera.

## O Pronome "Desses"

As meninas tendem a ter preocupações que ao longo do tempo não precisaram desses ajustes fantásticos, como cuidar de casa, filhos, estabilidade, futuro. "Quando eu falava dessas cores mórbidas", também desses "homens sórdidos", e "desses temporais", "você não escutou". É notável o uso do pronome "desses", que marca que não são quaisquer cores mórbidas ou quaisquer homens sórdidos, mas sim daqueles que meninos fantasiam.

## Cultura e Biologia

Concordo que essas coisas têm um fator cultural, e essa é a explicação mais aceitável, que dá forma e cores pra esses impulsos, mas ao mesmo tempo existe um fator biológico (pensando biologia como uma categoria mais ampla, como evolução), como se essas coisas estivessem em nós não simplesmente como uma herança cultural mas uma herança evolutiva, que está impressa no nosso corpo — corpo esse que mudou muito pouco de 200 mil anos atrás até 5 mil anos, quando começamos a deixar de ser nômades.

## Michael Levin e Clube da Esquina

Eu não poderia chegar a essas conclusões sem ter ouvido falar do incrível **Michael Levin**, e todas essas ideias surgiram simultaneamente, enquanto ouvia incansavelmente *Clube da Esquina No. 2* e ouvia os podcasts do **Michael Levin**.
`;

const agriculturaSintropicaContent = `
Para além dos resultados incríveis especialmente em caatingas, os sistemas de **agrofloresta** e **agricultura sintrópica** me encantam pelos seus fundamentos filosóficos. Há pelo menos 6 anos venho tentando entender como podemos olhar para o mundo não do ponto de vista de seu dominador ou colonizador e sim do ponto de vista de uma parte num organismo maior que o nosso. Tenho até pensado em ler **Spinoza**, socorro. A ideia é interessantíssima porque também se relaciona com as coisas que tenho aprendido com **Michael Levin**, especialmente a conclusão dele de que não existe inteligência individual, apenas coletiva.

## Células

Um exemplo fácil de se lembrar é o das células do nosso corpo. Dado um corte na nossa pele, todo nosso corpo se movimenta, independente da nossa consciência, para reorganizar a ferida e curá-la. Ora, mas o que há de interessante nisso? Em primeiro lugar, há uma seleção específica de quais células precisam se mover e pra qual parte do corpo. Células de defesa que devem impedir a contaminação e a infecção, plaquetas que ajudam na contenção do sangue, etc. Em alguns casos, como quando crianças perdem a ponta de seus dedos, uma parte inteira do corpo pode ser restaurada. O que se tira disso, obviamente, é que o corpo consegue 1. identificar que está danificado 2. sabe reconhecer quando não está mais. Eu me pergunto como processos assim podem ter sido estudados por tantos anos sem que se tenha atribuído qualquer grau de agência às células.

## O Ser Humano como Célula

Acho que o ser humano é algo como uma célula num corpo maior. Acho que nos diferenciamos de forma semelhante a células, com aqueles que servem para proteção física, aqueles que servem para organização espiritual, aqueles que servem para resolver problemas estruturais. Acho que não estamos conscientes do processo como um todo, mas que não agimos de forma completamente independente das necessidades do planeta. Mesmo quando o destruímos. Não existe, evidentemente, criação nem transformação sem destruição.

## Ecologia

Pra mim a maior dificuldade de me identificar como ecologista sempre foi a de acreditar que certas coisas precisam ser conservadas pelo simples fato de elas existirem, acho que isso é ir de encontro à natureza e ao fluxo da vida como um todo. Acho que eles cumprem sua função dentro do nosso sistema, eles são motores de certas mudanças fundamentais e que pra que essas mudanças fundamentais aconteçam precisamos deles como forças influenciadoras das outras células humanas, por assim dizer. O ideal deles nunca será cumprido, mas a energia deles também não é desperdiçada.

## Ernst Götsch

A ideia de **Ernst Götsch** se alinha com a desses autores — **Spinoza**, **Michael Levin** — justamente nesse ponto: ele aplica esse mesmo pensamento à natureza e, ao fazê-lo, muda o conceito de agricultura que conhecemos. Todo o tempo que passamos forçando a natureza a servir às nossas necessidades nos ensinou, entre outras coisas, que a natureza não serve a esse fim, e a ideia de Götsch é permitir que ela sirva aos próprios fins para servir aos nossos de forma secundária. O conceito de agrofloresta (em suma, o cultivo de árvores nativas em comunhão com uma cultura agrícola) já existia antes dele, mas ele introduz tanto essa visão filosófica do problema quanto técnicas de acelerar esse processo.
`;

const laStradaContent = `
*La Strada*, translated to English as *The Road*, was the fourth film from Federico Fellini. In this film it's already clear to the audience some of the elements we would see in his most famous works: the circus, the symbolism, the female importance and the originality of this incredible filmmaker who created a very personal style exactly when everyone around him was jumping in the Neo-Realism car.

Not that he was completely away from it. This film has some important neo-realistic characteristics, such as the outdoor scenarios and the raw portrayal of life.

## A Fairy Tale

*La Strada* is almost a fairy-tale. Stereotyped characters, simple plot and moral convictions. However, it's this Fellini's young style the interesting part of it. The combination of both elements gave to this movie some kind of a familiar atmosphere that makes it praiseworthy for any audience.

It's a touching movie, filled with iconic characters and an absolutely charming Chaplin-like performance from Fellini's wife Giulietta Masina.
`;

const harakiriContent = `
Masterpiece.

I only have compliments for this movie, it rocks in every single aspect. Therefore I'd like to start talking about the main subject here: the samurai code and its value.

## The Decadent Samurai

If you have watched *Yojimbo* or even *Sanjuro* you probably remember of this character played by Toshiro Mifune. That mocking and sarcastic ronin capable of taking advantage of two different masters for his own sake. Of course this is an image of a decadent samurai, a samurai that certainly lost all the respect for the *Bushido*.

Losing the respect for Bushido is the theme of this movie. It shows a samurai walking on the border of this ancient code, facing it, questioning it, criticizing it. I can easily imagine Tsubaki Sanjuro passing through this same doubts, in his own way.

## Hanshiro Tsugumo

This story is about Hanshiro Tsugumo, whose son-in-law died trying to break the code for the sake of his family. Tsugumo soon realizes that this code does not mean shit when you are a man trying to help your family.

I can't go any further on the screenplay. I think that what I've said is enough to at least create some curiosity without spoiling it. But be ready and listen to those dialogues with all your attention.

## Visual Mastery

The cinematography is simply awesome, brilliant, wonderful. Japanese directors seem to be specialists in using light wisely; the photography of this movie is almost enough to make you feel amazed by it.

And I can't forget talking about those symbols, specially the Iyi clan symbol. It's a lotus enclosed by a square. It symbolizes the clan's own radicalism and anchorage with Bushido. Like they're trapped by it. Also the samurai armor is a symbol of the old samurai image, which Tsugumo violently throws to the floor and disassembles it.

## The Duel

This movie also has one of the best—if not *the* best—samurai duels ever. Probably the best for me. It's the one between Tsugumo and the last Iyi retainer alive. Simply awesome.

Nevertheless, this is a fundamental movie for those who love samurai cinema, specially those made after the war, filled with anti-heroes and this noir environment. It's on my favorite list.
`;

export const blogPosts: BlogPost[] = [
  {
    slug: "through-a-glass-darkly-bergman",
    title: "Through a Glass Darkly",
    date: "Jul 20, 2012",
    category: "Cinema",
    excerpt:
      "This must be the third or fourth time I watch Ingmar Bergman's Through a Glass Darkly and it still holds up as one of the best films I've ever seen. The paradox between human desire and sin is the key to understanding this film.",
    content: throughAGlassDarklyContent,
    readingTime: calculateReadingTime(throughAGlassDarklyContent),
    tags: ["bergman", "schizophrenia", "freud", "christianity", "film-analysis"],
  },
  {
    slug: "no-country-for-old-men",
    title: "No Country for Old Men",
    date: "Aug 31, 2012",
    category: "Cinema",
    excerpt:
      "No Country for Old Men is a film about the randomness of destiny and the inability to deal with it whether you are an experienced person or not. Or if you prefer, it's about the innocence of the idea of maturity itself.",
    content: noCountryContent,
    readingTime: calculateReadingTime(noCountryContent),
    featured: true,
    tags: ["coen-brothers", "destiny", "western", "philosophy"],
  },
  {
    slug: "the-thin-red-line",
    title: "The Thin Red Line",
    date: "Nov 10, 2012",
    category: "Cinema",
    excerpt:
      "Malick likes to make you think. He raises more questions than answers. If you start watching this movie knowing that Malick wants to make you contemplate each image as you would contemplate Van Gogh's pair of shoes, you're going in the right way.",
    content: thinRedLineContent,
    readingTime: calculateReadingTime(thinRedLineContent),
    tags: ["malick", "war", "philosophy", "heidegger"],
  },
  {
    slug: "the-sacrifice-tarkovsky",
    title: "The Sacrifice (Offret)",
    date: "Aug 7, 2012",
    category: "Cinema",
    excerpt:
      "Although the cinematography is gorgeous, absolutely wonderful, a real proof that Nykvist was one of the best DoP ever, the screenplay was seriously damaged by Tarkovsky's own spiritual and moral beliefs.",
    content: sacrificeContent,
    readingTime: calculateReadingTime(sacrificeContent),
    tags: ["tarkovsky", "christianity", "sacrifice", "nietzsche"],
  },
  {
    slug: "masculin-feminin-godard",
    title: "Masculin Féminin",
    date: "Jun 11, 2012",
    category: "Cinema",
    excerpt:
      "Every single time I watch a Godard film I get more and more involved by his ability to develop cinema in all sorts of situations. His attempt to depict the life of youngsters is the best part of the film.",
    content: masculinFemininContent,
    readingTime: calculateReadingTime(masculinFemininContent),
    tags: ["godard", "french-new-wave", "youth", "60s"],
  },
  {
    slug: "harakiri-kobayashi",
    title: "Harakiri (切腹)",
    date: "May 23, 2012",
    category: "Cinema",
    excerpt:
      "Masterpiece. Losing the respect for Bushido is the theme of this movie. It shows a samurai walking on the border of this ancient code, facing it, questioning it, criticizing it.",
    content: harakiriContent,
    readingTime: calculateReadingTime(harakiriContent),
    tags: ["samurai", "bushido", "kobayashi", "japanese-cinema", "anti-hero"],
  },
  {
    slug: "love-exposure-sono",
    title: "Love Exposure (愛のむきだし)",
    date: "May 4, 2012",
    category: "Cinema",
    excerpt:
      "This is not an easy-digest movie. This vision of love this movie shows is exactly the vision we had as a child and that we lost when we became adults.",
    content: loveExposureContent,
    readingTime: calculateReadingTime(loveExposureContent),
    tags: ["sion-sono", "japanese-cinema", "love", "religion", "sexuality"],
  },
  {
    slug: "madadayo-kurosawa",
    title: "Madadayo (まあだだよ)",
    date: "Apr 17, 2012",
    category: "Cinema",
    excerpt:
      "The last legacy from Kurosawa. A movie about how to love things in life, about how to not be afraid from your emotions.",
    content: madadayoContent,
    readingTime: calculateReadingTime(madadayoContent),
    tags: ["kurosawa", "japanese-cinema", "life", "farewell"],
  },
  {
    slug: "barravento-rocha",
    title: "Barravento",
    date: "May 26, 2012",
    category: "Cinema",
    excerpt:
      "Barravento is about tradition versus vanguard. Brazilian culture (well) represented by European ways.",
    content: barraventoContent,
    readingTime: calculateReadingTime(barraventoContent),
    tags: ["glauber-rocha", "brazilian-cinema", "modernism", "religion"],
  },
  {
    slug: "in-the-mood-for-love-wong",
    title: "In the Mood for Love (花樣年華)",
    date: "Aug 16, 2012",
    category: "Cinema",
    excerpt:
      "One of the finest dramas about love ever. An amazing aesthetic exercise of the most fiery moment of seduction.",
    content: inTheMoodForLoveContent,
    readingTime: calculateReadingTime(inTheMoodForLoveContent),
    tags: ["wong-kar-wai", "hong-kong", "romance", "seduction"],
  },
  {
    slug: "la-strada-fellini",
    title: "La Strada",
    date: "Aug 16, 2012",
    category: "Cinema",
    excerpt:
      "Almost a fairy-tale. A touching movie with an absolutely charming Chaplin-like performance from Giulietta Masina.",
    content: laStradaContent,
    readingTime: calculateReadingTime(laStradaContent),
    tags: ["fellini", "italian-cinema", "neo-realism", "circus"],
  },
  {
    slug: "agricultura-sintropica",
    title: "Agricultura Sintrópica",
    date: "Feb 11, 2026",
    category: "Philosophy",
    excerpt:
      "Os sistemas de agrofloresta e agricultura sintrópica me encantam pelos seus fundamentos filosóficos. Acho que o ser humano é algo como uma célula num corpo maior.",
    content: agriculturaSintropicaContent,
    readingTime: calculateReadingTime(agriculturaSintropicaContent),
    tags: ["agrofloresta", "agricultura-sintropica", "spinoza", "michael-levin", "ernst-gotsch", "ecologia", "cell-memory"],
  },
  {
    slug: "paisagem-da-janela-milton-nascimento",
    title: "Paisagem da Janela",
    date: "Feb 11, 2026",
    category: "Music",
    excerpt:
      "Paisagem da Janela é sobre essa coisa de menino de se imaginar como guerreiro, e a dificuldade das meninas de entenderem esse impulso. Uma herança evolutiva impressa no corpo.",
    content: paisagemDaJanelaContent,
    readingTime: calculateReadingTime(paisagemDaJanelaContent),
    tags: ["milton-nascimento", "mpb", "fantasia", "masculinidade", "infância", "análise", "cell-memory"],
  },
  {
    slug: "aqui-e-agora-gilberto-gil",
    title: "Aqui e Agora",
    date: "Nov 11, 2023",
    category: "Music",
    excerpt:
      "A análise de 'Aqui e Agora' revela a maior qualidade de Gilberto Gil: a capacidade de conceber música e letra como um conjunto indissociável, transitando entre vida e morte.",
    content: aquiEAgoraContent,
    readingTime: calculateReadingTime(aquiEAgoraContent),
    tags: ["gilberto-gil", "mpb", "refavela", "análise"],
  },
  {
    slug: "um-gilverso-para-explorar",
    title: "Um Gilverso para se Explorar",
    date: "Nov 11, 2023",
    category: "Music",
    excerpt:
      "O paradoxo é tema e ferramenta da obra de Gilberto Gil. Em Gil, os paradoxos se completam, se misturam e só podem ser entendidos na sua relação de simultânea tensão e harmonia.",
    content: gilversoContent,
    readingTime: calculateReadingTime(gilversoContent),
    tags: ["gilberto-gil", "mpb", "paradoxo", "taoísmo", "análise"],
  },
];

export const blogCategories: BlogCategory[] = [...new Set(blogPosts.map(p => p.category))];
