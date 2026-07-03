'use client';

import Link from 'next/link';

import { MOMENTS } from './config';

/**
 * Typographic fallback for small screens and prefers-reduced-motion.
 *
 * Same captions as the 3D scene, presented as a vertical sequence of
 * italic lines with hairline dividers. No WebGL bundle is loaded for
 * users who land here — the import in MomentsAsObjects gates the 3D
 * stage behind a media query check.
 */
export function MobileFallback() {
  return (
    <div className="mx-auto max-w-md">
      <ul className="space-y-8">
        {MOMENTS.map((moment) => (
          <li key={moment.key} className="border-t border-gold-300/12 pt-7">
            <p className="text-[0.6rem] font-light uppercase tracking-[0.32em] text-cream-50/55">
              {moment.label}
            </p>
            <p className="mt-3 font-display text-lg italic leading-relaxed text-cream-50/85">
              <span aria-hidden className="mr-2 text-gold-300/55">~</span>
              {moment.caption}
            </p>
            <Link
              href={moment.ctaHref}
              className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-cream-50/70 underline-offset-4 transition hover:text-cream-50/85 hover:underline"
            >
              <span>{moment.ctaLabel}</span>
              <span aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
