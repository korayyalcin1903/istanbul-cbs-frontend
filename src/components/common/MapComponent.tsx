import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { fromLonLat } from "ol/proj";

interface MapComponentProps {
    data?: string | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
    const mapRef = useRef<Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const vectorSourceRef = useRef<VectorSource>(new VectorSource());

    useEffect(() => {
        if (!containerRef.current) return;

        vectorSourceRef.current = new VectorSource();

        mapRef.current = new Map({
            view: new View({
                center: fromLonLat([28.9784, 41.0082]),
                zoom: 9,
            }),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: vectorSourceRef.current,
                    style: new Style({
                        stroke: new Stroke({ width: 2, color: 'blue' }),
                        fill: new Fill({
                            color: "rgba(37, 37, 192, 0.3)"
                        })
                    }),
                })
            ],
            target: containerRef.current,
        });

        return () => {
            mapRef.current?.setTarget(undefined);
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!vectorSourceRef.current || !mapRef.current) return;

        vectorSourceRef.current.clear();
        if (!data) {
            mapRef.current?.getView().animate({
                center: fromLonLat([28.9784, 41.0082]),
                zoom: 10,
                duration: 1000
            });
            return;
        }

        const feature = new GeoJSON().readFeatures(data, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });

        vectorSourceRef.current.addFeatures(feature);

        const extent = vectorSourceRef.current.getExtent()

        if (extent) {
            mapRef.current.getView().fit(extent, {
                padding: [20, 20, 20, 20],
                maxZoom: 18,
                duration: 500,
            })
        }

    }, [data])


    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: "calc(100vh - 56px)" }}
        />
    );
};

export default MapComponent;
