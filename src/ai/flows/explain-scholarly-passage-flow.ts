'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining complex scholarly passages.
 *
 * - explainScholarlyPassage - A function that takes a scholarly passage and returns a simplified explanation.
 * - ExplainScholarlyPassageInput - The input type for the explainScholarlyPassage function.
 * - ExplainScholarlyPassageOutput - The return type for the explainScholarlyPassage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainScholarlyPassageInputSchema = z.object({
  scholarlyPassage: z
    .string()
    .describe(
      'A complex scholarly passage from an Islamic text that needs simplification or contextual explanation.'
    ),
});
export type ExplainScholarlyPassageInput = z.infer<
  typeof ExplainScholarlyPassageInputSchema
>;

const ExplainScholarlyPassageOutputSchema = z.object({
  explanation: z
    .string()
    .describe(
      'A simplified explanation or contextual details for the provided scholarly passage.'
    ),
});
export type ExplainScholarlyPassageOutput = z.infer<
  typeof ExplainScholarlyPassageOutputSchema
>;

export async function explainScholarlyPassage(
  input: ExplainScholarlyPassageInput
): Promise<ExplainScholarlyPassageOutput> {
  return explainScholarlyPassageFlow(input);
}

const explainScholarlyPassagePrompt = ai.definePrompt({
  name: 'explainScholarlyPassagePrompt',
  input: {schema: ExplainScholarlyPassageInputSchema},
  output: {schema: ExplainScholarlyPassageOutputSchema},
  prompt: `You are an expert in classical Islamic texts and an excellent educator, strictly following the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah).

STRICT POLICY:
- You must NOT validate or simplify any passages that promote Shirk (polytheism) or Bid'ah (innovation).
- If the passage contains errors in creed (Aqidah) or methodology (Manhaj), you must clarify the correct position according to the Quran and Sunnah.
- Your explanation should be clear, concise, and focused on helping a student understand the text through the lens of pure Tawhid.

Here is the scholarly passage:

Passage: """{{{scholarlyPassage}}}"""

Provide a simplified explanation or contextual details for the passage above. Focus on making it understandable for someone studying the text while ensuring it aligns with correct beliefs.
`,
});

const explainScholarlyPassageFlow = ai.defineFlow(
  {
    name: 'explainScholarlyPassageFlow',
    inputSchema: ExplainScholarlyPassageInputSchema,
    outputSchema: ExplainScholarlyPassageOutputSchema,
  },
  async input => {
    const {output} = await explainScholarlyPassagePrompt(input);
    return output!;
  }
);
