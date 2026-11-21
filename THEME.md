# Theme: Escher (pixel surrealism)

## Identity
- **Tagline:** Logic / Philosophy / Code
- **Aesthetic:** M.C. Escher in pixel art. Monochrome ink world, impossible
  objects, one verdigris accent. The Penrose tribar is the central symbol; the
  waterfall (after Escher's "Waterfall") carries the philosophy-to-code story,
  and the Necker cube carries the bio's "two readings of one career".
- **Marks:** a small tribar means "shipped with a team", a small Necker cube
  means "built on my own". The tribar is also the brand mark and favicon.

## Colors
| Role | Hex | CSS var |
|------|-----|---------|
| Background (ink) | #14130f | --ink |
| Background raised | #1d1c16 | --ink-2 |
| Cast shadow | #0b0a08 | --shadow |
| Foreground (bone) | #ece6d4 | --bone |
| Long secondary copy | #c4beac | --soft |
| Muted text and metadata (5.9:1 on ink) | #9a9686 | --mid |
| Control borders (3:1 on ink) | #6f6c5e | --line |
| Decorative borders / dark faces | #3a382f | --dark |
| Accent (verdigris) | #4aa58e | --accent (+ --accent-hi #8fd4bf, --accent-mid #33796a, --accent-dark #1d4a41 for sprite shading) |
| Error | #e2755a | --danger |

Dark only. The accent is rationed: it marks what is live (water, the primary
CTA, active and focus states, the face of the Necker cube read as front).
Sprite shading is three tones: bone tops, mid y+ walls, dark x+ walls.

## Typography
| Use | Font |
|-----|------|
| Headings / brand / buttons / card leads | League Spartan (600-800) |
| Sentences: essays, bio, project and post descriptions | Literata |
| Labels: nav, tags, metadata, taglines, code | JetBrains Mono |

Serif for sentences, mono for labels. All three are self-hosted and preloaded.
Sizes come from one scale, in rem: `--fs-xs` 13, `--fs-sm` 15, `--fs-base` 16,
`--fs-md` 17, `--fs-lg` 20, then fluid `--fs-h2`, `--fs-h1`, `--fs-hero`.
Essay prose is 18px Literata at 1.75. Nothing under 12px.

## Pixel art
All art is generated from code, rendered to canvas at 1px per cell and
upscaled with `image-rendering: pixelated`. Palettes name CSS vars, so sprites
follow the theme.
- `geometry.ts` (pure, also used by build scripts): `makePenrose` (voxel
  tribar in 2:1 isometric with an optional water groove and cast shadow),
  `standUp`, `makeNecker` (twelve edges, filled near face, optional weight),
  `makeWheel`, and `makeVoxels` (free voxel models in the same projection).
- `constructions.ts`: one voxel model per featured project, drawn as what the
  software does (chat bubble, crate, bar chart, briefcase, branch, door), plus
  the staircase beside the home readings and the question mark on the
  featured essay.
- `sprites.tsx`: `Sprite` plus the scenes. `WaterfallScene` (hero tribar with
  water running the loop), `WheelScene` (a flume pouring onto a turning
  wheel, with a splash where it lands), `NeckerScene` (flips every 3s; with
  `flip`, also by click). Large art casts a `--shadow` shadow whose rim is
  dithered.
- Blog covers: `script/build-blog-images.ts` redraws each source photo on a
  240x135 grid snapped to the ink ramp plus verdigris.
- Favicon set: `script/build-brand.ts` draws it from the same tribar.

## Motion
- Sprite animation steps at 8fps (water, wheel) or every 3s (Necker), pauses
  offscreen, and holds frame 0 under reduced motion.
- Stepped CSS transitions on hover and focus. The spinner and gem menu animate
  only under `prefers-reduced-motion: no-preference`.

## Layout
- Top bar (solid ink): brand left, links and the CV button right.
- One column: everything pads with `--pad` on a 1160px `--col`, so every left
  edge lines up. Essays center a 42rem column; the century timeline floats
  beside it.
- Buttons have three tiers: primary `.esc-btn` (filled verdigris), secondary
  `.esc-btn.ghost` (outlined), tertiary `.esc-link` ("> " text link).
- Cards: 3px dark borders, a drafting tick on the top-left corner, shared
  `.esc-card-*` parts, `.esc-card-lead` for the outcome line. Only cards that
  go somewhere take the verdigris border on hover.
- Every interactive control is at least 44px and shows a 3px verdigris focus
  ring. Back-to-top appears on every long page.
- The cube bottom-right (verdigris) opens a small detours menu.

## Files
- `client/src/escher.css` - the design system (scoped under `.esc`).
- `client/src/components/escher/` - geometry, constructions, sprites, legend.
- `client/src/components/Layout.tsx` - chrome (top bar, gem dock, footer).
