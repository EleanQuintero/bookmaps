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

        if (mapError || !map) {
            throw new Error(`Error creando el mapa en DB: ${mapError?.message || 'Sin detalles'}`);
        }

        // Insertamos todos los libros en la DB
        const booksPayload = validResults.map(r => r.book);
        const { error: booksError } = await this.supabaseClient.from('books').upsert(booksPayload, { onConflict: 'isbn' });
        if (booksError) {
            throw new Error(`Error insertando libros: ${booksError.message}`);
        }
        console.log('✅ Books insertados correctamente');

        // Insertamos todos los items

        const itemsPayload = validResults.map(validResult => ({
            ...validResult.map_item,
            map_id: map.id // Aquí inyectamos el ID del mapa recién creado
        }));
        const { error: itemsError } = await this.supabaseClient.from('map_items').insert(itemsPayload);
        if (itemsError) {
            throw new Error(`Error insertando items: ${itemsError.message}`);
        }

        return map.id

    }

    async getMaps() {

        const { data: maps, error: mapError } = await this.supabaseClient
            .from('maps')
            .select(`
    id,
    user_id,
    title,
    description,
    map_items (
      id,
      position,
      status,
      personal_notes,
      books (
        isbn,
        title,
        author,
        cover_url,
        description
      )
    )
  `)
            .limit(100)
            .order('position', { foreignTable: 'map_items', ascending: true });

        if (mapError) {
            return { data: null, error: mapError }
        }

        return { data: maps, error: null }

    }
}

export async function getSupabaseRepo() {
    const client = await createClient()
    return new SupabaseRepository(client)
}
