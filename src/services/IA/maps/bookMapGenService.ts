import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';
import { aiMapResponseSchema } from "@/domain/schemes/maps/bookmap-scheme"
import { systemPrompt } from './prompt';

class MapGeneratorService {

    async generateBookMap(theme: string) {

        const result = await generateText({
            model: google('gemini-2.0-flash'),
            prompt: `Genera una ruta de aprendizaje incremental sobre: ${theme}`,
            system: systemPrompt,
            output: Output.object({ schema: aiMapResponseSchema })

        })

        return result.output

    }

}

export const aiGeneratorService = new MapGeneratorService();