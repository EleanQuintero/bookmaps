import { PendingData } from "@/domain/entities/models/pendingData";
import { createClient } from "@/lib/supabase/server";
import { MAP_DETAILS_SELECT, MapDetailCollection } from "../querys/getMapQuerys";
import { Bookmap, BookStatus, DBNote } from "@/domain/entities/models/models";

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

        const { data, error: mapError } = await this.supabaseClient
            .from('maps')
            .select(MAP_DETAILS_SELECT)
            .limit(100)
            .order('position', { foreignTable: 'map_items', ascending: true });

        if (mapError) {
            return { data: null, error: mapError }
        }

        const maps = data as MapDetailCollection

        return { data: maps, error: null }

    }

    async getMapById(mapId: string) {

        const { data, error: mapError } = await this.supabaseClient
            .from('maps')
            .select(MAP_DETAILS_SELECT)
            .eq('id', mapId)
            .order('position', { foreignTable: 'map_items', ascending: true })
            .single();


        if (mapError) {
            return { data: null, error: mapError }
        }

        const map = data as Bookmap

        return { data: map, error: null }

    }

    async updateBookStatus(newStatus: BookStatus, bookId: string) {

        const { data, error } = await this.supabaseClient
            .from('map_items')
            .update({ status: newStatus })
            .eq('book_isbn', bookId)
            .select()


        if (error) {
            return {
                data: null, errorMessage: error
            }
        }

        return { data, error: null }

    }

    async addMapItemNote(content: string, map_item_id: string): Promise<{ status: number; data: DBNote }> {
        const { data, status, error } = await this.supabaseClient
            .from('notes')
            .insert({ content: content, map_item_id: map_item_id })
            .select()
            .single();

        if (error || !data) {
            throw new Error(error?.message || 'Failed to add note')
        }

        return { status, data }

    }



}


export async function getSupabaseRepo() {
    const client = await createClient()
    return new SupabaseRepository(client)
}
