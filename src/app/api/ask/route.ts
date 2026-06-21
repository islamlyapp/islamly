import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeHub, type SearchKnowledgeOutput } from '@/ai/flows/search-knowledge-flow';
import { verifyMethodologyCompliance } from '@/ai/flows/automod-flow';

type AskRequestBody = {
  query?: string;
};

type AskResponseBody = {
  answer: string;
  meta: SearchKnowledgeOutput;
  moderation: {
    isCompliant: boolean;
    flagLevel?: string;
    reason?: string;
    flaggedConcepts?: string[];
    scholarlyCorrection?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AskRequestBody;
    const query = body?.query?.trim();

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const result = await searchKnowledgeHub({ query });
    const moderation = await verifyMethodologyCompliance({ content: result.answer, context: query });

    const answer = moderation.isCompliant
      ? result.answer
      : moderation.scholarlyCorrection || result.answer;

    const response: AskResponseBody = {
      answer,
      meta: result,
      moderation,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Ask API error:', error);
    return NextResponse.json(
      { error: 'Unable to process the request at this time.' },
      { status: 500 }
    );
  }
}
