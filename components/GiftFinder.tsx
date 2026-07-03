'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { giftIdeas } from '@/data/giftIdeas';
import { products } from '@/data/products';
import {
  Culture,
  Emotion,
  GestureFeeling,
  Occasion,
  Personality,
  Relationship,
} from '@/lib/types';

const whatsappNumber = '919205089044';

const relationships: Relationship[] = [
  'Partner',
  'Parent',
  'Sibling',
  'Friend',
  'Mentor',
  'Colleague',
  'Grandparent',
];

const occasions: Occasion[] = [
  'Birthday',
  'Anniversary',
  'Graduation',
  'Festival',
  'Thank You',
  'Just Because',
  'New Beginning',
];

const emotions: Emotion[] = [
  'Gratitude',
  'Love',
  'Pride',
  'Comfort',
  'Joy',
  'Hope',
];

const cultures: Culture[] = [
  'Global',
  'Indian',
  'Japanese',
  'Middle Eastern',
  'African',
  'Latin',
];

const personalities: Personality[] = [
  'Minimalist',
  'Sentimental',
  'Creative',
  'Elegant',
  'Traditional',
  'Adventurous',
];

const gestures: GestureFeeling[] = [
  'Quiet',
  'Warm',
  'Grand',
  'Reflective',
  'Playful',
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
  gesture: null,
};

const steps = [
  {
    key: 'relationship',
    title: 'Who is it for?',
    eyebrow: 'Relationship',
    options: relationships,
    icon: '👥',
  },
  {
    key: 'occasion',
    title: 'What is the moment?',
    eyebrow: 'Occasion',
    options: occasions,
    icon: '♡',
  },
  {
    key: 'emotion',
    title: 'What should they feel?',
    eyebrow: 'Emotion',
    options: emotions,
    icon: '✦',
  },
  {
    key: 'culture',
    title: 'Cultural mood',
    eyebrow: 'Culture',
    options: cultures,
    icon: '🪔',
  },
  {
    key: 'personality',
    title: 'Their personality',
    eyebrow: 'Personality',
    options: personalities,
    icon: '☆',
  },
  {
    key: 'gesture',
    title: 'Gesture style',
    eyebrow: 'Feeling',
    options: gestures,
    icon: '🎁',
  },
] as const;

const occasionCategoryBoost: Record<Occasion, string[]> = {
  Birthday: ['birthday-gifts'],
  Anniversary: ['anniversary-gifts', 'couple-gifts'],
  Graduation: ['birthday-gifts', 'corporate-gifts'],
  Festival: ['festive-gifts', 'wedding-gifts'],
  'Thank You': ['parent-gifts', 'corporate-gifts', 'luxury-packaging'],
  'Just Because': ['couple-gifts', 'parent-gifts', 'birthday-gifts'],
  'New Beginning': ['wedding-gifts', 'parent-gifts', 'corporate-gifts'],
};

const relationshipCategoryBoost: Record<Relationship, string[]> = {
  Partner: ['anniversary-gifts', 'couple-gifts'],
  Parent: ['parent-gifts', 'festive-gifts'],
  Sibling: ['birthday-gifts', 'festive-gifts'],
  Friend: ['birthday-gifts', 'couple-gifts'],
  Mentor: ['corporate-gifts', 'parent-gifts'],
  Colleague: ['corporate-gifts', 'birthday-gifts'],
  Grandparent: ['parent-gifts', 'festive-gifts'],
};

const emotionKeywords: Record<Emotion, string[]> = {
  Gratitude: ['gratitude', 'appreciation', 'parent', 'blessing', 'client'],
  Love: ['romantic', 'love', 'couple', 'memory', 'proposal'],
  Pride: ['keepsake', 'frame', 'premium', 'professional'],
  Comfort: ['family', 'parent', 'memory', 'hamper'],
  Joy: ['birthday', 'celebration', 'festive', 'surprise'],
  Hope: ['blessing', 'wedding', 'new', 'proposal', 'message'],
};

const personalityKeywords: Record<Personality, string[]> = {
  Minimalist: ['card', 'frame', 'packaging', 'ribbon'],
  Sentimental: ['memory', 'gratitude', 'blessing', 'message'],
  Creative: ['personalized', 'custom', 'card', 'keepsake'],
  Elegant: ['premium', 'luxury', 'elegant', 'wedding'],
  Traditional: ['festive', 'diya', 'tradition', 'blessing'],
  Adventurous: ['surprise', 'celebration', 'hamper', 'date'],
};

const cultureKeywords: Record<Culture, string[]> = {
  Global: ['premium', 'personalized', 'message', 'keepsake'],
  Indian: ['festive', 'diya', 'blessing', 'tradition', 'wedding', 'family'],
  Japanese: ['minimal', 'card', 'frame', 'packaging', 'elegant', 'keepsake'],
  'Middle Eastern': ['luxury', 'hamper', 'premium', 'family', 'blessing'],
  African: ['celebration', 'family', 'memory', 'gratitude', 'vibrant'],
  Latin: ['celebration', 'family', 'date', 'romantic', 'joy'],
};

const cultureCategoryBoost: Record<Culture, string[]> = {
  Global: [],
  Indian: ['festive-gifts', 'wedding-gifts', 'parent-gifts'],
  Japanese: ['luxury-packaging', 'corporate-gifts'],
  'Middle Eastern': ['luxury-packaging', 'festive-gifts'],
  African: ['festive-gifts', 'parent-gifts'],
  Latin: ['couple-gifts', 'anniversary-gifts'],
};

const gestureKeywords: Record<GestureFeeling, string[]> = {
  Quiet: ['card', 'frame', 'message', 'keepsake'],
  Warm: ['gratitude', 'family', 'festive', 'parent'],
  Grand: ['premium', 'luxury', 'wedding', 'hamper'],
  Reflective: ['memory', 'blessing', 'keepsake', 'message'],
  Playful: ['birthday', 'surprise', 'date', 'celebration'],
};

function getSearchText(product: (typeof products)[number]) {
  return `${product.name} ${product.description} ${product.badge} ${product.bestFor} ${product.categorySlug}`.toLowerCase();
}

function countKeywordMatches(text: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    return text.includes(keyword.toLowerCase()) ? score + 1 : score;
  }, 0);
}

function buildPreferenceSummary(state: FinderState) {
  const entries = Object.entries(state).filter(([, value]) => Boolean(value));

  if (!entries.length) {
    return 'No specific preferences selected yet';
  }

  return entries
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function GiftFinder() {
  const [state, setState] = useState<FinderState>(initialState);

  const activeCount = Object.values(state).filter(Boolean).length;
  const preferenceSummary = buildPreferenceSummary(state);

  const ideaResults = useMemo(() => {
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
      .slice(0, 3);
  }, [state, activeCount]);

  const productResults = useMemo(() => {
    const scoredProducts = products
      .map((product) => {
        const text = getSearchText(product);
        let score = 0;

        if (
          state.occasion &&
          occasionCategoryBoost[state.occasion].includes(product.categorySlug)
        ) {
          score += 5;
        }

        if (
          state.relationship &&
          relationshipCategoryBoost[state.relationship].includes(product.categorySlug)
        ) {
          score += 5;
        }

        if (state.emotion) {
          score += countKeywordMatches(text, emotionKeywords[state.emotion]) * 2;
        }

        if (state.personality) {
          score += countKeywordMatches(text, personalityKeywords[state.personality]);
        }

        if (state.gesture) {
          score += countKeywordMatches(text, gestureKeywords[state.gesture]);
        }

        if (state.culture) {
          if (cultureCategoryBoost[state.culture].includes(product.categorySlug)) {
            score += 2;
          }
          score += countKeywordMatches(text, cultureKeywords[state.culture]);
        }

        return { product, score };
      })
      .sort((a, b) => b.score - a.score);

    const matchedProducts = activeCount
      ? scoredProducts.filter((item) => item.score > 0)
      : scoredProducts;

    return (matchedProducts.length ? matchedProducts : scoredProducts).slice(0, 6);
  }, [state, activeCount]);

  const update = <K extends keyof FinderState>(key: K, value: FinderState[K]) => {
    setState((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const reset = () => setState(initialState);

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/hero-gift.webp')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_45%,rgba(22,6,6,0.36)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982] backdrop-blur">
              <span aria-hidden>✦</span>
              Gift Finder
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Find a gift that feels deeply personal
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
              Choose the relationship, occasion and emotion. CadeauAura will
              suggest thoughtful gift directions and product options you can
              enquire for on WhatsApp.
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
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm"
                >
                  <span className="capitalize text-white/80">{key}</span>
                  <span className="text-right font-semibold text-[#fff7ef]">
                    {value || 'Not selected'}
                  </span>
                </div>
              ))}
            </div>

            <div
              aria-live="polite"
              className="mt-5 rounded-2xl border border-[#d7a25d]/25 bg-black/20 p-4 text-sm text-[#f6dfd0]/90"
            >
              {activeCount ? (
                <p>
                  {activeCount} preference{activeCount > 1 ? 's' : ''} selected.
                  Product suggestions and idea cards are updated below.
                </p>
              ) : (
                <p>
                  Select a few options to personalize your recommendations.
                </p>
              )}
            </div>

            <a
              href={getWhatsAppLink(
                `Hi CadeauAura, I need help choosing a gift. My preferences are: ${preferenceSummary}. Please guide me.`
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-[#25D366] px-5 py-4 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Send my preferences on WhatsApp
            </a>
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
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d7a25d]/35 bg-white text-2xl shadow-sm"
                >
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
                      aria-pressed={active}
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

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-6 shadow-xl lg:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
                Product recommendations
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722]">
                Gift options you can enquire for
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
                These product suggestions are matched with your selected
                relationship, occasion, emotion and gifting style.
              </p>
            </div>

            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-[#d7a25d]/50 bg-white px-5 py-3 text-sm font-semibold text-[#5a1722] transition hover:bg-[#fff2df]"
            >
              Clear all
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productResults.map(({ product, score }) => (
              <article
                key={product.slug}
                className="group overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="relative min-h-[230px] bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url('${product.image}')` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.05),rgba(22,6,6,0.72))]" />

                  <div className="absolute left-5 top-5 rounded-full border border-[#d7a25d]/40 bg-[#160606]/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#f3c982] backdrop-blur">
                    {score > 0 ? `${score} match` : product.badge}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-serif text-3xl leading-tight text-[#fff7ef]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-[#f3c982]">
                      {product.price}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-stone-700">
                    {product.description}
                  </p>

                  <p className="mt-4 rounded-2xl bg-[#fff7ef] px-4 py-3 text-sm font-semibold text-[#5a1722]">
                    Best for: {product.bestFor}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={getWhatsAppLink(
                        `Hi CadeauAura, Gift Finder recommended "${product.name}" (${product.price}). My preferences are: ${preferenceSummary}. Please share real photos, customization options and delivery details.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
                    >
                      Enquire on WhatsApp
                    </a>

                    <Link
                      href={`/categories/${product.categorySlug}`}
                      className="rounded-full border border-[#d7a25d]/50 bg-white px-5 py-3 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
                    >
                      View category
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Idea direction
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Thoughtful concepts for your gift
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                These ideas help you explain the emotion behind the gift. You can
                share any idea directly on WhatsApp and ask for available options.
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
            {ideaResults.map(({ idea, score }) => (
              <article
                key={idea.id}
                className="flex min-h-[360px] flex-col rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight text-[#fff7ef]">
                    {idea.title}
                  </h3>

                  <span className="rounded-full border border-[#e8b36f]/35 bg-black/20 px-3 py-1 text-xs font-bold text-[#e8b36f]">
                    {score > 0 ? `${score} match` : 'Idea'}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/85">
                  {idea.summary}
                </p>

                <div className="mt-5 rounded-2xl border border-[#e8b36f]/20 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8b36f]">
                    Why it matters
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    {idea.meaning}
                  </p>
                </div>

                <p className="mt-5 text-xs leading-6 text-white/80">
                  <span className="font-semibold text-[#e8b36f]">
                    Care note:
                  </span>{' '}
                  {idea.careNote}
                </p>

                <a
                  href={getWhatsAppLink(
                    `Hi CadeauAura, Gift Finder suggested the idea "${idea.title}". My preferences are: ${preferenceSummary}. Please recommend available gift options for this idea.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
                >
                  Ask for this idea on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
