import { z } from 'zod';

export const GeneratorSchema = z.object({
    theme: z.string().min(1, 'Topic is required').max(100, 'Topic must be 100 characters or fewer'),
});

export type GeneratorValues = z.infer<typeof GeneratorSchema>;