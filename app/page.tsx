import Link from 'next/link';

import { HeroAuraCanvas } from '@/components/HeroAuraCanvas';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionLabel } from '@/components/SectionLabel';

const pillars = [
  {
    title: 'Heartfelt Idea Finder',
    text: 'A guided emotional lens that transforms relationships, moments, and traditions into deeply thoughtful suggestions.',
    href: '/gift-finder'
  },
  {
    title: 'Meaning Cards',
    text: 'Poetic reflections that help every gesture feel remembered, witnessed, and beautifully personal.',
    href: '/meaning-cards'
  },
  {
    title: 'Culture & Tradition',
    text: 'Respectful storytelling cues for honoring rituals, family values, and modern celebrations with grace.',
    href: '/culture-tradition'
  }
];

const storyFrames = [
  'A quiet thought becomes a luminous idea.',
  'The person, the moment, and the feeling move into focus.',
  'CadeauAura shapes the gesture into a memory with emotional depth.'
];

export default function HomePage() {
  return (
    <div className="space-y-24 overflow-hidden">
      <section className="relative grid min-h-[720px] items-center gap-10 rounded-[2.5rem] border border-white/10 bg-aura-radial p-6 shadow-aura md:grid-cols-[1.04fr_0.96fr] md:p-10 lg:p-14">
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-gold-200/20 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-luxury-purple/25 blur-3xl" />

        <div className="relative z-10">
          <SectionLabel label="Cinematic gift intelligence" />
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.95] text-stone-text sm:text-6xl lg:text-7xl">
            Make every moment feel <span className="text-gold-gradient">seen, sacred, and unforgettable.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-text/72">
            CadeauAura turns emotion into atmosphere: meaningful ideas, heartfelt message lines, and culturally respectful inspiration wrapped in a premium storytelling experience.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/gift-finder"
              className="rounded-full bg-gold-200 px-6 py-3 text-sm font-semibold text-midnight-black shadow-[0_0_34px_rgba(246,213,138,0.34)] transition hover:-translate-y-1 hover:bg-gold-100"
            >
              Explore Heartfelt Idea Finder
            </Link>
            <Link
              href="/messages"
              className="rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-gold-100 backdrop-blur transition hover:-translate-y-1 hover:border-gold-200/50"
            >
              Read Message Lines
            </Link>
          </div>
        </div>

        <div className="relative z-10 animate-float-slow">
          <HeroAuraCanvas />
          <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-200/70">Live aura sequence</p>
            <p className="mt-2 font-serif text-2xl text-gold-100">Emotion, tradition, and memory orbit into one radiant idea.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {pillars.map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 120}>
            <article className="cinematic-card h-full">
              <p className="text-xs uppercase tracking-[0.28em] text-gold-200/55">0{index + 1}</p>
              <h2 className="mt-5 font-serif text-3xl text-gold-100">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-text/70">{item.text}</p>
              <Link href={item.href} className="premium-link mt-6 inline-block text-sm font-semibold">
                Enter the scene →
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl md:p-10">
        <ScrollReveal>
          <SectionLabel label="Video-style storytelling" />
          <h2 className="mt-5 max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">
            A premium journey from feeling to unforgettable gesture.
          </h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {storyFrames.map((frame, index) => (
            <ScrollReveal key={frame} delay={index * 140}>
              <article className="relative min-h-56 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-purple-950/20 p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-200/15 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.3em] text-gold-200/55">Scene {index + 1}</p>
                <h3 className="mt-12 font-serif text-3xl text-stone-text">{frame}</h3>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="relative overflow-hidden rounded-[2.5rem] border border-gold-200/20 bg-gradient-to-r from-gold-200/15 via-luxury-purple/15 to-black p-8 text-center shadow-aura md:p-12">
          <div className="absolute left-1/2 top-0 h-32 w-2/3 -translate-x-1/2 rounded-full bg-gold-200/20 blur-3xl" />
          <SectionLabel label="Begin the aura" />
          <h2 className="relative mx-auto mt-5 max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">
            Let CadeauAura guide the feeling before the moment arrives.
          </h2>
          <Link
            href="/categories"
            className="relative mt-8 inline-flex rounded-full bg-gold-200 px-7 py-3 text-sm font-semibold text-midnight-black transition hover:-translate-y-1 hover:bg-gold-100"
          >
            Explore Categories
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}
