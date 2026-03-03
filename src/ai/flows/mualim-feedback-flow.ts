'use server';
/**
 * @fileOverview AI Mualim Recitation Feedback flow.
 *
 * - provideRecitationFeedback - Analyzes recitation text (simulated audio transcription) and provides Tajweed/Hifz feedback.
 * - MualimFeedbackInput - Input schema.
 * - MualimFeedbackOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MualimFeedbackInputSchema = z.object({
  verseKey: z.string().describe('The verse being recited (e.g., 1:1).'),
  transcription: z.string().describe('The transcribed text of the user\'s recitation.'),
});
export type MualimFeedbackInput = z.infer<typeof MualimFeedbackInputSchema>;

const MualimFeedbackOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the recitation was accurate.'),
  feedback: z.string().describe('Detailed feedback on Tajweed or pronunciation.'),
  corrections: z.array(z.string()).describe('Specific words that need improvement.'),
  encouragement: z.string().describe('A motivating message from the AI Teacher.'),
});
export type MualimFeedbackOutput = z.infer<typeof MualimFeedbackOutputSchema>;

export async function provideRecitationFeedback(input: MualimFeedbackInput): Promise<MualimFeedbackOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: {schema: MualimFeedbackOutputSchema},
    prompt: `You are Al-Mualim, an expert Quran Teacher specializing in Tajweed and Hifz.
You are listening to a student recite the following verse: {{{verseKey}}}.
The transcribed text of their recitation is: """{{{transcription}}}"""

Compare the transcription to the known correct text of the verse.
Provide constructive, respectful, and encouraging feedback.
If there are errors in pronunciation or omitted words, list them clearly.

Focus on:
1. Accuracy of Hifz (memorization).
2. Guidance on Tajweed (Makharij, Sifat).
3. Encouragement for the student.`,
  });
  return output!;
}
