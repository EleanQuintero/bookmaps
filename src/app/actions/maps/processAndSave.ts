"use server"
import { AIBookSuggestion, AIMapResponse } from '@/domain/schemes/maps/bookmap-scheme';
import { DEPTH_TARGET, type GeneratorConstraints } from '@/domain/schemes/maps/generator-constraints-scheme';
import { getProcesedBooks } from "@/controllers/books/bookController"
import { mapAIToDomain } from '@/lib/adapters/ai-adapter';
import { requestReplacements } from '@/services/IA/maps/repairService';
import { BookInsert, MapItemInsert } from '@/domain/entities/models/models';
import { PendingData } from '@/domain/entities/models/pendingData';
import { createMap } from '@/services/maps/mapService';
import { createClient } from '@/lib/supabase/server';

const MAX_REPAIR_ROUNDS = 2;
const FLOOR = 3;

// Verifica un libro propuesto por la IA contra Google Books. `position` es placeholder: el repo la renormaliza.
async function processBook(aiBook: AIBookSuggestion): Promise<PendingData | null> {
    try {
        const { searchQuery, pedagogicalContext } = mapAIToDomain(aiBook);
        const googleData = await getProcesedBooks(searchQuery.title);

        if (!googleData) return null;

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
            position: 0,
            status: 'to_read',
            level: pedagogicalContext.level,
            book_value: pedagogicalContext.book_value,
            next_path: pedagogicalContext.next_path
        };

        return { book: pendingBook, map_item: pendingItem };

    } catch (error) {
        console.error(`Error procesando libro ${aiBook.title}:`, error);
        return null;
    }
}

export async function processAndSaveMap(aiResponse: AIMapResponse, constraints: GeneratorConstraints) {
    const startTotal = performance.now();

    // Obtener el usuario autenticado
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('❌ Error de autenticación:', authError);
        return { success: false, error: "You must be signed in to save a map." };
    }

    const userId = user.id;
    const topic = aiResponse.topic;
    const map_description = aiResponse.description;
    const target = DEPTH_TARGET[constraints.depth];

    const startGoogleAPI = performance.now();

    // Procesamos todos en paralelo
    const results = await Promise.all(aiResponse.books.map(processBook));

    const endGoogleAPI = performance.now();
    console.log(`📚 Google API (Paralelo): ${(endGoogleAPI - startGoogleAPI).toFixed(2)}ms`);

    // Dedup por ISBN: dos títulos distintos pueden resolver al mismo ISBN -> violaría UNIQUE(map_id, book_isbn)
    const valid: PendingData[] = [];
    const usedIsbns = new Set<string>();
    for (const result of results) {
        if (result && !usedIsbns.has(result.book.isbn)) {
            valid.push(result);
            usedIsbns.add(result.book.isbn);
        }
    }

    console.log('✅ Total procesados:', valid.length);
    console.log('❌ Total fallidos:', results.length - valid.length);

    // Repair loop: pedimos alternativas a la IA y las re-verificamos con el mismo pipeline de ISBN
    let round = 0;
    while (valid.length < target && round < MAX_REPAIR_ROUNDS) {
        try {
            const needed = target - valid.length;
            const usedTitles = valid.map(v => v.book.title);

            const replacements = await requestReplacements(topic, needed, usedTitles, constraints);
            if (replacements.length === 0) break;

            const processed = await Promise.all(replacements.map(processBook));

            for (const candidate of processed) {
                if (candidate && !usedIsbns.has(candidate.book.isbn)) {
                    valid.push(candidate);
                    usedIsbns.add(candidate.book.isbn);
                }
            }

            round++;
        } catch (error) {
            // Fallo de reparación (Gemini/red) -> degradar: guardar lo verificado, no perder el mapa
            console.error('⚠️ Repair round failed, saving what we have:', error);
            break;
        }
    }

    if (valid.length === 0) {
        return { success: false, error: "We couldn't retrieve information for any of these books." };
    }

    let warning: string | undefined;
    if (valid.length < FLOOR) {
        warning = `We could only verify ${valid.length} book(s) for this path — fewer than we'd like, but we saved it anyway.`;
    } else if (valid.length < target) {
        warning = `We built a shorter path (${valid.length} of ${target} books) — some titles couldn't be verified.`;
    }

    const map_id = await createMap(userId, topic, map_description, valid.slice(0, target))

    const endTotal = performance.now();
    console.log(`⏱️ TOTAL FINAL: ${(endTotal - startTotal).toFixed(2)}ms`);

    return { success: true, mapId: map_id, warning };
}
