import { getBooks } from "@/services/books/bookService";
import { BookAPIRes } from "@/domain/entities/bookAPI/bookResponse";
import { BookInsert } from "@/domain/entities/models/models";


export async function getProcesedBooks(titleToSearch: string): Promise<BookInsert | null> {
    try {

        const rawData: BookAPIRes = await getBooks(titleToSearch);

        if (!rawData.items || rawData.items.length === 0) {
            console.warn(`⚠️ Google Books: No se encontraron resultados para: "${titleToSearch}"`);
            return null;
        }

        const volume = rawData.items[0];
        const info = volume.volumeInfo;

        // 2. Extracción de ISBN (Prioridad: ISBN_13 > ISBN_10 > Cualquiera)
        const identifiers = info.industryIdentifiers || [];
        const isbnObj = identifiers.find(id => id.type === 'ISBN_13')
            || identifiers.find(id => id.type === 'ISBN_10')
            || identifiers[0];

        if (!isbnObj) {
            console.warn(`⚠️ El libro "${info.title}" no tiene ISBN válido. Omitiendo.`);
            return null;
        }

        let coverUrl = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null;
        if (coverUrl && coverUrl.startsWith('http:')) {
            coverUrl = coverUrl.replace('http:', 'https:');
        }


        const publishedDateStr = info.publishedDate ? String(info.publishedDate) : null;

        // 5. Construcción del objeto final (Mapeo a Snake Case)
        const procesedBook: BookInsert = {
            // IDs
            isbn: isbnObj.identifier,
            google_id: volume.id,

            // Metadatos
            title: info.title,
            author: info.authors?.[0] ?? "Autor Desconocido", // Tomamos el primer autor
            description: info.description ?? null,

            // Campos opcionales / Nullables
            cover_url: coverUrl,
            page_count: info.pageCount ?? null,
            published_date: publishedDateStr,
        };

        return procesedBook;

    } catch (error) {
        console.error(`❌ Error crítico procesando libro "${titleToSearch}":`, error);
        return null;
    }
}