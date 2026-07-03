'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu when the route changes so keyboard users
  // are never left behind an open overlay after navigating.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-50/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden className="text-2xl text-gold-300/70">✦</span>
          <span className="font-display text-2xl tracking-tight text-cream-50 sm:text-[1.6rem]">
            CadeauAura
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm font-light text-cream-50/75 lg:flex"
        >
          {links.map(([label, href]) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-sm transition hover:text-cream-50 ${
                  active
                    ? 'text-cream-50 underline decoration-gold-300/70 decoration-2 underline-offset-8'
                    : ''
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 text-cream-50 lg:flex">
          <Link
            href="/gift-finder"
            className="rounded-full border border-cream-50/20 px-5 py-2 text-sm font-light text-cream-50/85 transition hover:border-cream-50/45 hover:text-cream-50"
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20 text-cream-50/90 transition hover:border-cream-50/45 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-cream-50/5 bg-ink-950/95 px-4 pb-5 pt-2 lg:hidden"
        >
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-light text-cream-50/85"
          >
            {links.map(([label, href]) => {
              const active = isActivePath(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-2xl px-4 py-3 transition hover:bg-cream-50/5 hover:text-cream-50 ${
                    active ? 'bg-cream-50/5 text-cream-50' : ''
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/gift-finder"
                onClick={() => setOpen(false)}
                className="rounded-full border border-cream-50/20 px-4 py-3 text-center text-sm font-light text-cream-50/85"
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
