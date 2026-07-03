import Link from 'next/link';
import { notFound } from 'next/navigation';

import { productCategories } from '@/data/productCategories';
import { products } from '@/data/products';

const whatsappNumber = '919205089044';

function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getProductWhatsAppMessage(productName: string, categoryTitle: string) {
  return `Hi CadeauAura, I am interested in ${productName} from ${categoryTitle}. Please share real photos, customization options, final price and delivery details.`;
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
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} | CadeauAura`,
      description: category.description,
      url: `/categories/${category.slug}`,
      images: [category.image],
    },
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

  const categoryMessage = `Hi CadeauAura, I am exploring ${category.title}. Please suggest suitable gift options with photos, pricing, customization and delivery details.`;

  const enquirySteps = [
    {
      step: '01',
      title: 'Choose a gift idea',
      text: 'Browse the products in this category and pick the option that matches your occasion.',
    },
    {
      step: '02',
      title: 'Send WhatsApp enquiry',
      text: 'Click the product enquiry button and share your requirement with CadeauAura.',
    },
    {
      step: '03',
      title: 'Review details',
      text: 'Ask for real photos, customization options, packaging, price and timeline before finalizing.',
    },
  ];

  const trustNotes = [
    'Product-wise WhatsApp enquiry',
    'Customization details shared before confirmation',
    'Message card and packaging options available',
    'Final price and delivery timeline shared on request',
  ];

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
            <a
              href={getWhatsAppLink(categoryMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-[#0c2b1c] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
            >
              Enquire on WhatsApp →
            </a>

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
              This collection is designed for people who want their gift to feel
              personal, premium and emotionally memorable. Explore gift ideas,
              compare use-cases, and enquire on WhatsApp before finalizing.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustNotes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ead8c7] bg-white p-4 text-sm font-semibold text-[#5a1722]"
                >
                  <span aria-hidden>✓</span> {item}
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

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                How to enquire
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight">
                Simple enquiry flow before you finalize
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                No fake promises. First check product details, customization,
                final price and timeline clearly on WhatsApp.
              </p>
            </div>

            <a
              href={getWhatsAppLink(categoryMessage)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Ask for guidance
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {enquirySteps.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur"
              >
                <p className="text-sm font-black text-[#e8b36f]">
                  {item.step}
                </p>

                <h3 className="mt-4 font-serif text-2xl text-[#fff7ef]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
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
              Browse meaningful product ideas with price, purpose and emotional
              fit. Use WhatsApp to request current photos and final details.
            </p>
          </div>

          <a
            href={getWhatsAppLink(categoryMessage)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
          >
            Category WhatsApp Enquiry →
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

                  <p className="mt-2 text-sm font-bold text-[#f3c982]">
                    {product.price}
                  </p>
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

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppLink(
                      getProductWhatsAppMessage(product.name, category.title)
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#0c2b1c] transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
                  >
                    Enquire on WhatsApp
                  </a>

                  <Link
                    href="/gift-finder"
                    className="rounded-full border border-[#d7a25d]/50 bg-white px-5 py-3 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
                  >
                    Match gift
                  </Link>
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

                  <p className="mt-3 text-sm leading-6 text-white/80">
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
