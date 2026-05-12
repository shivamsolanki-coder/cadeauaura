/**
 * Color tokens for the CadeauAura redesign.
 *
 * Use Tailwind utilities (`bg-ink-950`, `text-cream-50`, etc.) in markup.
 * Import from this file only when a value is needed in TypeScript
 * (gradients composed in JS, OG image renderers, motion variants).
 *
 * Existing pages still reference legacy tokens (`deep-rose`,
 * `ivory-cream`, raw hex literals). Migration happens page-by-page.
 */
export const colors = {
  ink: {
    900: '#160606',
    950: '#0F0608',
  },
  wine: {
    700: '#4A0716',
    800: '#3A0510',
  },
  rose: {
    500: '#8F1431',
    600: '#7E102C',
  },
  gold: {
    300: '#F3C982',
    500: '#D7A25D',
  },
  cream: {
    50: '#FFF7EF',
  },
  sand: {
    100: '#F8EADF',
  },
  mist: {
    200: '#EAD8C7',
  },
  ember: {
    500: '#C25A2A',
  },
} as const;

export type ColorScale = typeof colors;
