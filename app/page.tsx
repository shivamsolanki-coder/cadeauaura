import Link from 'next/link';

import { productCategories } from '@/data/productCategories';

const trustItems = [
  {
    icon: '♡',
    title: 'Curated with care and meaning',
    text: 'Every idea is thoughtfully selected to create emotion and lasting memories.',
  },
  {
    icon: '✦',
    title: 'Rooted in culture, made personal',
    text: 'Inspired by traditions and crafted to reflect your unique story.',
  },
  {
    icon: '👥',
    title: 'Thoughtful ideas for every bond',
    text: 'Find the right gift to express love, gratitude and celebration.',
  },
  {
    icon: '🎁',
    title: 'Premium quality, beautifully packaged',
    text: 'Elegant presentation, warm details and memorable finishing touches.',
  },
];

const pathways = [
  {
    title: 'By Occasion',
    text: 'Explore gifts for birthdays, anniversaries, weddings and festivals.',
    href: '/categories',
    image: '/culture-diya.jpg.png',
  },
  {
    title: 'By Relationship',
    text: 'Discover thoughtful ideas for partners, parents, friends and family.',
    href: '/gift-finder',
    image: '/story-unboxing.jpg.png',
  },
  {
    title: 'By Meaning',
    text: 'Choose gifts that express love, gratitude, care or celebration.',
    href: '/meaning-cards',
    image: '/meaning-card.jpg.png',
  },
  {
    title: 'Premium Collections',
    text: 'Luxury gift boxes and elegant curated sets for memorable moments.',
    href: '/categories/luxury-packaging',
    image: '/hero-gift.jpg.png',
  },
];

const featuredSlugs = [
  'birthday-gifts',
  'anniversary-gifts',
  'wedding-gifts',
  'festive-gifts',
];

const meaningCards = [
  {
    title: 'Love',
    text: 'For words that feel warm, intimate and deeply remembered.',
  },
  {
    title: 'Gratitude',
    text: 'For saying thank you in a way that feels personal and graceful.',
  },
  {
    title: 'Celebration',
    text: 'For birthdays, milestones and moments that deserve joy.',
  },
];

const testimonials = [
  {
    quote: 'The gift felt personal, premium and full of meaning.',
    name: 'Ananya S.',
    city: 'Bengaluru',
  },
  {
    quote: 'Finally, a gifting experience that understands emotion.',
    name: 'Rohit M.',
    city: 'Mumbai',
  },
  {
    quote: 'The meaning card made the moment unforgettable.',
    name: 'Meera K.',
    city: 'Pune',
  },
];

export default function HomePage() {
  const featuredCategories = productCategories.filter((category) =>
    featuredSlugs.includes(category.slug)
  );

  return (
    <main className="overflow-hidden">
      <section className="relative -mx-4 -mt-10 min-h-[720px] overflow-hidden bg-[#160606] px-4 py-16 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:min-h-[640px]">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-75"
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,162,93,0.28),transparent_28rem),linear-gradient(90deg,#170405_0%,rgba(54,5,15,0.96)_42%,rgba(22,6,6,0.42)_100%)]" />
        <div className="absolute left-12 top-28 h-32 w-32 rounded-full bg-[#d7a25d]/20 blur-3xl" />
        <div className="absolute bottom-24 right-20 h-48 w-48 rounded-full bg-[#8f1431]/35 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div className="aura-fade-up">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#f3c982] backdrop-blur">
              <span>♡</span>
              Gifts that speak from the heart
            </div>

            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Where emotion becomes a beautiful gift
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f6dfd0]/90 sm:text-lg">
              Thoughtful gifting inspired by emotion, culture and connection — so every moment you celebrate becomes unforgettable.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/categories"
                className="rounded-full bg-[#9f1239] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#9f1239]/30 transition hover:-translate-y-1 hover:bg-[#b01543]"
              >
                Explore Gift Ideas →
              </Link>

              <Link
                href="/gift-finder"
                className="rounded-full border border-[#d7a25d]/45 bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b0d18] shadow-xl transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Try Gift Finder ✦
              </Link>
            </div>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {['Curated with care', 'Rooted in culture', 'Beautifully packaged'].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold text-[#f6dfd0]/80 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="aura-float absolute right-0 top-10 h-[420px] w-[520px] rounded-[3rem] border border-[#d7a25d]/25 bg-[#fff7ef]/10 shadow-2xl shadow-black/40 backdrop-blur-md" />

            <div className="absolute right-10 top-28 w-80 rounded-[2rem] border border-[#d7a25d]/35 bg-[#321016]/75 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9f1239] text-2xl">
                  🎁
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-[#fff7ef]">
                    Personalized for You
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#f6dfd0]/75">
                    Thoughtful picks, crafted around your moments and loved ones.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-24 right-20 w-80 rounded-[2rem] border border-[#d7a25d]/35 bg-[#321016]/75 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7f1d1d] text-2xl">
                  ✍️
                </span>
                <div>
                  <h2 className="font-serif text-2xl text-[#fff7ef]">
                    Meaning Cards
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#f6dfd0]/75">
                    Words that stay long after the moment fades.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 right-0 rounded-[2rem] border border-[#d7a25d]/25 bg-black/25 px-6 py-4 text-sm text-[#f3c982] backdrop-blur-xl">
              Premium gifting made memorable
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
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
              Find the perfect gift
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
              Explore your way
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-sm font-bold text-[#8f1431] transition hover:text-[#5a1722]"
          >
            View all categories →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pathways.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative min-h-[320px] overflow-hidden rounded-[2rem] border border-[#ead8c7] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
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
                  Explore →
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
                Gifts for every meaningful occasion
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                Start with the moment, then choose a gift that carries emotion, beauty and story.
              </p>
            </div>

            <Link
              href="/categories"
              className="rounded-full border border-[#e8b36f]/40 px-5 py-3 text-sm font-semibold text-[#e8b36f] transition hover:bg-[#e8b36f] hover:text-[#430816]"
            >
              Browse all
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
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-[#ead8c7] shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/meaning-card.jpg.png')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,6,6,0.02),rgba(22,6,6,0.62))]" />
          <button
            type="button"
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-3xl text-white shadow-2xl backdrop-blur-xl"
          >
            ▶
          </button>
          <p className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/35 px-5 py-4 text-sm font-semibold text-white backdrop-blur">
            Unboxing memories, not just products.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-xl sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Words that stay
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
            Meaning cards for the emotions gifts cannot say alone
          </h2>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            Add heartfelt message lines for love, gratitude, healing and celebration. Because the right words can turn a simple gift into a lifelong memory.
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
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/meaning-cards"
            className="mt-8 inline-flex rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#a51c3c]"
          >
            Explore Meaning Cards →
          </Link>
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
              From diya-lit festive moments to elegant message cards, CadeauAura blends cultural warmth with modern premium gifting.
            </p>

            <div className="mt-7 space-y-3">
              {['Festive presentation', 'Ritual-inspired details', 'Elegant keepsakes'].map((item) => (
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
            className="min-h-[420px] bg-cover bg-center"
            style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-[2.5rem] border border-[#ead8c7] bg-[#fff7ef] p-7 shadow-xl sm:p-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Loved by many
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5a1722] sm:text-5xl">
              Real stories. Real emotions.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm"
              >
                <p className="font-serif text-4xl text-[#d7a25d]">“</p>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  {item.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5a1722] font-bold text-[#f3c982]">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-bold text-[#5a1722]">{item.name}</p>
                    <p className="text-sm text-stone-500">{item.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
              Make every moment memorable
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Ready to find a gift that truly feels personal?
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Browse curated ideas, explore meaningful message cards, and discover gifts that feel warm, thoughtful and unforgettable.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gift-finder"
                className="rounded-full bg-[#9f1239] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#b01543]"
              >
                Use Gift Finder →
              </Link>

              <Link
                href="/categories"
                className="rounded-full bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b0d18] transition hover:-translate-y-1 hover:bg-[#f3c982]"
              >
                Start Exploring
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
