import{j as e,r as i}from"./vendor-motion-DBiROnkR.js";import"./vendor-react-Bzgz95E1.js";const s=[{name:"Modulart",desc:"Event platform for creative industries"},{name:"NaPorta",desc:"Last-mile delivery orchestration"},{name:"Payssego",desc:"Fintech payment infrastructure"},{name:"Vivenda",desc:"Construction project management"},{name:"ioP Pet",desc:"Mobile app for pet owners"},{name:"AI Decco",desc:"AI-powered interior design"},{name:"HTML-DOCX",desc:"Document format converter"},{name:"Aetheria",desc:"Atmospheric exploration game"},{name:"Smells Like Job Spirit",desc:"Job search browser extension"},{name:"The Thought Weaver",desc:"Connected note-taking system"}],g=[{title:"Persona: Mirrors of the Self",director:"Bergman"},{title:"Stalker: Faith in Ruins",director:"Tarkovsky"},{title:"Breathless: Grammar of Rebellion",director:"Godard"},{title:"Rashomon: Truth Fragmented",director:"Kurosawa"},{title:"In the Mood for Love: Unsaid",director:"Wong Kar-Wai"},{title:"8½: Dreams Inside Dreams",director:"Fellini"},{title:"Gilberto Gil: Tropicália Logic",director:"Music"}],m=["TypeScript","Python","Next.js","React","Node.js","PostgreSQL","AWS","GCP","Docker","GraphQL"],h=`
    ╔═══════════════════════════════╗
    ║   LOGIC × PHILOSOPHY × CODE   ║
    ╚═══════════════════════════════╝
`,n=({children:r,delay:a=0,className:c=""})=>{const o=i.useRef(null),[l,d]=i.useState(!1);return i.useEffect(()=>{const t=new IntersectionObserver(([p])=>{p.isIntersecting&&(setTimeout(()=>d(!0),a),t.disconnect())},{threshold:.1});return o.current&&t.observe(o.current),()=>t.disconnect()},[a]),e.jsx("div",{ref:o,className:`reveal ${l?"visible":""} ${c}`,children:r})},x=()=>e.jsx("span",{className:"cursor","aria-hidden":"true"}),v=()=>e.jsxs("nav",{className:"nav",children:[e.jsx("a",{href:"#projects",children:"projects"}),e.jsx("a",{href:"#blog",children:"writings"}),e.jsx("a",{href:"#tech",children:"stack"}),e.jsx("a",{href:"#contact",children:"contact"})]}),_=()=>e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero__left",children:[e.jsxs("h1",{className:"hero__name glitch",children:[e.jsx("span",{children:"Walter"}),e.jsx("span",{children:"Andrade"}),e.jsx(x,{})]}),e.jsxs("p",{className:"hero__tagline",children:["Logic ",e.jsx("span",{children:"×"})," Philosophy ",e.jsx("span",{children:"×"})," Code"]})]}),e.jsxs("div",{className:"hero__right",children:[e.jsx("pre",{className:"ascii","aria-hidden":"true",children:h}),e.jsx("p",{className:"hero__title",children:"Current Position"}),e.jsxs("p",{className:"hero__role",children:["Senior Software Engineer @ ",e.jsx("a",{href:"#",children:"SmartHow"})]}),e.jsxs("p",{className:"hero__bio",children:["Software developer with a philosophy degree in ",e.jsx("strong",{children:"logic"}),". Building AI interview bots, fintech systems, e-learning platforms, and mobile applications. Philosophy teaches how to find"," ",e.jsx("strong",{children:"clarity in complexity"}),"."]})]})]}),f=({project:r,index:a})=>e.jsxs("article",{className:"project-card","data-index":String(a+1).padStart(2,"0"),children:[e.jsxs("span",{className:"project-card__header",children:["Project #",String(a+1).padStart(2,"0")]}),e.jsx("h3",{className:"project-card__name",children:r.name}),e.jsx("p",{className:"project-card__desc",children:r.desc}),e.jsx("a",{href:"#",className:"project-card__link",children:"view_project"})]}),b=()=>e.jsxs("section",{className:"projects",id:"projects",children:[e.jsxs("header",{className:"projects__header",children:[e.jsx("h2",{className:"projects__title",children:"Selected Works"}),e.jsx("span",{className:"projects__count",children:s.length})]}),e.jsx("div",{className:"projects__grid",children:s.map((r,a)=>e.jsx(n,{delay:a*50,children:e.jsx(f,{project:r,index:a})},r.name))})]}),j=()=>e.jsxs("section",{className:"blog",id:"blog",children:[e.jsx("aside",{className:"blog__sidebar",children:e.jsx("h2",{children:"Writings"})}),e.jsxs("div",{className:"blog__content",children:[e.jsx("p",{className:"blog__intro",children:"Cinema analysis as philosophical investigation. Bergman, Tarkovsky, Godard, Kurosawa, Wong Kar-Wai, Fellini — directors who make visible the invisible structures of thought."}),e.jsx("ul",{className:"blog__list",children:g.map((r,a)=>e.jsx(n,{delay:a*30,children:e.jsxs("li",{className:"blog__item",children:[e.jsx("span",{className:"blog__number",children:String(a+1).padStart(2,"0")}),e.jsx("span",{className:"blog__item-title",children:r.title}),e.jsx("span",{className:"blog__item-meta",children:r.director})]})},r.title))})]})]}),u=()=>e.jsxs("section",{className:"tech",id:"tech",children:[e.jsx("h2",{className:"tech__title",children:"Technology Stack"}),e.jsx("div",{className:"tech__list",children:m.map((r,a)=>e.jsx(n,{delay:a*20,children:e.jsx("span",{className:"tech__item",children:r})},r))})]}),y=()=>e.jsxs("section",{className:"contact",id:"contact",children:[e.jsx("div",{className:"contact__left",children:e.jsxs("p",{className:"contact__cta",children:["Let's",e.jsx("br",{}),"Build",e.jsx("br",{}),"Something"]})}),e.jsxs("div",{className:"contact__right",children:[e.jsx("a",{href:"mailto:walteraandrade@gmail.com",className:"contact__link",children:"walteraandrade@gmail.com"}),e.jsx("a",{href:"https://github.com/walteraandrade",className:"contact__link",children:"github.com/walteraandrade"}),e.jsx("a",{href:"#",className:"contact__link",children:"linkedin.com/in/walterandrade"}),e.jsx("a",{href:"#",className:"contact__link",children:"discord"})]})]}),w=()=>{const r=new Date().toISOString();return e.jsxs("footer",{className:"footer",children:[e.jsxs("span",{children:["© ",new Date().getFullYear()," Walter Andrade"]}),e.jsxs("span",{className:"footer__timestamp",children:["Last build: ",r]})]})},k=`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');

:root {
  --color-black: #000000;
  --color-white: #F5F5F0;
  --color-red: #FF0000;
  --color-grey: #888888;
  --color-dark-grey: #1A1A1A;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 64px;
  --spacing-xxl: 128px;
  --border-thin: 1px solid #000000;
  --border-standard: 2px solid #000000;
  --border-thick: 4px solid #000000;
  --border-red: 2px solid #FF0000;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: auto; }
body { font-family: var(--font-mono); background-color: var(--color-white); color: var(--color-black); line-height: 1.6; overflow-x: hidden; }

.scanlines::after {
  content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px);
  pointer-events: none; z-index: 9999;
}

.nav {
  position: fixed; top: 0; left: 0; width: 100%; background: var(--color-black); color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-md); border-bottom: var(--border-thick); border-color: var(--color-red);
  z-index: 100; display: flex; gap: var(--spacing-lg); font-size: 0.875rem;
}
.nav::before { content: '>'; color: var(--color-red); animation: blink 1s step-end infinite; }
.nav a { color: var(--color-white); text-decoration: none; text-transform: uppercase; letter-spacing: 2px; }
.nav a:hover { color: var(--color-red); text-decoration: line-through; }

.hero {
  min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
  border-bottom: var(--border-thick); margin-top: 48px;
}
.hero__left {
  padding: var(--spacing-xxl) var(--spacing-xl); display: flex; flex-direction: column;
  justify-content: center; border-right: var(--border-standard);
}
.hero__right {
  background: var(--color-black); color: var(--color-white); padding: var(--spacing-xl);
  display: flex; flex-direction: column; justify-content: flex-end;
}
.hero__name {
  font-size: clamp(3rem, 8vw, 8rem); font-weight: 800; line-height: 0.9;
  text-transform: uppercase; letter-spacing: -4px; margin-bottom: var(--spacing-lg);
}
.hero__name span { display: block; margin-left: -4px; }
.hero__tagline {
  font-size: 1.5rem; font-weight: 400; border-top: var(--border-standard);
  padding-top: var(--spacing-md); display: flex; align-items: center; gap: var(--spacing-sm);
}
.hero__tagline span { color: var(--color-red); }
.hero__title { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 4px; color: var(--color-grey); margin-bottom: var(--spacing-sm); }
.hero__role { font-size: 1.25rem; margin-bottom: var(--spacing-xl); }
.hero__role a { color: var(--color-red); text-decoration: none; }
.hero__bio { font-size: 1rem; max-width: 500px; line-height: 1.8; }
.hero__bio strong { color: var(--color-red); }

.cursor {
  display: inline-block; width: 0.6em; height: 1.1em; background: var(--color-red);
  margin-left: var(--spacing-xs); animation: blink 1s step-end infinite; vertical-align: text-bottom;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.projects { padding: var(--spacing-xl); border-bottom: var(--border-thick); }
.projects__header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: var(--spacing-xl); border-bottom: var(--border-standard); padding-bottom: var(--spacing-md);
}
.projects__title { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 4px; }
.projects__count { font-size: 4rem; font-weight: 800; line-height: 1; }
.projects__grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2px; background: var(--color-black); border: var(--border-standard);
}

.project-card {
  background: var(--color-white); padding: var(--spacing-lg); display: flex;
  flex-direction: column; min-height: 200px; position: relative; transition: none;
}
.project-card::before {
  content: attr(data-index); position: absolute; top: var(--spacing-sm); right: var(--spacing-sm);
  font-size: 3rem; font-weight: 800; color: rgba(0, 0, 0, 0.05); line-height: 1;
}
.project-card:hover { background: var(--color-black); color: var(--color-white); }
.project-card:hover::before { color: rgba(255, 255, 255, 0.1); }
.project-card__header { font-size: 0.75rem; color: var(--color-grey); margin-bottom: var(--spacing-sm); text-transform: uppercase; letter-spacing: 2px; }
.project-card__name { font-size: 1.5rem; font-weight: 700; margin-bottom: var(--spacing-sm); }
.project-card__desc { font-size: 0.875rem; flex-grow: 1; color: var(--color-grey); }
.project-card:hover .project-card__desc { color: var(--color-white); }
.project-card__link { margin-top: var(--spacing-md); font-size: 0.875rem; color: var(--color-red); text-decoration: none; }
.project-card__link::before { content: '> '; }

.blog { display: grid; grid-template-columns: 200px 1fr; border-bottom: var(--border-thick); }
.blog__sidebar {
  background: var(--color-black); color: var(--color-white); padding: var(--spacing-lg);
  writing-mode: vertical-rl; text-orientation: mixed; display: flex;
  align-items: center; justify-content: center;
}
.blog__sidebar h2 { font-size: 2rem; text-transform: uppercase; letter-spacing: 8px; }
.blog__content { padding: var(--spacing-xl); }
.blog__intro { max-width: 600px; margin-bottom: var(--spacing-xl); font-size: 1rem; line-height: 1.8; }
.blog__list { list-style: none; }
.blog__item {
  border-bottom: var(--border-thin); padding: var(--spacing-md) 0;
  display: grid; grid-template-columns: 80px 1fr auto; gap: var(--spacing-lg); align-items: baseline;
}
.blog__item:hover {
  background: var(--color-black); color: var(--color-white);
  margin: 0 calc(var(--spacing-lg) * -1); padding-left: var(--spacing-lg); padding-right: var(--spacing-lg);
}
.blog__number { font-size: 0.75rem; color: var(--color-grey); }
.blog__item:hover .blog__number { color: var(--color-red); }
.blog__item-title { font-weight: 700; }
.blog__item-meta { font-size: 0.75rem; color: var(--color-grey); }

.tech { padding: var(--spacing-xl); background: var(--color-dark-grey); color: var(--color-white); }
.tech__title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 4px; color: var(--color-grey); margin-bottom: var(--spacing-lg); }
.tech__list { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); }
.tech__item { border: 1px solid var(--color-grey); padding: var(--spacing-xs) var(--spacing-sm); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
.tech__item:hover { border-color: var(--color-red); color: var(--color-red); }

.contact { display: grid; grid-template-columns: 1fr 1fr; min-height: 50vh; }
.contact__left { background: var(--color-red); color: var(--color-white); padding: var(--spacing-xl); display: flex; flex-direction: column; justify-content: center; }
.contact__cta { font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; text-transform: uppercase; line-height: 1; }
.contact__right { padding: var(--spacing-xl); display: flex; flex-direction: column; justify-content: center; gap: var(--spacing-md); }
.contact__link { color: var(--color-black); text-decoration: none; font-size: 1.25rem; display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-sm) 0; border-bottom: var(--border-thin); }
.contact__link::before { content: '>'; color: var(--color-red); }
.contact__link:hover { text-decoration: line-through; }

.footer { background: var(--color-black); color: var(--color-white); padding: var(--spacing-lg) var(--spacing-xl); display: flex; justify-content: space-between; font-size: 0.75rem; border-top: var(--border-red); }
.footer__timestamp { color: var(--color-grey); }

.reveal { opacity: 0; transform: translateY(20px); }
.reveal.visible { animation: reveal 0ms forwards; }
@keyframes reveal { to { opacity: 1; transform: translateY(0); } }

.glitch { position: relative; }
.glitch:hover { animation: glitch 150ms linear; }
@keyframes glitch {
  0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); } 100% { transform: translate(0); }
}

.ascii { white-space: pre; font-size: 0.5rem; line-height: 1; color: var(--color-grey); user-select: none; }

::selection { background: var(--color-red); color: var(--color-white); }

@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; }
  .hero__left { border-right: none; border-bottom: var(--border-standard); padding: var(--spacing-xl) var(--spacing-lg); }
  .hero__right { padding: var(--spacing-lg); }
  .blog { grid-template-columns: 1fr; }
  .blog__sidebar { writing-mode: horizontal-tb; padding: var(--spacing-md); }
  .blog__item { grid-template-columns: 1fr; gap: var(--spacing-xs); }
  .contact { grid-template-columns: 1fr; }
  .contact__left { padding: var(--spacing-lg); }
}
`;function z(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:k}),e.jsxs("div",{className:"scanlines",children:[e.jsx(v,{}),e.jsxs("main",{children:[e.jsx(_,{}),e.jsx(b,{}),e.jsx(j,{}),e.jsx(u,{}),e.jsx(y,{})]}),e.jsx(w,{})]})]})}export{z as default};
