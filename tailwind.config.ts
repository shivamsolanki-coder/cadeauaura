import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'deep-rose': '#4C0519',
        'ivory-cream': '#FFF9F5',
        'soft-rose': '#FFF1F2',
        'warm-amber': '#FEF3C7',
        'stone-text': '#1C1917'
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
