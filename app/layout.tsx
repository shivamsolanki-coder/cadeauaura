import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PremiumLoader } from '@/components/PremiumLoader';
import { SpotlightCursor } from '@/components/SpotlightCursor';

import './globals.css';

export const metadata: Metadata = {
  title: 'CadeauAura | Make Every Moment Memorable',
  description: 'Gift ideas that touch hearts and create memories.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PremiumLoader />
        <SpotlightCursor />
        <Header />
        <main className="mx-auto min-h-[calc(100vh-180px)] w-full max-w-7xl px-4 py-10 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
