# Agent Guidelines

## Code Style
- Functional style preferred, avoid classes
- No comments unless strictly necessary
- No unnecessary abstractions - simple > clever
- TypeScript strict mode
- Avoid over-engineering

## Commits
- Short, objective messages
- NO "Co-Authored-By" or "Authored-By" sections
- Sacrifice grammar for concision
- Examples: `fix avatar tracking`, `add contact form`, `rm unused deps`

## File Operations
- Prefer editing existing files over creating new ones
- Never create docs/READMEs unless explicitly asked
- Delete unused code completely, no backwards-compat hacks

## Framework Specifics
- React 19 + TypeScript
- Tailwind CSS 4 with custom theme (see `client/src/index.css`)
- Framer Motion for animations
- Functional components only, no class components

## Theme Enforcement
See [THEME.md](./THEME.md) for visual guidelines. Key points:
- Cyan/teal primary (`hsl(180 80% 60%)`)
- Gold accent (`hsl(45 90% 60%)`)
- Dark navy background default
- Retro-futuristic aesthetic: pixel art + modern animations
- Fonts: Press Start 2P (headings), Space Grotesk (display), Inter (body), JetBrains Mono (code)

## Don't
- Add emojis unless asked
- Over-explain in code or commits
- Create placeholder/stub code
- Add feature flags for simple changes
