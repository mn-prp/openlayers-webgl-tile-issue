# Reproduction of Custom Shader Logic Failing on iOS

This repository reproduces a bug that only appears on mobile devices (specifically, iOS) but does not appear on desktop devices, including in Safari when used on Desktop.

To reproduce:

```
npm install
npm start
```

Then open the site in both mobile and desktop browsers and move the map around a bit -- there should appear gray streaks across the map, as seen in the screenshot included below the interactive map. These gray streaks, the custom WebGL Tiles, do not appear on iOS.
