import { AIBookSuggestion } from '@/domain/schemes/maps/bookmap-scheme';
import { Database } from '@/domain/db/db_types';

// Tipos auxiliares para claridad
type MapItemInsert = Database['public']['Tables']['map_items']['Insert'];

export interface ProcessedAIContext {
    searchQuery: {
        title: string;
        author: string;
    };
    pedagogicalContext: Pick<MapItemInsert, 'level' | 'book_value' | 'next_path'>;
}

export function mapAIToDomain(aiBook: AIBookSuggestion): ProcessedAIContext {
    return {
        // 1. Datos para encontrar el libro real (Google)
        searchQuery: {
            title: aiBook.title,
            author: aiBook.author,
        },

        // 2. Datos pedagógicos para ubicar el libro en el mapa
        pedagogicalContext: {
            level: aiBook.level,
            book_value: aiBook.book_value,
            next_path: aiBook.next_path,
        }
    };
}