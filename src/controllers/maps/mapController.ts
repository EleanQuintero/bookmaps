import { getMaps } from "@/services/maps/mapService";

export async function getMapsData() {

    const { data, error } = await getMaps()

    if (error) {
        console.error('❌ Error obteniendo mapas:', error);
        throw new Error(`Error obteniendo mapas: ${error.message}`);
    }

    const maps = data.map(map => ({
        id: map.id,
        topic: map.title,
        description: map.description,
        progress: map.map_items.length > 0 ? Math.floor((map.map_items.filter((item) => item.status).length / map.map_items.length) * 100) : 0,
        totalBooks: map.map_items.length,
        completedBooks: map.map_items.filter((item) => item.status === 'completed').length,
        status: "in-progress", // Placeholder, ajustar según lógica real
        lastActive: "Just now",
        books: map.map_items.map(item => ({
            title: item.books.title,
            author: item.books.author,
            coverPlaceholder: true,
            coverURL: item.books.cover_url,
            description: item.books.description

        }))

    }));

    return maps

}

