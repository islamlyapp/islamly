
/**
 * @fileOverview Utility to calculate the dynamic scholarly feature count.
 * Starting at 1 Octillion baseline for the Universal Node.
 */

const LAUNCH_DATE = new Date('2025-02-01T00:00:00Z'); 
const BASE_FEATURES = 1000000000000000000000000000000; // 1 Octillion
const DAILY_INCREASE = 100000000000000000000000000; // 100 Septillion increase daily

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
  if (count >= 1000000000000000000000000000000) {
    return (count / 1000000000000000000000000000000).toFixed(2) + " Octillion";
  }
  if (count >= 1000000000000000000000000000) {
    return (count / 1000000000000000000000000000).toFixed(2) + " Nonillion";
  }
  if (count >= 1000000000000000000000000) {
    return (count / 1000000000000000000000000).toFixed(2) + " Decillion";
  }
  return count.toLocaleString();
}
