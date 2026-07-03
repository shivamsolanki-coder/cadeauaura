import Link from 'next/link';

const quickLinks = [
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
] as const;

const categories = [
  ['Anniversary Gifts', '/categories/anniversary-gifts'],
  ['Birthday Gifts', '/categories/birthday-gifts'],
  ['Wedding Gifts', '/categories/wedding-gifts'],
  ['Festive Gifts', '/categories/festive-gifts'],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gold-500/25 bg-ink-950 text-cream-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-full">
            <span aria-hidden className="text-3xl text-gold-500">✦</span>
            <span className="font-display text-3xl text-gold-300">
              CadeauAura
            </span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-cream-50/75">
            Premium gifting experiences crafted with emotion, culture and
            thoughtful storytelling — wherever in the world your people are.
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-gold-300/90">
            Make every moment memorable
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl text-gold-300">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream-50/80">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-sm transition hover:text-gold-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl text-gold-300">Gift Categories</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream-50/80">
            {categories.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-sm transition hover:text-gold-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl text-gold-300">Trust</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream-50/80">
            <li>Curated with care</li>
            <li>Rooted in many cultures</li>
            <li>Premium packaging</li>
            <li>Secure gifting experience</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold-500/15 px-4 py-5 text-center text-xs text-cream-50/65">
        © {new Date().getFullYear()} CadeauAura. Crafted for meaningful gifting.
      </div>
    </footer>
  );
}
