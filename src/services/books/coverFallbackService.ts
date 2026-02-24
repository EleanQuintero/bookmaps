/**
 * Cover Fallback Service
 *
 * Implements a three-tier fallback chain for book cover images:
 *   1. Google Books (handled upstream in bookController)
 *   2. Open Library Covers API (ISBN-based, free, no key required)
 *   3. Static deterministic placeholder (placehold.co — always resolves)
 */

const OPEN_LIBRARY_BASE = "https://covers.openlibrary.org/b/isbn";
const PLACEHOLDER_BASE = "https://placehold.co";

/**
 * Derives a stable hex colour from an arbitrary string.
 * Used to give each placeholder a visually distinct background.
 */
function deriveColour(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // force 32-bit integer
    }
    // Map the hash into a muted palette (avoid too-bright / too-dark colours)
    const r = 80 + Math.abs((hash >> 16) & 0x7f);
    const g = 80 + Math.abs((hash >> 8) & 0x7f);
    const b = 80 + Math.abs(hash & 0x7f);
    return [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

/**
 * Extracts the initials from a book title (up to 2 words).
 * "The Pragmatic Programmer" → "TP"
 */
function extractInitials(title: string): string {
    return title
        .split(/\s+/)
        .filter(word => word.length > 0)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join("");
}

/**
 * Attempts to resolve a cover from the Open Library Covers API.
 *
 * Uses `?default=false` so the API returns a 404 instead of a blank 1×1 GIF
 * when no cover is available. We make a HEAD request to avoid downloading the
 * full image just to check existence.
 *
 * @param isbn - The book's ISBN-13 or ISBN-10 identifier.
 * @returns The cover URL if a real image exists, otherwise `null`.
 */
export async function getOpenLibraryCover(isbn: string): Promise<string | null> {
    const url = `${OPEN_LIBRARY_BASE}/${isbn}-L.jpg?default=false`;
    try {
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
            // Strip the ?default=false query param from the returned URL so it
            // resolves to the actual image (not a forced-404 variant).
            return `${OPEN_LIBRARY_BASE}/${isbn}-L.jpg`;
        }
        return null;
    } catch {
        // Network failure — treat as unavailable
        return null;
    }
}

/**
 * Builds a deterministic placeholder cover URL using placehold.co.
 * The colour is derived from the title so each book gets a unique shade,
 * and the text shows the book's initials.
 *
 * @param title - The book title.
 * @returns A fully-qualified placehold.co URL that always resolves.
 */
export function buildPlaceholderCover(title: string): string {
    const colour = deriveColour(title);
    const initials = encodeURIComponent(extractInitials(title));
    // 128×192 is a standard book-cover aspect ratio (2:3)
    return `${PLACEHOLDER_BASE}/128x192/${colour}/ffffff?text=${initials}`;
}

/**
 * Orchestrates the full fallback chain when Google Books returns no cover.
 *
 * Chain:
 *   Open Library (HEAD check) → placehold.co (guaranteed)
 *
 * @param isbn  - The book's ISBN identifier.
 * @param title - The book title (used for placeholder generation).
 * @returns A cover URL — **never null** — guaranteed to be a valid URL.
 */
export async function getBookCoverFallback(isbn: string, title: string): Promise<string> {
    const openLibraryUrl = await getOpenLibraryCover(isbn);
    if (openLibraryUrl) {
        return openLibraryUrl;
    }
    return buildPlaceholderCover(title);
}
