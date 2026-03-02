'use server';
/**
 * @fileOverview This file defines a Genkit flow for searching the Islamic Knowledge Hub.
 *
 * - searchKnowledgeHub - A function that takes a query and returns relevant information from the hub.
 * - SearchKnowledgeInput - The input type for the searchKnowledgeHub function.
 * - SearchKnowledgeOutput - The return type for the searchKnowledgeHub function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {KNOWLEDGE_HUB} from '@/lib/knowledge-hub';

const SearchKnowledgeInputSchema = z.object({
  query: z.string().describe('The topic or question to search for in the Islamic Knowledge Hub.'),
});
export type SearchKnowledgeInput = z.infer<typeof SearchKnowledgeInputSchema>;

const SearchKnowledgeOutputSchema = z.object({
  answer: z.string().describe('The detailed answer based on the knowledge hub modules.'),
  sourceModule: z.string().optional().describe('The title of the resource used for the answer.'),
  relatedTopics: z.array(z.string()).describe('Other relevant topics for further reading.'),
});
export type SearchKnowledgeOutput = z.infer<typeof SearchKnowledgeOutputSchema>;

const getKnowledgeTool = ai.defineTool(
  {
    name: 'getKnowledge',
    description: 'Retrieves specific information from the Islamic Knowledge Hub based on a keyword.',
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
  tools: [getKnowledgeTool],
  prompt: `You are an AI assistant for "Islamly", a portal for classical Islamic knowledge.
Your goal is to provide accurate, concise, and evidence-based answers using the provided resources.

When a user asks a question:
1. Use the 'getKnowledge' tool to find relevant scholarly topics.
2. If multiple topics are relevant, synthesize them.
3. If no specific topics are found, provide a general answer based on the Salafi methodology (Ahlus-Sunnah wal-Jama'ah) and suggest looking at our library.
4. Always list related topics from the hub that the user might find interesting.

User Question: """{{{query}}}"""
`,
});

export async function searchKnowledgeHub(input: SearchKnowledgeInput): Promise<SearchKnowledgeOutput> {
  const {output} = await searchKnowledgePrompt(input);
  return output!;
}