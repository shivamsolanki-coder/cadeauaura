import type { Metadata } from 'next';
import Link from 'next/link';

import { productCategories } from '@/data/productCategories';

export const metadata: Metadata = {
  title: 'Gift Categories',
  description:
    'Explore CadeauAura gift categories for birthdays, anniversaries, weddings, festivals, parents, couples, corporate gifting and luxury packaging.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Gift Categories | CadeauAura',
    description:
      'Browse premium and meaningful gift categories by occasion, relationship and emotion.',
    url: '/categories',
    images: ['/culture-diya.jpg.png'],
  },
};

export default function CategoriesPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_45%,rgba(22,6,6,0.35)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982] backdrop-blur">
            <span>🎁</span>
            Gift Categories
          </div>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            Explore gifts by occasion and emotion
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            Discover thoughtful gift collections for birthdays, weddings, festivals, parents, couples and premium packaging experiences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="group overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="relative min-h-[230px] bg-cover bg-center"
                style={{ backgroundImage: `url('${category.image}')` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.05),rgba(22,6,6,0.75))]" />

                <div className="absolute left-5 top-5 rounded-full border border-[#d7a25d]/40 bg-[#160606]/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#f3c982] backdrop-blur">
                  {category.badge}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="font-serif text-3xl leading-tight text-[#fff7ef]">
                    {category.title}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-7 text-stone-700">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-[#5a1722]">
                    {category.priceRange}
                  </span>

                  <span className="rounded-full bg-[#6f0f22] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#8f1431]">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
