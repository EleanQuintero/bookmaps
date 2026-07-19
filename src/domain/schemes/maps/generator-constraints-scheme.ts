import { z } from 'zod';

export const GeneratorConstraintsSchema = z.object({
    readerLevel: z.enum(['novice', 'intermediate', 'advanced']).default('novice'),
    goal: z.enum(['practical', 'academic', 'overview']).default('practical'),
    bookLanguage: z.enum(['en', 'es']).default('en'), // ISO-639-1; feeds P3 langRestrict
    depth: z.enum(['quick', 'standard', 'deep']).default('standard'),
});

export type GeneratorConstraints = z.infer<typeof GeneratorConstraintsSchema>;

export const DEPTH_TARGET: Record<GeneratorConstraints['depth'], number> = {
    quick: 3,
    standard: 5,
    deep: 6,
};
