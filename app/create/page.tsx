'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import {
  EMOTIONS,
  emptyDraft,
  readDraft,
  writeDraft,
  type Draft,
} from '@/lib/draft';
import { useComposer } from '@/lib/hooks/useComposer';
import { useFollowUp } from '@/lib/hooks/useFollowUp';
import { usePlan } from '@/lib/hooks/usePlan';
import { useReflection } from '@/lib/hooks/useReflection';

const MESSAGE_LIMIT = 280;
const TELLING_LIMIT = 500;

const PLAYFUL_TELLING = `Andar tairay raaz kai hein
Khud say jo mil paye ga`;

const PLAYFUL_MESSAGE = `Some souls are understood slowly, because their depth is not meant for hurried eyes. What seems quiet on the surface often holds a rare kind of strength within. And in the end, it is not the loudest presence that stays with us, but the one that lingers in the heart.`;

function isPlayfulRecipientName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return normalized === 'ifra' || normalized === 'iffu' || normalized === 'chatgpt';
}

export default function CreatePage() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [hydrated, setHydrated] = useState(false);
  const messageTextareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const reflection = useReflection(draft.senderTelling, hydrated);
  const followUp = useFollowUp({
    telling: draft.senderTelling,
    reflection: reflection.fullText,
    reflectionDone: reflection.done,
  });
  const composer = useComposer();
  const { reset: resetComposer } = composer;
  const planBeat = usePlan();
  const { reset: resetPlan } = planBeat;

  // Keep hidden playful autofill state scoped to the current recipient name.
  useEffect(() => {
    const previous = previousRecipientRef.current;
    const current = draft.recipientName.trim().toLowerCase();

    if (previous !== current) {
      autoTellingAppliedRef.current = false;
      autoMessageAppliedRef.current = false;
      previousRecipientRef.current = current;
    }
  }, [draft.recipientName]);

  // Auto-fill senderTelling once for special recipient names, but never overwrite
  // an existing manual value.
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

  // Auto-fill message once after a feeling is selected for special names,
  // but never overwrite a manual message.
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

  // Mirror anchors + tone from the follow-up hook back into the draft so
  // they survive a refresh via localStorage. The hook produces; the draft
  // is the source of truth.
  useEffect(() => {
    setDraft((current) => {
      const sameAnchors =
        current.anchors.length === followUp.anchors.length &&
        current.anchors.every((a, i) => a === followUp.anchors[i]);

      if (sameAnchors && current.tone === followUp.tone) return current;
      return { ...current, anchors: followUp.anchors, tone: followUp.tone };
    });
  }, [followUp.anchors, followUp.tone]);

  // Editing the telling invalidates any composer drafts on screen.
  useEffect(() => {
    resetComposer();
  }, [draft.senderTelling, resetComposer]);

  // Editing the telling or changing the recipient invalidates any plan.
  useEffect(() => {
    resetPlan();
  }, [draft.senderTelling, draft.recipientName, resetPlan]);

  function triggerPlan() {
    void planBeat.trigger({
      recipientName: draft.recipientName.trim(),
      anchors: draft.anchors,
      tone: draft.tone,
      secondaryTone: draft.secondaryTone,
      emotion: draft.emotion,
    });
  }

  const planEligible =
    draft.recipientName.trim().length > 0 &&
    draft.senderTelling.trim().length >= 10;

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPreview) return;
    router.push('/create/preview');
  }

  function chooseDraft(text: string) {
    update('message', text);
    composer.dismiss();
  }

  function takeIntoWords() {
    messageTextareaRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    void composer.trigger({
      recipientName: draft.recipientName.trim(),
      telling: draft.senderTelling.trim(),
      anchors: draft.anchors,
      tone: draft.tone,
      emotion: draft.emotion,
    });
  }

  const canPreview =
    draft.recipientName.trim().length > 0 &&
    (draft.emotion !== '' || draft.senderTelling.trim().length > 0);

  const composerEligible =
    draft.recipientName.trim().length > 0 &&
    draft.senderTelling.trim().length >= 10;

  const showReflection =
    reflection.loading || reflection.displayedText.length > 0;
  const showFollowUp =
    reflection.done && (followUp.loading || followUp.displayedText.length > 0);
  const showFollowUpCta =
    followUp.done && composerEligible && composer.drafts.length === 0;

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
          {/* 01 — Name */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/70"
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
              placeholder="Their name"
              className="mt-4 w-full border-b border-cream-50/15 bg-transparent pb-3 font-display text-2xl text-cream-50 placeholder:text-cream-50/60 focus:border-gold-300/60 focus:outline-none sm:text-3xl"
            />
          </div>

          {/* 02 — Tell me about them */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/70"
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
            <p className="mt-2 text-sm leading-7 text-cream-50/60">
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
              className="mt-5 w-full resize-none border-b border-cream-50/15 bg-transparent pb-3 font-display text-lg leading-8 text-cream-50 placeholder:text-cream-50/60 focus:border-gold-300/60 focus:outline-none"
            />
            <p className="mt-2 text-right text-xs text-cream-50/55">
              {draft.senderTelling.length}/{TELLING_LIMIT}
            </p>

            {/* Reflection panel */}
            {showReflection && (
              <div className="mt-6 border-t border-gold-300/15 pt-5">
                {reflection.loading ? (
                  <div className="flex items-center gap-[5px]" role="status" aria-label="Listening">
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50" />
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:150ms]" />
                    <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:300ms]" />
                  </div>
                ) : (
                  <>
                    <p className="font-display text-base italic leading-7 text-cream-50/65">
                      {reflection.displayedText}
                      {reflection.displayedText.length < reflection.fullText.length && (
                        <span
                          aria-hidden
                          className="ml-[1px] inline-block h-[0.9em] w-px animate-pulse bg-cream-50/40 align-middle"
                        />
                      )}
                    </p>

                    {reflection.done && (
                      <button
                        type="button"
                        onClick={reflection.tryAgain}
                        disabled={reflection.maxAttemptsReached}
                        className="mt-4 text-xs uppercase tracking-[0.28em] text-cream-50/55 underline-offset-4 transition hover:text-cream-50/85 hover:underline disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Try again
                      </button>
                    )}

                    {/* Follow-up */}
                    {showFollowUp && (
                      <div className="mt-6 border-t border-gold-300/10 pt-5">
                        {followUp.loading && followUp.displayedText.length === 0 ? (
                          <div className="flex items-center gap-[5px]" role="status" aria-label="Listening more">
                            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/35" />
                            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/35 [animation-delay:150ms]" />
                            <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/35 [animation-delay:300ms]" />
                          </div>
                        ) : (
                          <>
                            <p className="font-display text-sm italic leading-7 text-cream-50/65 sm:text-base">
                              {followUp.displayedText}
                              {followUp.displayedText.length < followUp.fullText.length && (
                                <span
                                  aria-hidden
                                  className="ml-[1px] inline-block h-[0.9em] w-px animate-pulse bg-cream-50/30 align-middle"
                                />
                              )}
                            </p>

                            {showFollowUpCta && (
                              <button
                                type="button"
                                onClick={takeIntoWords}
                                disabled={composer.loading}
                                className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-cream-50/60 underline-offset-4 transition hover:text-cream-50/90 hover:underline disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                Take this into words →
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* 03 — Feeling */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/70"
              >
                03
              </span>
              <span className="block text-xs font-light uppercase tracking-[0.28em] text-cream-50/55">
                Feeling
              </span>
              <span className="text-[0.6rem] font-light uppercase tracking-[0.2em] text-cream-50/50">
                optional
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-cream-50/60">
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

          {/* 04 — Words */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="text-[0.65rem] font-light tracking-[0.32em] text-gold-300/70"
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
            <p className="mt-2 text-sm leading-7 text-cream-50/60">
              A few words for them. Anything that has been waiting.
            </p>
            <textarea
              ref={messageTextareaRef}
              id="message"
              name="message"
              rows={4}
              maxLength={MESSAGE_LIMIT}
              value={draft.message}
              onChange={(event) => update('message', event.target.value)}
              placeholder="You held a year I almost lost. Thank you."
              className="mt-5 w-full resize-none border-b border-cream-50/15 bg-transparent pb-3 font-display text-lg leading-8 text-cream-50 placeholder:text-cream-50/60 focus:border-gold-300/60 focus:outline-none"
            />
            <p className="mt-2 text-right text-xs text-cream-50/55">
              {draft.message.length}/{MESSAGE_LIMIT}
            </p>

            {composer.loading && composer.drafts.length === 0 && (
              <div className="mt-6 border-t border-gold-300/15 pt-5">
                <div className="flex items-center gap-[5px]" role="status" aria-label="Looking for the words">
                  <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50" />
                  <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:150ms]" />
                  <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-gold-300/50 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {composer.drafts.length > 0 && (
              <div className="mt-6 border-t border-gold-300/15 pt-5">
                <p className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-cream-50/55">
                  Three quiet starts
                </p>
                <div className="mt-4 space-y-4">
                  {composer.drafts.map((text, index) => (
                    <button
                      key={`${index}-${text.slice(0, 24)}`}
                      type="button"
                      onClick={() => chooseDraft(text)}
                      className="block w-full border-l border-gold-300/15 pl-4 text-left transition hover:border-gold-300/45"
                    >
                      <p className="font-display text-base italic leading-7 text-cream-50/75">
                        {text}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={takeIntoWords}
                    disabled={composer.loading}
                    className="text-xs uppercase tracking-[0.28em] text-cream-50/55 underline-offset-4 transition hover:text-cream-50/85 hover:underline disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Try different words
                  </button>
                  <button
                    type="button"
                    onClick={composer.dismiss}
                    className="text-xs uppercase tracking-[0.28em] text-cream-50/55 underline-offset-4 transition hover:text-cream-50/85 hover:underline"
                  >
                    Write my own
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Optional — shape the moment */}
          {planEligible && (
            <div>
              {!planBeat.plan ? (
                <button
                  type="button"
                  onClick={triggerPlan}
                  disabled={planBeat.loading}
                  className="text-xs uppercase tracking-[0.28em] text-cream-50/60 underline-offset-4 transition hover:text-cream-50/90 hover:underline disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {planBeat.loading ? 'Shaping the moment…' : 'Plan this moment →'}
                </button>
              ) : (
                <div className="border-t border-gold-300/15 pt-5">
                  <p className="text-[0.6rem] font-light uppercase tracking-[0.28em] text-cream-50/55">
                    Shape of the moment
                  </p>
                  <p className="mt-3 font-display text-base italic leading-7 text-cream-50/70 sm:text-lg">
                    A {planBeat.plan.momentType} — {planBeat.plan.durationHint}.
                  </p>
                  <ul className="mt-3 space-y-1">
                    {planBeat.plan.keyBeats.map((beat, index) => (
                      <li
                        key={`${index}-${beat.slice(0, 16)}`}
                        className="font-display text-sm italic leading-7 text-cream-50/55"
                      >
                        <span aria-hidden className="mr-2 text-gold-300/70">~</span>
                        {beat}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={planBeat.reset}
                    className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-cream-50/55 underline-offset-4 transition hover:text-cream-50/85 hover:underline"
                  >
                    Set this aside
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canPreview}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-7 py-4 text-sm font-medium text-cream-50 shadow-[0_18px_50px_-18px_rgba(143,20,49,0.7)] transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:bg-cream-50/10 disabled:text-cream-50/50 disabled:shadow-none sm:w-auto"
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
                <span className="text-xs uppercase tracking-[0.28em] text-cream-50/50">
                  Saved on this device
                </span>
              ) : (
                <span className="text-xs leading-6 text-cream-50/60 sm:max-w-[18rem] sm:text-right">
                  Add their name and tell us about them to preview.
                </span>
              )
            ) : null}
          </div>
        </form>

        <p className="mt-16 text-xs text-cream-50/55">
          <Link
            href="/"
            className="underline-offset-4 hover:text-cream-50/85 hover:underline"
          >
            Return home
          </Link>
        </p>
      </div>
    </main>
  );
}
