import type { Metadata } from 'next';

import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Gift Messages',
  description:
    'Explore heartfelt gift message lines for gratitude, love, memories and meaningful moments with CadeauAura.',
  alternates: {
    canonical: '/messages',
  },
  openGraph: {
    title: 'Gift Messages | CadeauAura',
    description:
      'Find emotional and thoughtful message lines to pair with meaningful gifts.',
    url: '/messages',
    images: ['/meaning-card.jpg.png'],
  },
};

const lines = [
  'Thank you for holding my hand through moments I could not name.',
  'This is a small reminder of the beautiful impact you make every day.',
  'Your presence has been my quiet strength and steady light.',
  'May this gesture carry the gratitude my words still struggle to hold.',
  'Every memory with you has become part of who I am.',
  'You turned simple days into stories I will cherish forever.',
];

export default function MessagesPage() {
  return (
    <section>
      <SectionLabel label="Message Lines" />

      <h1 className="mt-4 font-serif text-4xl text-deep-rose">
        Heartfelt lines for meaningful moments
      </h1>

      <div className="mt-8 grid gap-3">
        {lines.map((line) => (
          <blockquote
            key={line}
            className="rounded-xl border-l-4 border-deep-rose bg-white p-4 text-stone-700"
          >
            “{line}”
          </blockquote>
        ))}
      </div>
    </section>
  );
}
