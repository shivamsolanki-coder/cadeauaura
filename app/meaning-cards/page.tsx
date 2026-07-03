import type { Metadata } from 'next';
import Link from 'next/link';

import { MeaningCard } from '@/components/MeaningCard';
import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: 'Meaning Cards',
  description:
    'Explore heartfelt meaning cards and thoughtful message ideas for love, gratitude, pride, comfort, hope and joy. Add sincere words to your CadeauAura gift.',
  alternates: {
    canonical: '/meaning-cards',
  },
  openGraph: {
    title: 'Meaning Cards | CadeauAura',
    description:
      'Pair every gift with sincere words that make the moment more personal and memorable.',
    url: '/meaning-cards',
    images: ['/meaning-card.jpg.png'],
  },
};

const cards = [
  {
    title: 'For Gratitude',
    reflection:
      'Your kindness shaped this chapter of my life in ways I will always carry.',
  },
  {
    title: 'For Love',
    reflection:
      'You make ordinary days feel sacred, and your presence feels like home.',
  },
  {
    title: 'For Pride',
    reflection:
      'The courage you show each day is a quiet inspiration to everyone around you.',
  },
  {
    title: 'For Comfort',
    reflection:
      'In difficult moments, your warmth reminds me that I am never alone.',
  },
  {
    title: 'For Hope',
    reflection:
      'May this gesture remind you that beautiful beginnings are still unfolding.',
  },
  {
    title: 'For Joy',
    reflection:
      'Your laughter lights every room, and this moment is brighter because of you.',
  },
];

const examples = [
  {
    title: 'For Partner',
    text: 'You are not just part of my life; you are the calm, joy and meaning inside it.',
  },
  {
    title: 'For Parents',
    text: 'Thank you for every silent sacrifice, every blessing and every moment of care.',
  },
  {
    title: 'For Friend',
    text: 'Some friendships become family, and yours is one of the most beautiful parts of my story.',
  },
  {
    title: 'For Mentor',
    text: 'Your guidance gave me confidence, direction and the courage to grow.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose the emotion',
    text: 'Select love, gratitude, pride, comfort, hope or joy based on the moment.',
  },
  {
    step: '02',
    title: 'Personalize the words',
    text: 'Share the recipient, occasion and tone you want for the message.',
  },
  {
    step: '03',
    title: 'Pair it with a gift',
    text: 'Use the message card with a product, hamper or premium gift box.',
  },
];

export default function MeaningCardsPage() {
  const whatsappMessage =
    'Hi CadeauAura, I want a custom meaning card message with my gift. Occasion: ____. Relationship: ____. Emotion: ____. Please suggest message lines.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/meaning-card.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="Meaning Cards" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            Words that make every gift feel personal
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            Pair your gift with a heartfelt message card written around emotion,
            relationship and the moment you want to celebrate.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask for Custom Message →
            </a>

            <Link
              href="/gift-finder"
              className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-bold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
            >
              Match with Gift Finder
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Emotion-based cards
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Choose the feeling behind your gift
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            These examples help you decide the emotional direction of your
            message card.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <MeaningCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                How it works
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                From emotion to message card
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                You can use these cards as inspiration or ask CadeauAura to
                suggest a message based on your occasion.
              </p>
            </div>

            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Request message help
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur"
              >
                <p className="text-sm font-black text-[#e8b36f]">
                  {item.step}
                </p>

                <h3 className="mt-4 font-serif text-2xl text-[#fff7ef]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="min-h-[380px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/story-unboxing.jpg.png')" }}
        />

        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Message examples
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Relationship-based message ideas
          </h2>

          <div className="mt-7 space-y-4">
            {examples.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#ead8c7] bg-white p-5"
              >
                <h3 className="font-serif text-2xl text-[#5a1722]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-stone-700">
                  “{item.text}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 text-center shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Make it personal
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#5a1722]">
            Need a message written for your exact occasion?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-700">
            Share the relationship, occasion and emotion on WhatsApp. CadeauAura
            can suggest message lines that fit your gift.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask on WhatsApp
            </a>

            <Link
              href="/categories"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-7 py-4 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
            >
              Explore Gifts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
