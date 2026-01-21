import { MapDetail, MapDetailCollection } from "@/infrastructure/querys/getMapQuerys";

export function transformMap(data: MapDetail) {

    const map = {
        id: data.id,
        topic: data.title,
        description: data.description,
        progress: data.map_items.length > 0 ? Math.floor((data.map_items.filter((item) => item.status).length / data.map_items.length) * 100) : 0,
        totalBooks: data.map_items.length,
        completedBooks: data.map_items.filter((item) => item.status === 'completed').length,
        status: "in-progress", // Placeholder, ajustar según lógica real
        lastActive: "Just now",
        books: data.map_items.map(item => ({
            title: item.books.title,
            author: item.books.author,
            coverPlaceholder: true,
            coverURL: item.books.cover_url,
            description: item.books.description

        }))

    };

    return map

}

export function transformMapsCollection(data: MapDetailCollection) {

    const maps = data.map(map => transformMap(map))

    return maps

}