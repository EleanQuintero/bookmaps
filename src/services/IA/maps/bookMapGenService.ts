import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import { aiMapResponseSchema } from "@/domain/schemes/maps/bookmap-scheme"
import type { GeneratorConstraints } from "@/domain/schemes/maps/generator-constraints-scheme"
import { systemPrompt, buildUserPrompt } from './prompt';
import { AI_MODELS } from '../config';

class MapGeneratorService {

    async generateBookMap(theme: string, constraints: GeneratorConstraints) {

        const result = await generateText({
            model: google(AI_MODELS.bookmapGeneration),
            prompt: buildUserPrompt(theme, constraints),
            system: systemPrompt,
            output: Output.object({ schema: aiMapResponseSchema })

        })

        return result.output

    }

}

export const aiGeneratorService = new MapGeneratorService();