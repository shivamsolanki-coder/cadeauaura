import { GiftIdea } from '@/lib/types';

interface GiftIdeaCardProps {
  idea: GiftIdea;
  score?: number;
}

export function GiftIdeaCard({ idea, score }: GiftIdeaCardProps) {
  return (
    <article className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm">
      <h3 className="font-serif text-xl text-deep-rose">{idea.title}</h3>
      {typeof score === 'number' ? <p className="mt-1 text-xs text-stone-500">Match score: {score}</p> : null}
      <p className="mt-3 text-sm leading-6 text-stone-700">{idea.summary}</p>
      <p className="mt-3 rounded-lg bg-soft-rose p-3 text-sm text-stone-700">
        <span className="font-semibold text-deep-rose">Why it matters:</span> {idea.meaning}
      </p>
      <p className="mt-3 text-xs text-stone-500">Care: {idea.careNote}</p>
    </article>
  );
}
