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

export default function PreviewPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <main className="min-h-[88svh] bg-ink-950" aria-hidden />
    );
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
          This is your first draft of their moment.
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

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/r/demo"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            <span>Open demo reveal</span>
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
          This preview lives only on your device. Sending, scheduling and the
          recipient&rsquo;s reveal page come next.
        </p>
      </div>
    </main>
  );
}
