import { PendingData } from "@/domain/entities/models/pendingData";
import { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>



class SupabaseRepository {

    constructor(private supabaseClient: SupabaseClient) { }

    async createMap(userId: string, topic: string, mapDescription: string, validResults: PendingData[]): Promise<string> {
        //Creamos mapa en la base de datos: 

        const { data: map, error: mapError } = await this.supabaseClient
            .from('maps')
            .insert({
                user_id: userId,
                title: topic,
                description: mapDescription
            })
            .select('id')
            .single();

        if (mapError || !map) throw new Error("Error creando el mapa en DB");

        // Insertamos todos los libros en la DB
        const booksPayload = validResults.map(r => r.book);
        await this.supabaseClient.from('books').upsert(booksPayload, { onConflict: 'isbn' });

        // Insertamos todos los items

        const itemsPayload = validResults.map(validResult => ({
            ...validResult.map_item,
            map_id: map.id // Aquí inyectamos el ID del mapa recién creado
        }));
        await this.supabaseClient.from('map_items').insert(itemsPayload);

        return map.id

    }

}

export async function getSupabaseRepo() {
    const client = await createClient()
    return new SupabaseRepository(client)
}
