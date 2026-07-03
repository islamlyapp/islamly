'use server';
/**
 * @fileOverview Universal AutoMod Infrastructure for scholarly governance.
 *
 * - verifyMethodologyCompliance - Analyzes text for alignment with Salafi/Athari standards.
 * - AutoModInput - Content to be checked.
 * - AutoModOutput - Compliance status and scholarly reasoning.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoModInputSchema = z.object({
  content: z.string().describe('The content or response to be analyzed for methodology compliance.'),
  context: z.string().optional().describe('Optional context (e.g., user question or specific topic).'),
});
export type AutoModInput = z.infer<typeof AutoModInputSchema>;

const AutoModOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether the content aligns with the methodology of the Salaf.'),
  flagLevel: z.enum(['None', 'Low', 'High']).describe('Severity level of any identified issues.'),
  reason: z.string().optional().describe('Explanation for the compliance determination.'),
  flaggedConcepts: z.array(z.string()).optional().describe('Specific concepts flagged (e.g., Bid\'ah, Shirk).'),
  scholarlyCorrection: z.string().optional().describe('The correct scholarly position if non-compliant.'),
});
export type AutoModOutput = z.infer<typeof AutoModOutputSchema>;

const automodPrompt = ai.definePrompt({
  name: 'automodPrompt',
  input: {schema: AutoModInputSchema},
  output: {schema: AutoModOutputSchema},
  prompt: `You are the Islamly Universal AutoMod Node, a scholarly governance engine strictly aligned with Salafi/Athari methodology.

Your task is to analyze the provided content for alignment with authentic creed (Aqidah) and methodology (Manhaj).

STRICT COMPLIANCE CRITERIA:
1. NO validation of Shirk (major or minor).
2. NO validation of Bid'ah (innovations like Mawlid, 15th Sha'ban rituals, etc.).
3. NO validation of extremist (Khariji) or deviant (Sufi/Rafidi/Jahmi) ideologies.
4. All explanations must be rooted in the Quran, Sunnah, and the understanding of the Sahaba.

Content to check: """{{{content}}}"""
Context: {{{context}}}

Analyze the content and provide a compliance report. If not compliant, provide the correct scholarly correction.`,
});

export async function verifyMethodologyCompliance(input: AutoModInput): Promise<AutoModOutput> {
  return automodFlow(input);
}

const automodFlow = ai.defineFlow(
  {
    name: 'automodFlow',
    inputSchema: AutoModInputSchema,
    outputSchema: AutoModOutputSchema,
  },
  async input => {
    const {output} = await automodPrompt(input);
    return output!;
  }
);
