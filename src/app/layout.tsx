import type { Metadata } from 'next';
import { Inter, Literata } from 'next/font/google';
import './globals.css';
import GlobalHeader from '@/components/layout/global-header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });

export const metadata: Metadata = {
  title: 'Islamly',
  description: 'High-fidelity scholarly infrastructure for the Ummah',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${literata.variable}`}>
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
