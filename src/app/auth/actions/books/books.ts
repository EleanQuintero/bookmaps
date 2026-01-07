"use server"

import { getProcesedBooks } from "@/controllers/books/bookController"
import { bookProcesed } from "@/domain/entities/maps/book"


export async function getFullBook(titles: string[]) {
    const startTotal = performance.now()

    // Procesar todos en paralelo
    const startGoogleAPI = performance.now()
    const results = await Promise.all(
        titles.map(title => getProcesedBooks(title))
    )
    const endGoogleAPI = performance.now()
    console.log(`📚 Google API (Paralelo): ${(endGoogleAPI - startGoogleAPI).toFixed(2)}ms`)

    // Filtrar solo los exitosos
    const validBooks = results.filter((book): book is bookProcesed => book !== null)

    // Estrategia: ¿Qué hacer si algunos fallaron?
    const failedCount = results.length - validBooks.length

    if (validBooks.length === 0) {
        // Caso 1: TODOS fallaron
        const endTotal = performance.now()
        console.log(`⏱️ TOTAL (con fallo): ${(endTotal - startTotal).toFixed(2)}ms`)
        return {
            success: false,
            error: "No se pudo obtener información de ningún libro"
        }
    }

    if (failedCount > 0) {
        // Caso 2: ALGUNOS fallaron (pero hay al menos 1 exitoso)
        console.warn(`${failedCount} de ${results.length} libros no pudieron procesarse`)
        // Continúa con los exitosos
    }

    const endTotal = performance.now()
    console.log(`⏱️ TOTAL: ${(endTotal - startTotal).toFixed(2)}ms`)
    console.log('📚 Libros válidos:', validBooks)
    console.log('✅ Total procesados:', validBooks.length)
    console.log('❌ Total fallidos:', failedCount)

}