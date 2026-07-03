import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const enquiryOptions = [
  {
    title: 'Gift suggestion',
    text: 'Need help choosing a gift by occasion, relationship and budget.',
    message:
      'Hi CadeauAura, I need help choosing a meaningful gift. Occasion: ____. Relationship: ____. Budget: ____. Please guide me.',
  },
  {
    title: 'Product enquiry',
    text: 'Ask for photos, price, customization and delivery details.',
    message:
      'Hi CadeauAura, I want to enquire about a gift product. Please share real photos, price details, customization options and delivery timeline.',
  },
  {
    title: 'Message card',
    text: 'Ask for custom message lines to pair with your gift.',
    message:
      'Hi CadeauAura, I want a custom message card with my gift. Please share message card options and examples.',
  },
  {
    title: 'Corporate gifting',
    text: 'For clients, teams, events and festive bulk gifting.',
    message:
      'Hi CadeauAura, I want to discuss corporate gifting. Please share suitable options, pricing and customization details.',
  },
];

const shareDetails = [
  'Occasion or festival',
  'Relationship with recipient',
  'Approximate budget',
  'Preferred gift type',
  'Delivery city or timeline',
  'Message card requirement',
];

export const metadata: Metadata = {
  title: 'Contact CadeauAura',
  description:
    'Contact CadeauAura on WhatsApp for meaningful gift suggestions, product enquiries, message cards, premium packaging and corporate gifting.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact CadeauAura',
    description:
      'Reach CadeauAura for meaningful gifting ideas, product enquiries, message cards and premium gift guidance.',
    url: '/contact',
    images: ['/hero-gift.webp'],
  },
};

export default function ContactPage() {
  const generalMessage =
    'Hi CadeauAura, I want help with gifting. Please guide me with suitable options.';

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/culture-diya.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_48%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionLabel label="Contact CadeauAura" />

            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Start your gifting enquiry on WhatsApp
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
              Tell us the occasion, relationship, budget and emotion you want to
              express. CadeauAura will guide you with suitable gift ideas,
              message cards and packaging options.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
              >
                Message on WhatsApp →
              </a>

              <Link
                href="/gift-finder"
                className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-bold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Try Gift Finder
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d7a25d]/30 bg-[#2c0b10]/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982]">
              Quick Contact
            </p>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#f6dfd0]/85">
              <p>
                <span className="font-semibold text-[#f3c982]">WhatsApp:</span>{' '}
                +91 92050 89044
              </p>

              <p>
                <span className="font-semibold text-[#f3c982]">Email:</span>{' '}
                hello@cadeauaura.com
              </p>

              <p>
                <span className="font-semibold text-[#f3c982]">
                  Best way to contact:
                </span>{' '}
                WhatsApp enquiry with your occasion, budget and requirement.
              </p>

              <p>
                <span className="font-semibold text-[#f3c982]">
                  Response note:
                </span>{' '}
                Details such as final price, customization and delivery timeline
                are shared after enquiry.
              </p>
            </div>

            <a
              href={getWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full justify-center rounded-full bg-[#f3c982] px-7 py-4 text-sm font-bold text-[#4b0d18] transition hover:-translate-y-1 hover:bg-[#fff2df]"
            >
              Send WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Choose enquiry type
          </p>

          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            What do you need help with?
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            Pick the closest option below. Each button opens WhatsApp with a
            ready message you can edit before sending.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {enquiryOptions.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="font-serif text-2xl text-[#5a1722]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-700">
                {item.text}
              </p>

              <a
                href={getWhatsAppLink(item.message)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
              >
                WhatsApp this →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            What to share
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722]">
            Share these details for better gift guidance
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {shareDetails.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#ead8c7] bg-white p-4 text-sm font-semibold text-[#5a1722]"
              >
                <span aria-hidden>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#430816] p-7 text-white shadow-2xl shadow-[#430816]/20 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
            Honest process
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight">
            Confirm details before finalizing
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/85">
            CadeauAura currently works through enquiry-based gifting. Product
            photos, customization, final pricing and delivery timeline should be
            checked clearly on WhatsApp before confirmation.
          </p>

          <div className="mt-7 space-y-3">
            {[
              'Ask for real product photos',
              'Confirm customization options',
              'Confirm final price',
              'Confirm delivery timeline',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-sm font-semibold text-[#fff7ef]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
