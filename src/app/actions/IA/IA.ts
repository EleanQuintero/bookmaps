"use server"
import { AIMapResponse } from "@/domain/schemes/maps/bookmap-scheme";
import { aiGeneratorService } from "@/services/IA/maps/bookMapGenService";


export async function getBookMap(theme: string): Promise<AIMapResponse> {

    const generator = aiGeneratorService

    const result = await generator.generateBookMap(theme)

    return result

}
