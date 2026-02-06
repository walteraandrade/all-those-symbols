export const theme = {
  colors: {
    // Base
    void: '#0a0a0f',
    midnight: '#12121a',
    steel: '#1a1a2e',
    chrome: '#2a2a4a',

    // Neon primaries
    cyan: '#00fff9',
    magenta: '#ff00ff',
    hotPink: '#ff2a6d',
    electricBlue: '#05d9e8',
    purple: '#7b2cbf',

    // Accents
    amber: '#ffb000',
    lime: '#39ff14',

    // Text
    textPrimary: '#e0e0ff',
    textSecondary: '#8888aa',
    textMuted: '#555577',

    // Gradients
    horizonGradient: 'linear-gradient(180deg, #12121a 0%, #1a0a2e 50%, #2a0a4a 100%)',
    neonGlow: 'linear-gradient(90deg, #00fff9, #ff00ff, #00fff9)',
    sunsetGrid: 'linear-gradient(180deg, transparent 0%, #ff2a6d33 100%)',
  },

  fonts: {
    display: '"Press Start 2P", monospace',
    terminal: '"VT323", monospace',
    body: '"Space Mono", monospace',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
    hero: '6rem',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    '2xl': '8rem',
  },

  effects: {
    glowCyan: '0 0 10px #00fff9, 0 0 20px #00fff9, 0 0 40px #00fff966',
    glowMagenta: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff66',
    glowPink: '0 0 10px #ff2a6d, 0 0 20px #ff2a6d, 0 0 40px #ff2a6d66',
    textGlowCyan: '0 0 10px #00fff9, 0 0 20px #00fff966',
    textGlowMagenta: '0 0 10px #ff00ff, 0 0 20px #ff00ff66',
    scanlineOpacity: 0.05,
    chromaticOffset: '2px',
  },

  timing: {
    fast: '150ms',
    normal: '300ms',
    slow: '600ms',
    pulse: '2s',
    flicker: '100ms',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  zIndex: {
    scanlines: 1000,
    nav: 100,
    modal: 200,
    tooltip: 150,
  },
} as const

export type Theme = typeof theme

// CSS custom properties generator
export const generateCSSVariables = (): string => {
  const vars: string[] = []

  Object.entries(theme.colors).forEach(([key, value]) => {
    vars.push(`--color-${key}: ${value};`)
  })

  Object.entries(theme.fonts).forEach(([key, value]) => {
    vars.push(`--font-${key}: ${value};`)
  })

  Object.entries(theme.fontSizes).forEach(([key, value]) => {
    vars.push(`--text-${key}: ${value};`)
  })

  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars.push(`--space-${key}: ${value};`)
  })

  Object.entries(theme.timing).forEach(([key, value]) => {
    vars.push(`--timing-${key}: ${value};`)
  })

  return vars.join('\n  ')
}
