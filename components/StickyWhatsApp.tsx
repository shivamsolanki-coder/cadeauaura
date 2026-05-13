'use client';

import { usePathname } from 'next/navigation';

const whatsappNumber = '919205089044';

const whatsappMessage =
  'Hi CadeauAura, I want help choosing a meaningful gift. Please guide me.';

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

/**
 * Hidden on cinematic surfaces (homepage + Moment Builder) so the
 * dark, quiet pages aren't broken by a bright green CTA. Still
 * visible on /categories, /gift-finder, /contact, and every product
 * or category detail page.
 */
function isCinematicRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === '/') return true;
  if (pathname === '/create' || pathname.startsWith('/create/')) return true;
  return false;
}

export function StickyWhatsApp() {
  const pathname = usePathname();

  if (isCinematicRoute(pathname)) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CadeauAura on WhatsApp"
      className="fixed bottom-5 right-5 z-[80] flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:bg-[#1ebe5d] sm:bottom-6 sm:right-6"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-[#25D366]">
        ☎
      </span>

      <span className="hidden sm:inline">Chat on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
