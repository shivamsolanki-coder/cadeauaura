import Link from 'next/link';

import { CinematicHero } from '@/components/home/CinematicHero';
import { MomentsAsObjects } from '@/components/moments/MomentsAsObjects';

export default function HomePage() {
  return (
    <main className="bg-ink-950 text-cream-50">
      <CinematicHero />

      {/* Moments as Objects */}
      <MomentsAsObjects />

      {/* Philosophy strip */}
      <section className="px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 border-y border-cream-50/10 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-light uppercase tracking-[0.34em] text-gold-300/72">
              What this is
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-light leading-[1.12] tracking-[-0.02em] text-cream-50 sm:text-4xl">
              A private writing studio for emotional gestures.
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-8 text-cream-50/58 sm:text-base">
            <p>
              CadeauAura helps you begin with what is hardest to say:
              who this is for, what they have held for you, and what still
              lives quietly between you.
            </p>
            <p>
              From there, the experience stays restrained. A reflection.
              A follow-up. A draft. A private reveal. Nothing is sent until
              you say so.
            </p>
          </div>
        </div>
      </section>

      {/* Service-style pathways */}
      <section className="px-6 py-8 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-light uppercase tracking-[0.34em] text-gold-300/72">
            Ways in
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.03] p-8 backdrop-blur-sm transition duration-500 hover:border-gold-300/30 hover:bg-cream-50/[0.05]">
              <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-cream-50/55">
                For someone present
              </p>
              <h3 className="mt-4 font-display text-2xl font-light text-cream-50">
                A message with weight
              </h3>
              <p className="mt-4 text-sm leading-7 text-cream-50/56">
                For gratitude, affection, reassurance, or the kind of truth
                that deserves better words than a hurried text.
              </p>
              <Link
                href="/create"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-cream-50/72 underline-offset-4 transition hover:text-cream-50 hover:underline"
              >
                <span>Begin</span>
                <span aria-hidden>→</span>
              </Link>
            </article>

            <article className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.03] p-8 backdrop-blur-sm transition duration-500 hover:border-gold-300/30 hover:bg-cream-50/[0.05]">
              <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-cream-50/55">
                For time and distance
              </p>
              <h3 className="mt-4 font-display text-2xl font-light text-cream-50">
                A thread not fully lost
              </h3>
              <p className="mt-4 text-sm leading-7 text-cream-50/56">
                For someone you have not spoken to in a while, or someone
                whose place in you never fully disappeared.
              </p>
              <Link
                href="/create"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-cream-50/72 underline-offset-4 transition hover:text-cream-50 hover:underline"
              >
                <span>Begin</span>
                <span aria-hidden>→</span>
              </Link>
            </article>

            <article className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.03] p-8 backdrop-blur-sm transition duration-500 hover:border-gold-300/30 hover:bg-cream-50/[0.05]">
              <p className="text-[0.65rem] font-light uppercase tracking-[0.28em] text-cream-50/55">
                For what remains
              </p>
              <h3 className="mt-4 font-display text-2xl font-light text-cream-50">
                A quieter goodbye
              </h3>
              <p className="mt-4 text-sm leading-7 text-cream-50/56">
                For remembrance, grief, and the kinds of presence that no longer
                arrive in person but still change the room.
              </p>
              <Link
                href="/create"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-cream-50/72 underline-offset-4 transition hover:text-cream-50 hover:underline"
              >
                <span>Begin</span>
                <span aria-hidden>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-light uppercase tracking-[0.34em] text-gold-300/72">
            When you are ready
          </p>

          <h2 className="mt-5 font-display text-3xl font-light leading-[1.12] tracking-[-0.02em] text-cream-50 sm:text-5xl">
            Begin with a few quiet questions.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-cream-50/58 sm:text-base">
            Nothing is sent until you decide. Your draft is held first,
            shaped carefully, and revealed only when it feels true.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-8 py-4 text-sm font-medium text-cream-50 transition hover:bg-rose-600"
            >
              <span>Begin a moment</span>
              <span aria-hidden>→</span>
            </Link>

            <Link
              href="/gift-finder"
              className="inline-flex items-center gap-2 rounded-full border border-cream-50/16 px-8 py-4 text-sm font-light text-cream-50/78 transition hover:border-cream-50/36 hover:text-cream-50"
            >
              <span>Explore the language</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
