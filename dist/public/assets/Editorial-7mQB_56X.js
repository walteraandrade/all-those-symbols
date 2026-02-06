import{c as d,r as c,j as e,m as a}from"./vendor-motion-DBiROnkR.js";import{c as m,U as p,b as f,M as h,L as s}from"./index-_r1kIIL1.js";import{A as n}from"./arrow-right-DRghcy6R.js";import"./vendor-react-Bzgz95E1.js";import"./vendor-ui-BbxtaXoO.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],x=m("code-xml",g),v=[{name:"Modulart",category:"Events",year:"2024"},{name:"Payssego",category:"Fintech",year:"2024"},{name:"AI Decco",category:"AI",year:"2023"}],u=[{title:"The Mirror of Memory",director:"Tarkovsky"},{title:"Faces in the Void",director:"Bergman"},{title:"The Poetics of Movement",director:"Wong Kar-Wai"}],y=[{path:"/bio",label:"Bio",icon:p},{path:"/projects",label:"Work",icon:x},{path:"/blog",label:"Essays",icon:f},{path:"/contact",label:"Contact",icon:h}],i={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},j={visible:{transition:{staggerChildren:.1}}};function N(){const t=d(),[l]=c.useState("Vol. I / 2025");return e.jsxs("div",{className:"ed-page",children:[e.jsx("header",{className:"ed-masthead",children:e.jsx("div",{className:"ed-container",children:e.jsxs(a.div,{className:"ed-masthead-inner",initial:t?{}:{opacity:0},animate:{opacity:1},transition:{duration:.6},children:[e.jsx("span",{className:"ed-masthead-issue",children:l}),e.jsx("nav",{className:"ed-masthead-nav",children:y.map(r=>e.jsx(s,{href:r.path,className:"ed-masthead-link",children:r.label},r.path))})]})})}),e.jsx("section",{className:"ed-hero",children:e.jsx("div",{className:"ed-container",children:e.jsx("div",{className:"ed-grid",children:e.jsxs(a.div,{className:"ed-hero-content",initial:t?{}:"hidden",animate:"visible",variants:j,children:[e.jsx(a.div,{className:"ed-hero-name-wrapper",variants:i,children:e.jsxs("h1",{className:"ed-hero-name",children:[e.jsx("span",{className:"ed-hero-name-first",children:"Walter"}),e.jsx("span",{className:"ed-hero-name-last",children:"Andrade"})]})}),e.jsxs(a.p,{className:"ed-hero-tagline",variants:i,children:[e.jsx("span",{className:"ed-tagline-word",children:"Logic"}),e.jsx("span",{className:"ed-tagline-separator",children:"×"}),e.jsx("span",{className:"ed-tagline-word",children:"Philosophy"}),e.jsx("span",{className:"ed-tagline-separator",children:"×"}),e.jsx("span",{className:"ed-tagline-word",children:"Code"})]}),e.jsx(a.hr,{className:"ed-hero-rule",variants:i}),e.jsxs(a.p,{className:"ed-hero-role",variants:i,children:["Senior Software Engineer",e.jsx("span",{className:"ed-role-at",children:"at"}),"SmartHow"]})]})})})}),e.jsx("section",{className:"ed-lede",children:e.jsx("div",{className:"ed-container",children:e.jsx("div",{className:"ed-grid",children:e.jsx(a.div,{className:"ed-lede-content",initial:t?{}:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.2},children:e.jsx("p",{className:"ed-lede-text ed-drop-cap",children:"A software developer with a philosophy degree in logic, building AI interview bots, fintech platforms, e-learning systems, and mobile applications. Philosophy teaches clarity in complexity—the art of reducing intricate problems to their essential forms."})})})})}),e.jsx("section",{className:"ed-features",children:e.jsx("div",{className:"ed-container",children:e.jsxs("div",{className:"ed-grid",children:[e.jsxs(a.div,{className:"ed-feature-col ed-feature-left",initial:t?{}:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsxs("div",{className:"ed-feature-header",children:[e.jsx("h2",{className:"ed-section-title",children:"Selected Work"}),e.jsx("span",{className:"ed-section-count",children:"10 Projects"})]}),e.jsx("hr",{className:"ed-rule ed-rule-thick"}),e.jsx("ul",{className:"ed-project-list",children:v.map((r,o)=>e.jsxs(a.li,{className:"ed-project-item",initial:t?{}:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:o*.1},children:[e.jsx("span",{className:"ed-project-name",children:r.name}),e.jsxs("span",{className:"ed-project-meta",children:[e.jsx("span",{className:"ed-project-category",children:r.category}),e.jsx("span",{className:"ed-project-year",children:r.year})]})]},r.name))}),e.jsxs(s,{href:"/projects",className:"ed-feature-link",children:[e.jsx("span",{children:"View All Projects"}),e.jsx(n,{size:16})]})]}),e.jsxs(a.div,{className:"ed-feature-col ed-feature-right",initial:t?{}:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.6,delay:.1},children:[e.jsxs("div",{className:"ed-feature-header",children:[e.jsx("h2",{className:"ed-section-title",children:"Cinema Essays"}),e.jsx("span",{className:"ed-section-count",children:"13 Writings"})]}),e.jsx("hr",{className:"ed-rule ed-rule-thick"}),e.jsx("ul",{className:"ed-essay-list",children:u.map((r,o)=>e.jsxs(a.li,{className:"ed-essay-item",initial:t?{}:{opacity:0,y:10},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.4,delay:o*.1},children:[e.jsx("span",{className:"ed-essay-title",children:r.title}),e.jsxs("span",{className:"ed-essay-director",children:["On ",r.director]})]},r.title))}),e.jsxs(s,{href:"/blog",className:"ed-feature-link",children:[e.jsx("span",{children:"Read Essays"}),e.jsx(n,{size:16})]})]})]})})}),e.jsx("section",{className:"ed-quote-section",children:e.jsx("div",{className:"ed-container",children:e.jsx("div",{className:"ed-grid",children:e.jsxs(a.blockquote,{className:"ed-pull-quote ed-col-main",initial:t?{}:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:['"Programming is nothing more than converting human problems into computer problems—and discovering that this is, above all, fun."',e.jsx("cite",{children:"From the Philosophy of Code"})]})})})}),e.jsx("section",{className:"ed-stack",children:e.jsx("div",{className:"ed-container",children:e.jsxs(a.div,{className:"ed-stack-inner",initial:t?{}:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[e.jsx("span",{className:"ed-stack-label",children:"Primary Technologies"}),e.jsx("p",{className:"ed-stack-list",children:"TypeScript · Python · Next.js · React · Node.js · PostgreSQL · AWS · GCP"})]})})}),e.jsx("footer",{className:"ed-footer",children:e.jsx("div",{className:"ed-container",children:e.jsxs("div",{className:"ed-footer-inner",children:[e.jsxs("div",{className:"ed-footer-left",children:[e.jsx("span",{className:"ed-footer-name",children:"Walter Andrade"}),e.jsx("span",{className:"ed-footer-year",children:"© 2025"})]}),e.jsxs("div",{className:"ed-footer-right",children:[e.jsx("a",{href:"mailto:walteraandrade@gmail.com",className:"ed-footer-link",children:"Email"}),e.jsx("a",{href:"https://github.com/walteraandrade",className:"ed-footer-link",children:"GitHub"}),e.jsx("a",{href:"https://linkedin.com/in/walteraandrade",className:"ed-footer-link",children:"LinkedIn"})]})]})})}),e.jsx("style",{children:`
        /* Page Styles */
        .ed-page {
          min-height: 100vh;
          background: var(--color-bg, #FEFBF6);
          color: var(--color-text, #0D0D0D);
        }

        /* Masthead */
        .ed-masthead {
          padding: var(--spacing-lg, 1.5rem) 0;
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-masthead-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-masthead-issue {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-masthead-nav {
          display: flex;
          gap: var(--spacing-xl, 2rem);
        }

        .ed-masthead-link {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text, #0D0D0D);
          transition: color 200ms ease;
        }

        .ed-masthead-link:hover {
          color: var(--color-accent, #E63946);
        }

        /* Hero */
        .ed-hero {
          padding: var(--spacing-5xl, 8rem) 0 var(--spacing-4xl, 6rem);
        }

        .ed-hero-content {
          grid-column: 1 / -1;
          text-align: center;
        }

        .ed-hero-name-wrapper {
          overflow: hidden;
        }

        .ed-hero-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-weight: 600;
          font-size: clamp(4rem, 15vw, 12rem);
          letter-spacing: -0.04em;
          line-height: 0.85;
          margin: 0;
        }

        .ed-hero-name-first,
        .ed-hero-name-last {
          display: block;
        }

        .ed-hero-name-last {
          font-style: italic;
          font-weight: 500;
        }

        .ed-hero-tagline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--spacing-md, 1rem);
          margin-top: var(--spacing-2xl, 3rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-tagline-separator {
          color: var(--color-accent, #E63946);
        }

        .ed-hero-rule {
          width: 60px;
          height: 2px;
          background: var(--color-text, #0D0D0D);
          border: none;
          margin: var(--spacing-2xl, 3rem) auto;
        }

        .ed-hero-role {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 400;
          color: var(--color-text-muted, #737373);
        }

        .ed-role-at {
          font-style: italic;
          margin: 0 0.5em;
          color: var(--color-text-muted, #A3A3A3);
        }

        /* Lede */
        .ed-lede {
          padding: var(--spacing-4xl, 6rem) 0;
          border-top: 1px solid var(--color-border, #E5E5E5);
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-lede-content {
          grid-column: 3 / 11;
        }

        @media (max-width: 1024px) {
          .ed-lede-content {
            grid-column: 2 / 12;
          }
        }

        @media (max-width: 768px) {
          .ed-lede-content {
            grid-column: 1 / -1;
          }
        }

        .ed-lede-text {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 400;
          line-height: 1.6;
          color: var(--color-text, #0D0D0D);
        }

        /* Features */
        .ed-features {
          padding: var(--spacing-4xl, 6rem) 0;
        }

        .ed-feature-col {
          padding: var(--spacing-xl, 2rem) 0;
        }

        .ed-feature-left {
          grid-column: 1 / 7;
          padding-right: var(--spacing-2xl, 3rem);
          border-right: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-feature-right {
          grid-column: 7 / -1;
          padding-left: var(--spacing-2xl, 3rem);
        }

        @media (max-width: 768px) {
          .ed-feature-left,
          .ed-feature-right {
            grid-column: 1 / -1;
            padding: var(--spacing-xl, 2rem) 0;
            border-right: none;
            border-bottom: 1px solid var(--color-border, #E5E5E5);
          }

          .ed-feature-right {
            border-bottom: none;
          }
        }

        .ed-feature-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: var(--spacing-md, 1rem);
        }

        .ed-section-title {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-3xl, 1.875rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .ed-section-count {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        /* Project List */
        .ed-project-list,
        .ed-essay-list {
          list-style: none;
          padding: 0;
          margin: var(--spacing-xl, 2rem) 0;
        }

        .ed-project-item,
        .ed-essay-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--spacing-md, 1rem) 0;
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-project-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 500;
        }

        .ed-project-meta {
          display: flex;
          gap: var(--spacing-lg, 1.5rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-essay-title {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-xl, 1.25rem);
          font-weight: 500;
          font-style: italic;
        }

        .ed-essay-director {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
        }

        .ed-feature-link {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm, 0.5rem);
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--color-text, #0D0D0D);
          margin-top: var(--spacing-md, 1rem);
          transition: color 200ms ease;
        }

        .ed-feature-link:hover {
          color: var(--color-accent, #E63946);
        }

        /* Pull Quote Section */
        .ed-quote-section {
          padding: var(--spacing-4xl, 6rem) 0;
          background: var(--color-gray-100, #F7F7F7);
        }

        .dark .ed-quote-section {
          background: var(--color-gray-900, #171717);
        }

        .ed-pull-quote {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.4;
          text-align: center;
          color: var(--color-text, #0D0D0D);
          margin: 0;
          padding: 0;
          border: none;
        }

        .ed-pull-quote cite {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-style: normal;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: var(--spacing-lg, 1.5rem);
          color: var(--color-accent, #E63946);
        }

        /* Tech Stack */
        .ed-stack {
          padding: var(--spacing-3xl, 4rem) 0;
          border-top: 1px solid var(--color-border, #E5E5E5);
          border-bottom: 1px solid var(--color-border, #E5E5E5);
        }

        .ed-stack-inner {
          text-align: center;
        }

        .ed-stack-label {
          display: block;
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted, #737373);
          margin-bottom: var(--spacing-md, 1rem);
        }

        .ed-stack-list {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-lg, 1.125rem);
          font-weight: 400;
          color: var(--color-text, #0D0D0D);
          margin: 0;
        }

        /* Footer */
        .ed-footer {
          padding: var(--spacing-2xl, 3rem) 0;
        }

        .ed-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ed-footer-left {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md, 1rem);
        }

        .ed-footer-name {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: var(--text-lg, 1.125rem);
          font-weight: 500;
        }

        .ed-footer-year {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-xs, 0.75rem);
          color: var(--color-text-muted, #737373);
        }

        .ed-footer-right {
          display: flex;
          gap: var(--spacing-lg, 1.5rem);
        }

        .ed-footer-link {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: var(--text-sm, 0.875rem);
          font-weight: 500;
          text-decoration: none;
          color: var(--color-text-muted, #737373);
          transition: color 200ms ease;
        }

        .ed-footer-link:hover {
          color: var(--color-accent, #E63946);
        }

        @media (max-width: 640px) {
          .ed-footer-inner {
            flex-direction: column;
            gap: var(--spacing-lg, 1.5rem);
            text-align: center;
          }
        }

        /* Drop Cap Override */
        .ed-drop-cap::first-letter {
          font-family: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 4em;
          font-weight: 600;
          float: left;
          line-height: 0.8;
          padding-right: 0.15em;
          margin-top: 0.1em;
          color: var(--color-accent, #E63946);
        }

        /* Grid Container */
        .ed-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        @media (min-width: 768px) {
          .ed-container {
            padding: 0 2rem;
          }
        }

        .ed-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }

        .ed-col-main {
          grid-column: 3 / 11;
        }

        @media (max-width: 1024px) {
          .ed-col-main {
            grid-column: 2 / 12;
          }
        }

        @media (max-width: 768px) {
          .ed-col-main {
            grid-column: 1 / -1;
          }
        }

        /* Rules */
        .ed-rule {
          border: none;
          height: 1px;
          background: var(--color-border, #E5E5E5);
          margin: 0;
        }

        .ed-rule-thick {
          height: 2px;
          background: var(--color-text, #0D0D0D);
        }
      `})]})}function I(){return e.jsx(N,{})}export{I as default};
