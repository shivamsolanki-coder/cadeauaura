import { notFound } from 'next/navigation';

import { SectionLabel } from '@/components/SectionLabel';
import { productCategories } from '@/data/productCategories';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = productCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <section>
      <SectionLabel label="Category" />
      <h1 className="mt-4 font-serif text-4xl text-deep-rose">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-stone-700">{category.description}</p>
      <p className="mt-6 rounded-2xl border border-rose-200 bg-soft-rose p-5 text-sm leading-6 text-stone-700">
        CadeauAura is preparing thoughtful inspirations for this category so every moment can feel more meaningful.
      </p>
    </section>
  );
}
