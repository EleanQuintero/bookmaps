import { z } from 'zod';

export const bookIASchema = z.object({
    order: z.number(),
    title: z.string(),
    author: z.string(),
    level: z.string(),
    length: z.string(),
    book_value: z.string(),
    next_path: z.string(),
});

export const iaBookmapSchema = z.object({
    name_of_the_map: z.string(),
    description: z.string(),
    books: z.array(bookIASchema),
});

export type IABookmapData = z.infer<typeof iaBookmapSchema>;