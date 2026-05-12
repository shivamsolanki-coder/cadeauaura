import { GiftIdea } from '@/lib/types';

interface GiftIdeaCardProps {
  idea: GiftIdea;
  score?: number;
}

export function GiftIdeaCard({ idea, score }: GiftIdeaCardProps) {
  return (
    <article className="cinematic-card group">
      <h3 className="font-serif text-xl text-gold-100 transition group-hover:text-gold-200">{idea.title}</h3>
      {typeof score === 'number' ? <p className="mt-1 text-xs text-gold-200/60">Aura match score: {score}</p> : null}
      <p className="mt-3 text-sm leading-6 text-stone-text/75">{idea.summary}</p>
      <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-stone-text/75">
        <span className="font-semibold text-gold-200">Why it matters:</span> {idea.meaning}
      </p>
      <p className="mt-3 text-xs text-stone-text/50">Care: {idea.careNote}</p>
    </article>
  );
}
