import { Database } from '@/domain/db/db_types'; // Asegúrate que la ruta sea correcta

// 1. Tipos que vienen de las filas de supabase
export type BookRow = Database['public']['Tables']['books']['Row'];
export type MapItemRow = Database['public']['Tables']['map_items']['Row'];
export type BookStatus = MapItemRow['status'];
export type MapRow = Database['public']['Tables']['maps']['Row'];

// 2. Tipos de insercion que espera supabase
export type BookInsert = Database['public']['Tables']['books']['Insert'];
export type MapItemInsert = Database['public']['Tables']['map_items']['Insert'];

export type NoteInsert = Database['public']['Tables']['notes']['Insert']
export type NoteUpdate = Database['public']['Tables']['notes']['Update']


// 2. ENTIDAD LIBRO (Reemplaza a tu antiguo 'Book' genérico)
// Usamos la definición de la DB. Automáticamente tiene 'isbn', 'cover_url', etc.
export type Book = BookRow;
export type DBNote = Database['public']['Tables']['notes']['Row']
export type Note = Omit<DBNote, 'map_item_id'>

// 3. ENTIDAD ITEM DE MAPA (La unión M:M)
export interface MapItem extends Pick<MapItemRow, 'id' | 'position' | 'status'> {
    books: Pick<BookRow, 'isbn' | 'title' | 'author' | 'cover_url' | 'description'>;
    notes: Note[];
}

// 4. ENTIDAD MAPA COMPLETO (Reemplaza a tu antiguo 'Bookmap')
export interface Bookmap extends Omit<MapRow, 'created_at'> {
    map_items: MapItem[];
}
