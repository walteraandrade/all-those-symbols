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

## Theme
See [THEME.md](./THEME.md) for visual guidelines.

## Don't
- Add emojis unless asked
- Over-explain in code or commits
- Create placeholder/stub code
- Add feature flags for simple changes
