'use client';

import dynamic from 'next/dynamic';

/**
 * Moments as Objects — a reusable homepage section.
 *
 * The Canvas + lighting + 3D libs live behind a dynamic import with
 * ssr disabled, so:
 *   - the WebGL bundle never ships on the initial paint
 *   - the section is server-renderable in markup (a placeholder is
 *     shown until hydration)
 *   - mobile / reduced-motion users never load the 3D libs at all,
 *     because MomentsStage swaps to MobileFallback before mounting
 *     Canvas
 *
 * Drop this into any page like a normal section:
 *
 *   import { MomentsAsObjects } from '@/components/moments/MomentsAsObjects';
 *   ...
 *   <MomentsAsObjects />
 */

const MomentsStage = dynamic(
  () => import('./MomentsStage').then((mod) => ({ default: mod.MomentsStage })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[60svh] min-h-[420px] w-full bg-ink-950"
        aria-hidden
      />
    ),
  },
);

export function MomentsAsObjects() {
  return (
    <section
      aria-label="Moments as objects"
      className="relative isolate overflow-hidden bg-ink-950 py-24 text-cream-50 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(215,162,93,0.07),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.16),transparent_60%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            A moment, in object
          </p>
          <h2 className="mt-5 font-display text-3xl font-light leading-[1.1] tracking-[-0.01em] text-cream-50 sm:text-4xl md:text-5xl">
            Each moment has a shape.
          </h2>
          <p className="mt-5 text-sm leading-7 text-cream-50/55 sm:text-base">
            Open the one that feels like yours.
          </p>
        </div>

        <div className="mt-14 sm:mt-20">
          <MomentsStage />
        </div>
      </div>
    </section>
  );
}
