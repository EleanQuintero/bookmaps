import { z } from "zod";

export const NoteContentScheme = z.object({
    content: z.string().min(10, "Note content needs to be up ten characters").max(250, "Note content is too long"),
});

export type NoteContent = z.infer<typeof NoteContentScheme>;

