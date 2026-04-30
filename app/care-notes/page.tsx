import type { Metadata } from 'next';

import { SectionLabel } from '@/components/SectionLabel';
import { giftIdeas } from '@/data/giftIdeas';

export const metadata: Metadata = {
  title: 'Gift Care Notes',
  description:
    'Explore helpful care notes for meaningful gifts, keepsakes, premium gift boxes and sentimental gifting ideas with CadeauAura.',
  alternates: {
    canonical: '/care-notes',
  },
  openGraph: {
    title: 'Gift Care Notes | CadeauAura',
    description:
      'Helpful care notes to preserve the quality, beauty and emotional value of meaningful gifts.',
    url: '/care-notes',
    images: ['/story-unboxing.jpg.png'],
  },
};

export default function CareNotesPage() {
  return (
    <section>
      <SectionLabel label="Care Notes" />

      <h1 className="mt-4 font-serif text-4xl text-deep-rose">
        Help every keepsake last longer
      </h1>

      <p className="mt-3 max-w-3xl text-stone-700">
        Meaningful gestures deserve lasting care. Use these notes to preserve
        quality and sentimental value.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {giftIdeas.map((idea) => (
          <article
            key={idea.id}
            className="rounded-2xl border border-rose-200 bg-white p-5"
          >
            <h2 className="font-serif text-xl text-deep-rose">
              {idea.title}
            </h2>

            <p className="mt-2 text-sm text-stone-700">
              {idea.careNote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
