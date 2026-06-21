import type { Metadata } from 'next';
import { Inter, Literata } from 'next/font/google';
import './globals.css';
import GlobalHeader from '@/components/layout/global-header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });

export const metadata: Metadata = {
  title: 'Islamly',
  description: 'Trusted Islamic knowledge rooted in the Quran and Sunnah',
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon.png?v=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
      </head>
      <body className={`${inter.variable} ${literata.variable}`}>
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
