# Reproduction of Custom Shader Logic Failing on iOS

This repository reproduces a bug that only appears on mobile devices (specifically, iOS) but does not appear on desktop devices, including in Safari when used on Desktop.

To reproduce:

```
npm install
npm start
```

Then open the site in both mobile and desktop browsers and move the map around a bit -- there should appear gray streaks across the map, as seen in the screenshot included below the interactive map. These gray streaks, the custom WebGL Tiles, do not appear on iOS.

The relevant code is in `src/App.tsx`:

```js
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
```
