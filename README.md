# all-those-symbols

Personal portfolio site for Walter Andrade. Logic × Philosophy × Code.

## Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Vercel Functions (`api/`) + Turso (web vitals)
- Resend (email)

## Dev
```bash
bun install
bun run dev
```

## Build
```bash
bun run build
```

## Other
```bash
bun run check  # typecheck
bun run perf   # PageSpeed budget
```

## Structure
```
client/          # React frontend
  src/
    components/  # UI components
    pages/       # Route pages
    lib/         # Utils, data
api/             # Vercel Functions
script/          # Build, prerender, perf scripts
perf/            # Perf budget and history
.github/         # CI workflows
dist/            # Build output
```

## Docs
- [AGENTS.md](./AGENTS.md) - AI/agent coding guidelines
- [THEME.md](./THEME.md) - Visual design system
