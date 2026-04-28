import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
  ['Care Notes', '/care-notes'],
  ['About', '/about'],
  ['Contact', '/contact']
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-rose-200 bg-ivory-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-2xl font-bold text-deep-rose">
          CadeauAura
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-text">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-deep-rose">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
