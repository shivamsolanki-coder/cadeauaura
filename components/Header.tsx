'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  ['Home', '/'],
  ['Gift Finder', '/gift-finder'],
  ['Meaning Cards', '/meaning-cards'],
  ['Culture & Tradition', '/culture-tradition'],
  ['Messages', '/messages'],
  ['Care Notes', '/care-notes'],
  ['About', '/about'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d7a25d]/30 bg-[#160606]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="text-3xl text-[#d7a25d]">✦</span>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#f3c982] sm:text-3xl">
            CadeauAura
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#f7e6d8]/85 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[#f3c982]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-[#f7e6d8] lg:flex">
          <Link
            href="/gift-finder"
            className="rounded-full border border-[#d7a25d]/40 px-5 py-2 text-sm font-semibold text-[#f3c982] transition hover:bg-[#d7a25d] hover:text-[#160606]"
          >
            Find a Gift
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-[#fff7ef] px-5 py-2 text-sm font-semibold text-[#4b0d18] transition hover:bg-[#f3c982]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7a25d]/35 text-xl text-[#f3c982] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#d7a25d]/20 bg-[#160606]/98 px-4 pb-5 pt-2 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-medium text-[#f7e6d8]/90">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#fff7ef]/10 hover:text-[#f3c982]"
              >
                {label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/gift-finder"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#d7a25d]/40 px-4 py-3 text-center text-sm font-semibold text-[#f3c982]"
              >
                Find a Gift
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#fff7ef] px-4 py-3 text-center text-sm font-semibold text-[#4b0d18]"
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
