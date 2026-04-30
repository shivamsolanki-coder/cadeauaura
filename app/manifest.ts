import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CadeauAura | Meaningful Gifts for Every Emotion',
    short_name: 'CadeauAura',
    description:
      'CadeauAura helps you discover meaningful gifts inspired by emotion, culture and connection.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#160606',
    theme_color: '#160606',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
