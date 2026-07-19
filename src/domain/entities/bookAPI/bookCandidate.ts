// Compact candidate from a topic-search pool, used by the P3 RAG rescue curation prompt.
export interface BookCandidate {
    title: string;
    author: string;
    isbn: string;
    publishedDate?: string | null;
}
