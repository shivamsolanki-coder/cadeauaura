import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const metadata: Metadata = {
  title: 'Culture & Tradition',
  description:
    'Explore Indian gifting traditions, festive rituals, diya-inspired aesthetics, wedding gifting, blessings and culturally meaningful celebrations with CadeauAura.',
  alternates: {
    canonical: '/culture-tradition',
  },
  openGraph: {
    title: 'Culture & Tradition | CadeauAura',
    description:
      'Celebrate gifting inspired by Indian traditions, rituals, festivals, blessings and emotional connection.',
    url: '/culture-tradition',
    images: ['/culture-diya.jpg.png'],
  },
};

const traditions = [
  {
    title: 'Festive gifting',
    text: 'Gift ideas inspired by lights, sweets, blessings, family visits and celebration rituals.',
  },
  {
    title: 'Wedding blessings',
    text: 'Elegant gifts that carry warmth, respect and family emotion for wedding moments.',
  },
  {
    title: 'Family gratitude',
    text: 'Thoughtful gifts for parents, grandparents and elders with message-card warmth.',
  },
  {
    title: 'Premium presentation',
    text: 'Packaging, ribbons, cards and cultural touches that make a gift feel complete.',
  },
];

const occasions = [
  {
    title: 'Diwali',
    text: 'Diyas, warm gold tones, festive boxes and blessings-led presentation.',
  },
  {
    title: 'Rakhi',
    text: 'Sibling-focused gifting with emotion, memory and playful warmth.',
  },
  {
    title: 'Wedding',
    text: 'Premium keepsakes, blessing boxes and elegant couple gifting ideas.',
  },
  {
    title: 'Housewarming',
    text: 'Warm, graceful and practical gifts for a new beginning.',
  },
  {
    title: 'Family celebration',
    text: 'Gifts that feel personal for parents, elders and close relatives.',
  },
  {
    title: 'Corporate festive',
    text: 'Client and team gifting with refined packaging and festival-ready presentation.',
  },
];

const process = [
  {
    step: '01',
    title: 'Pick the occasion',
    text: 'Choose the festival, family event or cultural moment you are gifting for.',
  },
  {
    step: '02',
    title: 'Choose the emotion',
    text: 'Decide whether the gift should feel warm, premium, devotional, grateful or celebratory.',
  },
  {
    step: '03',
    title: 'Enquire on WhatsApp',
    text: 'Ask for suitable gift ideas, message cards, packaging and current availability.',
  },
];

export default function CultureTraditionPage() {
  const whatsappMessage =
    'Hi CadeauAura, I want a culture-inspired gift. Occasion: ____. Relationship: ____. Budget: ____. Please suggest suitable options.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel label="Culture & Tradition" />

          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            Gifts inspired by Indian warmth, rituals and blessings
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            CadeauAura celebrates gifts that feel rooted in culture — diya
            warmth, marigold tones, family blessings, festive emotions and
            graceful presentation.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask for Culture Gift →
            </a>

            <Link
              href="/categories/festive-gifts"
              className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-bold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
            >
              Explore Festive Gifts
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Indian gifting story
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            A gift is also a blessing, a memory and a gesture of respect
          </h2>

          <p className="mt-5 text-sm leading-7 text-stone-700">
            In Indian celebrations, gifting is not only about the item. It is
            about the relationship, the occasion, the respect behind the gesture
            and the warmth with which it is presented.
          </p>

          <p className="mt-4 text-sm leading-7 text-stone-700">
            CadeauAura brings that emotion into modern gift ideas through
            message cards, premium packaging, festive themes and thoughtful
            presentation.
          </p>
        </div>

        <div
          className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
          style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Gifting moods
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Cultural details that make gifts feel meaningful
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {traditions.map((item) => (
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
                Occasion ideas
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Choose gifts by cultural moment
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                Every cultural occasion has a different emotion. Choose the
                moment first, then match the gift style.
              </p>
            </div>

            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Ask for suggestion
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {occasions.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur"
              >
                <h3 className="font-serif text-2xl text-[#fff7ef]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/65">
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
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />

        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            How to select
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Match the gift with the emotion of the occasion
          </h2>

          <div className="mt-7 space-y-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-[#ead8c7] bg-white p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8a4a2d]">
                  {item.step}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#5a1722]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 text-center shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Culture-inspired enquiry
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#5a1722]">
            Want a gift that feels festive, graceful and meaningful?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-700">
            Share the occasion, relationship and budget on WhatsApp. CadeauAura
            can suggest suitable cultural gifting ideas.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Ask on WhatsApp
            </a>

            <Link
              href="/categories/festive-gifts"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-7 py-4 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
            >
              Explore Festive Gifts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
