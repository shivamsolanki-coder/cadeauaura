import Link from 'next/link';

import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionLabel } from '@/components/SectionLabel';
import { productCategories } from '@/data/productCategories';

export default function CategoriesPage() {
  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] border border-white/10 bg-aura-radial p-8 shadow-aura">
        <SectionLabel label="Categories" />
        <h1 className="mt-4 max-w-3xl font-serif text-4xl text-gold-100 md:text-5xl">Explore meaningful categories</h1>
        <p className="mt-4 max-w-2xl text-stone-text/70">
          Discover curated paths to find ideas that feel personal, thoughtful, cinematic, and emotionally resonant.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {productCategories.map((category, index) => (
          <ScrollReveal key={category.slug} delay={index * 80}>
            <article className="cinematic-card group h-full">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-200/55">Aura path</p>
              <h2 className="mt-4 font-serif text-3xl text-gold-100 transition group-hover:text-gold-200">{category.name}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-text/70">{category.description}</p>
              <Link href={`/categories/${category.slug}`} className="premium-link mt-5 inline-block text-sm font-semibold">
                View category →
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
