import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
  ['Care Notes', '/care-notes'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d7a25d]/30 bg-[#160606]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl text-[#d7a25d]">✦</span>
          <span className="font-serif text-3xl font-bold tracking-tight text-[#f3c982]">
            CadeauAura
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#f7e6d8]/85 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-[#f3c982]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-[#f7e6d8]">
          <Link
            href="/gift-finder"
            className="hidden text-sm font-semibold text-[#f3c982] md:inline"
          >
            Find a Gift
          </Link>
          <Link href="/contact" className="text-sm font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
