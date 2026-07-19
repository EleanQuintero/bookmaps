import { getBooks, searchBooksByTopic } from "@/services/books/bookService";
import { getBookCoverFallback } from "@/services/books/coverFallbackService";
import { BookAPIRes } from "@/domain/entities/bookAPI/bookResponse";
import { BookInsert } from "@/domain/entities/models/models";
import { BookCandidate } from "@/domain/entities/bookAPI/bookCandidate";

type IndustryIdentifier = { type: string; identifier: string };

// Extracción de ISBN (Prioridad: ISBN_13 > ISBN_10 > Cualquiera)
function extractIsbn(identifiers: IndustryIdentifier[] | undefined): string | null {
    if (!identifiers || identifiers.length === 0) return null;
    const isbnObj = identifiers.find(id => id.type === 'ISBN_13')
        || identifiers.find(id => id.type === 'ISBN_10')
        || identifiers[0];
    return isbnObj?.identifier ?? null;
}

export async function getProcesedBooks(titleToSearch: string): Promise<BookInsert | null> {
    try {

        const rawData: BookAPIRes = await getBooks(titleToSearch);

        if (!rawData.items || rawData.items.length === 0) {
            console.warn(`⚠️ Google Books: No se encontraron resultados para: "${titleToSearch}"`);
            return null;
        }

        const volume = rawData.items[0];
        const info = volume.volumeInfo;

        const isbn = extractIsbn(info.industryIdentifiers);

        if (!isbn) {
            console.warn(`⚠️ El libro "${info.title}" no tiene ISBN válido. Omitiendo.`);
            return null;
        }

        let coverUrl = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null;
        if (coverUrl && coverUrl.startsWith('http:')) {
            coverUrl = coverUrl.replace('http:', 'https:');
        }

        // Fallback chain when Google Books has no cover image
        if (!coverUrl) {
            console.log(`🔍 Cover fallback for: "${info.title}"...`);
            coverUrl = await getBookCoverFallback(isbn, info.title);
        }

        const publishedDateStr = info.publishedDate ? String(info.publishedDate) : null;

        // 5. Construcción del objeto final (Mapeo a Snake Case)
        const procesedBook: BookInsert = {
            // IDs
            isbn,
            google_id: volume.id,

            // Metadatos
            title: info.title,
            author: info.authors?.[0] ?? "Unknown Author", // Tomamos el primer autor
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

// RAG rescue pool: closed set of ISBN-verified candidates for the repair loop to curate from.
export async function getTopicCandidates(
    topic: string,
    opts?: { langRestrict?: string; excludeTitles?: string[] }
): Promise<BookCandidate[]> {
    const rawData = await searchBooksByTopic(topic, { langRestrict: opts?.langRestrict });

    if (!rawData.items || rawData.items.length === 0) return [];

    const excludeSet = new Set((opts?.excludeTitles ?? []).map(title => title.toLowerCase()));
    const seenIsbns = new Set<string>();
    const candidates: BookCandidate[] = [];

    for (const volume of rawData.items) {
        const info = volume.volumeInfo;
        const isbn = extractIsbn(info.industryIdentifiers);

        if (!info.title || !isbn || seenIsbns.has(isbn)) continue;
        if (excludeSet.has(info.title.toLowerCase())) continue;

        seenIsbns.add(isbn);
        candidates.push({
            title: info.title,
            author: info.authors?.[0] ?? "Unknown Author",
            isbn,
            publishedDate: info.publishedDate ? String(info.publishedDate) : null,
        });
    }

    return candidates;
}