"use server"
import { BookStatus } from "@/domain/entities/models/models";
import { updateItemStatus } from "@/services/maps/mapService";

interface props {
    bookId: string,
    status: BookStatus
}

export async function updateBookStatus({ bookId, status }: props) {


    const { data, error } = await updateItemStatus(status, bookId)

    return { data, error }


}