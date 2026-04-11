import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url)) + "/..";
const j = JSON.parse(fs.readFileSync(join(root, "_map-paths-new.json"), "utf8"));

const order = ["PL", "DE", "CZ", "SK", "UA", "LT", "BY", "AT", "HU"];
let s = `/**
 * Ścieżki SVG z Natural Earth 110m (public domain), uproszczone (co 2. wierzchołek).
 * PL, DE, CZ, SK, UA, LT, BY, AT, HU — wspólna normalizacja do viewBox.
 * https://www.naturalearthdata.com/
 */
export const ABOUT_MAP_VIEWBOX = "0 0 520 520" as const;

`;

for (const k of order) {
  const name =
    k === "PL"
      ? "POLAND"
      : k === "DE"
        ? "GERMANY"
        : k === "CZ"
          ? "CZECHIA"
          : k === "SK"
            ? "SLOVAKIA"
            : k === "UA"
              ? "UKRAINE"
              : k === "LT"
                ? "LITHUANIA"
                : k === "BY"
                  ? "BELARUS"
                  : k === "AT"
                    ? "AUSTRIA"
                    : "HUNGARY";
  const p = j[k][0].replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  s += `export const PATH_${name} = "${p}";\n\n`;
}

s += `/** Przycięcie zachodniej części Niemiec. */
export const MAP_CLIP = { x: 52, y: 4, width: 468, height: 508 } as const;
`;

fs.writeFileSync(join(root, "src/data/aboutEuropeMapPaths.ts"), s);
console.log("written aboutEuropeMapPaths.ts");
