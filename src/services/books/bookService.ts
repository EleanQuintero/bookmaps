import { BookAPIRes } from "@/domain/entities/bookAPI/bookResponse";


export async function getBooks(title: string) {
    const API_KEY = process.env.GOOGLE_BOOKS_API_KEY
    const query = encodeURIComponent(title);
    const url = `https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=2&key=${API_KEY}`


    const response = await fetch(url)

    const data: Promise<BookAPIRes> = response.json()

    return data


}