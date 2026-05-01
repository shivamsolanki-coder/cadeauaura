import Link from 'next/link';

import { productCategories } from '@/data/productCategories';
import { products } from '@/data/products';

const whatsappNumber = '919205089044';

function getWhatsAppLink(productName?: string) {
  const message = productName
    ? `Hi CadeauAura, I am interested in ${productName}. Please share photos, price details and customization options.`
    : 'Hi CadeauAura, I want help choosing a meaningful gift. Please guide me.';

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const trustItems = [
  {
    icon: '💬',
    title: 'WhatsApp-based enquiry',
    text: 'Share your occasion, budget and relationship. We help you choose the right gifting direction.',
  },
  {
    icon: '🎁',
    title: 'Curated gift suggestions',
    text: 'Explore products by occasion, relationship, emotion and cultural warmth.',
  },
  {
    icon: '✍️',
    title: 'Custom message cards',
    text: 'Add thoughtful lines that make the gift feel more personal and memorable.',
  },
  {
    icon: '✨',
    title: 'Premium packaging guidance',
    text: 'Box, ribbon, card and presentation options are shared before final confirmation.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Choose the moment',
    text: 'Select birthday, anniversary, wedding, festive, parent or corporate gifting.',
  },
  {
    step: '02',
    title: 'Pick a gift idea',
    text: 'Browse gift boxes, hampers, keepsakes, message cards and packaging options.',
  },
  {
    step: '03',
    title: 'Enquire on WhatsApp',
    text: 'Ask for real photos, customization options, final price and delivery details.',
  },
  {
    step: '04',
    title: 'Confirm the final gift',
    text: 'Once everything is clear, you can finalize the gift as per your requirement.',
  },
];

const featuredProductSlugs = [
  'romantic-memory-box',
  'birthday-surprise-box',
  'wedding-blessing-box',
  'diya-festive-box',
  'client-appreciation-box',
  'gratitude-box-for-parents',
];

const pathways = [
  {
    title: 'Birthday Gifts',
    text: 'Thoughtful birthday boxes, cards and personalized surprises.',
    href: '/categories/birthday-gifts',
    image: '/hero-gift.jpg.png',
  },
  {
    title: 'Anniversary Gifts',
    text: 'Romantic keepsakes and meaningful gifts for couples.',
    href: '/categories/anniversary-gifts',
    image: '/meaning-card.jpg.png',
  },
  {
    title: 'Festive Gifts',
    text: 'Warm Indian gifting ideas for celebrations and rituals.',
    href: '/categories/festive-gifts',
    image: '/culture-diya.jpg.png',
  },
  {
    title: 'Corporate Gifts',
    text: 'Professional gift boxes for clients, teams and events.',
    href: '/categories/corporate-gifts',
    image: '/story-unboxing.jpg.png',
  },
];

const meaningCards = [
  {
    title: 'Love',
    text: 'You make ordinary days feel special.',
  },
  {
    title: 'Gratitude',
    text: 'Thank you for being there in ways words cannot fully hold.',
  },
  {
    title: 'Pride',
    text: 'Seeing you grow makes this moment even more meaningful.',
  },
];

const featuredSlugs = [
  'birthday-gifts',
  'anniversary-gifts',
  'wedding-gifts',
  'festive-gifts',
];

export default function HomePage() {
  const featuredProducts = products.filter((product) =>
    featuredProductSlugs.includes(product.slug)
  );

  const featuredCategories = productCategories.filter((category) =>
    featuredSlugs.includes(category.slug)
  );

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 min-h-[620px] overflow-hidden bg-[#160606] px-5 py-10 text-white sm:-mx-6 sm:min-h-[680px] sm:px-6 sm:py-14 lg:-mx-8 lg:min-h-[640px] lg:py-16">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-75"
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,162,93,0.28),transparent_28rem),linear-gradient(90deg,#170405_0%,rgba(54,5,15,0.96)_42%,rgba(22,6,6,0.42)_100%)]" />
        <div className="absolute left-12 top-28 h-32 w-32 rounded-full bg-[#d7a25d]/20 blur-3xl" />
        <div className="absolute bottom-24 right-20 h-48 w-48 rounded-full bg-[#8f1431]/35 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="aura-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#f3c982] backdrop-blur sm:tracking-[0.35em]">
              <span>🎁</span>
              Meaningful gifting made personal
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-[2.75rem] leading-[0.98] text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Gifts that feel personal, thoughtful and beautifully presented
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f6dfd0]/90 sm:text-lg sm:leading-8">
              CadeauAura helps you discover curated gift ideas, message cards
              and premium packaging options for birthdays, anniversaries,
              weddings, festivals and meaningful relationships.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/categories"
                className="rounded-full bg-[#9f1239] px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#9f1239]/30 transition hover:-translate-y-1 hover:bg-[#b01543]"
              >
                Explore Gift Categories →
              </Link>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#d7a25d]/45 bg-[#fff7ef] px-6 py-4 text-sm font-semibold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Enquire on WhatsApp
              </a>
            </div>

            <div className="mt-8 grid max-w-3xl gap-2 sm:grid-cols-3 sm:gap-3">
              {[
                'Product-wise enquiry',
                'Custom message cards',
                'Packaging guidance',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-xs font-semibold text-[#f6dfd0]/80 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="aura-float absolute right-0 top-10 h-[420px] w-[520px] rounded-[3rem] border border-[#d7a25d]/25 bg-[#fff7ef]/10 shadow-2xl shadow-black/40 backdrop-blur-md" />

            <div className="absolute right-10 top-24 w-80 rounded-[2rem] border border-[#d7a25d]/35 bg-[#321016]/80 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f3c982]">
                Featured gift
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#fff7ef]">
                Romantic Memory Box
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#f6dfd0]/75">
                A keepsake box for photos, notes and small memories from your
                love story.
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-bold text-[#f3c982]">₹1,499</span>
                <a
                  href={getWhatsAppLink('Romantic Memory Box')}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#fff7ef] px-4 py-2 text-sm font-bold text-[#4b0d18]"
                >
                  Enquire
                </a>
              </div>
            </div>

            <div className="absolute bottom-20 right-20 w-80 rounded-[2rem] border border-[#d7a25d]/35 bg-[#321016]/80 p-6 shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f3c982]">
                Add-on
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#fff7ef]">
                Meaning Cards
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#f6dfd0]/75">
                Add words that make your gift feel warmer and more personal.
              </p>
              <Link
                href="/meaning-cards"
                className="mt-5 inline-flex rounded-full border border-[#d7a25d]/40 px-4 py-2 text-sm font-bold text-[#f3c982]"
              >
                View examples →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] shadow-xl md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="border-b border-[#ead8c7] p-6 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#ead8c7] bg-white text-2xl text-[#8f1431] shadow-sm">
                  {item.icon}
                </span>
                <div>
                  <h2 className="font-serif text-xl leading-tight text-[#5a1722]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Featured gifts
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
              Real gift ideas you can enquire for
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
              Start with these popular gifting ideas. Ask for photos,
              customization, packaging and delivery details on WhatsApp.
            </p>
          </div>

          <Link
            href="/categories"
            className="text-sm font-bold text-[#8f1431] transition hover:text-[#5a1722]"
          >
            Explore all gift categories →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.slug}
              className="group overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-[#fff7ef] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="relative min-h-[250px] bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('${product.image}')` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.05),rgba(22,6,6,0.72))]" />

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

                <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#5a1722]">
                  Best for: {product.bestFor}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={getWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1ebe5d]"
                  >
                    Enquire on WhatsApp
                  </a>

                  <Link
                    href={`/categories/${product.categorySlug}`}
                    className="rounded-full border border-[#d7a25d]/50 bg-white px-5 py-3 text-sm font-bold text-[#5a1722] transition hover:bg-[#fff2df]"
                  >
                    View category
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[2.5rem] bg-[#4a0716] p-6 text-white shadow-2xl shadow-[#4a0716]/20 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                How it works
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Simple enquiry. Clear guidance. Better gifting.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                CadeauAura is built for people who want a thoughtful gift but
                need help choosing the right option.
              </p>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Ask for gift help
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((item) => (
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
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Shop by need
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
              Find gifts by occasion or relationship
            </h2>
          </div>

          <Link
            href="/gift-finder"
            className="text-sm font-bold text-[#8f1431] transition hover:text-[#5a1722]"
          >
            Get gift suggestions →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pathways.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[#ead8c7] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl sm:min-h-[320px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.08),rgba(22,6,6,0.88))]" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7a25d]/40 bg-[#160606]/65 text-xl text-[#f3c982] backdrop-blur">
                  ✦
                </span>
                <h3 className="font-serif text-3xl leading-tight text-[#fff7ef]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#f6dfd0]/75">
                  {item.text}
                </p>
                <p className="mt-4 text-sm font-bold text-[#f3c982]">
                  View gift ideas →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[2.5rem] bg-[#4a0716] p-6 text-white shadow-2xl shadow-[#4a0716]/20 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Featured collections
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                Explore more gifting categories
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                Browse curated categories by occasion and gift purpose.
              </p>
            </div>

            <Link
              href="/categories"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Explore Gift Categories
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <div
                  className="min-h-[220px] bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e8b36f]">
                    {category.badge}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-[#fff7ef]">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {category.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#e8b36f]">
                      {category.priceRange}
                    </span>
                    <span className="rounded-full bg-[#fff7ef] px-4 py-2 text-sm font-semibold text-[#4a0716]">
                      View ideas →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] border border-[#ead8c7] shadow-xl sm:min-h-[420px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/meaning-card.jpg.png')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.02),rgba(22,6,6,0.62))]" />
          <p className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/35 px-5 py-4 text-sm font-semibold text-white backdrop-blur">
            Meaning cards help your gift carry the right words.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-xl sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Words that feel real
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Meaning cards for emotions gifts cannot say alone
          </h2>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            Add short, heartfelt message lines for love, gratitude, pride and
            celebration. These can be paired with gift boxes and hampers.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {meaningCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-[#ead8c7] bg-white p-5 shadow-sm"
              >
                <h3 className="font-serif text-2xl text-[#5a1722]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  “{card.text}”
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meaning-cards"
              className="rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#a51c3c]"
            >
              View Meaning Card Examples →
            </Link>

            <a
              href={getWhatsAppLink('Custom Message Card')}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#d7a25d]/50 bg-white px-7 py-4 text-sm font-semibold text-[#5a1722] transition hover:-translate-y-1 hover:bg-[#fff2df]"
            >
              Ask for card options
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[#5a0718] text-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
              Rooted in culture
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Gifts inspired by Indian warmth, ritual and celebration
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/75">
              From diya-lit festive moments to elegant message cards,
              CadeauAura blends cultural warmth with modern premium gifting.
            </p>

            <div className="mt-7 space-y-3">
              {[
                'Festive presentation options',
                'Ritual-inspired gift ideas',
                'Elegant keepsake and card add-ons',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-sm font-semibold text-[#fff7ef]"
                >
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/culture-tradition"
              className="mt-8 inline-flex rounded-full border border-[#e8b36f]/45 px-7 py-4 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#4a0716]"
            >
              Explore Culture →
            </Link>
          </div>

          <div
            className="min-h-[360px] bg-cover bg-center sm:min-h-[420px]"
            style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#160606] p-8 text-white shadow-2xl sm:p-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/story-unboxing.jpg.png')" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(215,162,93,0.22),transparent_24rem)]" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
              Start your gifting enquiry
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Need help choosing the right gift?
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Tell us the occasion, relationship and budget. CadeauAura will
              guide you toward suitable gift ideas and message card options.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gift-finder"
                className="rounded-full bg-[#9f1239] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#b01543]"
              >
                Get Gift Suggestions →
              </Link>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b0d18] transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
