import { Map, View } from "ol";
import { Tile, WebGLTile } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { useEffect, useRef } from "react";
import "./styles.css";

const dataCases = [
    "case",
    ["!=", ["*", ["band", 3], 255], 0],
    ["color", 235, 235, 235],
    ["color", 0, 0, 0, 0],
];

const color = [
    "interpolate",
    ["linear"],
    ["band", 4],
    0,
    dataCases,
    1,
    "rgba(0, 0, 0, 1)",
];

const map = new Map({
    layers: [
        new WebGLTile({
            source: new XYZ({
                url: "http://example.com/map/{x}/{y}/{z}",
                tileSize: 256,
                interpolate: false,
            }),
            style: { color },
            zIndex: 200,
        }),
        new Tile({
            source: new XYZ({
                url: "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGF2ZXdpbGNveHNvbiIsImEiOiJjaW92b3I0ZnEwMWF1dW9tOGNnM2lmaTBrIn0.NyV7cG8oi1KMJJ-iy6v2iQ",
                tileSize: 512,
            }),
        }),
    ],
    view: new View({ center: fromLonLat([37.41, 8.82]), zoom: 18 }),
});

export default function App() {
    const mapContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!mapContainer.current) return;

        map.setTarget(mapContainer.current);
        return () => map.setTarget(undefined);
    }, [mapContainer]);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <div
                ref={mapContainer}
                style={{ height: "400px", width: "400px" }}
            />
            <h2>Start editing to see some magic happen!</h2>
        </div>
    );
}
