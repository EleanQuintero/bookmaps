import { BookAPIRes } from "@/domain/entities/bookAPI/bookResponse";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 400;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBooks(title: string): Promise<BookAPIRes> {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY
    if (!API_KEY) {
        console.error("❌ Google Books: GOOGLE_BOOKS_API_KEY no está configurada / not configured");
    }

    const query = encodeURIComponent(title);
    const url = `https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=2&country=US&key=${API_KEY}`

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const response = await fetch(url)

        if (response.ok) {
            return response.json() as Promise<BookAPIRes>;
        }

        // Reintenta errores transitorios (5xx / 429); falla rápido en el resto (4xx)
        const isTransient = response.status >= 500 || response.status === 429;
        if (isTransient && attempt < MAX_RETRIES) {
            await sleep(RETRY_DELAY_MS * (attempt + 1));
            continue;
        }

        const body = await response.text();
        console.error(`❌ Google Books ${response.status} para "${title}": ${body}`);
        throw new Error(`Google Books API error ${response.status}`);
    }

    throw new Error(`Google Books API error for "${title}"`);
}

// Topic-anchored search (RAG rescue pool) — plain relevance query, NOT subject: (unreliable, see spike).
// Degrades gracefully: never throws, returns empty items on failure so the repair loop can fall back.
export async function searchBooksByTopic(
    topic: string,
    opts?: { maxResults?: number; langRestrict?: string }
): Promise<BookAPIRes> {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY
    if (!API_KEY) {
        console.error("❌ Google Books: GOOGLE_BOOKS_API_KEY no está configurada / not configured");
    }

    const maxResults = opts?.maxResults ?? 20;
    const query = encodeURIComponent(topic);
    const langParam = opts?.langRestrict ? `&langRestrict=${opts.langRestrict}` : '';
    const url = `https://books.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&maxResults=${maxResults}&country=US${langParam}&key=${API_KEY}`;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(url);

            if (response.ok) {
                return response.json() as Promise<BookAPIRes>;
            }

            const isTransient = response.status >= 500 || response.status === 429;
            if (isTransient && attempt < MAX_RETRIES) {
                await sleep(RETRY_DELAY_MS * (attempt + 1));
                continue;
            }

            const body = await response.text();
            console.error(`❌ Google Books topic search ${response.status} para "${topic}": ${body}`);
            break;
        } catch (error) {
            console.error(`❌ Google Books topic search network error para "${topic}":`, error);
            break;
        }
    }

    // Rescue path: any failure degrades to an empty pool instead of throwing
    return { kind: 'books#volumes', totalItems: 0, items: [] };
}