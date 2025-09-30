import React from "react";
import { useOlVectorMap } from "../../hooks/useOlVectorMap";

interface MapComponentProps {
    data?: string | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  const { containerRef, popupContainerRef, popupContentRef } = useOlVectorMap(data);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "calc(100vh - 56px)" }}
      />

      <div
        ref={popupContainerRef}
        id="popup"
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "10px",
          border: "1px solid #ccc",
          position: "absolute",
          bottom: "12px",
          left: "12px",
          minWidth: "200px",
        }}
      >
        <div ref={popupContentRef}></div>
      </div>
    </>
  );
};


export default MapComponent;
