import OrganicHomePage from "../../../../design-proposals/organic/HomePage";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --color-moss: #4A5D4A;
  --color-moss-light: #5C7260;
  --color-moss-dark: #3A4A3A;
  --color-terracotta: #C67B5C;
  --color-terracotta-light: #D8967A;
  --color-terracotta-dark: #A66245;
  --color-beige: #E8DFD0;
  --color-brown: #3D2F2A;
  --color-brown-light: #5A4A42;
  --color-cream: #FAF7F2;
  --color-cream-dark: #F0E8DC;
  --color-sage: #7D8B6A;
  --color-sage-light: #9AAA85;
  --color-parchment: #F5EEE4;
  --color-ink: #2A231F;
  --font-serif: 'Libre Baskerville', 'Georgia', serif;
  --font-handwritten: 'Caveat', cursive;
  --font-sans: 'DM Sans', sans-serif;
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.125rem;
  --text-xl: 1.25rem; --text-2xl: 1.5rem; --text-3xl: 2rem; --text-4xl: 2.5rem;
  --text-5xl: 3.5rem; --text-6xl: 4.5rem;
  --space-xs: 0.25rem; --space-sm: 0.5rem; --space-md: 1rem; --space-lg: 1.5rem;
  --space-xl: 2rem; --space-2xl: 3rem; --space-3xl: 4rem; --space-4xl: 6rem; --space-5xl: 8rem;
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px; --radius-xl: 32px; --radius-full: 9999px;
  --shadow-soft: 0 4px 20px rgba(61, 47, 42, 0.08);
  --shadow-medium: 0 8px 30px rgba(61, 47, 42, 0.12);
  --z-navigation: 100; --z-content: 10;
}
`;

export default function OrganicPreview() {
  return (
    <>
      <style>{STYLES}</style>
      <OrganicHomePage />
    </>
  );
}
