import { getSupabaseRepo } from "@/infrastructure/repositories/SupabaseRepo";
import { PendingData } from "@/domain/entities/models/pendingData";
import { BookStatus } from "@/domain/entities/models/models";

export async function createMap(userId: string, topic: string, map_description: string, validResults: PendingData[]) {

    const supabaseRepo = await getSupabaseRepo();

    const map_id = await supabaseRepo.createMap(userId, topic, map_description, validResults);

    return map_id
}

export async function getMaps() {

    const supabaseRepo = await getSupabaseRepo();

    const maps = await supabaseRepo.getMaps()

    return maps


}

export async function getMapById(mapId: string) {
    const supabaseRepo = await getSupabaseRepo();

    const maps = await supabaseRepo.getMapById(mapId)

    return maps
}

export async function deleteMap(mapId: string, userId: string) {
    const supabaseRepo = await getSupabaseRepo()

    const { data, status } = await supabaseRepo.deleteMap(mapId, userId)

    return { data, status }
}


export async function updateItemStatus(status: BookStatus, isbn: string) {
    const supabaseRepo = await getSupabaseRepo();

    const result = await supabaseRepo.updateBookStatus(status, isbn)

    return result
}

export async function addNote(content: string, map_item_id: string) {

    const supabaseRepo = await getSupabaseRepo()

    const { status, data } = await supabaseRepo.addMapItemNote(content, map_item_id)



    return { status, data }



}

export async function deleteNote(noteId: string) {

    const supabaseRepo = await getSupabaseRepo()
    const { status, data } = await supabaseRepo.deleteItemNote(noteId)

    return { status, data }

}