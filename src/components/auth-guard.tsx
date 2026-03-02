'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * A global authentication guard that protects all routes.
 * Redirects unauthenticated users to /login and authenticated users away from /login.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth state is determined
    if (!isUserLoading) {
      if (!user && pathname !== '/login') {
        // Not signed in and not on login page -> go to login
        router.replace('/login');
      } else if (user && pathname === '/login') {
        // Signed in but on login page -> go to home
        router.replace('/');
      }
    }
  }, [user, isUserLoading, pathname, router]);

  // Show a full-screen loader while the initial auth state is being resolved
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Prevent flicker of protected content while redirecting unauthenticated users
  if (!user && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}
