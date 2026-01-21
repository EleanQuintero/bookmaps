"use server"
import { AIMapResponse } from '@/domain/schemes/maps/bookmap-scheme';
import { getProcesedBooks } from "@/controllers/books/bookController"
import { mapAIToDomain } from '@/lib/adapters/ai-adapter';
import { BookInsert, MapItemInsert } from '@/domain/entities/models/models';
import { PendingData } from '@/domain/entities/models/pendingData';
import { createMap } from '@/services/maps/mapService';
import { createClient } from '@/lib/supabase/server';


export async function processAndSaveMap(aiResponse: AIMapResponse) {
    const startTotal = performance.now();

    // Obtener el usuario autenticado
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('❌ Error de autenticación:', authError);
        return { success: false, error: "Usuario no autenticado" };
    }

    const userId = user.id;

    const startGoogleAPI = performance.now();

    // Procesamos todos en paralelo
    const results = await Promise.all(aiResponse.books.map(async (aiBook, index) => {
        try {
            // 1. Mapeo (IA -> Dominio)
            const { searchQuery, pedagogicalContext } = mapAIToDomain(aiBook);

            // 2. Fetch Google (Cacheado)
            const googleData = await getProcesedBooks(searchQuery.title);

            if (!googleData) return null; // Si falla, devolvemos null

            // 3. Preparar objetos para DB (Sin guardar aún)
            const pendingBook: BookInsert = {
                isbn: googleData.isbn,
                google_id: googleData.google_id,
                title: googleData.title,
                author: googleData.author,
                cover_url: googleData.cover_url,
                page_count: googleData.page_count,
                published_date: googleData.published_date,
                description: googleData.description
            };

            const pendingItem: Omit<MapItemInsert, 'map_id'> = {
                book_isbn: googleData.isbn,
                position: index + 1,
                status: 'to_read',
                // Contexto pedagógico de la IA
                level: pedagogicalContext.level,
                book_value: pedagogicalContext.book_value,
                next_path: pedagogicalContext.next_path
            };

            // Retornamos el paquete listo
            return { book: pendingBook, map_item: pendingItem };

        } catch (error) {
            console.error(`Error procesando libro ${aiBook.title}:`, error);
            return null;
        }
    }));

    const endGoogleAPI = performance.now();
    console.log(`📚 Google API (Paralelo): ${(endGoogleAPI - startGoogleAPI).toFixed(2)}ms`);


    // Aquí usamos el PREDICADO DE TIPO para que TS sepa que 'validResults' es PendingData[]
    const validResults = results.filter((result): result is PendingData => result !== null);

    const failedCount = results.length - validResults.length;

    console.log('✅ Total procesados:', validResults.length);
    console.log('❌ Total fallidos:', failedCount);

    if (validResults.length === 0) {
        return { success: false, error: "No se pudo obtener información de ningún libro." };
    }



    const topic = aiResponse.topic
    const map_description = aiResponse.description

    const map_id = await createMap(userId, topic, map_description, validResults)

    const endTotal = performance.now();
    console.log(`⏱️ TOTAL FINAL: ${(endTotal - startTotal).toFixed(2)}ms`);

    return { success: true, mapId: map_id };
}
