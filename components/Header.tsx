import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture', '/culture-tradition'],
  ['Messages', '/messages'],
  ['About', '/about'],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#d7a25d]/25 bg-[#23070b]/75 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a25d]/40 bg-[#fff7ef]/10 text-lg text-[#f0c98f] shadow-inner">
            ✦
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#fff7ef]">
            CadeauAura
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#f8e8db]/80 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-[#f0c98f]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/gift-finder"
            className="hidden rounded-full border border-[#d7a25d]/35 px-5 py-2 text-sm font-semibold text-[#f0c98f] transition hover:bg-[#f0c98f] hover:text-[#321016] sm:inline-flex"
          >
            Find a Gift
          </Link>

          <Link
            href="/contact"
            className="rounded-full bg-[#fff7ef] px-5 py-2 text-sm font-semibold text-[#4b0d18] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f0c98f]"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
