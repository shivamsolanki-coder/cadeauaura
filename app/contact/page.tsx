import { SectionLabel } from '@/components/SectionLabel';

export default function ContactPage() {
  return (
    <section className="max-w-3xl">
      <SectionLabel label="Contact" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">We would love to hear your story</h1>
      <p className="mt-4 leading-7 text-stone-700">
        Reach us for collaborations, thoughtful suggestions, or to share how a CadeauAura idea became part of your memory.
      </p>
      <div className="mt-6 rounded-2xl border border-rose-200 bg-white p-5 text-sm text-stone-700">
        <p>Email: hello@cadeauaura.com</p>
        <p className="mt-2">Phone: +1 (555) 019-2026</p>
        <p className="mt-2">Hours: Monday to Friday, 9:00 AM – 6:00 PM (UTC)</p>
      </div>
    </section>
  );
}
