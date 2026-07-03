import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: 'Gift Messages',
  description:
    'Explore heartfelt gift message lines for gratitude, love, parents, friends, partners, mentors and meaningful gifting moments with CadeauAura.',
  alternates: {
    canonical: '/messages',
  },
  openGraph: {
    title: 'Gift Messages | CadeauAura',
    description:
      'Find emotional and thoughtful message lines to pair with meaningful gifts.',
    url: '/messages',
    images: ['/meaning-card.webp'],
  },
};

const messageGroups = [
  {
    title: 'For Love',
    lines: [
      'You make ordinary days feel special, and this gift is a small reflection of that feeling.',
      'With you, even simple moments become memories I want to keep forever.',
      'This is not just a gift; it is a reminder of how much you mean to me.',
    ],
  },
  {
    title: 'For Parents',
    lines: [
      'Thank you for every silent sacrifice, every blessing and every moment of care.',
      'This gift carries only a small part of the gratitude I feel for you.',
      'Your love has shaped my life in ways words can never fully express.',
    ],
  },
  {
    title: 'For Friend',
    lines: [
      'Some friendships become family, and yours is one of the most beautiful parts of my story.',
      'Thank you for being there in ways that made difficult days easier.',
      'This is a small reminder of the joy and strength your friendship brings.',
    ],
  },
  {
    title: 'For Mentor',
    lines: [
      'Your guidance gave me confidence, direction and the courage to grow.',
      'Thank you for believing in my potential and helping me move forward.',
      'This gesture carries my respect and gratitude for everything you have taught me.',
    ],
  },
  {
    title: 'For Gratitude',
    lines: [
      'Your kindness shaped this chapter of my life in ways I will always carry.',
      'Thank you for showing up with care, patience and support.',
      'This gift is a small expression of a very deep thank you.',
    ],
  },
  {
    title: 'For Celebration',
    lines: [
      'May this moment become a beautiful memory you carry for years.',
      'This gift comes with blessings, joy and warm wishes for your special day.',
      'You deserve to be celebrated with love, meaning and happiness.',
    ],
  },
];

const tips = [
  'Mention the relationship clearly',
  'Keep the tone natural and personal',
  'Add one real memory if possible',
  'Match the message with the occasion',
  'Avoid overly generic lines',
  'Keep it warm, short and sincere',
];

export default function MessagesPage() {
  const whatsappMessage =
    'Hi CadeauAura, I need help writing a gift message. Relationship: ____. Occasion: ____. Emotion: ____. Please suggest message lines.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/meaning-card.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="Gift Messages" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            Heartfelt lines for meaningful gifts
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            Choose warm, sincere and emotional message lines for love,
            gratitude, parents, friends, mentors and celebration moments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask for Message Help →
            </a>

            <Link
              href="/meaning-cards"
              className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-bold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
            >
              View Meaning Cards
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Message library
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Pick a line by relationship and emotion
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {messageGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm"
            >
              <h3 className="font-serif text-3xl text-[#5a1722]">
                {group.title}
              </h3>

              <div className="mt-5 space-y-3">
                {group.lines.map((line) => (
                  <blockquote
                    key={line}
                    className="rounded-2xl border-l-4 border-[#8f1431] bg-white p-4 text-sm leading-7 text-stone-700"
                  >
                    “{line}”
                  </blockquote>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/story-unboxing.webp')" }}
        />

        <div className="rounded-[2rem] bg-[#430816] p-7 text-white shadow-2xl shadow-[#430816]/20 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
            Writing tips
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight">
            How to make your message feel personal
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-sm font-semibold text-[#fff7ef]"
              >
                <span aria-hidden>✓</span> {tip}
              </div>
            ))}
          </div>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-[#f3c982] px-7 py-4 text-sm font-bold text-[#4b0d18] transition hover:-translate-y-1 hover:bg-[#fff2df]"
          >
            Request custom message
          </a>
        </div>
      </section>
    </main>
  );
}
