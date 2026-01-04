import { z } from 'zod';

export const GeneratorSchema = z.object({
    theme: z.string().min(1, 'el tema es requerido').max(100, 'El tema es muy largo'),
});

export type GeneratorValues = z.infer<typeof GeneratorSchema>;