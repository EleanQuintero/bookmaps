"use client";

import { ReactNode, useEffect } from "react";
import { useMapStore } from "@/stores/map-item-store";
import { Bookmap } from "@/domain/entities/models/models";
interface MapStoreProviderProps {
  children: ReactNode;
  data: Bookmap;
}
const MapStoreProvider = ({ children, data }: MapStoreProviderProps) => {
  const { setMapData, mapData } = useMapStore();
  useEffect(() => {
    setMapData(data);
  }, [data]);
  return <>{children}</>;
};

export default MapStoreProvider;
