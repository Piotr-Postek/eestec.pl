import fs from "fs";
import https from "https";
import t from "topojson-client";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const NAMES = [
  "Poland",
  "Germany",
  "Czechia",
  "Slovakia",
  "Ukraine",
  "Lithuania",
  "Belarus",
  "Austria",
  "Hungary",
];

const KEY = {
  Poland: "PL",
  Germany: "DE",
  Czechia: "CZ",
  Slovakia: "SK",
  Ukraine: "UA",
  Lithuania: "LT",
  Belarus: "BY",
  Austria: "AT",
  Hungary: "HU",
};

function rings(geom) {
  if (geom.type === "Polygon") return geom.coordinates;
  if (geom.type === "MultiPolygon") {
    const out = [];
    for (const poly of geom.coordinates) for (const ring of poly) out.push(ring);
    return out;
  }
  return [];
}

function flattenCoords(geom) {
  const out = [];
  for (const ring of rings(geom)) for (const p of ring) out.push(p);
  return out;
}

function loadTopo(cb) {
  const fp = join(root, "_countries110.json");
  if (fs.existsSync(fp)) {
    cb(JSON.parse(fs.readFileSync(fp, "utf8")));
    return;
  }
  https.get(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
    (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => {
        fs.writeFileSync(fp, d);
        cb(JSON.parse(d));
      });
    }
  );
}

loadTopo((top) => {
  const fc = t.feature(top, top.objects.countries);
  const feats = NAMES.map((name) => {
    const f = fc.features.find((x) => x.properties.name === name);
    if (!f) throw new Error(`Missing country: ${name}`);
    return f;
  });

  const proj = (lon, lat) => [(lon - 19) * 38, -(lat - 51.2) * 42];
  let pts = [];
  for (const f of feats) {
    pts = pts.concat(flattenCoords(f.geometry).map(([lo, la]) => proj(lo, la)));
  }
  let minX = 1e9,
    minY = 1e9,
    maxX = -1e9,
    maxY = -1e9;
  for (const [x, y] of pts) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const pad = 10;
  const vbW = 520,
    vbH = 520;
  const sx = (vbW - 2 * pad) / (maxX - minX),
    sy = (vbH - 2 * pad) / (maxY - minY);
  const sc = Math.min(sx, sy);
  const ox = pad - minX * sc,
    oy = pad - minY * sc;
  const P = (lon, lat) => {
    const [x, y] = proj(lon, lat);
    return [x * sc + ox, y * sc + oy];
  };

  function simplify(ring, step) {
    const out = [];
    for (let i = 0; i < ring.length; i += step) out.push(ring[i]);
    if (out[out.length - 1] !== ring[ring.length - 1]) out.push(ring[ring.length - 1]);
    return out;
  }

  function ringPath(ring) {
    const s = simplify(ring, 2);
    return s
      .map(([lo, la], i) => {
        const [x, y] = P(lo, la);
        return (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
      })
      .join(" ") + " Z";
  }

  function geomPaths(geom) {
    const paths = [];
    for (const ring of rings(geom)) paths.push(ringPath(ring));
    return paths;
  }

  const out = {};
  for (const f of feats) {
    const key = KEY[f.properties.name];
    out[key] = geomPaths(f.geometry);
  }

  fs.writeFileSync(join(root, "_map-paths-new.json"), JSON.stringify(out));
  console.log("keys", Object.keys(out));
  for (const k of Object.keys(out)) console.log(k, out[k][0].length);
});
