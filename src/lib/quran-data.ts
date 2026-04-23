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
  if (!text) return "";
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g, "")
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
