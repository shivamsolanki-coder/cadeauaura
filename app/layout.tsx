import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import './globals.css';

const siteUrl = 'https://cadeauaura.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CadeauAura | Meaningful Gifts for Every Emotion',
    template: '%s | CadeauAura',
  },
  description:
    'CadeauAura helps you discover meaningful gifts inspired by emotion, culture and connection. Explore gift ideas, message cards, cultural gifting and premium curated collections.',
  keywords: [
    'CadeauAura',
    'meaningful gifts',
    'premium gifts',
    'personalized gifts',
    'Indian gifting',
    'birthday gifts',
    'anniversary gifts',
    'wedding gifts',
    'festive gifts',
    'gift finder',
    'message cards',
    'luxury gifts',
    'curated gift boxes',
  ],
  authors: [{ name: 'CadeauAura' }],
  creator: 'CadeauAura',
  publisher: 'CadeauAura',
  applicationName: 'CadeauAura',
  category: 'Gifting',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CadeauAura | Meaningful Gifts for Every Emotion',
    description:
      'Premium gifting ideas inspired by emotion, culture and connection.',
    url: siteUrl,
    siteName: 'CadeauAura',
    images: [
      {
        url: '/hero-gift.jpg.png',
        width: 1200,
        height: 630,
        alt: 'CadeauAura premium meaningful gifting experience',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CadeauAura | Meaningful Gifts for Every Emotion',
    description:
      'Discover premium gifting ideas inspired by emotion, culture and connection.',
    images: ['/hero-gift.jpg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#160606',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN">
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
