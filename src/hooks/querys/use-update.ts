'use client'

import { updateBookStatus } from '@/app/actions/maps/updateBookStatus'
import { BookStatus } from '@/domain/entities/models/models'
import { useMutation } from '@tanstack/react-query'

interface mutationProps {
    id: string
    status: BookStatus
    mapId: string
}


export function useUpdateBookStatus() {


    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: async ({ id, status, mapId }: mutationProps) => {
            const { data, error } = await updateBookStatus({ status, bookId: id, mapId })
            if (error) throw new Error('Error updating book status')
        }


    })


    return { updateStatus, isPending }
}