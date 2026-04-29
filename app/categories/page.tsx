import Link from 'next/link';

import { SectionLabel } from '@/components/SectionLabel';
import { productCategories } from '@/data/productCategories';

export default function CategoriesPage() {
  return (
    <section>
      <SectionLabel label="Categories" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">Explore meaningful categories</h1>
      <p className="mt-3 max-w-2xl text-stone-700">
        Discover curated paths to find ideas that feel personal, thoughtful, and emotionally resonant.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {productCategories.map((category) => (
          <article key={category.slug} className="rounded-2xl border border-rose-200 bg-white p-5">
            <h2 className="font-serif text-2xl text-deep-rose">{category.name}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">{category.description}</p>
            <Link
              href={`/categories/${category.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-deep-rose underline decoration-rose-300"
            >
              View category
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
