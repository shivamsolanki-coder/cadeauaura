import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

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
      <body className="min-h-screen overflow-x-hidden">
        <Header />
        <div className="min-h-[calc(100vh-180px)] w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
