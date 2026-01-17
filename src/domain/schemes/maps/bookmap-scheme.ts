import { z } from 'zod';

// 1. Esquema del LIBRO (Lo que la IA "piensa")
export const aiBookSchema = z.object({
    // Eliminamos 'order' explícito. Confiaremos en el orden del array (índice 0 = posición 1)
    title: z.string().describe("El título exacto del libro"),
    author: z.string().describe("El autor principal"),

    // CAMPOS DE VALOR PEDAGÓGICO (Van a map_items)
    level: z.string().describe("Nivel de dificultad (Ej: Principiante, Intermedio, Avanzado)"),
    book_value: z.string().describe("¿Por qué este libro es esencial en este punto de la ruta?"),
    next_path: z.string().describe("¿Qué habilidad desbloquea leer este libro?"),

    // Opcional: Si quieres que la IA estime la longitud, aunque no sea exacto
    estimated_duration: z.string().optional().describe("Tiempo estimado de lectura (Ej: '2 semanas')"),
});

// 2. Esquema del MAPA (La respuesta completa)
export const aiMapResponseSchema = z.object({
    topic: z.string().describe("El tema reformulado o corregido"),
    description: z.string().describe("Una breve introducción a esta ruta de aprendizaje"),
    books: z.array(aiBookSchema).describe("La lista ordenada de libros desde el primero al último"),
});

// 3. INFERENCIA DE TIPOS (La Magia)
// Ya no necesitas escribir 'interface AIBookSuggestion' a mano. Zod lo hace por ti.
export type AIBookSuggestion = z.infer<typeof aiBookSchema>;
export type AIMapResponse = z.infer<typeof aiMapResponseSchema>;