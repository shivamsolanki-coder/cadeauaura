'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

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
  message: string;
}

const STORAGE_KEY = 'cadeauaura.draft.v1';
const MESSAGE_LIMIT = 280;

const emptyDraft: Draft = {
  recipientName: '',
  emotion: '',
  message: '',
};

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
    // localStorage may be disabled or full; silent failure is fine here.
  }
}

export default function CreatePage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDraft(readDraft());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeDraft(draft);
  }, [draft, hydrated]);

  const canPreview =
    draft.recipientName.trim().length > 0 && draft.emotion !== '';

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPreview) return;
    router.push('/create/preview');
  }

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
          Three quiet questions. Nothing is sent until you say so. Your draft
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
              <span className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55">
                Feeling
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
                        : 'border-cream-50/20 text-cream-50/80 hover:border-cream-50/45 hover:text-cream-50'
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
                03
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
                  Add their name and choose a feeling to preview.
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
