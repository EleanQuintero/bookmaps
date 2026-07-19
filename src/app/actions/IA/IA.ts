"use server"
import { AIMapResponse } from "@/domain/schemes/maps/bookmap-scheme";
import type { GeneratorConstraints } from "@/domain/schemes/maps/generator-constraints-scheme";
import { aiGeneratorService } from "@/services/IA/maps/bookMapGenService";


export async function getBookMap(theme: string, constraints: GeneratorConstraints): Promise<AIMapResponse> {

    const generator = aiGeneratorService

    const result = await generator.generateBookMap(theme, constraints)

    return result

}
