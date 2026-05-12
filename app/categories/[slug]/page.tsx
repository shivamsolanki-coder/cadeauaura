import Link from 'next/link';
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
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-aura-radial p-8 shadow-aura md:p-12">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-luxury-purple/25 blur-3xl" />
      <div className="relative z-10">
        <SectionLabel label="Category" />
        <h1 className="mt-5 max-w-3xl font-serif text-5xl text-gold-100">{category.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-text/72">{category.description}</p>
        <div className="glass-panel mt-8 max-w-2xl rounded-3xl p-6">
          <p className="text-sm leading-7 text-stone-text/72">
            CadeauAura is preparing thoughtful inspirations for this category so every moment can feel more meaningful,
            emotionally precise, and beautifully remembered.
          </p>
        </div>
        <Link href="/categories" className="premium-link mt-8 inline-block text-sm font-semibold">
          ← Back to categories
        </Link>
      </div>
    </section>
  );
}
