"use client";

import {
  ABOUT_MAP_VIEWBOX,
  MAP_CLIP,
  PATH_AUSTRIA,
  PATH_BELARUS,
  PATH_CZECHIA,
  PATH_GERMANY,
  PATH_HUNGARY,
  PATH_LITHUANIA,
  PATH_POLAND,
  PATH_SLOVAKIA,
  PATH_UKRAINE,
} from "@/data/aboutEuropeMapPaths";
import type { MapBranchCountry } from "@/content/mapBranches";
import { useCallback, useId, useMemo, useState } from "react";

const NEIGHBOR_FILL = "rgba(244,246,249,0.055)";
const NEIGHBOR_STROKE = "rgba(244,246,249,0.11)";
const HOVER_FILL = "var(--accent)";
const HOVER_STROKE = "rgba(255,255,255,0.35)";

type CountryLayer = {
  key: string;
  path: string;
  isPoland: boolean;
};

const LAYERS: CountryLayer[] = [
  { key: "DE", path: PATH_GERMANY, isPoland: false },
  { key: "LT", path: PATH_LITHUANIA, isPoland: false },
  { key: "BY", path: PATH_BELARUS, isPoland: false },
  { key: "UA", path: PATH_UKRAINE, isPoland: false },
  { key: "CZ", path: PATH_CZECHIA, isPoland: false },
  { key: "SK", path: PATH_SLOVAKIA, isPoland: false },
  { key: "AT", path: PATH_AUSTRIA, isPoland: false },
  { key: "HU", path: PATH_HUNGARY, isPoland: false },
  { key: "PL", path: PATH_POLAND, isPoland: true },
];

const NEIGHBOR_PAINT_ORDER = [
  "UA",
  "DE",
  "BY",
  "LT",
  "AT",
  "HU",
  "CZ",
  "SK",
] as const;

type Props = {
  mapBranches: Record<string, MapBranchCountry>;
  locale: "pl" | "en";
};

export function AboutEuropeMap({ mapBranches, locale }: Props) {
  const clipId = useId().replace(/:/g, "");
  const gradId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState<string | null>(null);

  const onEnter = useCallback((key: string) => () => {
    setHovered(key);
  }, []);

  const onLeave = useCallback(() => {
    setHovered(null);
  }, []);

  const neighborsOrdered = useMemo(() => {
    return NEIGHBOR_PAINT_ORDER.map((key) => {
      const layer = LAYERS.find((l) => l.key === key);
      if (!layer) throw new Error(`Missing layer ${key}`);
      return layer;
    });
  }, []);

  const poland = LAYERS.find((l) => l.isPoland)!;

  const plBranches = mapBranches.PL?.branches ?? 0;
  const plDefaultFill =
    plBranches > 0 ? `url(#${gradId})` : NEIGHBOR_FILL;

  const fillNeighbor = (key: string) =>
    hovered === key ? HOVER_FILL : NEIGHBOR_FILL;

  const polandFill =
    hovered != null && hovered !== "PL"
      ? NEIGHBOR_FILL
      : hovered === "PL"
        ? `url(#${gradId})`
        : plDefaultFill;

  const strokeFor = (key: string) =>
    hovered === key ? HOVER_STROKE : NEIGHBOR_STROKE;

  const polandStroke =
    hovered === "PL" || (plBranches > 0 && hovered === null)
      ? "rgba(255,255,255,0.24)"
      : strokeFor("PL");

  return (
    <div className="relative flex w-full max-w-full items-center justify-center overflow-x-clip overflow-y-visible bg-[var(--bg)] py-[clamp(1.25rem,4vh,3rem)] md:py-[clamp(1rem,3vh,2.5rem)]">
      {/* Środek pośwaty w stronę mapy (prawa część kolumny) — mniej twarde „ucięcie” po lewej */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_72%_at_58%_48%,rgba(229,42,48,0.085)_0%,transparent_62%)]" />

      <svg
        viewBox={ABOUT_MAP_VIEWBOX}
        className="relative z-[1] h-auto w-full max-w-full cursor-default px-3 max-h-[min(85vh,640px)] sm:max-h-[min(87vh,700px)] xl:max-h-[min(89vh,800px)] xl:px-5 2xl:max-h-[min(92vh,900px)] 2xl:px-6"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={
          locale === "en"
            ? "Map of Central Europe — hover highlights a country"
            : "Mapa Europy Środkowej — najechanie podświetla kraj"
        }
      >
        <defs>
          <clipPath id={clipId}>
            <rect
              x={MAP_CLIP.x}
              y={MAP_CLIP.y}
              width={MAP_CLIP.width}
              height={MAP_CLIP.height}
            />
          </clipPath>
          <linearGradient
            id={gradId}
            x1="0%"
            y1="0%"
            x2="85%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4e54" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {neighborsOrdered.map(({ key, path }) => (
            <path
              key={key}
              d={path}
              fill={fillNeighbor(key)}
              stroke={strokeFor(key)}
              strokeWidth={hovered === key ? 1.2 : 0.85}
              className="transition-[fill,stroke-width] duration-200 ease-out"
              style={{ cursor: "pointer" }}
              onPointerEnter={onEnter(key)}
              onPointerLeave={onLeave}
            />
          ))}
        </g>

        <g clipPath={`url(#${clipId})`}>
          <g transform="translate(-4, 4)">
            <path
              d={poland.path}
              fill={
                hovered != null && hovered !== "PL"
                  ? "#2a080a"
                  : hovered === "PL"
                    ? "#3a0b0e"
                    : "#4a0d10"
              }
              opacity={hovered != null && hovered !== "PL" ? 0.35 : 0.45}
              className="transition-[fill,opacity] duration-200"
              style={{ pointerEvents: "none" }}
            />
          </g>
          <path
            d={poland.path}
            fill={polandFill}
            stroke={polandStroke}
            strokeWidth={
              hovered === "PL" || (plBranches > 0 && hovered === null)
                ? 1.25
                : 1.1
            }
            className="transition-[fill,stroke-width] duration-200 ease-out"
            style={{ cursor: "pointer" }}
            onPointerEnter={onEnter("PL")}
            onPointerLeave={onLeave}
          />
        </g>
      </svg>
    </div>
  );
}
