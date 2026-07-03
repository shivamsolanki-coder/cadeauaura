'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { BeatSequence } from '@/lib/domain/beats';

/**
 * BeatRenderer — plays a BeatSequence as the sealed → opening → open
 * reveal. The sequence drives subtitle, CTA label, fade durations,
 * and closing line; the recipient name + message come from the
 * Moment itself. All transitions are CSS-only, no imperative
 * animation. Mobile-safe by design.
 *
 * Accessibility contract:
 *   - the inactive stage is `inert`, so hidden controls are never
 *     keyboard-reachable or exposed to assistive tech
 *   - opening moves focus onto the revealed card
 *   - prefers-reduced-motion skips the choreographed delay entirely
 *   - the opened card renders in normal flow, so a long message can
 *     never be clipped by the stage height
 *
 * choreographyVersion is read off the sequence; v1 is the only
 * version this renderer understands today. If a future Moment carries
 * a higher version, the page-level fallback renders the safest
 * defaults rather than misinterpreting unknown beats.
 */

const SUPPORTED_CHOREOGRAPHY_VERSION = 1;

type Stage = 'sealed' | 'opening' | 'open';

interface BeatRendererProps {
  sequence: BeatSequence;
  recipientName: string;
  message: string;
  emotion?: string;
}

const DEFAULT_ENVELOPE = {
  subtitle: 'Something is waiting for you',
  cta: 'Open the moment',
  fadeMs: 1000,
};

const DEFAULT_REVEAL = {
  enterMs: 1400,
};

const DEFAULT_SIGNOFF = 'Made for you, with care.';

export function BeatRenderer({
  sequence,
  recipientName,
  message,
  emotion,
}: BeatRendererProps) {
  const [stage, setStage] = useState<Stage>('sealed');
  const cardRef = useRef<HTMLDivElement | null>(null);

  const supported = sequence.choreographyVersion <= SUPPORTED_CHOREOGRAPHY_VERSION;

  const envelopeBeat = supported
    ? sequence.beats.find((b) => b.type === 'envelope')
    : undefined;
  const revealBeat = supported
    ? sequence.beats.find((b) => b.type === 'reveal')
    : undefined;
  const signOffBeat = supported
    ? sequence.beats.find((b) => b.type === 'sign-off')
    : undefined;

  const envelopeFadeMs = envelopeBeat?.durationMs ?? DEFAULT_ENVELOPE.fadeMs;
  const cardEnterMs = revealBeat?.durationMs ?? DEFAULT_REVEAL.enterMs;
  const sealedSubtitle = envelopeBeat?.text ?? DEFAULT_ENVELOPE.subtitle;
  const ctaLabel = envelopeBeat?.ctaLabel ?? DEFAULT_ENVELOPE.cta;
  const closingLine = signOffBeat?.text ?? DEFAULT_SIGNOFF;

  function handleOpen() {
    if (stage !== 'sealed') return;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) {
      setStage('open');
      return;
    }
    setStage('opening');
    window.setTimeout(() => setStage('open'), envelopeFadeMs);
  }

  useEffect(() => {
    if (stage === 'open') {
      cardRef.current?.focus({ preventScroll: true });
    }
  }, [stage]);

  return (
    <>
      <div className="relative flex min-h-[68svh] items-center justify-center">
        {/* Sealed envelope — overlays the (still invisible) card */}
        <div
          inert={stage === 'open'}
          style={{ transitionDuration: `${envelopeFadeMs}ms` }}
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
            stage === 'sealed'
              ? 'opacity-100 scale-100'
              : 'pointer-events-none opacity-0 scale-95'
          }`}
        >
          <svg
            viewBox="0 0 200 140"
            className="h-auto w-48 sm:w-60"
            role="img"
            aria-label="A sealed envelope"
          >
            <rect
              x="10"
              y="40"
              width="180"
              height="90"
              rx="3"
              fill="rgba(255,247,239,0.04)"
              stroke="rgba(247,230,216,0.35)"
              strokeWidth="1.2"
            />
            <path
              d="M 11 41 L 100 100 L 189 41"
              fill="none"
              stroke="rgba(247,230,216,0.35)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="92" r="13" fill="#8F1431" />
            <text
              x="100"
              y="97"
              textAnchor="middle"
              fontSize="14"
              fill="#F3C982"
              fontFamily="Georgia, serif"
            >
              ✦
            </text>
          </svg>

          <p className="mt-10 font-display text-2xl italic font-light text-cream-50">
            For {recipientName}
          </p>

          <p className="mt-3 text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            {sealedSubtitle}
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600"
          >
            <span>{ctaLabel}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </div>

        {/* Opened card — normal flow, so long messages are never clipped */}
        <div
          ref={cardRef}
          tabIndex={-1}
          inert={stage !== 'open'}
          style={{ transitionDuration: `${cardEnterMs}ms` }}
          className={`w-full py-10 outline-none transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
            stage === 'open'
              ? 'translate-y-0 opacity-100 blur-0'
              : 'pointer-events-none translate-y-4 opacity-0 blur-[6px]'
          }`}
        >
          <article className="w-full rounded-2xl border border-cream-50/12 bg-cream-50/[0.04] p-8 backdrop-blur-sm sm:p-12">
            <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
              For {recipientName}
            </p>

            <p className="mt-6 font-display text-2xl italic font-light leading-relaxed text-cream-50 sm:text-3xl">
              {message}
            </p>

            {emotion ? (
              <p className="mt-8 text-xs font-light uppercase tracking-[0.28em] text-cream-50/60">
                With {emotion.toLowerCase()}
              </p>
            ) : null}
          </article>

          <p className="mt-8 text-center font-display text-sm italic font-light text-cream-50/70 sm:text-base">
            {closingLine}
          </p>
        </div>
      </div>

      <div
        inert={stage !== 'open'}
        className={`mt-12 flex flex-wrap items-center justify-center gap-4 text-sm transition-opacity duration-1000 ${
          stage === 'open' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Link
          href="/"
          className="text-cream-50/70 underline-offset-4 hover:text-cream-50 hover:underline"
        >
          About CadeauAura
        </Link>
      </div>
    </>
  );
}
