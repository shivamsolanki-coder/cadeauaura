import type { Metadata } from 'next';

import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'About CadeauAura',
  description:
    'Learn about CadeauAura, a meaningful gifting brand built around emotion, culture, personal stories and thoughtful gift experiences.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About CadeauAura',
    description:
      'CadeauAura helps people celebrate relationships with graceful, emotional and culturally meaningful gifting ideas.',
    url: '/about',
    images: ['/hero-gift.jpg.png'],
  },
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl">
      <SectionLabel label="About CadeauAura" />

      <h1 className="mt-4 font-serif text-4xl text-deep-rose">
        A brand built on memory and meaning
      </h1>

      <p className="mt-4 leading-7 text-stone-700">
        CadeauAura exists to help people celebrate relationships with grace. We
        believe the most memorable gestures are those that reflect emotion,
        culture, and personal story.
      </p>

      <p className="mt-4 leading-7 text-stone-700">
        Our approach is simple: understand the heart of a moment, then guide you
        toward thoughtful ideas and words that feel real, respectful, and
        lasting.
      </p>
    </section>
  );
}
