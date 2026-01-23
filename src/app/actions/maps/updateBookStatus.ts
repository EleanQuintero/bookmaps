"use server"
import { BookStatus } from "@/domain/entities/models/models";
import { updateItemStatus } from "@/services/maps/mapService";
import { revalidatePath } from "next/cache";

interface props {
    bookId: string,
    status: BookStatus
    mapId: string
}

export async function updateBookStatus({ bookId, status, mapId }: props) {


    const { data, error } = await updateItemStatus(status, bookId)

    revalidatePath(`dashboard/maps/${mapId}`)


    return { data, error }


}