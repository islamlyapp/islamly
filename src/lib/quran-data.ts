/**
 * @fileOverview Utilities for managing Quranic textual signals and variants.
 */

export type QuranAyah = {
  surah: number;
  ayah: number;
  text: string;
  page: number;
};

export type QiraatVariant = {
  surah: number;
  ayah: number;
  variants: Record<string, string>;
};

/**
 * Normalizes Arabic text for baseline comparison.
 * Strips harakat and Quranic marks for pure semantic matching.
 * Uses strictly sorted Unicode ranges to prevent "Range out of order" errors.
 */
export function normalizeQuranicText(text: string): string {
  return text
    // 0610-0615: Small high marks
    // 064B-065E: Standard Harakat (Fatha, Kasra, etc.)
    // 06D6-06DC: Tajweed stop marks
    // 06DF-06E4: Small high marks
    // 06E7-06E8: Small high YEH/NOON
    // 06EA-06ED: Punctuation/Stop marks
    .replace(/[\u0610-\u0615\u064B-\u065E\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, "")
    .trim();
}

/**
 * Returns the correct variant text for a specific Riwayah if it exists.
 */
export function getRiwayahText(
  baseText: string, 
  variants: QiraatVariant[], 
  surah: number, 
  ayah: number, 
  riwayah: string
): string {
  const match = variants.find(v => v.surah === surah && v.ayah === ayah);
  if (match && match.variants[riwayah]) {
    return match.variants[riwayah];
  }
  return baseText;
}
