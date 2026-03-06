
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { GlobalHeader } from '@/components/layout/global-header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthGuard } from '@/components/auth-guard';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://islamly.uk'),
  title: 'Islamly - Universal Scholarly Infrastructure',
  description: 'AI-powered recitation correction, authentic scholarly index, and the 10 canonical Qira\'at. Built for the global Ummah upon the methodology of the Salaf.',
  applicationName: 'Islamly',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Islamly',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Islamly',
    title: 'Islamly - Authentic Islamic Knowledge',
    description: 'Universal platform for authentic Islamic knowledge and AI-driven recitation feedback.',
    url: 'https://islamly.uk',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamly',
    description: 'AI-powered Islamic Knowledge Platform for the Global Ummah.',
    site: '@islamly_uk',
  },
  other: {
    copyright: '© 2025 Islamly. All Rights Reserved.',
  }
};

export const viewport: Viewport = {
  themeColor: '#0a0304',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,400&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased min-h-screen pt-safe overflow-x-hidden selection:bg-primary/30 pb-20 md:pb-0">
        <FirebaseClientProvider>
          <AuthGuard>
            <div className="min-h-screen flex flex-col">
              <GlobalHeader />
              <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
                {children}
              </main>
              <BottomNav />
            </div>
            <Toaster />
          </AuthGuard>
        </FirebaseClientProvider>
        <footer className="hidden md:block py-6 text-center border-t border-white/5 opacity-40">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold">
            © 2025 Islamly • Universal Scholarly Infrastructure • All Rights Reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
