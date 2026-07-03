import Link from 'next/link';

import { CinematicHero } from '@/components/home/CinematicHero';
import { ExperienceStory } from '@/components/home/ExperienceStory';
import { MomentGrid } from '@/components/home/MomentGrid';
import { MomentsAsObjects } from '@/components/moments/MomentsAsObjects';

export default function HomePage() {
  return (
    <main className="bg-ink-950 text-cream-50">
      <CinematicHero />

      {/* Ways in — hover-reveal moment grid */}
      <MomentGrid />

      {/* The Experience — pinned scroll story */}
      <ExperienceStory />

      {/* Moments as Objects */}
      <MomentsAsObjects />

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
