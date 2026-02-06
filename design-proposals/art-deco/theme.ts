export const artDecoTheme = {
  colors: {
    primary: {
      navy: '#0a0f1a',
      navyLight: '#141c2e',
      navyMid: '#1a2540',
    },
    accent: {
      gold: '#d4a574',
      goldLight: '#e8c9a0',
      goldDark: '#c9a961',
      brass: '#b8956e',
      bronze: '#8b7355',
    },
    neutral: {
      ivory: '#f5f0e6',
      cream: '#faf7f0',
      pearl: '#e8e4dc',
      charcoal: '#2a2a2a',
    },
    semantic: {
      emerald: '#1a4d3e',
      burgundy: '#6b2d3c',
    },
  },

  typography: {
    display: "'Poiret One', cursive",
    heading: "'Josefin Sans', sans-serif",
    body: "'Josefin Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
    '6xl': '4.5rem',
    hero: '6rem',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  borders: {
    thin: '1px solid',
    medium: '2px solid',
    thick: '3px solid',
    decorative: '4px double',
  },

  shadows: {
    glow: '0 0 20px rgba(212, 165, 116, 0.3)',
    glowStrong: '0 0 40px rgba(212, 165, 116, 0.5)',
    inset: 'inset 0 0 30px rgba(0, 0, 0, 0.5)',
    elevated: '0 10px 40px rgba(0, 0, 0, 0.4)',
  },

  gradients: {
    goldShimmer: 'linear-gradient(135deg, #c9a961 0%, #d4a574 25%, #e8c9a0 50%, #d4a574 75%, #c9a961 100%)',
    navyDepth: 'linear-gradient(180deg, #0a0f1a 0%, #141c2e 50%, #0a0f1a 100%)',
    bronzeAccent: 'linear-gradient(90deg, #8b7355 0%, #b8956e 50%, #8b7355 100%)',
  },

  transitions: {
    fast: '150ms ease-out',
    base: '300ms ease-out',
    slow: '500ms ease-out',
    reveal: '800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    base: 0,
    elevated: 10,
    modal: 100,
    overlay: 200,
    top: 999,
  },
} as const;

export type ArtDecoTheme = typeof artDecoTheme;
