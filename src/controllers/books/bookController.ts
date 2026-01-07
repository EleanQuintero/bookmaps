import { bookProcesed } from "@/domain/entities/maps/book";
import { getBooks } from "@/services/books/bookService";

export async function getProcesedBooks(titleToSearch: string) {
    try {
        const rawData = await getBooks(titleToSearch)

        if (!rawData.items || rawData.items.length === 0) {
            console.warn(`No se encontraron resultados para: ${titleToSearch}`)
            return null // En lugar de throw
        }

        const item = rawData.items[0].volumeInfo

        if (!item.industryIdentifiers || item.industryIdentifiers.length === 0) {
            console.warn(`El libro "${item.title}" no tiene ISBN, omitiendo...`)
            return null // En lugar de throw
        }

        const { description, industryIdentifiers, pageCount, averageRating, imageLinks, title, authors } = item

        const procesedBook: bookProcesed = {
            title: title,
            author: authors[0] ?? "Autor Desconocido",
            coverURL: imageLinks.thumbnail ?? "No poseemos imagen para este titulo",
            ISBN: industryIdentifiers[0].identifier,
            totalPages: pageCount,
            description: description ?? "",
            rating: averageRating
        }
        return procesedBook

    } catch (error) {
        console.error(`Error procesando libro "${titleToSearch}":`, error)
        return null
    }




}