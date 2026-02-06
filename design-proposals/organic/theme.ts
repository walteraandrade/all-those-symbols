export const theme = {
  colors: {
    moss: '#4A5D4A',
    mossLight: '#5C7260',
    mossDark: '#3A4A3A',
    terracotta: '#C67B5C',
    terracottaLight: '#D8967A',
    terracottaDark: '#A66245',
    beige: '#E8DFD0',
    brown: '#3D2F2A',
    brownLight: '#5A4A42',
    cream: '#FAF7F2',
    creamDark: '#F0E8DC',
    sage: '#7D8B6A',
    sageLight: '#9AAA85',
    parchment: '#F5EEE4',
    ink: '#2A231F',
  },
  fonts: {
    serif: "'Libre Baskerville', 'Georgia', serif",
    handwritten: "'Caveat', 'Brush Script MT', cursive",
    sans: "'DM Sans', 'Segoe UI', sans-serif",
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
  radii: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
    blob: '30% 70% 70% 30% / 30% 30% 70% 70%',
    blobAlt: '60% 40% 30% 70% / 60% 30% 70% 40%',
  },
  shadows: {
    soft: '0 4px 20px rgba(61, 47, 42, 0.08)',
    medium: '0 8px 30px rgba(61, 47, 42, 0.12)',
    large: '0 16px 50px rgba(61, 47, 42, 0.15)',
    inner: 'inset 0 2px 4px rgba(61, 47, 42, 0.06)',
    glow: '0 0 40px rgba(74, 93, 74, 0.15)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  animation: {
    breath: '4s ease-in-out infinite',
    float: '6s ease-in-out infinite',
    grow: '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fade: '0.4s ease-out',
    gentle: '0.3s ease-out',
  },
  zIndex: {
    base: 0,
    content: 10,
    decoration: 5,
    navigation: 100,
    overlay: 500,
    modal: 1000,
  },
} as const;

export type Theme = typeof theme;

export const cssVariables = `
  :root {
    /* Colors */
    --color-moss: ${theme.colors.moss};
    --color-moss-light: ${theme.colors.mossLight};
    --color-moss-dark: ${theme.colors.mossDark};
    --color-terracotta: ${theme.colors.terracotta};
    --color-terracotta-light: ${theme.colors.terracottaLight};
    --color-terracotta-dark: ${theme.colors.terracottaDark};
    --color-beige: ${theme.colors.beige};
    --color-brown: ${theme.colors.brown};
    --color-brown-light: ${theme.colors.brownLight};
    --color-cream: ${theme.colors.cream};
    --color-cream-dark: ${theme.colors.creamDark};
    --color-sage: ${theme.colors.sage};
    --color-sage-light: ${theme.colors.sageLight};
    --color-parchment: ${theme.colors.parchment};
    --color-ink: ${theme.colors.ink};

    /* Typography */
    --font-serif: ${theme.fonts.serif};
    --font-handwritten: ${theme.fonts.handwritten};
    --font-sans: ${theme.fonts.sans};

    --text-xs: ${theme.fontSizes.xs};
    --text-sm: ${theme.fontSizes.sm};
    --text-base: ${theme.fontSizes.base};
    --text-lg: ${theme.fontSizes.lg};
    --text-xl: ${theme.fontSizes.xl};
    --text-2xl: ${theme.fontSizes['2xl']};
    --text-3xl: ${theme.fontSizes['3xl']};
    --text-4xl: ${theme.fontSizes['4xl']};
    --text-5xl: ${theme.fontSizes['5xl']};
    --text-6xl: ${theme.fontSizes['6xl']};

    /* Spacing */
    --space-xs: ${theme.spacing.xs};
    --space-sm: ${theme.spacing.sm};
    --space-md: ${theme.spacing.md};
    --space-lg: ${theme.spacing.lg};
    --space-xl: ${theme.spacing.xl};
    --space-2xl: ${theme.spacing['2xl']};
    --space-3xl: ${theme.spacing['3xl']};
    --space-4xl: ${theme.spacing['4xl']};
    --space-5xl: ${theme.spacing['5xl']};

    /* Radii */
    --radius-sm: ${theme.radii.sm};
    --radius-md: ${theme.radii.md};
    --radius-lg: ${theme.radii.lg};
    --radius-xl: ${theme.radii.xl};
    --radius-full: ${theme.radii.full};
    --radius-blob: ${theme.radii.blob};
    --radius-blob-alt: ${theme.radii.blobAlt};

    /* Shadows */
    --shadow-soft: ${theme.shadows.soft};
    --shadow-medium: ${theme.shadows.medium};
    --shadow-large: ${theme.shadows.large};
    --shadow-inner: ${theme.shadows.inner};
    --shadow-glow: ${theme.shadows.glow};

    /* Z-Index */
    --z-base: ${theme.zIndex.base};
    --z-content: ${theme.zIndex.content};
    --z-decoration: ${theme.zIndex.decoration};
    --z-navigation: ${theme.zIndex.navigation};
    --z-overlay: ${theme.zIndex.overlay};
    --z-modal: ${theme.zIndex.modal};
  }
`;
