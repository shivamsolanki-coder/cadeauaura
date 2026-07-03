import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Message Lines',
  description:
    'Heartfelt one-line messages you can borrow for cards, gifts and quiet gestures.',
  alternates: {
    canonical: '/message-lines',
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

export default function MessageLinesPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.6)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="Message Lines" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl">
            Heartfelt lines for meaningful moments
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            Borrow a line as it is, or let it start the message that is truly
            yours. Every one of them works inside a card, a gift box or a
            quiet text.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {lines.map((line) => (
            <blockquote
              key={line}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 font-serif text-lg leading-8 text-[#5a1722] shadow-sm"
            >
              “{line}”
            </blockquote>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#ead8c7] bg-white p-7 text-center shadow-sm sm:p-10">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-[#5a1722] sm:text-4xl">
            Want words shaped around your own story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-700">
            The Moment Builder listens to what you share and helps you find
            the sentences that sound like you.
          </p>
          <Link
            href="/create"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#a51c3c]"
          >
            <span>Begin a moment</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
