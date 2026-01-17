import { BookInsert, MapItemInsert } from "./models";

export interface PendingData {
    book: BookInsert;                    // Datos para tabla 'books'
    map_item: Omit<MapItemInsert, 'map_id'>;
}