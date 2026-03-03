'use server';
/**
 * @fileOverview Expanded AI Mualim Feedback flow for Quran, Hadith, and Mutoon.
 *
 * - provideRecitationFeedback - Analyzes recitation text and provides Tajweed/Hifz feedback.
 * - MualimFeedbackInput - Input schema.
 * - MualimFeedbackOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MualimFeedbackInputSchema = z.object({
  category: z.enum(['Quran', 'Hadith', 'Mutoon']).describe('The category of the text being recited.'),
  textReference: z.string().describe('The reference of the text (e.g., Surah 1:1, Hadith 1, or Text Name).'),
  transcription: z.string().describe('The transcribed text of the user\'s recitation.'),
});
export type MualimFeedbackInput = z.infer<typeof MualimFeedbackInputSchema>;

const MualimFeedbackOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the recitation was accurate.'),
  feedback: z.string().describe('Detailed feedback on accuracy, pronunciation, or flow.'),
  corrections: z.array(z.string()).describe('Specific words or phrases that need improvement.'),
  encouragement: z.string().describe('A motivating message from the AI Teacher.'),
});
export type MualimFeedbackOutput = z.infer<typeof MualimFeedbackOutputSchema>;

export async function provideRecitationFeedback(input: MualimFeedbackInput): Promise<MualimFeedbackOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: {schema: MualimFeedbackOutputSchema},
    prompt: `You are Al-Mualim, an expert Islamic Teacher specializing in Hifz (memorization) and recitation.
You are listening to a student recite a text from the category: {{{category}}}.
The specific reference is: {{{textReference}}}.
The transcribed text of their recitation is: """{{{transcription}}}"""

Your task:
1. Compare the transcription to the known correct text of the reference.
2. If it's Quran, focus on Tajweed rules (Makharij, Sifat) and word accuracy.
3. If it's Hadith or Mutoon, focus on verbatim accuracy and proper flow of the classical Arabic text.
4. Provide constructive, respectful, and highly encouraging feedback in English.
5. List specific corrections if words were missed or mispronounced.

STRICT POLICY: 
- Maintain absolute respect for the sacred texts.
- Encourage the student even if they make many mistakes.`,
  });
  return output!;
}
