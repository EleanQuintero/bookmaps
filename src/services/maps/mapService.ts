import { getSupabaseRepo } from "@/infrastructure/repositories/SupabaseRepo";
import { PendingData } from "@/domain/entities/models/pendingData";

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