import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Heartfelt Idea Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Categories', '/categories'],
  ['Messages', '/messages'],
  ['Care Notes', '/care-notes'],
  ['About', '/about'],
  ['Contact', '/contact']
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight-black/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-3 font-serif text-2xl font-bold text-gold-100">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-200/30 bg-gold-200/10 text-sm shadow-aura transition group-hover:scale-105">
            CA
          </span>
          <span className="text-gold-gradient">CadeauAura</span>
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-text/75">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="premium-link rounded-full px-2 py-1">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
