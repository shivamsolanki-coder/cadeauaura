import { MeaningCard } from '@/components/MeaningCard';
import { SectionLabel } from '@/components/SectionLabel';

const cards = [
  { title: 'For Gratitude', reflection: 'Your kindness shaped this chapter of my life in ways I will always carry.' },
  { title: 'For Love', reflection: 'You make ordinary days feel sacred, and your presence feels like home.' },
  { title: 'For Pride', reflection: 'The courage you show each day is a quiet inspiration to everyone around you.' },
  { title: 'For Comfort', reflection: 'In difficult moments, your warmth reminds me that I am never alone.' },
  { title: 'For Hope', reflection: 'May this gesture remind you that beautiful beginnings are still unfolding.' },
  { title: 'For Joy', reflection: 'Your laughter lights every room, and this moment is brighter because of you.' }
];

export default function MeaningCardsPage() {
  return (
    <section>
      <SectionLabel label="Meaning Cards" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">Words that deepen the moment</h1>
      <p className="mt-3 max-w-2xl text-stone-700">Pair every gesture with language that feels sincere, intimate, and human.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <MeaningCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
