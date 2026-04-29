import type { Metadata } from 'next';

import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Culture & Tradition',
  description:
    'Explore Indian gifting traditions, festive rituals, diya-inspired aesthetics and culturally meaningful celebrations with CadeauAura.',
  alternates: {
    canonical: '/culture-tradition',
  },
  openGraph: {
    title: 'Culture & Tradition | CadeauAura',
    description:
      'Celebrate gifting inspired by Indian traditions, rituals and emotional connection.',
    url: '/culture-tradition',
    images: ['/culture-diya.jpg.png'],
  },
};

export default function CultureTraditionPage() {
  return (
    <section>
      <SectionLabel label="Culture & Tradition" />

      <h1 className="mt-4 font-serif text-4xl text-deep-rose">
        Gifts rooted in culture and emotion
      </h1>

      <p className="mt-3 max-w-3xl text-stone-700">
        CadeauAura celebrates gifting traditions inspired by Indian rituals,
        festivals, diya warmth, blessings and meaningful human connection.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Diwali Gifting',
            text: 'Warm lights, diya aesthetics and premium festive presentation.',
          },
          {
            title: 'Wedding Rituals',
            text: 'Elegant gifts inspired by blessings, family and celebration.',
          },
          {
            title: 'Meaningful Packaging',
            text: 'Luxury wrapping and emotional presentation that feels memorable.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm"
          >
            <h2 className="font-serif text-2xl text-[#5a1722]">
              {item.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-700">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
