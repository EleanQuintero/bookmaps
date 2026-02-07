"use server"

import { getSupabaseRepo } from "@/infrastructure/repositories/SupabaseRepo"


export async function deleteItemNote(noteId: string) {

    try {
        const supabaseRepo = await getSupabaseRepo()
        const { status } = await supabaseRepo.deleteItemNote(noteId)
        console.log('Note deleted successfully, status:', status)
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown Error',
            status: 500
        }
    }


}