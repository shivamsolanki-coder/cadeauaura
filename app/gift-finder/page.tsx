import type { Metadata } from 'next';

import { GiftFinder } from '@/components/GiftFinder';

export const metadata: Metadata = {
  title: 'Gift Finder',
  description:
    'Use CadeauAura Gift Finder to discover meaningful gift ideas based on occasion, relationship, emotion and budget.',
  alternates: {
    canonical: '/gift-finder',
  },
  openGraph: {
    title: 'Gift Finder | CadeauAura',
    description:
      'Discover thoughtful gifting ideas by occasion, relationship, emotion and budget.',
    url: '/gift-finder',
    images: ['/hero-gift.jpg.png'],
  },
};

export default function GiftFinderPage() {
  return <GiftFinder />;
}
