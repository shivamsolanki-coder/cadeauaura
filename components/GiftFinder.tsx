'use client';

import { useMemo, useState } from 'react';

import { giftIdeas } from '@/data/giftIdeas';
import {
  Culture,
  Emotion,
  GestureFeeling,
  Occasion,
  Personality,
  Relationship
} from '@/lib/types';

const relationships: Relationship[] = [
  'Partner',
  'Parent',
  'Sibling',
  'Friend',
  'Mentor',
  'Colleague',
  'Grandparent'
];

const occasions: Occasion[] = [
  'Birthday',
  'Anniversary',
  'Graduation',
  'Festival',
  'Thank You',
  'Just Because',
  'New Beginning'
];

const emotions: Emotion[] = [
  'Gratitude',
  'Love',
  'Pride',
  'Comfort',
  'Joy',
  'Hope'
];

const cultures: Culture[] = [
  'Global',
  'Indian',
  'Japanese',
  'Middle Eastern',
  'African',
  'Latin'
];

const personalities: Personality[] = [
  'Minimalist',
  'Sentimental',
  'Creative',
  'Elegant',
  'Traditional',
  'Adventurous'
];

const gestures: GestureFeeling[] = [
  'Quiet',
  'Warm',
  'Grand',
  'Reflective',
  'Playful'
];

interface FinderState {
  relationship: Relationship | null;
  occasion: Occasion | null;
  emotion: Emotion | null;
  culture: Culture | null;
  personality: Personality | null;
  gesture: GestureFeeling | null;
}

const initialState: FinderState = {
  relationship: null,
  occasion: null,
  emotion: null,
  culture: null,
  personality: null,
  gesture: null
};

const steps = [
  {
    key: 'relationship',
    title: 'Who is it for?',
    eyebrow: 'Relationship',
    options: relationships,
    icon: '👥'
  },
  {
    key: 'occasion',
    title: 'What is the moment?',
    eyebrow: 'Occasion',
    options: occasions,
    icon: '♡'
  },
  {
    key: 'emotion',
    title: 'What should they feel?',
    eyebrow: 'Emotion',
    options: emotions,
    icon: '✦'
  },
  {
    key: 'culture',
    title: 'Cultural mood',
    eyebrow: 'Culture',
    options: cultures,
    icon: '🪔'
  },
  {
    key: 'personality',
    title: 'Their personality',
    eyebrow: 'Personality',
    options: personalities,
    icon: '☆'
  },
  {
    key: 'gesture',
    title: 'Gesture style',
    eyebrow: 'Feeling',
    options: gestures,
    icon: '🎁'
  }
] as const;

export function GiftFinder() {
  const [state, setState] = useState<FinderState>(initialState);

  const activeCount = Object.values(state).filter(Boolean).length;

  const results = useMemo(() => {
    return giftIdeas
      .map((idea) => {
        let score = 0;

        if (state.relationship && idea.relationships.includes(state.relationship)) score += 3;
        if (state.occasion && idea.occasions.includes(state.occasion)) score += 3;
        if (state.emotion && idea.emotions.includes(state.emotion)) score += 4;
        if (state.culture && idea.cultures.includes(state.culture)) score += 2;
        if (state.personality && idea.personalities.includes(state.personality)) score += 2;
        if (state.gesture && idea.gestures.includes(state.gesture)) score += 2;

        return { idea, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, activeCount ? 6 : 3);
  }, [state, activeCount]);

  const update = <K extends keyof FinderState>(key: K, value: FinderState[K]) => {
    setState((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  const reset = () => setState(initialState);

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_45%,rgba(22,6,6,0.36)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982] backdrop-blur">
              <span>✦</span>
              AI Gift Finder
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Find a gift that feels deeply personal
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
              Choose the relationship, occasion and emotion. CadeauAura will surface thoughtful gift ideas that match the meaning behind your moment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#finder"
                className="rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#8f1431]/30 transition hover:-translate-y-1 hover:bg-[#a51c3c]"
              >
                Start Finding →
              </a>

              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-[#ead6c5] bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b1720] transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Reset Choices
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d7a25d]/30 bg-[#2c0b10]/60 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#f3c982]">
              Your selection
            </p>

            <div className="mt-5 space-y-3">
              {Object.entries(state).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm"
                >
                  <span className="capitalize text-white/60">{key}</span>
                  <span className="font-semibold text-[#fff7ef]">{value || 'Not selected'}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d7a25d]/25 bg-black/20 p-4 text-sm text-[#f6dfd0]/80">
              {activeCount ? (
                <p>
                  {activeCount} preference{activeCount > 1 ? 's' : ''} selected. Results are ranked by emotional match.
                </p>
              ) : (
                <p>
                  Select a few options to personalize your recommendations.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="finder" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.key}
              className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d7a25d]/35 bg-white text-2xl shadow-sm">
                  {step.icon}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a4a2d]">
                    {step.eyebrow}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight text-[#5a1722]">
                    {step.title}
                  </h2>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {step.options.map((option) => {
                  const active = state[step.key] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => update(step.key, option)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? 'border-[#6f0f22] bg-[#6f0f22] text-white shadow-lg shadow-[#6f0f22]/20'
                          : 'border-[#ead8c7] bg-white text-[#4a2d23] hover:border-[#8f1431] hover:text-[#8f1431]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Recommended for you
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Thoughtful gift ideas
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                These suggestions are ranked using your selected relationship, occasion, emotion, culture, personality and gesture style.
              </p>
            </div>

            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Clear all
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map(({ idea, score }) => (
              <article
                key={idea.id}
                className="flex min-h-[320px] flex-col rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight text-[#fff7ef]">
                    {idea.title}
                  </h3>

                  <span className="rounded-full border border-[#e8b36f]/35 bg-black/20 px-3 py-1 text-xs font-bold text-[#e8b36f]">
                    {score > 0 ? `${score} match` : 'Idea'}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/75">
                  {idea.summary}
                </p>

                <div className="mt-5 rounded-2xl border border-[#e8b36f]/20 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8b36f]">
                    Why it matters
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    {idea.meaning}
                  </p>
                </div>

                <p className="mt-auto pt-5 text-xs leading-6 text-white/55">
                  <span className="font-semibold text-[#e8b36f]">Care note:</span> {idea.careNote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
