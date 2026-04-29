import type { MetadataRoute } from 'next';

import { productCategories } from '@/data/productCategories';

const siteUrl = 'https://cadeauaura.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '',
    '/categories',
    '/gift-finder',
    '/meaning-cards',
    '/culture-tradition',
    '/messages',
    '/care-notes',
    '/about',
    '/contact',
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: `${siteUrl}${category.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages];
}
