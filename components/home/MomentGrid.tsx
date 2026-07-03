'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * MomentGrid — three ways into the studio, presented as full-image
 * cards with the quiet-luxury grid treatment:
 *
 *   - cards separated by whitespace and soft shadow, no borders
 *   - image scales to 1.05 over 600ms ease-out on hover
 *   - the supporting line and Begin cue fade up on hover/focus,
 *     staggered behind the always-visible title
 *   - the cards themselves fade up ~80ms apart when the grid first
 *     scrolls into view (IntersectionObserver, one-shot)
 *
 * Touch + reduced-motion: supporting text stays visible below md and
 * whenever prefers-reduced-motion is set, so nothing is hover-gated.
 */

interface MomentCard {
  eyebrow: string;
  title: string;
  line: string;
  href: string;
  image: string;
  alt: string;
}

const CARDS: MomentCard[] = [
  {
    eyebrow: 'For someone present',
    title: 'A message with weight',
    line: 'Gratitude, affection, or a truth that deserves better words than a hurried text.',
    href: '/create',
    image: '/meaning-card.webp',
    alt: 'A handwritten card resting among candles and petals',
  },
  {
    eyebrow: 'For time and distance',
    title: 'A thread not fully lost',
    line: 'For someone you have not spoken to in a while, whose place in you never closed.',
    href: '/create',
    image: '/rose-bg.webp',
    alt: 'Warm candlelight and petals across a deep red table',
  },
  {
    eyebrow: 'For what remains',
    title: 'A quieter goodbye',
    line: 'Remembrance, grief, and the presence that still changes the room.',
    href: '/create',
    image: '/culture-diya.webp',
    alt: 'A small lamp glowing beside marigold petals',
  },
];

export function MomentGrid() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-light uppercase tracking-[0.34em] text-gold-300/80">
          Ways in
        </p>
        <h2 className="mt-5 max-w-xl font-display text-3xl font-light leading-[1.12] tracking-[-0.01em] text-cream-50 sm:text-4xl">
          Begin where the feeling is.
        </h2>

        <div ref={gridRef} className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-10">
          {CARDS.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              style={{ transitionDelay: revealed ? `${index * 80}ms` : '0ms' }}
              className={`group relative block overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] transition-all duration-700 ease-in-out ${
                revealed
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />
                {/* Scrim for AA text contrast over imagery */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/35 to-ink-950/10 transition-opacity duration-500"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <p className="text-[0.65rem] font-light uppercase tracking-[0.3em] text-gold-300/90">
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-light text-cream-50">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm font-light leading-6 text-cream-50/80 transition-all delay-100 duration-500 ease-in-out md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100">
                  {card.line}
                </p>
                <p
                  aria-hidden
                  className="mt-5 text-[0.65rem] font-light uppercase tracking-[0.3em] text-cream-50/90 transition-all delay-200 duration-500 ease-in-out md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                >
                  Begin <span className="ml-1">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
