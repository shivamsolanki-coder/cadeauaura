import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

const pillars = [
  {
    title: 'Heartfelt Idea Finder',
    text: 'Map relationships and emotions into deeply thoughtful suggestions.',
    href: '/gift-finder'
  },
  {
    title: 'Meaning Cards',
    text: 'Attach heartfelt reflections that make every gesture unforgettable.',
    href: '/meaning-cards'
  },
  {
    title: 'Culture & Tradition',
    text: 'Honor cultural values with warmth, dignity, and respectful storytelling.',
    href: '/culture-tradition'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-soft-rose to-warm-amber p-8 sm:p-12">
        <SectionLabel label="Welcome" />
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-deep-rose sm:text-5xl">
          Make Every Moment Memorable
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700">
          CadeauAura helps you express care through meaningful gift ideas, heartfelt message lines, and culturally respectful inspiration.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/gift-finder" className="rounded-full bg-deep-rose px-5 py-2 text-sm font-semibold text-ivory-cream">
            Explore Heartfelt Idea Finder
          </Link>
          <Link href="/messages" className="rounded-full border border-deep-rose px-5 py-2 text-sm font-semibold text-deep-rose">
            Read Message Lines
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {pillars.map((item) => (
          <article key={item.title} className="rounded-2xl border border-rose-200 bg-white p-6">
            <h2 className="font-serif text-2xl text-deep-rose">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">{item.text}</p>
            <Link href={item.href} className="mt-4 inline-block text-sm font-semibold text-deep-rose underline decoration-rose-300">
              Visit section
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
