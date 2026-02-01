import { addItemNote } from '@/app/actions/maps/addItemNote';
import { useMutation } from '@tanstack/react-query'



interface addNoteProps {

    content: string;
    item_id: string;

}

export function useAddNote() {

    const { mutate: addNote, isPending, isError } = useMutation({
        mutationFn: async ({ content, item_id }: addNoteProps) => {
            const result = await addItemNote(content, item_id)

            if (!result.success) {
                throw new Error(result.error)
            }

            return result.data
        }
    })

    return { addNote, isPending, isError }

}