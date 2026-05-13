'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Draft {
  recipientName: string;
  emotion: string;
  message: string;
}

const STORAGE_KEY = 'cadeauaura.draft.v1';

function readDraft(): Draft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    if (!parsed.recipientName) return null;
    return {
      recipientName: parsed.recipientName,
      emotion: parsed.emotion ?? '',
      message: parsed.message ?? '',
    };
  } catch {
    return null;
  }
}

type Stage = 'sealed' | 'opening' | 'open';

export default function DemoRevealPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [stage, setStage] = useState<Stage>('sealed');

  useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  function handleOpen() {
    if (stage !== 'sealed') return;
    setStage('opening');
    // Match the envelope fade-out so the card lands cleanly afterwards.
    window.setTimeout(() => setStage('open'), 750);
  }

  if (!hydrated) {
    return <main className="min-h-[88svh] bg-ink-950" aria-hidden />;
  }

  if (!draft) {
    return (
      <main className="flex min-h-[88svh] items-center justify-center bg-ink-950 px-6 text-cream-50">
        <div className="max-w-md text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            No moment found
          </p>
          <h1 className="mt-4 font-display text-3xl text-cream-50">
            There is nothing waiting here yet.
          </h1>
          <p className="mt-4 text-sm leading-7 text-cream-50/60">
            Begin a moment on this device, then return to this link to see
            how it would feel to open.
          </p>
          <Link
            href="/create"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 transition hover:bg-rose-600"
          >
            <span>Begin a moment</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
    );
  }

  const message =
    draft.message.trim().length > 0
      ? draft.message
      : `A moment, for ${draft.recipientName}.`;

  return (
    <main className="relative min-h-[88svh] overflow-hidden bg-ink-950 px-6 py-16 text-cream-50 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,162,93,0.10),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.20),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-xl">
        <div className="relative flex min-h-[60svh] items-center justify-center">
          {/* Sealed envelope */}
          <div
            aria-hidden={stage !== 'sealed'}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
              For {draft.recipientName}
            </p>

            <p className="mt-3 text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
              Something is waiting for you
            </p>

            <button
              type="button"
              onClick={handleOpen}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              <span>Open the moment</span>
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
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              stage === 'open'
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <article className="w-full rounded-2xl border border-cream-50/12 bg-cream-50/[0.04] p-8 backdrop-blur-sm sm:p-12">
              <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
                For {draft.recipientName}
              </p>

              <p className="mt-6 font-display text-2xl italic font-light leading-relaxed text-cream-50 sm:text-3xl">
                {message}
              </p>

              {draft.emotion ? (
                <p className="mt-8 text-xs font-light uppercase tracking-[0.28em] text-cream-50/45">
                  With {draft.emotion.toLowerCase()}
                </p>
              ) : null}
            </article>
          </div>
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center gap-4 text-sm transition-opacity duration-700 ${
            stage === 'open' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Link
            href="/create"
            className="rounded-full border border-cream-50/20 px-6 py-3 font-light text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
          >
            Edit the moment
          </Link>
          <Link
            href="/"
            className="text-cream-50/45 underline-offset-4 hover:text-cream-50/80 hover:underline"
          >
            Return home
          </Link>
        </div>

        <p className="mt-12 max-w-md text-xs leading-6 text-cream-50/30">
          This is a private demo of the reveal. Real recipient links,
          scheduled openings and notifications come next.
        </p>
      </div>
    </main>
  );
}
