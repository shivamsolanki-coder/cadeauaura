import Link from 'next/link';
import { notFound } from 'next/navigation';

import { productCategories } from '@/data/productCategories';
import { products } from '@/data/products';

const whatsappNumber = '919205089044';

function getWhatsAppLink(productName: string) {
  const message = `Hi CadeauAura, I am interested in ${productName}. Please share more details.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateStaticParams() {
  return productCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = productCategories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: 'Gift Category | CadeauAura',
    };
  }

  return {
    title: `${category.title} | CadeauAura`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = productCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.categorySlug === category.slug
  );

  const relatedCategories = productCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 3);

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('${category.image}')` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_45%,rgba(22,6,6,0.25)_100%)]" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/categories"
            className="inline-flex rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#f3c982] backdrop-blur"
          >
            ← Back to categories
          </Link>

          <p className="mt-8 inline-flex rounded-full border border-[#d7a25d]/35 bg-[#fff7ef]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982] backdrop-blur">
            {category.badge}
          </p>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
            {category.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/85 sm:text-lg">
            {category.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/gift-finder"
              className="rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#8f1431]/30 transition hover:-translate-y-1 hover:bg-[#a51c3c]"
            >
              Find Matching Gifts →
            </Link>

            <span className="rounded-full border border-[#ead6c5] bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b1720]">
              {category.priceRange}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Collection overview
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#5a1722]">
              Thoughtful gifts made for meaningful moments
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-700">
              This collection is designed for people who want their gift to feel personal,
              premium and emotionally memorable. Explore curated gift ideas with pricing,
              use-case clarity and beautiful presentation.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Premium packaging', 'Emotional meaning', 'Curated ideas'].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ead8c7] bg-white p-4 text-sm font-semibold text-[#5a1722]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="min-h-[360px] rounded-[2rem] border border-[#ead8c7] bg-cover bg-center shadow-xl"
            style={{ backgroundImage: `url('${category.image}')` }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Curated products
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
              Explore gift ideas in this collection
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
              Browse meaningful product ideas with price range, purpose and emotional fit.
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hi CadeauAura, I am interested in ${category.title}. Please share more details.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#8f1431] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#a51c3c]"
          >
            WhatsApp Enquiry →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product) => (
            <article
              key={product.slug}
              className="group overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="relative min-h-[240px] bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.image}')` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.04),rgba(22,6,6,0.72))]" />

                <div className="absolute left-5 top-5 rounded-full border border-[#d7a25d]/40 bg-[#160606]/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#f3c982] backdrop-blur">
                  {product.badge}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-serif text-3xl leading-tight text-[#fff7ef]">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-7 text-stone-700">
                  {product.description}
                </p>

                <div className="mt-5 rounded-2xl border border-[#ead8c7] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8a4a2d]">
                    Best for
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#5a1722]">
                    {product.bestFor}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="font-serif text-3xl font-bold text-[#5a1722]">
                    {product.price}
                  </span>

                  <a
                    href={getWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#6f0f22] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1431]"
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Next collections
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Explore related gifting moods
              </h2>
            </div>

            <Link
              href="/categories"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              View all categories
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedCategories.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <div
                  className="min-h-[180px] bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8b36f]">
                    {item.badge}
                  </p>

                  <h3 className="mt-3 font-serif text-2xl text-[#fff7ef]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {item.description}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-[#e8b36f]">
                    Explore →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
