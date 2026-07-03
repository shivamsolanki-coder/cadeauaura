'use client';

import dynamic from 'next/dynamic';

/**
 * Moments as Objects — section for the homepage.
 *
 * One sealed envelope, slowly rotating in 3D, beside a short
 * typographic list of five emotional addresses. The 3D is the accent;
 * the writing is the centre. The whole section sits low on the page
 * so the top fold (HeroQuestion + HeroEcho) stays as the first
 * cinematic impression.
 *
 * The Canvas + lighting + 3D libs live behind a dynamic import with
 * ssr disabled. Mobile / reduced-motion users get a typographic
 * fallback and never download the WebGL chunks.
 *
 * Drop into any page:
 *   import { MomentsAsObjects } from '@/components/moments/MomentsAsObjects';
 *   <MomentsAsObjects />
 */

const MomentsStage = dynamic(
  () => import('./MomentsStage').then((mod) => ({ default: mod.MomentsStage })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[64svh] min-h-[440px] w-full" aria-hidden />
    ),
  },
);

export function MomentsAsObjects() {
  return (
    <section
      aria-label="Moments as objects"
      className="relative isolate overflow-hidden bg-ink-950 py-28 text-cream-50 sm:py-36"
    >
      {/* Radial wash + soft rose glow, matched to the hero palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(215,162,93,0.08),transparent_55%),radial-gradient(circle_at_70%_85%,rgba(143,20,49,0.16),transparent_60%)]"
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        {/* Editorial heading — restrained, no oversell */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            What is held inside
          </p>
          <h2 className="mt-5 font-display text-3xl font-light leading-[1.05] tracking-[-0.01em] text-cream-50 sm:text-4xl md:text-5xl">
            Every moment, sealed for one.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream-50/65 sm:text-base">
            Five quiet addresses. Choose the one closest to what you want to say.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <MomentsStage />
        </div>
      </div>
    </section>
  );
}
