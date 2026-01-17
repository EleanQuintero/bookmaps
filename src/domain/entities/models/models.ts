import { Database } from '@/domain/db/db_types'; // Asegúrate que la ruta sea correcta

// 1. Tipos que vienen de las filas de supabase
export type BookRow = Database['public']['Tables']['books']['Row'];
export type MapItemRow = Database['public']['Tables']['map_items']['Row'];
export type MapRow = Database['public']['Tables']['maps']['Row'];

// 2. Tipos de insercion que espera supabase
export type BookInsert = Database['public']['Tables']['books']['Insert'];
export type MapItemInsert = Database['public']['Tables']['map_items']['Insert'];



// 2. ENTIDAD LIBRO (Reemplaza a tu antiguo 'Book' genérico)
// Usamos la definición de la DB. Automáticamente tiene 'isbn', 'cover_url', etc.
export type Book = BookRow;

// 3. ENTIDAD ITEM DE MAPA (La unión M:M)
// Esta es la entidad más importante para tu UI.
// Combina la info de la posición/notas con la info del libro (título, portada).
export interface MapItemWithBook extends MapItemRow {
    // Aquí "hidratamos" la relación. 
    // Supabase nos devolverá el objeto libro dentro del item al hacer el join.
    book: BookRow;
}

// 4. ENTIDAD MAPA COMPLETO (Reemplaza a tu antiguo 'Bookmap')
export interface LearningMap extends MapRow {
    // En lugar de 'books: Book[]', ahora es más preciso:
    items: MapItemWithBook[];
}