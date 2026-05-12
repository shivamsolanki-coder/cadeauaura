import Link from 'next/link';

/**
 * The first emotional impression. Near-black canvas, one question,
 * one quiet invitation. Pure CSS animation — no client JS required.
 *
 * The primary CTA currently routes to /gift-finder because /create
 * does not yet exist. Switch the href once the Moment Builder lands.
 */
export function HeroQuestion() {
  return (
    <section
      aria-label="A moment, for someone"
      className="relative isolate flex min-h-[88svh] items-center justify-center overflow-hidden bg-ink-950 px-6 py-24 text-cream-50 sm:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(215,162,93,0.10),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(143,20,49,0.20),transparent_60%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <h1 className="hero-question font-display font-light leading-[1.04] tracking-[-0.02em] text-cream-50 text-[clamp(2.25rem,7vw,5.5rem)]">
          Who have you been meaning to thank?
        </h1>

        <div className="hero-cta mt-12 flex flex-col items-center gap-4 sm:mt-14">
          <Link
            href="/gift-finder"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            <span>Create their moment</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <p className="mt-2 text-xs font-light tracking-[0.32em] text-gold-300/70 uppercase">
            A moment, for someone
          </p>
        </div>
      </div>
    </section>
  );
}
