import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import './globals.css';

const siteUrl = 'https://cadeauaura.vercel.app';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'CadeauAura',
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description:
        'CadeauAura helps people discover meaningful gifts inspired by emotion, culture and connection.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9205089044',
        contactType: 'customer support',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'CadeauAura',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      description:
        'Discover meaningful gifts, premium gift boxes, message cards and culture-inspired gifting ideas.',
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/categories?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

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
        url: '/opengraph-image',
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
    images: ['/twitter-image'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Header />

        <div className="min-h-[calc(100vh-180px)] w-full">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
