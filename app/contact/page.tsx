import type { Metadata } from 'next';

import { SectionLabel } from '@/components/SectionLabel';

const whatsappNumber = '919205089044';

const whatsappMessage =
  'Hi CadeauAura, I want to know more about your gifting collections. Please share details.';

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

export const metadata: Metadata = {
  title: 'Contact CadeauAura',
  description:
    'Contact CadeauAura for premium gifting ideas, personalized gift boxes, meaningful message cards, festive gifts and WhatsApp gift enquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact CadeauAura',
    description:
      'Reach CadeauAura for meaningful gifting ideas, personalized collections and premium gift enquiries.',
    url: '/contact',
    images: ['/hero-gift.jpg.png'],
  },
};

export default function ContactPage() {
  return (
    <section className="overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-sm sm:p-10">
          <SectionLabel label="Contact CadeauAura" />

          <h1 className="mt-5 font-serif text-4xl leading-tight text-deep-rose sm:text-5xl">
            We would love to help you choose a meaningful gift
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-700">
            Reach us for personalized gift ideas, premium hampers, message cards,
            festive gifting, corporate gifting and culture-inspired gift boxes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#8f1431]/25 transition hover:-translate-y-1 hover:bg-[#a51c3c]"
            >
              WhatsApp Us →
            </a>

            <a
              href="mailto:hello@cadeauaura.com"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-7 py-4 text-sm font-semibold text-[#5a1722] transition hover:-translate-y-1 hover:bg-[#fff2df]"
            >
              Email Us
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Gift Enquiry',
                text: 'For birthdays, anniversaries, weddings and special moments.',
              },
              {
                title: 'Custom Hampers',
                text: 'For premium boxes, message cards and personalized themes.',
              },
              {
                title: 'Corporate Gifts',
                text: 'For clients, teams, events and festive gifting.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#ead8c7] bg-white p-5"
              >
                <h2 className="font-serif text-xl text-[#5a1722]">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-stone-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-[#160606] p-7 text-white shadow-2xl shadow-[#4b0d18]/20 sm:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.45),rgba(22,6,6,0.96))]" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982]">
              Quick Contact
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#fff7ef]">
              Start your gifting conversation on WhatsApp
            </h2>

            <div className="mt-8 space-y-4 text-sm leading-7 text-[#f6dfd0]/85">
              <p>
                <span className="font-semibold text-[#f3c982]">WhatsApp:</span>{' '}
                +91 92050 89044
              </p>

              <p>
                <span className="font-semibold text-[#f3c982]">Email:</span>{' '}
                hello@cadeauaura.com
              </p>

              <p>
                <span className="font-semibold text-[#f3c982]">Hours:</span>{' '}
                Monday to Saturday, 10:00 AM - 7:00 PM
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-[#d7a25d]/30 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm leading-7 text-[#fff7ef]/90">
                Tell us the occasion, relationship, budget and emotion you want
                to express. CadeauAura will help you find a thoughtful gifting
                direction.
              </p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-[#f3c982] px-7 py-4 text-sm font-bold text-[#4b0d18] transition hover:-translate-y-1 hover:bg-[#fff2df]"
            >
              Message on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
