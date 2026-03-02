import type {Metadata, Viewport} from 'next';
import './globals.css';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Islamly - Classical Islamic Knowledge',
  description: 'Curated collection of classical Islamic texts and scholarly works aligned with the Salafi methodology.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Islamly',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a0508',
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
      </head>
      <body className="font-body antialiased min-h-screen pb-safe-offset-24 md:pb-0 md:pl-0 overflow-x-hidden selection:bg-primary/30">
        <FirebaseClientProvider>
          <main className="max-w-4xl mx-auto px-4 py-8 pb-32 md:pb-8">
            {children}
          </main>
          <BottomNav />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
