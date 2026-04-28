import { SectionLabel } from '@/components/SectionLabel';

const traditions = [
  {
    culture: 'Indian',
    note: 'Gifting often reflects blessings, family honor, and auspicious beginnings. Include respectful colors and heartfelt handwritten wishes.'
  },
  {
    culture: 'Japanese',
    note: 'Thoughtful wrapping, subtle elegance, and timing communicate deep respect. Simplicity can carry profound meaning.'
  },
  {
    culture: 'Middle Eastern',
    note: 'Hospitality and generosity are central. Quality presentation and sincere language signal appreciation and dignity.'
  },
  {
    culture: 'African',
    note: 'Community storytelling and heritage symbolism can make a gesture deeply resonant and family-centered.'
  },
  {
    culture: 'Latin',
    note: 'Warmth, celebration, and expressive sentiment are often valued. Shared moments are as meaningful as the keepsake itself.'
  },
  {
    culture: 'Global',
    note: 'Lead with empathy, respect boundaries, and acknowledge personal preferences to make every gesture meaningful.'
  }
];

export default function CultureTraditionPage() {
  return (
    <section>
      <SectionLabel label="Culture & Tradition" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">Honor roots with respectful gestures</h1>
      <p className="mt-3 max-w-2xl text-stone-700">
        CadeauAura celebrates cultural nuance so your gift ideas feel thoughtful and appropriate.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {traditions.map((item) => (
          <article key={item.culture} className="rounded-2xl border border-rose-200 bg-white p-5">
            <h2 className="font-serif text-2xl text-deep-rose">{item.culture}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
