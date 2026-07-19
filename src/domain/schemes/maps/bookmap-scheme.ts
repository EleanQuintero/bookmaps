import { z } from 'zod';

// 1. Esquema del LIBRO (Lo que la IA "piensa")
export const aiBookSchema = z.object({
    // Eliminamos 'order' explícito. Confiaremos en el orden del array (índice 0 = posición 1)
    title: z.string().describe("The exact, commonly-cataloged title of the book"),
    author: z.string().describe("The primary author"),

    // CAMPOS DE VALOR PEDAGÓGICO (Van a map_items)
    level: z.string().describe("Difficulty level — exactly one of: Beginner, Intermediate, Advanced"),
    book_value: z.string().describe("Why this specific book is essential at this point in the path"),
    next_path: z.string().describe("The concrete skill or subtopic that reading this book unlocks"),
});

// 2. Esquema del MAPA (La respuesta completa)
export const aiMapResponseSchema = z.object({
    topic: z.string().describe("The restated, well-scoped topic"),
    description: z.string().describe("A brief introduction to this learning path"),
    books: z.array(aiBookSchema).describe("The ordered list of books, from first to last"),
});

// 3. INFERENCIA DE TIPOS (La Magia)
// Ya no necesitas escribir 'interface AIBookSuggestion' a mano. Zod lo hace por ti.
export type AIBookSuggestion = z.infer<typeof aiBookSchema>;
export type AIMapResponse = z.infer<typeof aiMapResponseSchema>;