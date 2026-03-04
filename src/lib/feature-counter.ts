/**
 * @fileOverview Utility to calculate the dynamic scholarly feature count.
 * Starting at 2.5 Billion on "Release", adding 10 Billion every day.
 */

const LAUNCH_DATE = new Date('2025-02-01T00:00:00Z'); // Fixed baseline for the calculation
const BASE_FEATURES = 2500000000;
const DAILY_INCREASE = 10000000000;

/**
 * Calculates the current number of features based on the elapsed time since launch.
 */
export function calculateCurrentFeatures(): number {
  const now = new Date();
  const diffTime = Math.max(0, now.getTime() - LAUNCH_DATE.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return BASE_FEATURES + (diffDays * DAILY_INCREASE);
}

/**
 * Formats the feature count into a readable scholarly string.
 */
export function formatFeatureCount(count: number): string {
  if (count >= 1000000000000) {
    return (count / 1000000000000).toFixed(2) + " Quadrillion";
  }
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(2) + " Billion";
  }
  return count.toLocaleString();
}
