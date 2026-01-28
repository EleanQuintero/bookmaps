import { Bookmap } from "@/domain/entities/models/models";
import { create } from 'zustand'

interface mapStore {
    mapData: Bookmap
    setMapData: (data: Bookmap) => void
    resetData: (initialData: Bookmap) => void
}

const initialData: Bookmap = {
    id: '',
    title: '',
    description: '',
    user_id: '',
    map_items: []
}

export const useMapStore = create<mapStore>()((set) => ({
    mapData: initialData,
    setMapData(data) {
        set(() => ({
            mapData: data
        })
        )

    },
    resetData(initialData) {
        set({
            mapData: initialData
        })
    },
}))
