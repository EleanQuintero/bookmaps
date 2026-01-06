"use server"
import { iaBookmapData } from "@/domain/entities/maps/maps";
import { createBookmap } from "@/services/IA/mocks/iaBookService";



export async function getMockIABookmapData(theme: string): Promise<iaBookmapData> {

    const data = await createBookmap(theme);

    return data;

}
