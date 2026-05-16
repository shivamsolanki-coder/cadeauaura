'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';

import { fetchMoment } from '@/lib/api/moment';
import type { Tone } from '@/lib/draft';
import type { Moment } from '@/lib/moment';

type Stage = 'sealed' | 'opening' | 'open';

/**
 * Choreography parameters per tone — identical shape to /r/demo so a
 * moment behaves the same whether rendered from localStorage (demo)
 * or from KV (real). Bumped via Moment.choreographyVersion if this
 * map ever changes shape in a breaking way.
 */
interface ChoreographyVars {
  envelopeFadeMs: number;
  cardEnterMs: number;
  sealedSubtitle: string;
  ctaLabel: string;
  closingLine: string;
}

const CHOREO: Record<Tone, ChoreographyVars> = {
  grief: {
    envelopeFadeMs: 1500,
    cardEnterMs: 1800,
    sealedSubtitle: 'Something quiet, for you',
    ctaLabel: 'When you are ready',
    closingLine: 'Held with care, for as long as you need.',
  },
  distance: {
    envelopeFadeMs: 1300,
    cardEnterMs: 1700,
    sealedSubtitle: 'A small thread, across the time',
    ctaLabel: 'Open it gently',
    closingLine: 'Sent in case there is still a thread.',
  },
  hurt: {
    envelopeFadeMs: 1200,
    cardEnterMs: 1600,
    sealedSubtitle: 'A small thing, for you',
    ctaLabel: 'When you are ready',
    closingLine: 'Sent without asking anything of you.',
  },
  warm: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
  specific: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
  vague: {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
  '': {
    envelopeFadeMs: 1000,
    cardEnterMs: 1400,
    sealedSubtitle: 'Something is waiting for you',
    ctaLabel: 'Open the moment',
    closingLine: 'Made for you, with care.',
  },
};

export default function MomentRevealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [moment, setMoment] = useState<Moment | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [stage, setStage] = useState<Stage>('sealed');

  useEffect(() => {
    let cancelled = false;
    fetchMoment(id).then((result) => {
      if (cancelled) return;
      setMoment(result);
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const choreo = moment ? CHOREO[moment.tone] : CHOREO[''];

  function handleOpen() {
    if (stage !== 'sealed') return;
    setStage('opening');
    window.setTimeout(() => setStage('open'), choreo.envelopeFadeMs);
  }

  if (!loaded) {
    return <main className="min-h-[88svh] bg-ink-950" aria-hidden />;
  }

  if (!moment) {
    return (
      <main className="flex min-h-[88svh] items-center justify-center bg-ink-950 px-6 text-cream-50">
        <div className="max-w-md text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            Nothing here
          </p>
          <h1 className="mt-4 font-display text-3xl text-cream-50">
            There is nothing waiting at this address.
          </h1>
          <p className="mt-4 text-sm leading-7 text-cream-50/60">
            It may have already been read, or the link may have changed.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-7 py-4 text-sm font-light text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
          >
            Return to CadeauAura
          </Link>
        </div>
      </main>
    );
  }

  const message =
    moment.message.trim().length > 0
      ? moment.message
      : `A moment, for ${moment.recipientDisplayName}.`;

  return (
    <main className="relative min-h-[88svh] overflow-hidden bg-ink-950 px-6 py-16 text-cream-50 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,162,93,0.10),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.20),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-xl">
        <div className="relative flex min-h-[68svh] items-center justify-center">
          {/* Sealed envelope */}
          <div
            aria-hidden={stage !== 'sealed'}
            style={{ transitionDuration: `${choreo.envelopeFadeMs}ms` }}
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
              For {moment.recipientDisplayName}
            </p>

            <p className="mt-3 text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
              {choreo.sealedSubtitle}
            </p>

            <button
              type="button"
              onClick={handleOpen}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              <span>{choreo.ctaLabel}</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>

          {/* Opened card */}
          <div
            aria-hidden={stage !== 'open'}
            style={{ transitionDuration: `${choreo.cardEnterMs}ms` }}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
              stage === 'open'
                ? 'translate-y-0 opacity-100 blur-0'
                : 'pointer-events-none translate-y-4 opacity-0 blur-[6px]'
            }`}
          >
            <article className="w-full rounded-2xl border border-cream-50/12 bg-cream-50/[0.04] p-8 backdrop-blur-sm sm:p-12">
              <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
                For {moment.recipientDisplayName}
              </p>

              <p className="mt-6 font-display text-2xl italic font-light leading-relaxed text-cream-50 sm:text-3xl">
                {message}
              </p>

              {moment.emotion ? (
                <p className="mt-8 text-xs font-light uppercase tracking-[0.28em] text-cream-50/45">
                  With {moment.emotion.toLowerCase()}
                </p>
              ) : null}
            </article>

            <p className="mt-8 text-center font-display text-sm italic font-light text-cream-50/55 sm:text-base">
              {choreo.closingLine}
            </p>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-4 text-sm transition-opacity duration-1000 ${
            stage === 'open' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Link
            href="/"
            className="text-cream-50/45 underline-offset-4 hover:text-cream-50/80 hover:underline"
          >
            About CadeauAura
          </Link>
        </div>
      </div>
    </main>
  );
}
