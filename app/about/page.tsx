import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const values = [
  {
    title: 'Emotion first',
    text: 'A gift should carry feeling, not just price or packaging.',
  },
  {
    title: 'Culture with warmth',
    text: 'Every culture has rituals, blessings and small details that make moments memorable. We design with all of them in mind.',
  },
  {
    title: 'Personal meaning',
    text: 'The right message, box and presentation can make a simple gift feel deeply thoughtful.',
  },
  {
    title: 'Honest enquiry',
    text: 'Photos, pricing, customization and delivery details should be checked clearly before final confirmation.',
  },
];

const process = [
  {
    step: '01',
    title: 'Understand the moment',
    text: 'We start with the occasion, relationship, budget and emotion behind the gift.',
  },
  {
    step: '02',
    title: 'Suggest suitable ideas',
    text: 'You can explore categories, product ideas, message cards and packaging options.',
  },
  {
    step: '03',
    title: 'Discuss on WhatsApp',
    text: 'You can ask for real photos, customization options, final price and delivery timeline.',
  },
  {
    step: '04',
    title: 'Finalize with clarity',
    text: 'Once all details are clear, you can decide the gift that feels right.',
  },
];

export const metadata: Metadata = {
  title: 'About CadeauAura',
  description:
    'Learn about CadeauAura, a meaningful gifting concept built around emotion, culture, message cards, premium packaging and WhatsApp-based gift guidance.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About CadeauAura',
    description:
      'CadeauAura helps people discover thoughtful gift ideas inspired by emotion, culture and personal meaning.',
    url: '/about',
    images: ['/hero-gift.jpg.png'],
  },
};

export default function AboutPage() {
  const whatsappMessage =
    'Hi CadeauAura, I want to know more about your gifting ideas and how the enquiry process works.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/story-unboxing.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="About CadeauAura" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            A gifting idea built around emotion, culture and meaning
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            CadeauAura helps people discover thoughtful gifting ideas for
            birthdays, anniversaries, weddings, festivals, family moments and
            professional relationships.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/categories"
              className="rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#8f1431]/30 transition hover:-translate-y-1 hover:bg-[#a51c3c]"
            >
              Explore Gift Categories →
            </Link>

            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Our purpose
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Gifts should feel remembered, not random
          </h2>

          <p className="mt-5 text-sm leading-7 text-stone-700">
            Most people want to give something meaningful, but choosing the right
            gift can feel confusing. CadeauAura is created to make that decision
            simpler by connecting gift ideas with emotion, relationship,
            culture and personal message.
          </p>

          <p className="mt-4 text-sm leading-7 text-stone-700">
            The focus is not only on the product. The focus is on the feeling:
            love, gratitude, pride, celebration, blessing, care and connection.
          </p>
        </div>

        <div
          className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/meaning-card.jpg.png')" }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            What we believe
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Simple values behind CadeauAura
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm"
            >
              <h3 className="font-serif text-2xl text-[#5a1722]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                How CadeauAura works
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Guidance before gifting
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                CadeauAura currently works through an enquiry-based flow, so you
                can discuss product details clearly before deciding.
              </p>
            </div>

            <Link
              href="/gift-finder"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Try Gift Finder
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
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

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
        />

        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Gifting warmth, everywhere
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Inspired by rituals, blessings and personal bonds
          </h2>

          <p className="mt-5 text-sm leading-7 text-stone-700">
            Meaningful gifting is never only about the item. Across cultures it
            carries respect, blessings, family emotion, celebration and memory.
            CadeauAura brings that warmth into modern gift ideas, message cards
            and premium presentation — wherever your traditions come from.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/culture-tradition"
              className="rounded-full bg-[#8f1431] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#a51c3c]"
            >
              Explore Culture →
            </Link>

            <Link
              href="/meaning-cards"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-6 py-3 text-sm font-semibold text-[#5a1722] transition hover:bg-[#fff2df]"
            >
              View Meaning Cards
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
