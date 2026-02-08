
import { deleteItemNote } from "@/app/actions/maps/deleteItemNote"
import { useMutation } from "@tanstack/react-query"

export const useDeleteNote = () => {

    const { mutate: deleteNote, isPending, isError } = useMutation({
        mutationFn: async (noteId: string) => {
            const result = await deleteItemNote(noteId)

            if (!result.success) {
                throw new Error(result.error)
            }

            return result.data
        }
    })

    return { deleteNote, isPending, isError }

}



