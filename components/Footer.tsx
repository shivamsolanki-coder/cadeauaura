import Link from 'next/link';

const quickLinks = [
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
];

const categories = [
  'Anniversary Gifts',
  'Birthday Gifts',
  'Wedding Gifts',
  'Festive Gifts',
];

export function Footer() {
  return (
    <footer className="border-t border-[#d7a25d]/25 bg-[#160606] text-[#f7e6d8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl text-[#d7a25d]">✦</span>
            <span className="font-serif text-3xl font-bold text-[#f3c982]">
              CadeauAura
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-[#f7e6d8]/70">
            Premium gifting experiences crafted with emotion, culture and thoughtful storytelling.
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[#d7a25d]">
            Make every moment memorable
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl text-[#f3c982]">Explore</h3>
          <div className="mt-4 space-y-3 text-sm text-[#f7e6d8]/75">
            {quickLinks.map(([label, href]) => (
              <Link key={href} href={href} className="block transition hover:text-[#f3c982]">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-[#f3c982]">Gift Categories</h3>
          <div className="mt-4 space-y-3 text-sm text-[#f7e6d8]/75">
            {categories.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-xl text-[#f3c982]">Trust</h3>
          <div className="mt-4 space-y-3 text-sm text-[#f7e6d8]/75">
            <p>Curated with care</p>
            <p>Rooted in culture</p>
            <p>Premium packaging</p>
            <p>Secure gifting experience</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d7a25d]/15 px-4 py-5 text-center text-xs text-[#f7e6d8]/55">
        © {new Date().getFullYear()} CadeauAura. Crafted for meaningful gifting.
      </div>
    </footer>
  );
}
