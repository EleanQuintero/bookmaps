import { Book, bookIAData } from "./book";

export interface Bookmap {
    name_of_the_map: string;
    description: string;
    books: Book[];
}

export type iaBookmapData = Omit<Bookmap, 'books'> & {
    books: bookIAData[];
};