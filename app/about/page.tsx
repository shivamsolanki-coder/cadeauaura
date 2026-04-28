import { SectionLabel } from '@/components/SectionLabel';

export default function AboutPage() {
  return (
    <section className="max-w-3xl">
      <SectionLabel label="About CadeauAura" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">A brand built on memory and meaning</h1>
      <p className="mt-4 leading-7 text-stone-700">
        CadeauAura exists to help people celebrate relationships with grace. We believe the most memorable gestures are those that
        reflect emotion, culture, and personal story.
      </p>
      <p className="mt-4 leading-7 text-stone-700">
        Our approach is simple: understand the heart of a moment, then guide you toward thoughtful ideas and words that feel real,
        respectful, and lasting.
      </p>
    </section>
  );
}
