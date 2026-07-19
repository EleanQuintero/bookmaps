import { z } from 'zod';
import { GeneratorConstraintsSchema } from '@/domain/schemes/maps/generator-constraints-scheme';

export const GeneratorSchema = z.object({
    theme: z.string().min(1, 'Topic is required').max(100, 'Topic must be 100 characters or fewer'),
}).extend(GeneratorConstraintsSchema.shape);

// enum fields carry .default(), so RHF's pre-parse form values (GeneratorValues)
// are optional; GeneratorSubmitValues is the resolver's post-parse output.
export type GeneratorValues = z.input<typeof GeneratorSchema>;
export type GeneratorSubmitValues = z.output<typeof GeneratorSchema>;