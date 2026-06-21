'use server';
/**
 * @fileOverview AI Seerah Narrator flow using Gemini Online.
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

const seerahPrompt = ai.definePrompt({
  name: 'seerahPrompt',
  input: {schema: SeerahNarratorInputSchema},
  output: {schema: SeerahNarratorOutputSchema},
  prompt: `You are an expert historian specializing in the Seerah (Prophetic Biography) and Islamic History, strictly aligned with Salafi/Athari sources.

Focus on:
1. Historical accuracy based on authentic sources (Ibn Hisham, Ibn Kathir, etc.).
2. Emotional depth and storytelling while maintaining absolute respect for the Prophet (PBUH) and his companions (RA).
3. Extracting timeless lessons focused on Tawhid, Sabr, and the Sunnah.

STRICT POLICY:
- Prohibit any fabricated (Mawdu) stories or extreme Sufi exaggerations (Ghuluw).
- Ensure the narrative is free from any sectarian revisionism.

Topic: """{{{topic}}}"""`,
});

export async function narrateSeerah(input: SeerahNarratorInput): Promise<SeerahNarratorOutput> {
  return seerahNarratorFlow(input);
}

const seerahNarratorFlow = ai.defineFlow(
  {
    name: 'seerahNarratorFlow',
    inputSchema: SeerahNarratorInputSchema,
    outputSchema: SeerahNarratorOutputSchema,
  },
  async input => {
    const {output} = await seerahPrompt(input);
    return output!;
  }
);
