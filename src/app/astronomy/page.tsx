'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Astro section excised from production manifest.
 */
export default function AstronomyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);
  return null;
}
