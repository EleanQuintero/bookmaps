import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import { aiReplacementResponseSchema, type AIBookSuggestion } from '@/domain/schemes/maps/bookmap-scheme';
import type { GeneratorConstraints } from '@/domain/schemes/maps/generator-constraints-scheme';
import type { BookCandidate } from '@/domain/entities/bookAPI/bookCandidate';
import { AI_MODELS } from '../config';
import { LANG_FRAGMENT, buildCurationPrompt } from './prompt';

function buildRepairPrompt(topic: string, needed: number, usedTitles: string[], constraints: GeneratorConstraints): string {
    return `The reading path for "${topic}" is short ${needed} book(s) of its target length.

Propose exactly ${needed} real, published, widely-cataloged alternative book(s) that fit this path and belong to a modern ISBN-bearing edition. Never invent a book, author, or edition.
Do not repeat any of these already-used titles: ${usedTitles.join(', ')}.
Prefer book editions in: ${LANG_FRAGMENT[constraints.bookLanguage]}.`;
}

// RAG hybrid rescue: `candidates` is a closed, ISBN-verified pool (fetched by the caller via
// bookController.getTopicCandidates — kept out of this service to preserve service->service-only layering).
// Empty pool (quota-hit, no results) falls back to the P2 behavior: ask Gemini for alternative canonical titles.
export async function requestReplacements(
    topic: string,
    needed: number,
    usedTitles: string[],
    constraints: GeneratorConstraints,
    candidates: BookCandidate[] = []
): Promise<AIBookSuggestion[]> {
    const prompt = candidates.length > 0
        ? buildCurationPrompt(topic, candidates, needed, constraints)
        : buildRepairPrompt(topic, needed, usedTitles, constraints);

    const result = await generateText({
        model: google(AI_MODELS.bookmapGeneration),
        prompt,
        output: Output.object({ schema: aiReplacementResponseSchema }),
    });

    return result.output.books;
}
