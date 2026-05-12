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
        'deep-rose': '#F6D58A',
        'ivory-cream': '#08050F',
        'soft-rose': '#140B24',
        'warm-amber': '#F6D58A',
        'stone-text': '#F7EED8',
        'midnight-black': '#05030A',
        'luxury-purple': '#7C3AED',
        'aura-violet': '#B678FF',
        gold: {
          100: '#FFF3C4',
          200: '#F8DF9B',
          300: '#D7A84E',
          400: '#B98322'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        aura: '0 0 80px rgba(124, 58, 237, 0.28), 0 0 36px rgba(246, 213, 138, 0.16)',
        glass: '0 24px 80px rgba(0, 0, 0, 0.32)'
      },
      backgroundImage: {
        'aura-radial': 'radial-gradient(circle at 20% 20%, rgba(246, 213, 138, 0.18), transparent 26%), radial-gradient(circle at 78% 18%, rgba(124, 58, 237, 0.24), transparent 28%), radial-gradient(circle at 50% 90%, rgba(182, 120, 255, 0.12), transparent 32%)'
      }
    }
  },
  plugins: []
};

export default config;
