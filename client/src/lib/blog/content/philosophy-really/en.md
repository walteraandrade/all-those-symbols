---
title: Philosophy, really?
date: 2026-11-03
category: Philosophy
excerpt: 'From a Philosophy BA to software engineering: how Aristotle, Frege, Boole and Shannon connect the two, and why the most useful question in engineering is still "what do we mean by this word?"'
readingTime: 9
featured: true
tags: [philosophy, logic, frege, software-engineering, ai, career]
---

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
[^2]: The accounts of Leibniz, Frege, Boole and Shannon were simplified here to fit this format, and each deserves far more nuance than a blog post allows. To read more: [Gottfried Leibniz](https://plato.stanford.edu/entries/leibniz/), [Gottlob Frege](https://plato.stanford.edu/entries/frege/) and [George Boole](https://plato.stanford.edu/entries/boole/) in the Stanford Encyclopedia of Philosophy; for Shannon, his master's thesis, [A Symbolic Analysis of Relay and Switching Circuits](https://dspace.mit.edu/handle/1721.1/11173) (MIT, 1937), and [the SEP entry on Information](https://plato.stanford.edu/entries/information/).
