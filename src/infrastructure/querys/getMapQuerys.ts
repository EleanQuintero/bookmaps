// src/domain/db/queries/maps.ts

// 1. Importamos tipos base (Solo para inferencia, no afecta al runtime)
import { type SupabaseClient, QueryData } from '@supabase/supabase-js';
import { Database } from '@/domain/db/db_types';

// 2. Definimos la Query String (Reutilizable)
export const MAP_DETAILS_SELECT = `
    id,
    user_id,
    title,
    description,
    is_public,
    map_items (
        id,
        position,
        status,
        books (
            isbn,
            title,
            author,
            cover_url,
            description
        ),
            notes (
            id,
            content,
            created_at,
            updated_at
        )
    )
`;

// 3. Función "Fantasma" para TypeScript
// Usamos SupabaseClient<Database> para que sepa las tablas de TU proyecto
const mapQueryBuilder = (client: SupabaseClient<Database>) =>
    client.from('maps').select(MAP_DETAILS_SELECT);

// 4. Exportamos el Tipo Resultante
// [0] extrae el tipo de un objeto individual (útil para .single())
export type MapDetailCollection = QueryData<ReturnType<typeof mapQueryBuilder>>;
export type MapDetail = MapDetailCollection[0];

// 5. Select público (sin notes) — ruta /share/[id], defensa en profundidad
// contra fugas de notas a nivel de query shape.
export const PUBLIC_MAP_SELECT = `
    id,
    user_id,
    title,
    description,
    is_public,
    map_items (
        id,
        position,
        status,
        books (
            isbn,
            title,
            author,
            cover_url,
            description
        )
    )
`;

const publicMapQueryBuilder = (client: SupabaseClient<Database>) =>
    client.from('maps').select(PUBLIC_MAP_SELECT);

export type PublicMapDetailCollection = QueryData<ReturnType<typeof publicMapQueryBuilder>>;
export type PublicMapDetail = PublicMapDetailCollection[0];