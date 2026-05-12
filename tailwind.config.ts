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
        // Legacy tokens — still used across category, message, care pages.
        // Will be migrated page-by-page in a later phase.
        'deep-rose': '#4C0519',
        'ivory-cream': '#FFF9F5',
        'soft-rose': '#FFF1F2',
        'warm-amber': '#FEF3C7',
        'stone-text': '#1C1917',
        // New brand palette — use these for all new components.
        ...brandColors
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'Fraunces',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif'
        ],
        serif: [
          'var(--font-display)',
          'Fraunces',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif'
        ],
        sans: [
          'var(--font-ui)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};

export default config;
