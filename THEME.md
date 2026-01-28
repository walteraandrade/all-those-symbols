# Theme: Retro-Futuristic

## Identity
- **Tagline:** Logic × Philosophy × Code
- **Aesthetic:** Pixel art meets modern, CRT vibes, contemplative tech

## Colors (HSL)

### Dark Mode (default)
| Role | HSL | Hex |
|------|-----|-----|
| Background | 220 15% 10% | #15171c |
| Foreground | 210 20% 98% | #f8fafc |
| Primary (cyan) | 180 80% 60% | #33e0e0 |
| Accent (gold) | 45 90% 60% | #f5c842 |
| Secondary | 220 10% 20% | #2e3138 |
| Muted fg | 215 15% 80% | #c3c8d4 |
| Border | 220 15% 20% | #2b2f38 |

### Light Mode
| Role | HSL |
|------|-----|
| Background | 0 0% 98% |
| Primary | 180 80% 35% |
| Accent | 45 90% 45% |

## Typography
| Use | Font | Weight |
|-----|------|--------|
| Headings | Press Start 2P | 400 |
| Display | Space Grotesk | 300-700 |
| Body | Inter | 300-600 |
| Code | JetBrains Mono | 300-500 |

## Visual Elements
- **Scanlines:** subtle CRT overlay (2px repeating gradient)
- **Grid:** perspective background with scroll animation
- **Borders:** 2px solid, sharp corners (0.25rem radius)
- **Glow:** cyan box-shadow on hover/focus (`0 0 20px hsl(180 80% 60% / 0.3)`)
- **Backdrop blur:** glassmorphism on cards/modals

## Motion
- Smooth transitions via Framer Motion
- Respect `prefers-reduced-motion`
- Hover: subtle scale/glow
- Page transitions: fade + slide

## Logo Constraints
- Design at 32×32 base, scale down to 16×16
- Must work on dark and light backgrounds
- Pixel-perfect at small sizes
- Cyan monochrome or cyan+gold

## Don'ts
- No rounded/bubbly shapes
- No gradients (except scanlines/grid)
- No excessive decoration
- No conflicting font families
