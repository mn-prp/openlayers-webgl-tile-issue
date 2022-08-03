import { rest, setupWorker } from "msw";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import image from "./tile3.png";

import App from "./App";

async function startWorker() {
    const handlers = [
        rest.get(`http://example.com/map/:x/:y/:z`, async (req, res, ctx) => {
            const img = await fetch(image).then((res) => res.arrayBuffer());
            const prepResponse = (img: ArrayBuffer) =>
                res(
                    ctx.set("Content-Length", img.byteLength.toString()),
                    ctx.set("Content-Type", "image/jpeg"),
                    ctx.body(img)
                );
            return prepResponse(img);
        }),
    ];

    const worker = setupWorker(...handlers);
    try {
        await worker.start();
    } catch (e) {
        console.error(e);
    }
}

startWorker();

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
