"use server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { setMapVisibility } from "@/services/maps/mapService"

const schema = z.object({ mapId: z.string().uuid(), isPublic: z.boolean() })

export async function toggleMapVisibility(input: { mapId: string; isPublic: boolean }) {
    try {
        const parsed = schema.safeParse(input)
        if (!parsed.success) {
            return { success: false, error: "Invalid input", status: 400 }
        }

        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return { success: false, error: "Unauthorized", status: 401 }
        }

        const data = await setMapVisibility(parsed.data.mapId, user.id, parsed.data.isPublic)

        revalidatePath(`/dashboard/maps/${parsed.data.mapId}`)
        revalidatePath(`/share/${parsed.data.mapId}`)

        return { success: true, data, status: 200 }

    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown Error",
            status: 500
        }
    }
}
