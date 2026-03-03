import type {Metadata, Viewport} from 'next';
import './globals.css';
import { GlobalHeader } from '@/components/layout/global-header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthGuard } from '@/components/auth-guard';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Islamly - Authentic Scholarly Infrastructure',
  description: 'AI-powered recitation correction, memorization tracking, and a curated collection of classical Islamic texts. Built for the global Ummah.',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamly',
    description: 'AI-powered Islamic Knowledge Platform for the Global Ummah.',
  },
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
      </body>
    </html>
  );
}
