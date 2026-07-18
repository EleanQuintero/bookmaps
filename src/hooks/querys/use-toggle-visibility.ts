'use client'

import { toggleMapVisibility } from '@/app/actions/maps/toggleMapVisibility'
import { useMutation } from '@tanstack/react-query'

export function useToggleVisibility() {

    const { mutateAsync: toggleVisibility, isPending } = useMutation({
        mutationFn: async (input: { mapId: string; isPublic: boolean }) => {
            const result = await toggleMapVisibility(input)
            if (!result.success) throw new Error(result.error ?? 'Failed to update visibility')
            return result.data
        }
    })

    return { toggleVisibility, isPending }
}
