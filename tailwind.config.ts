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
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
