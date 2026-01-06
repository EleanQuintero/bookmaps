export interface Book {
    order: number;
    ISBN: string;
    google_books_id: string;
    title: string;
    author: string;
    level: string;
    length: string;
    coverURL: string;
    book_value: string;
    next_path: string;
}

export type bookIAData = Omit<Book, 'ISBN' | 'google_books_id' | 'coverURL'>; 