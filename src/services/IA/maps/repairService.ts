import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import { aiReplacementResponseSchema, type AIBookSuggestion } from '@/domain/schemes/maps/bookmap-scheme';
import type { GeneratorConstraints } from '@/domain/schemes/maps/generator-constraints-scheme';
import { AI_MODELS } from '../config';
import { LANG_FRAGMENT } from './prompt';

function buildRepairPrompt(topic: string, needed: number, usedTitles: string[], constraints: GeneratorConstraints): string {
    return `The reading path for "${topic}" is short ${needed} book(s) of its target length.

Propose exactly ${needed} real, published, widely-cataloged alternative book(s) that fit this path and belong to a modern ISBN-bearing edition. Never invent a book, author, or edition.
Do not repeat any of these already-used titles: ${usedTitles.join(', ')}.
Prefer book editions in: ${LANG_FRAGMENT[constraints.bookLanguage]}.`;
}

export async function requestReplacements(
    topic: string,
    needed: number,
    usedTitles: string[],
    constraints: GeneratorConstraints
): Promise<AIBookSuggestion[]> {
    const result = await generateText({
        model: google(AI_MODELS.bookmapGeneration),
        prompt: buildRepairPrompt(topic, needed, usedTitles, constraints),
        output: Output.object({ schema: aiReplacementResponseSchema }),
    });

    return result.output.books;
}
