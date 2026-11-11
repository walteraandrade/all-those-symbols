# Theme: Escher (pixel surrealism)

## Identity
- **Tagline:** Logic / Philosophy / Code
- **Aesthetic:** M.C. Escher in pixel art. Monochrome ink world, impossible
  objects, one verdigris accent. The Penrose tribar is the central symbol; the
  waterfall (after Escher's "Waterfall") carries the philosophy-to-code story.

## Colors
| Role | Hex | CSS var |
|------|-----|---------|
| Background (ink) | #14130f | --ink |
| Background raised | #1d1c16 | --ink-2 |
| Foreground (bone) | #ece6d4 | --bone |
| Long secondary copy | #c4beac | --soft |
| Muted | #8b8778 | --mid |
| Control borders (3:1 on ink) | #6f6c5e | --line |
| Decorative borders / dark faces | #3a382f | --dark |
| Accent (verdigris) | #4aa58e | --accent (+ --accent-mid #33796a, --accent-dark #1d4a41 for sprite shading) |
| Error | #e2755a | --danger |

Dark only. The accent is rationed: one per composition (CTA, active state,
hover). Sprite shading is three tones: bone top faces, mid left walls, dark
right walls, lit from the upper left.

## Typography
| Use | Font |
|-----|------|
| Headings / brand / primary buttons / CTAs | League Spartan (700-800) |
| Body / nav / tags / inherited controls / code | JetBrains Mono |

Sizes come from one scale, in rem: `--fs-xs` 13, `--fs-sm` 15, `--fs-base` 16,
`--fs-md` 17 (prose), `--fs-lg` 20, then fluid `--fs-h2`, `--fs-h1`, `--fs-hero`.
Tailwind's `text-xs/sm/lg/xl` are remapped to the same steps. Nothing under 12px.

## Visual elements
- **Specks background:** sparse 2px dots on ink (two offset radial-gradient layers).
- **Sprites:** generated pixel art rendered to canvas at 1px/cell, upscaled with
  `image-rendering: pixelated` (`client/src/components/escher/sprites.tsx`):
  the Penrose tribar (large, with water-channel groove), the mini tribar, and
  the Necker wireframe cube. Markers alternate mini tribar / wire cube.
- **TribarScene:** the large tribar standing alone; used on Home and Bio.
- **Borders:** 2-3px solid, sharp corners, no radius, no glow.
- **Gem dock:** the wire cube bottom-right is an easter-egg quick nav.

## Motion
- Stepped CSS transitions preserve the pixel feel on hover and focus states.
- CSS animates the spinner, floating hero cube, and gem-nav entrance. Animations
  are gated behind `prefers-reduced-motion: no-preference`.
- Blog reading progress and the back-to-top control use Framer Motion with
  `reducedMotion="user"`. The global reduced-motion rule disables animation,
  transitions, and smooth scrolling.

## Layout
- Top bar: brand left, links + verdigris CV right, verdigris underline on
  hover/active.
- One column: top bar, hero, pages and footer all pad with `--pad`, so every
  left edge lines up on a 1080px column (`--col`) with a fluid `--gutter`.
- Sections: `.esc-page` (a route), `.esc-section` (a band on Home), `.esc-block`
  (a group inside a page), `.esc-h2` + `.esc-sub` headers.
- Cards: 3px dark borders, shared `.esc-card-*` parts. Only cards that go
  somewhere take the verdigris border on hover. No shadows.
- Interactive controls are at least 44px tall and use `--line` borders.

## Files
- `client/src/escher.css` - the design system (scoped under `.esc`).
- `client/src/components/escher/sprites.tsx` - sprite generators and scenes.
- `client/src/components/Layout.tsx` - chrome (top bar, gem dock, footer).
