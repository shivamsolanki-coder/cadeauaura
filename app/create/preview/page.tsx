'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { createMoment, type CreateMomentResult } from '@/lib/api/moment';
import { getDeviceId } from '@/lib/device';
import { slugifyName } from '@/lib/recipient';
import { buildWhatsAppShare } from '@/lib/whatsapp';

type Tone =
  | ''
  | 'vague'
  | 'warm'
  | 'specific'
  | 'grief'
  | 'distance'
  | 'hurt';
const KNOWN_TONES: readonly Tone[] = [
  'vague',
  'warm',
  'specific',
  'grief',
  'distance',
  'hurt',
];

interface Draft {
  recipientName: string;
  emotion: string;
  message: string;
  anchors: string[];
  tone: Tone;
  secondaryTone: Tone;
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
      tone: KNOWN_TONES.includes(parsed.tone as Tone)
        ? (parsed.tone as Tone)
        : '',
      secondaryTone: KNOWN_TONES.includes(parsed.secondaryTone as Tone)
        ? (parsed.secondaryTone as Tone)
        : '',
    };
  } catch {
    return null;
  }
}

const PREVIEW_TITLE: Record<Tone, string> = {
  grief: 'A quiet draft, for someone you have lost.',
  distance: 'A draft across the time you have not closed.',
  hurt: 'A draft you can keep, send, or rewrite.',
  vague: 'A first draft of their moment.',
  warm: 'This is your first draft of their moment.',
  specific: 'This is your first draft of their moment.',
  '': 'This is your first draft of their moment.',
};

const PREVIEW_CTA: Record<Tone, string> = {
  grief: 'Create their quiet link',
  distance: 'Create the thread',
  hurt: 'Create their private link',
  vague: 'Create private link',
  warm: 'Create private link',
  specific: 'Create private link',
  '': 'Create private link',
};

const PREVIEW_CLOSING: Record<Tone, string> = {
  grief:
    'Once you create the link, it is yours to share when you are ready.',
  distance:
    'The link lives only when you decide to share it.',
  hurt:
    'You can hold the link, send it, or never use it. It is yours.',
  vague:
    'A private link will be ready for you to share when you decide.',
  warm:
    'A private link will be ready for you to share when you decide.',
  specific:
    'A private link will be ready for you to share when you decide.',
  '':
    'A private link will be ready for you to share when you decide.',
};

type CreateState =
  | { status: 'idle' }
  | { status: 'creating' }
  | { status: 'created'; result: CreateMomentResult }
  | { status: 'error'; reason: string };

export default function PreviewPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [createState, setCreateState] = useState<CreateState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);

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

  const finalMessage =
    draft.message.trim().length > 0
      ? draft.message
      : `A moment, for ${draft.recipientName}.`;

  const anchorsLine =
    draft.anchors.length > 0 ? draft.anchors.join(' · ') : '';

  async function handleCreateLink() {
    if (!draft) return;
    setCreateState({ status: 'creating' });
    try {
      const result = await createMoment({
        recipientDisplayName: draft.recipientName.trim(),
        recipientSlug: slugifyName(draft.recipientName),
        message: finalMessage,
        emotion: draft.emotion,
        tone: draft.tone,
        secondaryTone: draft.secondaryTone,
        anchors: draft.anchors,
        senderDeviceId: getDeviceId(),
      });
      setCreateState({ status: 'created', result });
    } catch (err) {
      setCreateState({
        status: 'error',
        reason: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  async function handleCopy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // some browsers block clipboard without secure context — silent.
    }
  }

  const isCreating = createState.status === 'creating';
  const created = createState.status === 'created' ? createState.result : null;

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
            {finalMessage}
          </p>

          {draft.emotion ? (
            <p className="mt-8 text-xs font-light uppercase tracking-[0.28em] text-cream-50/60">
              With {draft.emotion.toLowerCase()}
            </p>
          ) : null}
        </article>

        {anchorsLine ? (
          <p className="mt-8 font-display text-sm italic leading-7 text-cream-50/60 sm:text-base">
            <span aria-hidden className="mr-3 text-gold-300/70">~</span>
            {anchorsLine}
          </p>
        ) : null}

        {/* Create-link panel */}
        {!created ? (
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
            <button
              type="button"
              onClick={handleCreateLink}
              disabled={isCreating}
              className="group inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:bg-cream-50/10 disabled:text-cream-50/50 disabled:shadow-none"
            >
              <span>{isCreating ? 'Preparing the link…' : PREVIEW_CTA[draft.tone]}</span>
              {!isCreating && (
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              )}
            </button>
            <Link
              href="/create"
              className="rounded-full border border-cream-50/20 px-6 py-3 font-light text-cream-50/80 transition hover:border-cream-50/45 hover:text-cream-50"
            >
              Edit
            </Link>
            <Link
              href="/"
              className="text-cream-50/60 underline-offset-4 hover:text-cream-50/80 hover:underline"
            >
              Return home
            </Link>
          </div>
        ) : (
          <div className="mt-10 border-t border-gold-300/15 pt-8">
            <p className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-cream-50/60">
              Your private link
            </p>
            <p className="mt-3 break-all font-display text-base leading-7 text-cream-50/85 sm:text-lg">
              {created.shareUrl}
            </p>

            {created.linkActive ? (
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => handleCopy(created.shareUrl)}
                  aria-live="polite"
                  className="rounded-full border border-cream-50/20 px-5 py-3 font-light text-cream-50/85 transition hover:border-cream-50/45 hover:text-cream-50"
                >
                  {copied ? 'Copied' : 'Copy link'}
                </button>
                <a
                  href={buildWhatsAppShare(
                    created.shareUrl,
                    draft.recipientName,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-cream-50 px-5 py-3 font-medium text-ink-900 transition hover:bg-mist-200"
                >
                  Share on WhatsApp
                </a>
                <Link
                  href="/create"
                  className="text-cream-50/60 underline-offset-4 hover:text-cream-50/80 hover:underline"
                >
                  Begin another
                </Link>
              </div>
            ) : (
              <p className="mt-5 text-xs leading-6 text-cream-50/60">
                This link will live when storage is configured for the
                deployment. For now, it is held only in this rehearsal.
              </p>
            )}

            <p className="mt-8 max-w-md text-xs leading-6 text-cream-50/50">
              The link is private. Only the person who has it can open the
              moment. Nothing has been sent yet.
            </p>
          </div>
        )}

        {createState.status === 'error' && (
          <p className="mt-6 text-xs leading-6 text-cream-50/55">
            The link could not be prepared just now. Try again in a moment.
          </p>
        )}

        <p className="mt-12 max-w-md text-xs leading-6 text-cream-50/50">
          {PREVIEW_CLOSING[draft.tone]}
        </p>
      </div>
    </main>
  );
}
