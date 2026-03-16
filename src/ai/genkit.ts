import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Universal Genkit AI Node
 * Synchronized with Google Gemini 2.5 Flash.
 * Securely retrieves the API key from environment variables.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
