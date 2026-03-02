'use server';
/**
 * @fileOverview Enhanced flow for searching verified scholarly information.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {KNOWLEDGE_HUB} from '@/lib/knowledge-hub';

const SearchKnowledgeInputSchema = z.object({
  query: z.string().describe('The topic or question to search for.'),
});
export type SearchKnowledgeInput = z.infer<typeof SearchKnowledgeInputSchema>;

const SearchKnowledgeOutputSchema = z.object({
  answer: z.string().describe('The detailed answer based on verified sources.'),
  sourceModule: z.string().optional().describe('The reference used for the answer.'),
  relatedTopics: z.array(z.string()).describe('Other relevant topics for further reading.'),
});
export type SearchKnowledgeOutput = z.infer<typeof SearchKnowledgeOutputSchema>;

const getScholarlyData = ai.defineTool(
  {
    name: 'getScholarlyData',
    description: 'Retrieves information from verified scholarly modules based on a topic.',
    inputSchema: z.object({ keyword: z.string() }),
    outputSchema: z.array(z.object({
      title: z.string(),
      summary: z.string(),
      details: z.string(),
      category: z.string(),
    })),
  },
  async (input) => {
    return KNOWLEDGE_HUB.filter(m => 
      m.title.toLowerCase().includes(input.keyword.toLowerCase()) || 
      m.category.toLowerCase().includes(input.keyword.toLowerCase()) ||
      m.summary.toLowerCase().includes(input.keyword.toLowerCase())
    ).map(({ title, summary, details, category }) => ({ title, summary, details, category }));
  }
);

const searchKnowledgePrompt = ai.definePrompt({
  name: 'searchKnowledgePrompt',
  input: {schema: SearchKnowledgeInputSchema},
  output: {schema: SearchKnowledgeOutputSchema},
  tools: [getScholarlyData],
  prompt: `You are a verified scholarly assistant.
Your goal is to provide accurate, evidence-based answers using our verified data modules.

When a user asks a question:
1. Use 'getScholarlyData' to find relevant information from our knowledge base.
2. Synthesize the findings into a clear, respectful answer.
3. If no specific match is found, provide a general answer based on established scholarly understanding (Ahlus-Sunnah).
4. List related topics for further reading.

User Question: """{{{query}}}"""
`,
});

export async function searchKnowledgeHub(input: SearchKnowledgeInput): Promise<SearchKnowledgeOutput> {
  const {output} = await searchKnowledgePrompt(input);
  return output!;
}
