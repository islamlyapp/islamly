
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
 * Uses strictly sorted Unicode escapes to prevent character class range errors.
 */
export function normalizeQuranicText(text: string): string {
  if (!text) return "";
  // Strictly sorted Unicode ranges for Arabic diacritics and decorative marks:
  // \u0610-\u061A (Small high signs), \u064B-\u065F (Harakat), \u0670 (Superscript Alef), 
  // \u06D6-\u06DC (Small high ligatures), \u06DF-\u06E4 (Small high symbols), 
  // \u06E7-\u06E8 (Small high signs), \u06EA-\u06ED (Small low signs)
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
