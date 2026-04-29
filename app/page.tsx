import Link from 'next/link';

const quickCards = [
  {
    title: 'Personalized for You',
    text: 'Thoughtful picks crafted around your moments and loved ones.',
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
  },
  {
    quote: 'Finally, a brand that understands the meaning behind gifting. Truly heartfelt!',
    name: 'Rohit M.',
    city: 'Mumbai',
  },
  {
    quote: 'The meaning card added tears to our celebration. So thoughtful!',
    name: 'Meera K.',
    city: 'Pune',
  },
];

const stats = [
  ['10,000+', 'Happy Customers'],
  ['4.9 ★', 'Average Rating'],
  ['100+', 'Curated Experiences'],
  ['Worldwide', 'Delivery'],
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
     <section className="relative -mt-24 min-h-[720px] overflow-hidden bg-[#160606] px-4 pt-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(226,151,91,0.35),transparent_28%),radial-gradient(circle_at_20%_30%,rgba(128,16,39,0.45),transparent_30%),linear-gradient(135deg,#210707_0%,#4b0d18_42%,#120404_100%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#d7a25d]/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#f0c98f] backdrop-blur-md">
              <span>♡</span>
              Gifts that speak from the heart
            </div>

            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-[#fff7ef] sm:text-6xl lg:text-7xl">
              Where emotion becomes a beautiful gift
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#f6dfd0]/[0.85] sm:text-lg">
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

          <div className="relative hidden min-h-[540px] lg:block">
            <div className="absolute right-0 top-10 h-[430px] w-[620px] rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,160,0.35),transparent_25%),linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="absolute right-10 top-10 h-48 w-80 rotate-6 rounded-3xl bg-gradient-to-br from-[#7b1f22] via-[#4a1115] to-[#210607] shadow-2xl">
                <div className="absolute inset-6 rounded-2xl border border-[#d7a25d]/40" />
                <div className="absolute left-8 top-8 font-serif text-3xl text-[#e5b56d]">CadeauAura</div>
                <div className="absolute bottom-8 left-8 text-xs uppercase tracking-[0.28em] text-[#f8dfb6]/70">
                  Meaningful gifting
                </div>
                <div className="absolute -top-4 right-12 h-60 w-12 rounded-full bg-gradient-to-b from-[#d9906b] to-[#6d1d22] shadow-xl" />
                <div className="absolute -top-3 right-3 h-12 w-32 rounded-full bg-gradient-to-r from-[#d9906b] to-[#6d1d22] shadow-xl" />
              </div>

              <div className="absolute bottom-12 left-10 h-28 w-28 rounded-full bg-[#f3b46f]/20 blur-2xl" />
              <div className="absolute bottom-12 left-14 flex h-24 w-24 items-center justify-center rounded-full border border-[#f5c17d]/40 bg-[#2a0909]/70 text-4xl shadow-2xl backdrop-blur">
                🕯️
              </div>

              <div className="absolute bottom-10 right-20 rounded-2xl border border-[#e2b271]/30 bg-black/25 px-5 py-4 text-sm text-[#f9e7d7] backdrop-blur-lg">
                <p className="font-semibold text-[#f2c27f]">Premium packaging</p>
                <p className="mt-1 text-xs text-white/70">Designed to feel memorable.</p>
              </div>
            </div>

            <div className="absolute left-4 top-16 space-y-5">
              {quickCards.map((card) => (
                <Link
                  href={card.href}
                  key={card.title}
                  className="block w-72 rounded-2xl border border-[#d7a25d]/30 bg-white/10 p-5 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.15]"
                >
                  <h3 className="font-serif text-xl text-[#fff7ef]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{card.text}</p>
                  <span className="mt-4 inline-block text-sm text-[#f0c98f]">
                    {card.cta} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto -mt-28 mb-10 max-w-7xl rounded-3xl border border-[#e2b271]/25 bg-black/25 p-4 backdrop-blur-xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustPoints.map((point, index) => (
              <div key={point} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[#f7e8db]">
                <span className="text-xl text-[#e7b56e]">
                  {['♢', '♧', '♚', '✦', '☑'][index]}
                </span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT FINDER + CULTURE + BOXES */}
      <section className="mx-auto grid max-w-7xl gap-5 py-6 lg:grid-cols-[1.1fr_1fr_1.1fr]">
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

          <Link
            href="/gift-finder"
            className="mt-6 inline-flex rounded-full bg-[#6f0f22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f1431]"
          >
            Find My Gift →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {finderOptions.map((item) => (
            <Link
              href="/gift-finder"
              key={item}
              className="rounded-3xl border border-[#ead8c7] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-3xl text-[#9c5a37]">
                {item === 'Who is it for?' ? '👥' : item === 'Occasion' ? '♡' : item === 'Personality' ? '☆' : '🎁'}
              </div>
              <p className="mt-4 text-sm font-medium text-[#4a2d23]">{item}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[#ead8c7] bg-[linear-gradient(135deg,#fff1e4,#f6d0ab)] p-8 shadow-sm">
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
      </section>

      {/* CINEMATIC STORY */}
      <section className="mx-auto max-w-7xl rounded-[2rem] bg-[#430816] p-6 text-white shadow-2xl shadow-[#430816]/20 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr_1fr]">
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

          <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,214,157,0.35),transparent_28%),linear-gradient(135deg,#8d4a32,#250609)]">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/[0.15] text-3xl backdrop-blur">
              ▶
            </div>
            <div className="absolute bottom-6 left-6 rounded-2xl bg-black/25 px-5 py-3 text-sm backdrop-blur">
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
            <article key={item.name} className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur">
              <p className="text-3xl text-[#e8b36f]">“</p>
              <p className="text-sm leading-7 text-white/80">{item.quote}</p>
              <div className="mt-5 text-[#f8c56e]">★★★★★</div>
              <p className="mt-3 font-semibold">{item.name}</p>
              <p className="text-sm text-white/[0.55]">{item.city}</p>
            </article>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto mb-10 mt-8 max-w-5xl rounded-[2rem] border border-[#ead8c7] bg-[#fff5ec] p-6 shadow-xl">
        <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl text-[#5a1722]">{value}</p>
              <p className="mt-1 text-sm text-stone-600">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
