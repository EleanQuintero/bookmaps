"use server"
import { deleteNote } from "@/services/maps/mapService"
import { revalidatePath } from "next/cache"
import { DBNote } from "@/domain/entities/models/models"

type ActionResult<T> =
    | { success: true; data: T; status: number }
    | { success: false; error: string; status?: number }


export async function deleteItemNote(noteId: string): Promise<ActionResult<DBNote>> {

    try {
        const { status, data } = await deleteNote(noteId)
        
        // Revalidate entire dashboard section
        revalidatePath('/dashboard', 'layout')
        
        return { success: true, status, data }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown Error',
            status: 500
        }
    }


}