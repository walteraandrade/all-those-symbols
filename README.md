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
bun run perf   # PSI (home + blog post) and field p75 by route; field budget is warn-only (~70 samples per 28 days is too noisy to gate; revisit at a few hundred)
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
