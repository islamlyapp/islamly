
'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SplashScreen } from '@/components/splash-screen';

/**
 * A global authentication guard that protects all routes.
 * Redirects unauthenticated users to /login and authenticated users away from /login.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading, userError } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [forceProceed, setForceProceed] = useState(false);

  // Secondary Fail-Safe: If the app is stuck in "loading" for more than 4 seconds,
  // we force the proceed state to allow the user to see the UI.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUserLoading) {
        console.warn("AuthGuard: Safety override triggered. Rendering UI.");
        setForceProceed(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isUserLoading]);

  useEffect(() => {
    // If auth state is determined
    if (!isUserLoading || forceProceed) {
      if (!user && pathname !== '/login') {
        // Not signed in and not on login page -> go to login
        router.replace('/login');
      } else if (user && pathname === '/login') {
        // Signed in but on login page -> go to home
        router.replace('/');
      }
    }
  }, [user, isUserLoading, forceProceed, pathname, router]);

  // Show the professional splash screen while the initial auth state is being resolved
  if (isUserLoading && !forceProceed) {
    return <SplashScreen />;
  }

  // If there's a serious auth error, we still want to let the user see the login page
  if (userError && pathname !== '/login') {
    router.replace('/login');
    return null;
  }

  // Prevent flicker of protected content while redirecting unauthenticated users
  if (!user && pathname !== '/login' && !forceProceed) {
    return null;
  }

  return <>{children}</>;
}
