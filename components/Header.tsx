'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  ['Home', '/'],
  ['Gift Finder', '/gift-finder'],
  ['Categories', '/categories'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
  ['Care Notes', '/care-notes'],
  ['About', '/about'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-50/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span aria-hidden className="text-2xl text-gold-300/70">✦</span>
          <span className="font-display text-2xl tracking-tight text-cream-50 sm:text-[1.6rem]">
            CadeauAura
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-light text-cream-50/65 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-cream-50"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-cream-50 lg:flex">
          <Link
            href="/gift-finder"
            className="rounded-full border border-cream-50/15 px-5 py-2 text-sm font-light text-cream-50/80 transition hover:border-cream-50/40 hover:text-cream-50"
          >
            Find a Gift
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-cream-50 px-5 py-2 text-sm font-medium text-ink-900 transition hover:bg-mist-200"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/15 text-xl text-cream-50/80 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream-50/5 bg-ink-950/95 px-4 pb-5 pt-2 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-light text-cream-50/75">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-cream-50/5 hover:text-cream-50"
              >
                {label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/gift-finder"
                onClick={() => setOpen(false)}
                className="rounded-full border border-cream-50/15 px-4 py-3 text-center text-sm font-light text-cream-50/80"
              >
                Find a Gift
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-cream-50 px-4 py-3 text-center text-sm font-medium text-ink-900"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
