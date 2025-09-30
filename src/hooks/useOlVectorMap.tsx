import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { fromLonLat } from "ol/proj";
import { isEmpty } from "ol/extent";
import { fetchIlcelerGeom } from "../api/genelApi";
import Overlay from "ol/Overlay";
import { defaults as defaultControls } from "ol/control";

export const useOlVectorMap = (data?: string | null) => {
    const mapRef = useRef<Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const vectorSourceRef = useRef<VectorSource>(new VectorSource());

    const popupContainerRef = useRef<HTMLDivElement | null>(null);
    const popupContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        vectorSourceRef.current = new VectorSource();

        const overlay = new Overlay({
            element: popupContainerRef.current || undefined,
            autoPan: { animation: { duration: 250 } },
        });

        const map = new Map({
            view: new View({
                center: fromLonLat([28.9784, 41.0082]),
                zoom: 9,
            }),
            layers: [
                new TileLayer({ source: new OSM() }),
                new VectorLayer({
                    source: vectorSourceRef.current,
                    style: new Style({
                        stroke: new Stroke({ width: 2, color: "blue" }),
                        fill: new Fill({ color: "rgba(37, 37, 192, 0.3)" }),
                    }),
                }),
            ],
            target: containerRef.current,
            overlays: [overlay],
            controls: defaultControls({
                zoom: false,
                rotate: false,
                attribution: false
            })
        });

        mapRef.current = map;

        const handleSingleClick = (evt: any) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
            if (feature) {
                const props = feature.getProperties();
                const { geometry, ...rest } = props;

                if (popupContentRef.current) {
                    popupContentRef.current.innerHTML =
                        Object.entries(rest)
                            .map(([k, v]) => `<b>${k}</b>: ${v}`)
                            .join("<br/>");
                }

                overlay.setPosition(evt.coordinate);
            } else {
                overlay.setPosition(undefined);
            }
        };

        map.on("singleclick", handleSingleClick);

        return () => {
            map.un("singleclick", handleSingleClick);
            map.setTarget(undefined);
            mapRef.current = null;
        };
    }, []);

    // Veri yüklendiğinde/degistiğinde katmanı güncelle
    useEffect(() => {
        if (!vectorSourceRef.current || !mapRef.current) return;

        const source = vectorSourceRef.current;
        const view = mapRef.current.getView();

        const goHome = () =>
            view.animate({
                center: fromLonLat([28.9784, 41.0082]),
                zoom: 10,
                duration: 600,
            });

        const fitIfPossible = () => {
            const extent = source.getExtent();
            const isFiniteExtent = Array.isArray(extent) && extent.every((v) => Number.isFinite(v));
            if (!isEmpty(extent) && isFiniteExtent) {
                view.fit(extent, {
                    padding: [20, 20, 20, 20],
                    maxZoom: data ? 18 : 12,
                    duration: data ? 500 : 700,
                });
            } else {
                goHome();
            }
        };

        source.clear();

        if (!data) {
            (async () => {
                try {
                    const istanbulGeojson = await fetchIlcelerGeom();
                    if (!istanbulGeojson) {
                        goHome();
                        return;
                    }
                    const features = new GeoJSON().readFeatures(istanbulGeojson[0], {
                        dataProjection: "EPSG:4326",
                        featureProjection: "EPSG:3857",
                    });
                    if (!features || features.length === 0) {
                        goHome();
                        return;
                    }
                    source.addFeatures(features);
                    fitIfPossible();
                } catch (err) {
                    console.error("fetchIlcelerGeom hata:", err);
                    goHome();
                }
            })();
            return;
        }

        const features = new GeoJSON().readFeatures(data, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
        });

        if (!features || features.length === 0) {
            goHome();
            return;
        }

        source.addFeatures(features);
        fitIfPossible();
    }, [data]);

    return { containerRef, mapRef, popupContainerRef, popupContentRef };
};
