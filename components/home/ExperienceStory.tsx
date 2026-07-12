'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * ExperienceStory — the create → seal → reveal flow told as a pinned
 * scroll sequence.
 *
 * Mechanics: the section is N × 100svh tall; a sticky full-viewport
 * stage sits inside it while invisible sentinel bands track scroll
 * progress via IntersectionObserver. Each band activates one slide —
 * full-bleed image crossfading over 800ms with a minimal label +
 * one-line overlay, architectural-reveal style. No scroll-jacking:
 * native scroll position is never touched.
 *
 * Accessibility: the visual stage is aria-hidden; a visually-hidden
 * ordered list carries the same steps for assistive tech. Under
 * prefers-reduced-motion the pin is dropped entirely and the steps
 * render as a plain stacked sequence.
 *
 * Slides 1 (the telling) and 3 (the seal) carry looping ambient video
 * with a poster fallback; slides 2 and 4 stay as stills, so the motion
 * is paced rather than four videos in a row. A video only plays while
 * its slide is active, is lazily mounted (never fetched on page load —
 * it loads as its slide is approached), and reduced-motion users get
 * the static poster frame instead.
 */

interface StoryStep {
  label: string;
  title: string;
  line: string;
  image: string;
  alt: string;
  video?: {
    webm?: string;
    mp4: string;
    poster: string;
  };
}

const STEPS: StoryStep[] = [
  {
    label: '01 — The telling',
    title: 'You tell us who they are',
    line: 'A few honest sentences about what they have held for you.',
    image: '/hero-poster.webp',
    alt: 'A lit diya lamp resting on a bed of marigolds',
    video: {
      webm: '/hero-loop.webm',
      mp4: '/hero-loop.mp4',
      poster: '/hero-poster.jpg',
    },
  },
  {
    label: '02 — The letter',
    title: 'Your words find their shape',
    line: 'The studio listens, reflects, and helps the message sound like you.',
    image: '/story-letter-poster.webp',
    alt: 'Two blank note cards settling onto a gift box among rose petals',
  },
  {
    label: '03 — The seal',
    title: 'The moment is sealed',
    line: 'A private link, held quietly until you choose to share it.',
    image: '/story-seal-poster.webp',
    alt: 'A gold ribbon drawing into a bow around a brocade gift box, diyas glowing behind',
    video: {
      mp4: '/story-seal.mp4',
      poster: '/story-seal-poster.webp',
    },
  },
  {
    label: '04 — The reveal',
    title: 'They open it slowly',
    line: 'An envelope, a breath, your words — in their own time.',
    image: '/story-reveal-poster.webp',
    alt: 'Rose petals and marigolds drifting down around glowing diyas',
  },
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return reduced;
}

function VideoLayer({
  video,
  active,
}: {
  video: NonNullable<StoryStep['video']>;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  // Only burn decode cycles while this slide is the visible one.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      void el.play().catch(() => {
        // Autoplay can be blocked (e.g. data-saver); the poster shows.
      });
    } else {
      el.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-in-out ${
        active ? 'scale-100' : 'scale-[1.06]'
      }`}
    >
      {video.webm ? <source src={video.webm} type="video/webm" /> : null}
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

function SlideText({ step }: { step: StoryStep }) {
  return (
    <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 sm:px-10 sm:pb-28">
      <p className="text-[0.65rem] font-light uppercase tracking-[0.34em] text-gold-300/90">
        {step.label}
      </p>
      <p className="mt-4 max-w-2xl font-display text-3xl font-light leading-[1.1] text-cream-50 sm:text-5xl">
        {step.title}
      </p>
      <p className="mt-4 max-w-md text-sm font-light leading-7 text-cream-50/85 sm:text-base">
        {step.line}
      </p>
    </div>
  );
}

export function ExperienceStory() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  // Which slides may load their video yet. Empty on mount, so nothing
  // is fetched on page load; a slide (and the next one, to pre-warm the
  // upcoming clip) is unlocked only once it scrolls into the band.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set<number>());
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActive(index);
            setLoaded((prev) => {
              if (prev.has(index) && prev.has(index + 1)) return prev;
              const next = new Set(prev);
              next.add(index);
              next.add(index + 1);
              return next;
            });
          }
        }
      },
      // A narrow band across the viewport's middle decides the active slide.
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const el of sentinelRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section aria-label="The experience">
      {/* The same story, plainly, for assistive tech */}
      <div className="sr-only">
        <h2>The experience</h2>
        <ol>
          {STEPS.map((step) => (
            <li key={step.label}>
              {step.title}. {step.line}
            </li>
          ))}
        </ol>
      </div>

      {reduced ? (
        /* Reduced motion: no pinning, a calm stacked sequence */
        <div aria-hidden>
          {STEPS.map((step) => (
            <div key={step.label} className="relative h-[72svh] overflow-hidden">
              <Image
                src={step.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/25"
              />
              <SlideText step={step} />
            </div>
          ))}
        </div>
      ) : (
        <div
          aria-hidden
          className="relative"
          style={{ height: `${STEPS.length * 100}svh` }}
        >
          {/* Pinned stage */}
          <div className="sticky top-0 h-svh overflow-hidden">
            {STEPS.map((step, index) => (
              <div
                key={step.label}
                className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
                  active === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {step.video && loaded.has(index) ? (
                  <VideoLayer video={step.video} active={active === index} />
                ) : (
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className={`object-cover transition-transform duration-[1200ms] ease-in-out ${
                      active === index ? 'scale-100' : 'scale-[1.06]'
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/25" />
                <SlideText step={step} />
              </div>
            ))}

            {/* Progress hairlines */}
            <div className="absolute bottom-10 right-6 flex gap-2 sm:right-10">
              {STEPS.map((step, index) => (
                <span
                  key={step.label}
                  className={`block h-px w-8 transition-colors duration-500 ${
                    active === index ? 'bg-gold-300/90' : 'bg-cream-50/25'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scroll sentinels — one viewport-height band per step */}
          {STEPS.map((step, index) => (
            <div
              key={step.label}
              ref={(el) => {
                sentinelRefs.current[index] = el;
              }}
              data-index={index}
              className="absolute inset-x-0 h-svh"
              style={{ top: `${index * 100}svh` }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
