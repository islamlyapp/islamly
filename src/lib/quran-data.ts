
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
 */
export function normalizeQuranicText(text: string): string {
  return text
    .replace(/[ؐ-ًؕ-ٓۖ-ۜ۟-ۤۥۦۧ-۪ۨ-ۚ]/g, "") // Remove harakat/symbols for simple comparison
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
