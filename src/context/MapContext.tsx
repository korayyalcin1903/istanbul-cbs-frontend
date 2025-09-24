import React, { createContext, useContext, useState } from "react";

type MapCtx = {
  selectedWkt: string | null;
  setSelectedWkt: (w: string | null) => void;
};

const MapContext = createContext<MapCtx | undefined>(undefined);


export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedWkt, setSelectedWkt] = useState<string | null>(null);
  return (
    <MapContext.Provider value={{ selectedWkt, setSelectedWkt }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMapContext MapProvider içinde kullanılmalı");
  return ctx;
};
