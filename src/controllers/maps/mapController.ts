import { transformMap, transformMapsCollection } from "@/lib/adapters/map-adapter";
import { getMapById, getMaps } from "@/services/maps/mapService";

export async function getMapData(mapId: string) {
    if (!mapId) return null

    const { data, error } = await getMapById(mapId)

    if (error) {
        throw new Error(`Error obteniendo el mapa: ${error.message}`);
    }
    const map = transformMap(data)

    return map



}

export async function getMapsData() {
    const { data, error } = await getMaps()

    if (error) {
        throw new Error(`Error obteniendo mapas: ${error.message}`);
    }

    const maps = transformMapsCollection(data)

    return maps

}
