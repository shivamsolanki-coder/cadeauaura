import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';
import { giftIdeas } from '@/data/giftIdeas';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: 'Gift Care Notes',
  description:
    'Explore helpful care notes for meaningful gifts, keepsakes, premium gift boxes, message cards and sentimental gifting ideas with CadeauAura.',
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

const generalNotes = [
  {
    title: 'Keep away from moisture',
    text: 'Store paper cards, keepsakes and premium boxes in a dry place to protect finish and quality.',
  },
  {
    title: 'Avoid direct sunlight',
    text: 'Long exposure to sunlight may fade printed cards, ribbons, photos and decorative elements.',
  },
  {
    title: 'Handle packaging gently',
    text: 'Premium boxes, ribbons and inserts should be opened carefully to maintain presentation.',
  },
  {
    title: 'Preserve message cards',
    text: 'Keep message cards flat or inside the box so the emotional value stays protected.',
  },
];

export default function CareNotesPage() {
  const whatsappMessage =
    'Hi CadeauAura, I want guidance about gift care, packaging and how to preserve a keepsake gift.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/story-unboxing.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="Care Notes" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            Help every meaningful gift last longer
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            Meaningful gifts carry memory. Use simple care notes to protect
            premium boxes, cards, keepsakes and emotional gifting details.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask Care Guidance →
            </a>

            <Link
              href="/categories"
              className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-bold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
            >
              Explore Gifts
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            General care
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Simple ways to protect your gift
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {generalNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm"
            >
              <h3 className="font-serif text-2xl text-[#5a1722]">
                {note.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                {note.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Idea-wise care
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Care notes for thoughtful gift ideas
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                These notes help preserve the emotional and presentation value
                of keepsake-style gifts.
              </p>
            </div>

            <Link
              href="/gift-finder"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Try Gift Finder
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {giftIdeas.slice(0, 8).map((idea) => (
              <article
                key={idea.id}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur"
              >
                <h3 className="font-serif text-2xl text-[#fff7ef]">
                  {idea.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  {idea.careNote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />

        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Before gifting
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Ask for care details before final confirmation
          </h2>

          <p className="mt-5 text-sm leading-7 text-stone-700">
            If your gift includes a keepsake, message card, premium box,
            decorative finish or personalized item, ask how it should be stored
            and handled before finalizing.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask on WhatsApp
            </a>

            <Link
              href="/contact"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-7 py-4 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
            >
              Contact CadeauAura
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
