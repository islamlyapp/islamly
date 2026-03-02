
'use server';
/**
 * @fileOverview AI Seerah Narrator flow.
 *
 * - narrateSeerah - Generates a compelling narrative of Prophetic biography events.
 * - SeerahNarratorInput - Input schema.
 * - SeerahNarratorOutput - Output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeerahNarratorInputSchema = z.object({
  topic: z.string().describe('The historical event, person, or battle from the Seerah to narrate.'),
});
export type SeerahNarratorInput = z.infer<typeof SeerahNarratorInputSchema>;

const SeerahNarratorOutputSchema = z.object({
  title: z.string().describe('The title of the narrative.'),
  narrative: z.string().describe('A compelling, accurate historical narrative.'),
  lessons: z.array(z.string()).describe('Key spiritual or practical lessons from this event.'),
  references: z.array(z.string()).describe('Classical sources (e.g., Ibn Hisham, Ar-Raheeq Al-Makhtum).'),
});
export type SeerahNarratorOutput = z.infer<typeof SeerahNarratorOutputSchema>;

export async function narrateSeerah(input: SeerahNarratorInput): Promise<SeerahNarratorOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    output: {schema: SeerahNarratorOutputSchema},
    prompt: `You are an expert historian specializing in the Seerah (Prophetic Biography) and Islamic History.
Your goal is to provide a compelling, respectful, and highly accurate narrative about the following topic: {{{topic}}}.

Focus on:
1. Historical accuracy based on authentic sources (Ahlus-Sunnah).
2. Emotional depth and storytelling while maintaining absolute respect.
3. Extracting timeless lessons for modern students of knowledge.

Topic: """{{{topic}}}"""`,
  });
  return output!;
}
