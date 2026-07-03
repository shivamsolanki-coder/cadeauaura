import type { Config } from 'tailwindcss';

import { colors as brandColors } from './config/tokens';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Legacy aliases, remapped onto the brand palette so older
        // components share one color system with the newer pages.
        'deep-rose': '#4A0716',
        'ivory-cream': '#FFF7EF',
        'soft-rose': '#F8EADF',
        'warm-amber': '#F6E3C6',
        'stone-text': '#1C1917',
        ...brandColors
      },
      fontFamily: {
        display: ['var(--font-display)','Fraunces','Georgia','Cambria','Times New Roman','Times','serif'],
        serif: ['var(--font-display)','Fraunces','Georgia','Cambria','Times New Roman','Times','serif'],
        sans: ['var(--font-ui)','Inter','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
