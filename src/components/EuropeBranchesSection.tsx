"use client";

import { useLocale } from "@/context/LocaleContext";
import type { BranchesMapSection } from "@/content/site";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  data: BranchesMapSection;
};

const TOPO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/** Kraków [długość, szerokość] */
const KRAKOW: [number, number] = [19.945, 50.0647];

const MAP_W = 1000;
const MAP_H = 520;

const MAP_FILL = "#e4e4e7";
const MAP_STROKE = "#a1a1aa";
const HOVER_RED = "#ef4444";
const POLAND_RED = "#dc2626";
const POLAND_STROKE = "#991b1b";
const KRAKOW_DOT = "#7f1d1d";

const EUROPE_ISO_FALLBACK = new Set([
  "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE",
  "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "XK", "LV", "LI", "LT",
  "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU",
  "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA", "FO", "GI",
]);

function isEuropeGeo(iso: string | undefined, regionUn: string | undefined) {
  if (!iso || iso === "-99") return false;
  if (regionUn === "Europe") return true;
  return EUROPE_ISO_FALLBACK.has(iso);
}

function tooltipLine(
  locale: "pl" | "en",
  name: string,
  n: number,
  d: BranchesMapSection
) {
  if (locale === "en") {
    const w = n === 1 ? d.branchWordEnSingular : d.branchWordEnPlural;
    return `${name} — ${n} ${w}`;
  }
  let w: string;
  if (n === 1) w = d.branchWordPlOne;
  else if (n >= 2 && n <= 4) w = d.branchWordPlFew;
  else w = d.branchWordPlMany;
  return `${name} — ${n} ${w}`;
}

type TopoRoot = {
  objects: { countries: Parameters<typeof feature>[1] };
};

export function EuropeBranchesSection({ data }: Props) {
  const { locale } = useLocale();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [topo, setTopo] = useState<unknown>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [polandPeek, setPolandPeek] = useState(false);
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [tip, setTip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const loc = locale === "en" ? "en" : "pl";

  const projection = useMemo(
    () =>
      geoMercator()
        .scale(760)
        .center([18.5, 52.2])
        .translate([MAP_W / 2, MAP_H / 2]),
    []
  );

  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const europeFeatures = useMemo(() => {
    if (!topo) return [];
    try {
      const t = topo as TopoRoot;
      const fc = feature(t, t.objects.countries) as FeatureCollection;
      return fc.features.filter((f) => {
        const p = f.properties as Record<string, string> | null;
        return isEuropeGeo(p?.ISO_A2, p?.REGION_UN);
      });
    } catch {
      return [];
    }
  }, [topo]);

  const krakowXY = useMemo(() => projection(KRAKOW), [projection]);

  useEffect(() => {
    let cancelled = false;
    fetch(TOPO_URL)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json) => {
        if (!cancelled) setTopo(json);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(
            loc === "en"
              ? "Could not load the map."
              : "Nie udało się wczytać mapy."
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [loc]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.setTimeout(() => setPolandPeek(true), 120);
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lookup = useCallback(
    (iso: string) => data.countries[iso],
    [data.countries]
  );

  const showTip = useCallback(
    (iso: string, fallbackName: string, clientX: number, clientY: number) => {
      const row = lookup(iso);
      const name = row?.name ?? fallbackName;
      const n = row?.branches ?? 0;
      setTip({
        text: tooltipLine(loc, name, n, data),
        x: clientX,
        y: clientY,
      });
    },
    [data, loc, lookup]
  );

  return (
    <section
      ref={sectionRef}
      id="mapa-europy"
      className="scroll-mt-14 border-t border-white/[0.08] bg-black px-4 py-10 sm:py-12 md:py-16"
      aria-labelledby="europe-map-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-1 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] sm:text-[0.75rem]">
          {data.eyebrow}
        </p>
        <h2
          id="europe-map-heading"
          className="text-center text-lg font-bold tracking-[-0.02em] sm:text-xl md:text-2xl"
        >
          {data.title}
        </h2>
        {data.intro ? (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)] md:text-[0.9375rem]">
            {data.intro}
          </p>
        ) : null}

        <div className="relative mt-8 w-full md:mt-10">
          {loadError ? (
            <p className="text-center text-sm text-red-400">{loadError}</p>
          ) : null}
          {!topo && !loadError ? (
            <p className="text-center text-sm text-[var(--muted)]">
              {loc === "en" ? "Loading map…" : "Ładowanie mapy…"}
            </p>
          ) : null}

          {topo ? (
            <div
              className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0c]"
              onMouseLeave={() => {
                setHoveredIso(null);
                setTip(null);
              }}
            >
              <svg
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="block h-auto w-full max-w-full"
                role="img"
                aria-label={data.title}
              >
                {europeFeatures.map((f, idx) => {
                  const p = (f.properties ?? {}) as Record<string, string>;
                  const iso = p.ISO_A2 ?? "";
                  const isPL = iso === "PL";
                  const isHovered = hoveredIso === iso;
                  const fallbackName =
                    p.NAME_EN ?? p.NAME ?? p.ADMIN ?? iso;

                  let fill = MAP_FILL;
                  if (isPL && polandPeek) fill = POLAND_RED;
                  else if (isHovered) fill = isPL ? POLAND_RED : HOVER_RED;

                  let stroke = MAP_STROKE;
                  if (isPL && polandPeek) stroke = POLAND_STROKE;
                  else if (isHovered)
                    stroke = isPL ? POLAND_STROKE : "#b91c1c";

                  const strokeW =
                    isPL && polandPeek ? 0.95 : isHovered ? 0.55 : 0.35;

                  const d = pathGen(f);
                  if (!d) return null;

                  const polandLift =
                    isPL && polandPeek
                      ? "motion-safe:-translate-y-1.5 motion-safe:md:-translate-y-2 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:[transform-box:fill-box] motion-safe:[transform-origin:center]"
                      : "transition-[fill,stroke,stroke-width] duration-150";

                  const pathEl = (
                    <path
                      d={d}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeW}
                      vectorEffect="non-scaling-stroke"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        setHoveredIso(iso);
                        showTip(
                          iso,
                          fallbackName,
                          e.clientX,
                          e.clientY
                        );
                      }}
                      onMouseMove={(e) => {
                        setTip((t) =>
                          t
                            ? {
                                ...t,
                                x: e.clientX,
                                y: e.clientY,
                              }
                            : null
                        );
                      }}
                    />
                  );

                  return (
                    <g
                      key={iso || `geo-${idx}`}
                      className={`${polandLift} ${
                        isPL && polandPeek
                          ? "motion-safe:drop-shadow-[0_-10px_18px_rgba(220,38,38,0.55)]"
                          : ""
                      }`}
                    >
                      {pathEl}
                    </g>
                  );
                })}

                {krakowXY ? (
                  <circle
                    cx={krakowXY[0]}
                    cy={krakowXY[1]}
                    r={5}
                    fill={KRAKOW_DOT}
                    stroke="rgba(255,255,255,0.88)"
                    strokeWidth={1.2}
                    className="pointer-events-none"
                  />
                ) : null}
              </svg>

              {tip ? (
                <div
                  className="pointer-events-none fixed z-[60] max-w-[min(90vw,18rem)] rounded-md border border-white/15 bg-[#141416] px-3 py-2 text-left text-xs font-medium text-[var(--text)] shadow-xl"
                  style={{
                    left: tip.x + 14,
                    top: tip.y + 14,
                  }}
                  role="status"
                >
                  {tip.text}
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="mt-6 text-center text-[0.65rem] uppercase tracking-[0.2em] text-[rgba(244,246,249,0.35)]">
            {data.hint}
          </p>
        </div>
      </div>
    </section>
  );
}
