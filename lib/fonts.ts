import { Fraunces, Inter } from 'next/font/google';

export const fontDisplay = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
});

export const fontUI = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});
