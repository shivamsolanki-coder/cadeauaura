import Link from 'next/link';

/**
 * CinematicHero — full-viewport opening frame for the homepage.
 *
 * Three warm gradient orbs (ember, gold, rose) drift on 30–50s loops
 * behind a centred poetic line. Pure CSS: no WebGL, no JS, nothing on
 * the main thread, so LCP stays text-paint-bound. The section pulls
 * up under the translucent sticky header (-mt-20) so the first
 * viewport belongs entirely to the hero; the nav settles in above it
 * a beat later (see Header's nav-settle hook).
 *
 * Reduced motion: the global prefers-reduced-motion rule freezes the
 * orbs into a static gradient wash and shows the text instantly.
 */
export function CinematicHero() {
  return (
    <section className="relative isolate -mt-20 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[8%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,rgba(194,90,42,0.14),transparent_62%)] blur-3xl [animation:auraDrift1_38s_ease-in-out_infinite]" />
        <div className="absolute -right-[8%] top-[26%] h-[44vmax] w-[44vmax] rounded-full bg-[radial-gradient(circle,rgba(215,162,93,0.13),transparent_60%)] blur-3xl [animation:auraDrift2_46s_ease-in-out_infinite]" />
        <div className="absolute bottom-[2%] left-[22%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(143,20,49,0.2),transparent_62%)] blur-3xl [animation:auraDrift3_54s_ease-in-out_infinite]" />
      </div>

      {/* Film grain, continuous with the rest of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="hero-cta text-xs font-light uppercase tracking-[0.42em] text-gold-300/80">
          A quiet way to hold what matters
        </p>

        <h1 className="hero-question mt-8 font-display text-4xl font-light leading-[1.15] tracking-[0.01em] text-cream-50 sm:text-5xl lg:text-6xl">
          Some feelings deserve
          <br />
          more than a hurried text.
        </h1>

        <p className="hero-cta mx-auto mt-8 max-w-xl text-base font-light leading-8 text-cream-50/70 sm:text-lg">
          CadeauAura turns what you carry for someone into a moment they
          can open — slowly, privately, in their own time.
        </p>

        <div className="hero-cta mt-12">
          <Link
            href="/create"
            className="inline-flex items-center gap-3 rounded-full border border-cream-50/35 px-9 py-4 text-sm font-light tracking-[0.14em] text-cream-50 transition-colors duration-500 ease-in-out hover:border-cream-50 hover:bg-cream-50 hover:text-ink-950"
          >
            <span>Begin a moment</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[0.6rem] font-light uppercase tracking-[0.34em] text-cream-50/50">
          Scroll
        </span>
        <span className="block h-10 w-px bg-gradient-to-b from-cream-50/50 to-transparent [animation:scrollHint_3.2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
