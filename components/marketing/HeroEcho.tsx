/**
 * A single emotional line, continuing the dark canvas from
 * HeroQuestion. The transition into the cream-and-cards body of
 * the homepage follows immediately after.
 */
export function HeroEcho() {
  return (
    <section
      aria-label="What CadeauAura is for"
      className="relative isolate overflow-hidden bg-ink-950 px-6 py-20 text-cream-50 sm:px-10 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(215,162,93,0.05),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-display text-xl font-light italic leading-relaxed text-cream-50/85 sm:text-2xl md:text-[1.75rem] md:leading-[1.5]">
          &ldquo;A gift is not the thing in the box. It is the moment it is
          opened.&rdquo;
        </p>
      </div>
    </section>
  );
}
