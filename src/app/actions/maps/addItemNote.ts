"use server"
import { addNote } from "@/services/maps/mapService"


export async function addItemNote(content: string, map_item_id: string, map_id: string) {

    const { data, status } = await addNote(content, map_item_id)

    return { data, status }

}