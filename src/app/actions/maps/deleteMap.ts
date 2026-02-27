"use server"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { deleteMap } from "@/services/maps/mapService"


export async function deleteMapById(mapId: string) {

    try {

        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return { success: false, error: "Unauthorized", status: 401 }
        }

        const { status, data } = await deleteMap(mapId, user.id)

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