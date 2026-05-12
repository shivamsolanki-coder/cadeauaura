import { MeaningCardItem } from '@/lib/types';

interface MeaningCardProps {
  card: MeaningCardItem;
}

export function MeaningCard({ card }: MeaningCardProps) {
  return (
    <article className="rounded-2xl border border-amber-200 bg-warm-amber/40 p-5">
      <h3 className="font-serif text-lg text-deep-rose">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-700">{card.reflection}</p>
    </article>
  );
}
