"use server"
import { DBNote } from "@/domain/entities/models/models";
import { NoteContentScheme } from "@/domain/schemes/maps/notecontent-scheme";
import { addNote } from "@/services/maps/mapService"
import { ZodError } from "zod";

type ActionResult<T> =
    | { success: true; data: T; status: number }
    | { success: false; error: string; status?: number }


export async function addItemNote(content: string, map_item_id: string): Promise<ActionResult<DBNote>> {

    try {

        const validated = NoteContentScheme.parse({ content });


        const { data, status } = await addNote(validated.content, map_item_id)



        return { data, status, success: true }
    } catch (error) {

        if (error instanceof ZodError) {
            return {
                success: false,
                error: error.issues[0]?.message || 'Invalid note content',
                status: 400
            }
        }

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown Error',
            status: 500
        }
    }



}