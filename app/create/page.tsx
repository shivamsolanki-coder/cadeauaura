'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';

const EMOTIONS = [
  'Love',
  'Thanks',
  'Pride',
  'Apology',
  'Welcome',
  'Just because',
] as const;

type Emotion = (typeof EMOTIONS)[number];

interface Draft {
  recipientName: string;
  emotion: Emotion | '';
  senderTelling: string;
  message: string;
}

const STORAGE_KEY = 'cadeauaura.draft.v1';
const MESSAGE_LIMIT = 280;
const TELLING_LIMIT = 500;
const TYPEWRITER_CPS = 27;

const PLAYFUL_TELLING = `Andar tairay raaz kai hein
Khud say jo mil paye ga`;

const PLAYFUL_MESSAGE = `Some souls are understood slowly, because their depth is not meant for hurried eyes. What seems quiet on the surface often holds a rare kind of strength within. And in the end, it is not the loudest presence that stays with us, but the one that lingers in the heart.

const emptyDraft: Draft = {
  recipientName: '',
  emotion: '',
  senderTelling: '',
  message: '',
};

function isPlayfulRecipientName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return normalized === 'ifra' || normalized === 'iffu' || normalized === 'chatgpt';
}

function readDraft(): Draft {
  if (typeof window === 'undefined') return emptyDraft;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDraft;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    return { ...emptyDraft, ...parsed };
  } catch {
    return emptyDraft;
  }
}

function writeDraft(draft: Draft) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // silent
  }
}

async function fetchReflection(telling: string, attempt: number): Promise<string> {
  const res = await fetch('/api/reflect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telling, attempt }),
  });
  if (!res.ok) throw new Error('reflect failed');
  const data = (await res.json()) as { text: string };
  return data.text;
}

export default function CreatePage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [hydrated, setHydrated] = useState(false);

  const [reflectionFull, setReflectionFull] = useState('');
  const [reflectionDisplayed, setReflectionDisplayed] = useState('');
  const [reflectionLoading, setReflectionLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const displayIndexRef = useRef(0);

  const autoTellingAppliedRef = useRef(false);
  const autoMessageAppliedRef = useRef(false);
  const previousRecipientRef = useRef('');

  useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeDraft(draft);
  }, [draft, hydrated]);

  useEffect(() => {
    const previous = previousRecipientRef.current;
    const current = draft.recipientName.trim().toLowerCase();

    if (previous !== current) {
      autoTellingAppliedRef.current = false;
      autoMessageAppliedRef.current = false;
      previousRecipientRef.current = current;
    }
  }, [draft.recipientName]);

  useEffect(() => {
    if (!hydrated) return;
    if (!isPlayfulRecipientName(draft.recipientName)) return;
    if (autoTellingAppliedRef.current) return;
    if (draft.senderTelling.trim().length > 0) return;

    autoTellingAppliedRef.current = true;
    setDraft((current) => ({
      ...current,
      senderTelling: PLAYFUL_TELLING,
    }));
  }, [draft.recipientName, draft.senderTelling, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (!isPlayfulRecipientName(draft.recipientName)) return;
    if (draft.emotion === '') return;
    if (autoMessageAppliedRef.current) return;
    if (draft.message.trim().length > 0) return;

    autoMessageAppliedRef.current = true;
    setDraft((current) => ({
      ...current,
      message: PLAYFUL_MESSAGE,
    }));
  }, [draft.recipientName, draft.emotion, draft.message, hydrated]);

  useEffect(() => {
    if (!reflectionFull) {
      setReflectionDisplayed('');
      return;
    }
    setReflectionDisplayed('');
    displayIndexRef.current = 0;
    if (typewriterRef.current) clearInterval(typewriterRef.current);

    const interval = setInterval(() => {
      displayIndexRef.current += 1;
      setReflectionDisplayed(reflectionFull.slice(0, displayIndexRef.current));
      if (displayIndexRef.current >= reflectionFull.length) {
        clearInterval(interval);
        typewriterRef.current = null;
      }
    }, Math.round(1000 / TYPEWRITER_CPS));

    typewriterRef.current = interval;
    return () => clearInterval(interval);
  }, [reflectionFull]);

  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const triggerReflection = useCallback(async (telling: string, attempt: number) => {
    if (telling.trim().length < 3) return;
    setReflectionLoading(true);
    setReflectionFull('');
    try {
      const text = await fetchReflection(telling.trim(), attempt);
      setReflectionFull(text);
    } finally {
      setReflectionLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const telling = draft.senderTelling;
    if (telling.trim().length < 3) {
      setReflectionFull('');
      setReflectionDisplayed('');
      return;
    }

    debounceRef.current = setTimeout(() => {
      setAttemptCount(0);
      void triggerReflection(telling, 0);
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft.senderTelling, hydrated, triggerReflection]);

  function handleTryAgain() {
    const next = Math.min(attemptCount + 1, 5);
    setAttemptCount(next);
    void triggerReflection(draft.senderTelling, next);
  }

  const canPreview =
    draft.recipientName.trim().length > 0 &&
    (draft.emotion !== '' || draft.senderTelling.trim().length > 0);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPreview) return;
    router.push('/create/preview');
  }

  const showReflection = reflectionLoading || reflectionDisplayed.length > 0;

  return (
    <main className="relative min-h-[88svh] overflow-hidden bg-ink-950 px-6 py-16 text-cream-50 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(215,162,93,0.08),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(143,20,49,0.18),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <p className="text-xs font-light uppercase tracking-[0.32em] text-gold-300/70">
          A moment, for someone
        </p>

        <h1 className="mt-4 font-display font-light leading-[1.05] tracking-[-0.02em] text-cream-50 text-[clamp(2rem,5vw,3.25rem)]">
          Tell us who this is for.
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-cream-50/60">
          A few quiet questions. Nothing is sent until you say so. Your draft
          is held on this device.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-12 sm:mt-14 sm:space-y-14"
          aria-label="Moment builder"
        >
          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/55"
              >
                01
              </span>
              <label
                htmlFor="recipientName"
                className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55"
              >
                Name
              </label>
            </div>
            <input
              id="recipientName"
              name="recipientName"
              type="text"
              autoComplete="off"
              value={draft.recipientName}
              onChange={(event) => update('recipientName', event.target.value)}
              placeholder="Aarav"
              className="mt-4 w-full border-b border-cream-50/15 bg-transparent pb-3 font-display text-2xl text-cream-50 placeholder:text-cream-50/25 focus:border-gold-300/60 focus:outline-none sm:text-3xl"
            />
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/55"
              >
                02
              </span>
              <label
                htmlFor="senderTelling"
                className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55"
              >
                Tell me about them
              </label>
            </div>
            <p className="mt-2 text-sm leading-7 text-cream-50/45">
              A few words about who they are, or what they have held for you.
            </p>
            <textarea
              id="senderTelling"
              name="senderTelling"
              rows={3}
              maxLength={TELLING_LIMIT}
              value={draft.senderTelling}
              onChange={(event) => update('senderTelling', event.target.value)}
              placeholder="She carried me through last year without making it a big deal."
              className="mt-5 w-full resize-none border-b border-cream-50/15 bg-transparent pb-3 font-display text-lg leading-8 text-cream-50 placeholder:text-cream-50/25 focus:border-gold-300/60 focus:outline-none"
            />
            <p className="mt-2 text-right text-xs text-cream-50/35">
              {draft.senderTelling.length}/{TELLING_LIMIT}
            </p>

            {showReflection && (
              <div className="mt-6 border-t border-gold-300/15 pt-5">
                {reflectionLoading ? (
                  <div className="flex items-center gap-[5px]" aria-label="Listening">
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50" />
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:150ms]" />
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:300ms]" />
                  </div>
                ) : (
                  <>
                    <p className="font-display text-base italic leading-7 text-cream-50/65">
                      {reflectionDisplayed}
                      {reflectionDisplayed.length < reflectionFull.length && (
                        <span
                          aria-hidden
                          className="ml-[1px] inline-block h-[0.9em] w-px animate-pulse bg-cream-50/40 align-middle"
                        />
                      )}
                    </p>
                    {reflectionDisplayed === reflectionFull && reflectionFull.length > 0 && (
                      <button
                        type="button"
                        onClick={handleTryAgain}
                        disabled={attemptCount >= 5}
                        className="mt-4 text-xs uppercase tracking-[0.28em] text-cream-50/35 underline-offset-4 transition hover:text-cream-50/60 hover:underline disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Try again
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/55"
              >
                03
              </span>
              <span className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55">
                Feeling
              </span>
              <span className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-cream-50/30">
                optional
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-cream-50/45">
              What do you want them to feel?
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {EMOTIONS.map((option) => {
                const active = draft.emotion === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => update('emotion', active ? '' : option)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? 'border-cream-50 bg-cream-50 text-ink-900'
                        : 'border-cream-50/15 text-cream-50/55 hover:border-cream-50/35 hover:text-cream-50/80'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/55"
              >
                04
              </span>
              <label
                htmlFor="message"
                className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55"
              >
                Words
              </label>
            </div>
            <p className="mt-2 text-sm leading-7 text-cream-50/45">
              A few words for them. Anything that has been waiting.
            </p>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={MESSAGE_LIMIT}
              value={draft.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder="You held a year I almost lost. Thank you."
              className="mt-5 w-full resize-none border-b border-cream-50/15 bg-transparent pb-3 font-display text-lg leading-8 text-cream-50 placeholder:text-cream-50/25 focus:border-gold-300/60 focus:outline-none"
            />
            <p className="mt-2 text-right text-xs text-cream-50/35">
              {draft.message.length}/{MESSAGE_LIMIT}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canPreview}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:bg-cream-50/10 disabled:text-cream-50/30 disabled:shadow-none sm:w-auto"
            >
              <span>Preview their moment</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            {hydrated ? (
              canPreview ? (
                <span className="text-xs uppercase tracking-[0.28em] text-cream-50/30">
                  Saved on this device
                </span>
              ) : (
                <span className="text-xs leading-6 text-cream-50/45 sm:max-w-[18rem] sm:text-right">
                  Add their name and tell us about them to preview.
                </span>
              )
            ) : null}
          </div>
        </form>

        <p className="mt-16 text-xs text-cream-50/35">
          <Link
            href="/"
            className="underline-offset-4 hover:text-cream-50/60 hover:underline"
          >
            Return home
          </Link>
        </p>
      </div>
    </main>
  );
}
