export const editorialTheme = {
  fonts: {
    serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  colors: {
    ink: "#0D0D0D",
    paper: "#FEFBF6",
    paperDark: "#1A1A1A",
    vermillion: "#E63946",
    gray: {
      100: "#F7F7F7",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
  },

  typography: {
    headline: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontWeight: 600,
      letterSpacing: "-0.03em",
      lineHeight: 0.95,
    },
    subheadline: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontWeight: 500,
      letterSpacing: "-0.01em",
      lineHeight: 1.1,
    },
    body: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      letterSpacing: "0",
      lineHeight: 1.7,
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      letterSpacing: "0.08em",
      lineHeight: 1.4,
      textTransform: "uppercase" as const,
    },
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slowest: "800ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      elegant: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },
} as const;

export type EditorialTheme = typeof editorialTheme;

export const cssVariables = `
  --font-serif: ${editorialTheme.fonts.serif};
  --font-sans: ${editorialTheme.fonts.sans};
  --font-mono: ${editorialTheme.fonts.mono};

  --color-ink: ${editorialTheme.colors.ink};
  --color-paper: ${editorialTheme.colors.paper};
  --color-paper-dark: ${editorialTheme.colors.paperDark};
  --color-accent: ${editorialTheme.colors.vermillion};

  --color-gray-100: ${editorialTheme.colors.gray[100]};
  --color-gray-200: ${editorialTheme.colors.gray[200]};
  --color-gray-300: ${editorialTheme.colors.gray[300]};
  --color-gray-400: ${editorialTheme.colors.gray[400]};
  --color-gray-500: ${editorialTheme.colors.gray[500]};
  --color-gray-600: ${editorialTheme.colors.gray[600]};
  --color-gray-700: ${editorialTheme.colors.gray[700]};
  --color-gray-800: ${editorialTheme.colors.gray[800]};
  --color-gray-900: ${editorialTheme.colors.gray[900]};

  --spacing-xs: ${editorialTheme.spacing.xs};
  --spacing-sm: ${editorialTheme.spacing.sm};
  --spacing-md: ${editorialTheme.spacing.md};
  --spacing-lg: ${editorialTheme.spacing.lg};
  --spacing-xl: ${editorialTheme.spacing.xl};
  --spacing-2xl: ${editorialTheme.spacing["2xl"]};
  --spacing-3xl: ${editorialTheme.spacing["3xl"]};
  --spacing-4xl: ${editorialTheme.spacing["4xl"]};
  --spacing-5xl: ${editorialTheme.spacing["5xl"]};

  --ease-default: ${editorialTheme.animation.easing.default};
  --ease-out: ${editorialTheme.animation.easing.easeOut};
  --ease-in: ${editorialTheme.animation.easing.easeIn};
  --ease-elegant: ${editorialTheme.animation.easing.elegant};

  --duration-fast: ${editorialTheme.animation.duration.fast};
  --duration-normal: ${editorialTheme.animation.duration.normal};
  --duration-slow: ${editorialTheme.animation.duration.slow};
  --duration-slowest: ${editorialTheme.animation.duration.slowest};
`;
