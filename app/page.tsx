import Link from 'next/link';

const quickCards = [
  {
    title: 'Personalized for You',
    text: 'Thoughtful picks, crafted around your moments and loved ones.',
    href: '/gift-finder',
    cta: 'Find gifts',
  },
  {
    title: 'Meaning Cards',
    text: 'Words that stay long after the moment fades.',
    href: '/meaning-cards',
    cta: 'Explore cards',
  },
];

const trustPoints = [
  'Curated with care and meaning',
  'Rooted in culture, made personal',
  'Thoughtful ideas for every bond',
  'Premium quality, beautifully packaged',
  'Secure, reliable & on-time delivery',
];

const finderOptions = [
  'Who is it for?',
  'Occasion',
  'Personality',
  'Budget',
];

const testimonials = [
  {
    quote: 'The gift box was beyond beautiful — every little detail felt so personal.',
    name: 'Ananya S.',
    city: 'Bengaluru',
    avatar: '/avatar-1.jpg.png',
    initials: 'AS',
  },
  {
    quote: 'Finally, a brand that understands the meaning behind gifting. Truly heartfelt!',
    name: 'Rohit M.',
    city: 'Mumbai',
    avatar: null,
    initials: 'RM',
  },
  {
    quote: 'The meaning card added tears to our celebration. So thoughtful!',
    name: 'Meera K.',
    city: 'Pune',
    avatar: null,
    initials: 'MK',
  },
];

const stats = [
  ['10,000+', 'Happy Customers'],
  ['4.9 ★', 'Average Rating'],
  ['100+', 'Curated Experiences'],
  ['Worldwide', 'Delivery'],
  ['Sustainable', 'Packaging'],
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[640px] overflow-hidden bg-[#160606] px-4 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/hero-gift.jpg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#170405_0%,rgba(35,5,10,0.94)_34%,rgba(52,7,14,0.58)_62%,rgba(22,6,6,0.14)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(143,20,49,0.38),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(215,162,93,0.18),transparent_32%)]" />

        <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center gap-10 py-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-2xl aura-fade-up">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/35 bg-[#fff7ef]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c98f] backdrop-blur-md">
              <span>♡</span>
              Gifts that speak from the heart
            </div>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Where emotion becomes a beautiful gift
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#f6dfd0]/[0.9] sm:text-lg">
              Thoughtful gifting, guided by emotion, culture and connection — so every moment you celebrate becomes unforgettable.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/gift-finder"
                className="group rounded-full bg-[#8f1431] px-7 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#8f1431]/30 transition hover:-translate-y-1 hover:bg-[#a51c3c]"
              >
                Explore Gift Ideas
                <span className="ml-3 inline-block transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/gift-finder"
                className="group rounded-full border border-[#ead6c5] bg-[#fff7ef] px-7 py-4 text-sm font-semibold text-[#4b1720] shadow-2xl shadow-black/20 transition hover:-translate-y-1"
              >
                Try Gift Finder
                <span className="ml-3 text-[#c38a52]">✦</span>
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[500px] lg:block">
            <div className="absolute left-8 top-14 space-y-5">
              {quickCards.map((card) => (
                <Link
                  href={card.href}
                  key={card.title}
                  className="block w-72 rounded-2xl border border-[#d7a25d]/40 bg-[#2c0b10]/55 p-5 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-[#4b1720]/70"
                >
                  <h3 className="font-serif text-xl text-[#fff7ef]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/75">{card.text}</p>
                  <span className="mt-4 inline-block text-sm text-[#f0c98f]">
                    {card.cta} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto -mt-12 mb-8 max-w-7xl rounded-3xl border border-[#e2b271]/25 bg-black/30 p-4 backdrop-blur-xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((point, index) => (
              <div key={point} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#f7e8db]">
                <span className="text-xl text-[#e7b56e]">
                  {['♢', '♧', '🎁', '✦', '☑'][index]}
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT FINDER + CULTURE + MEANING */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[1.05fr_1fr_1.05fr]">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff5ec] p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
            Find the perfect gift
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#5a1722]">
            A heartfelt gift starts with the right choice
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-700">
            Answer a few simple questions and we’ll help you find something truly meaningful.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {finderOptions.map((item) => (
              <Link
                href="/gift-finder"
                key={item}
                className="rounded-2xl border border-[#ead8c7] bg-white/80 p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-2xl text-[#9c5a37]">
                  {item === 'Who is it for?' ? '👥' : item === 'Occasion' ? '♡' : item === 'Personality' ? '☆' : '🎁'}
                </div>
                <p className="mt-3 text-xs font-semibold text-[#4a2d23]">{item}</p>
              </Link>
            ))}
          </div>

          <Link
            href="/gift-finder"
            className="mt-6 inline-flex rounded-full bg-[#6f0f22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1431]"
          >
            Find My Gift →
          </Link>
        </div>

        <div
          className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-cover bg-center p-8 shadow-sm"
          style={{ backgroundImage: "url('/culture-diya.jpg.png')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,245,236,0.88),rgba(255,245,236,0.55),rgba(255,245,236,0.06))]" />
          <div className="relative max-w-sm">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Rooted in culture
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#5a1722]">
              Celebrate traditions that bring us closer
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-700">
              Explore rituals, stories and symbols behind meaningful gifting.
            </p>

            <Link
              href="/culture-tradition"
              className="mt-6 inline-flex rounded-full bg-[#6f0f22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1431]"
            >
              Explore Culture →
            </Link>
          </div>
        </div>

        <div
          className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#ead8c7] bg-cover bg-center p-8 shadow-sm"
          style={{ backgroundImage: "url('/meaning-card.jpg.png')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,247,239,0.86),rgba(255,247,239,0.50),rgba(255,247,239,0.08))]" />
          <div className="relative max-w-sm">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#8a4a2d]">
              Premium gift collections
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#5a1722]">
              Curated boxes for every emotion
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-700">
              Handpicked gifts. Beautifully packaged. Made to be remembered.
            </p>

            <Link
              href="/meaning-cards"
              className="mt-6 inline-flex rounded-full bg-[#6f0f22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1431]"
            >
              Explore Cards →
            </Link>
          </div>
        </div>
      </section>

      {/* CINEMATIC STORY */}
      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Stories that inspire
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Gifts that tell a story, every time.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                Watch how meaningful gifts create moments that last beyond the present.
              </p>

              <Link
                href="/about"
                className="mt-6 inline-flex rounded-full bg-[#fff3e8] px-6 py-3 text-sm font-semibold text-[#4b0c16]"
              >
                Watch Video ▶
              </Link>
            </div>

            <div
              className="relative min-h-[280px] overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center"
              style={{ backgroundImage: "url('/story-unboxing.jpg.png')" }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/[0.15] text-3xl backdrop-blur">
                ▶
              </div>
              <div className="absolute bottom-6 left-6 rounded-2xl bg-black/35 px-5 py-3 text-sm backdrop-blur">
                Unboxing memories, not just products.
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e8b36f]">
                Loved by many
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Real stories. Real emotions.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/70">
                From first-time givers to lifelong celebrations — our community trusts CadeauAura.
              </p>

              <Link href="/messages" className="mt-6 inline-block text-sm font-semibold text-[#e8b36f]">
                Read More Stories →
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur"
              >
                <p className="text-3xl text-[#e8b36f]">“</p>
                <p className="text-sm leading-7 text-white/80">{item.quote}</p>
                <div className="mt-5 text-[#f8c56e]">★★★★★</div>

                <div className="mt-5 flex items-center gap-3">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-12 w-12 rounded-full border border-[#e8b36f]/40 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e8b36f]/40 bg-[#fff7ef]/10 text-sm font-bold text-[#f3c982]">
                      {item.initials}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-white/[0.55]">{item.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto mb-10 max-w-5xl px-4">
        <div className="rounded-[2rem] border border-[#ead8c7] bg-[#fff5ec] p-6 shadow-xl">
          <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className="font-serif text-3xl text-[#5a1722]">{value}</p>
                <p className="mt-1 text-sm text-stone-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
