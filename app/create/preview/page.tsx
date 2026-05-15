'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Tone = '' | 'vague' | 'warm' | 'specific' | 'grief' | 'hurt';
const KNOWN_TONES: readonly Tone[] = ['vague', 'warm', 'specific', 'grief', 'hurt'];

interface Draft {
  recipientName: string;
  emotion: string;
  message: string;
  anchors: string[];
  tone: Tone;
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
      anchors: Array.isArray(parsed.anchors) ? parsed.anchors.slice(0, 4) : [],
      tone: KNOWN_TONES.includes(parsed.tone as Tone) ? (parsed.tone as Tone) : '',
    };
  } catch {
    return null;
  }
}

/**
 * Tone-shifted microcopy for the rehearsal page. Grief and hurt earn
 * softer framing than the default product copy in every slot — title,
 * CTA, and bottom note. Everything else falls through to the same
 * baseline phrasing.
 */
const PREVIEW_TITLE: Record<Tone, string> = {
  grief: 'A quiet draft, for someone you have lost.',
  hurt: 'A draft you can keep, send, or rewrite.',
  vague: 'A first draft of their moment.',
  warm: 'This is your first draft of their moment.',
  specific: 'This is your first draft of their moment.',
  '': 'This is your first draft of their moment.',
};

const PREVIEW_CTA: Record<Tone, string> = {
  grief: 'See how it would reach them',
  hurt: 'See how it would land',
  vague: 'Open demo reveal',
  warm: 'Open demo reveal',
  specific: 'Open demo reveal',
  '': 'Open demo reveal',
};

const PREVIEW_CLOSING: Record<Tone, string> = {
  grief:
    'This rehearsal stays on your device. There is no rush, and no one else can see it.',
  hurt:
    'This rehearsal is yours alone, held quietly on your device until you are ready.',
  vague:
    'This preview lives only on your device. Sending and the recipient’s reveal come next.',
  warm:
    'This preview lives only on your device. Sending and the recipient’s reveal come next.',
  specific:
    'This preview lives only on your device. Sending and the recipient’s reveal come next.',
  '':
    'This preview lives only on your device. Sending and the recipient’s reveal come next.',
};

export default function PreviewPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <main className="min-h-[88svh] bg-ink-950" aria-hidden />;
  }

  if (!draft) {
    return (
      <main className="flex min-h-[88svh] items-center justify-center bg-ink-950 px-6 text-cream-50">
        <div className="max-w-md text-center">
          <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
            Nothing yet
          </p>
          <h1 className="mt-4 font-display text-3xl text-cream-50">
            There is no draft to preview.
          </h1>
          <p className="mt-4 text-sm leading-7 text-cream-50/60">
            Begin a moment first. Your draft will live on this device until
            you decide to send it.
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

  const anchorsLine = draft.anchors.length > 0 ? draft.anchors.join(' · ') : '';

  return (
    <main className="relative min-h-[88svh] overflow-hidden bg-ink-950 px-6 py-16 text-cream-50 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(215,162,93,0.10),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.20),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-xl">
        <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
          A private rehearsal
        </p>
        <h1 className="mt-4 font-display text-3xl font-light leading-[1.15] tracking-[-0.01em] text-cream-50 sm:text-4xl">
          {PREVIEW_TITLE[draft.tone]}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-cream-50/55">
          Below is what {draft.recipientName} will see. Take a breath, read it
          back to yourself, edit anything that doesn&rsquo;t feel like you.
        </p>

        <article className="mt-10 rounded-2xl border border-cream-50/12 bg-cream-50/[0.04] p-8 backdrop-blur-sm sm:p-12">
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

        {/* Anchors — what we noticed in their words, surfaced as a quiet
            postscript rather than a labeled metadata block. The sender
            will recognise their own words without it being announced. */}
        {anchorsLine ? (
          <p className="mt-8 font-display text-sm italic leading-7 text-cream-50/40 sm:text-base">
            <span aria-hidden className="mr-3 text-gold-300/55">~</span>
            {anchorsLine}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/r/demo"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            <span>{PREVIEW_CTA[draft.tone]}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/create"
            className="rounded-full border border-cream-50/20 px-6 py-3 font-light text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
          >
            Edit
          </Link>
          <Link
            href="/"
            className="text-cream-50/45 underline-offset-4 hover:text-cream-50/80 hover:underline"
          >
            Return home
          </Link>
        </div>

        <p className="mt-12 max-w-md text-xs leading-6 text-cream-50/30">
          {PREVIEW_CLOSING[draft.tone]}
        </p>
      </div>
    </main>
  );
}
