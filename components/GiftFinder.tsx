'use client';

import { useMemo, useState } from 'react';

import { giftIdeas } from '@/data/giftIdeas';
import { Culture, Emotion, GestureFeeling, Occasion, Personality, Relationship } from '@/lib/types';

import { FilterPill } from './FilterPill';
import { GiftIdeaCard } from './GiftIdeaCard';
import { SectionLabel } from './SectionLabel';

const relationships: Relationship[] = ['Partner', 'Parent', 'Sibling', 'Friend', 'Mentor', 'Colleague', 'Grandparent'];
const occasions: Occasion[] = [
  'Birthday',
  'Anniversary',
  'Graduation',
  'Festival',
  'Thank You',
  'Just Because',
  'New Beginning'
];
const emotions: Emotion[] = ['Gratitude', 'Love', 'Pride', 'Comfort', 'Joy', 'Hope'];
const cultures: Culture[] = ['Global', 'Indian', 'Japanese', 'Middle Eastern', 'African', 'Latin'];
const personalities: Personality[] = ['Minimalist', 'Sentimental', 'Creative', 'Elegant', 'Traditional', 'Adventurous'];
const gestures: GestureFeeling[] = ['Quiet', 'Warm', 'Grand', 'Reflective', 'Playful'];

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

export function GiftFinder() {
  const [state, setState] = useState<FinderState>(initialState);

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
      .slice(0, 3);
  }, [state]);

  const update = <K extends keyof FinderState>(key: K, value: FinderState[K]) => {
    setState((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  };

  return (
    <section className="space-y-8">
      <div>
        <SectionLabel label="Gift Finder" />
        <h1 className="mt-4 font-serif text-4xl text-deep-rose">Find a gesture that feels truly personal</h1>
        <p className="mt-3 max-w-2xl text-stone-700">
          Select the feelings and context around your moment. CadeauAura surfaces three meaningful ideas based on emotional fit.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-rose-200 bg-soft-rose p-5 sm:p-6">
        <FilterGroup
          title="Relationship"
          options={relationships}
          current={state.relationship}
          onSelect={(value) => update('relationship', value)}
        />
        <FilterGroup title="Occasion" options={occasions} current={state.occasion} onSelect={(value) => update('occasion', value)} />
        <FilterGroup title="Emotion" options={emotions} current={state.emotion} onSelect={(value) => update('emotion', value)} />
        <FilterGroup title="Culture" options={cultures} current={state.culture} onSelect={(value) => update('culture', value)} />
        <FilterGroup
          title="Personality"
          options={personalities}
          current={state.personality}
          onSelect={(value) => update('personality', value)}
        />
        <FilterGroup title="Gesture Feeling" options={gestures} current={state.gesture} onSelect={(value) => update('gesture', value)} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {results.map(({ idea, score }) => (
          <GiftIdeaCard key={idea.id} idea={idea} score={score} />
        ))}
      </div>
    </section>
  );
}

interface FilterGroupProps<T extends string> {
  title: string;
  options: T[];
  current: T | null;
  onSelect: (value: T) => void;
}

function FilterGroup<T extends string>({ title, options, current, onSelect }: FilterGroupProps<T>) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-deep-rose">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterPill key={option} label={option} active={current === option} onClick={() => onSelect(option)} />
        ))}
      </div>
    </div>
  );
}
