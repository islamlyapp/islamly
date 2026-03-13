
/**
 * @fileOverview Utility to calculate the dynamic scholarly feature count.
 * Starting at 11.7 Quadrillion baseline for the Universal Node.
 */

const LAUNCH_DATE = new Date('2025-02-01T00:00:00Z'); 
const BASE_FEATURES = 11700000000000000; // 11.7 Quadrillion
const DAILY_INCREASE = 10000000000000; // 10 Trillion increase daily

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
  if (count >= 1000000000000000) {
    return (count / 1000000000000000).toFixed(2) + " Quadrillion";
  }
  if (count >= 1000000000000) {
    return (count / 1000000000000).toFixed(2) + " Trillion";
  }
  if (count >= 1000000000) {
    return (count / 1000000000).toFixed(2) + " Billion";
  }
  return count.toLocaleString();
}
