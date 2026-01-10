"use server"
import { iaBookmapData } from "@/domain/entities/maps/maps";
import { aiGeneratorService } from "@/services/IA/maps/bookMapGenService";
import { createBookmap } from "@/services/IA/mocks/iaBookService";



export async function getMockIABookmapData(theme: string): Promise<iaBookmapData> {

    const data = await createBookmap(theme);

    return data;

}

export async function getBookMap(theme: string): Promise<iaBookmapData> {

    const generator = aiGeneratorService

    const result = await generator.generateBookMap(theme)

    console.log(result)

    return result

}
