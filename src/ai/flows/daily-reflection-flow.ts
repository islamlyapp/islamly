'use server';
/**
 * @fileOverview A flow to generate a daily spiritual reflection based on authentic sources.
 *
 * - generateDailyReflection - Generates a brief reflection.
 * - DailyReflectionOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyReflectionOutputSchema = z.object({
  reflection: z.string().describe('A brief, impactful spiritual reflection.'),
  source: z.string().describe('The reference (Quran or Hadith) that inspired the reflection.'),
  arabicText: z.string().optional().describe('The Arabic text of the source.'),
});
export type DailyReflectionOutput = z.infer<typeof DailyReflectionOutputSchema>;

export async function generateDailyReflection(): Promise<DailyReflectionOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: {schema: DailyReflectionOutputSchema},
    prompt: `You are a scholarly assistant specializing in Tazkiyah (purification of the soul) based on the Quran and Sunnah. 
Generate a unique, brief spiritual reflection for a student of knowledge.

STRICT ADHERENCE:
- The reflection must be based strictly on the Quran or authentic Hadith (Ahlus-Sunnah).
- Absolutely NO Sufi-influenced innovations (Bid'ah) or philosophical over-rationalization.
- Focus on pure Tawhid (Monotheism) and the Sunnah.
- Provide the Arabic text of the source if applicable.

Focus on themes like: Gratitude (Shukr), Patience (Sabr), Sincerity (Ikhlas), or Reliance on Allah (Tawakkul).`,
  });
  return output!;
}
