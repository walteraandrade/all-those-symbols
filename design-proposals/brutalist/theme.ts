export const theme = {
  colors: {
    black: '#000000',
    white: '#F5F5F0',
    red: '#FF0000',
    grey: '#888888',
    darkGrey: '#1A1A1A',
  },
  fonts: {
    mono: "'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace",
  },
  spacing: {
    unit: '8px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
    xxl: '128px',
  },
  borders: {
    thin: '1px solid #000000',
    standard: '2px solid #000000',
    thick: '4px solid #000000',
    red: '2px solid #FF0000',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  animation: {
    instant: '0ms',
    fast: '100ms',
    typewriter: '50ms',
    glitch: '150ms',
  },
  zIndex: {
    base: 0,
    overlay: 10,
    navigation: 100,
    modal: 1000,
  },
} as const;

export type Theme = typeof theme;

export const cssVariables = `
  :root {
    --color-black: ${theme.colors.black};
    --color-white: ${theme.colors.white};
    --color-red: ${theme.colors.red};
    --color-grey: ${theme.colors.grey};
    --color-dark-grey: ${theme.colors.darkGrey};

    --font-mono: ${theme.fonts.mono};

    --spacing-xs: ${theme.spacing.xs};
    --spacing-sm: ${theme.spacing.sm};
    --spacing-md: ${theme.spacing.md};
    --spacing-lg: ${theme.spacing.lg};
    --spacing-xl: ${theme.spacing.xl};
    --spacing-xxl: ${theme.spacing.xxl};

    --border-thin: ${theme.borders.thin};
    --border-standard: ${theme.borders.standard};
    --border-thick: ${theme.borders.thick};
    --border-red: ${theme.borders.red};

    --z-base: ${theme.zIndex.base};
    --z-overlay: ${theme.zIndex.overlay};
    --z-navigation: ${theme.zIndex.navigation};
    --z-modal: ${theme.zIndex.modal};
  }
`;
