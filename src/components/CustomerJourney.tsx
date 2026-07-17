"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { translateCopy } from "@/lib/localized-content";
import { useLocaleSettings } from "./LocaleProvider";
import { TrailerMarker } from "./TrailerMarker";

const MAP_WIDTH = 720;
const MAP_HEIGHT = 980;

const mapBounds = {
  minLon: 5.75,
  maxLon: 15.2,
  minLat: 47.2,
  maxLat: 55.2,
};

type Stop = {
  id: string;
  city: string;
  lon: number;
  lat: number;
  cardClass: string;
  routeStop: boolean;
  arrivalProgress?: number;
  routeLabel?: string;
  labelDx?: number;
  labelDy?: number;
  images: string[];
};

const stops: Stop[] = [
  {
    id: "bremen",
    city: "Bremen",
    lon: 8.8017,
    lat: 53.0793,
    cardClass: "left-0 top-[7%] w-[21rem]",
    routeStop: true,
    arrivalProgress: 0,
    routeLabel: "Start Bremen",
    labelDx: -92,
    labelDy: -20,
    images: [
      "/images/kunden/bremen-1.jpg",
      "/images/kunden/bremen-2.jpg",
      "/images/kunden/bremen-3.jpg",
    ],
  },
  {
    id: "berlin",
    city: "Berlin",
    lon: 13.405,
    lat: 52.52,
    cardClass: "right-0 top-[17%] w-[20rem]",
    routeStop: true,
    arrivalProgress: 0.2499,
    routeLabel: "Berlin",
    labelDx: 18,
    labelDy: 6,
    images: [
      "/images/kunden/berlin-1.jpg",
      "/images/kunden/berlin-2.jpg",
      "/images/kunden/berlin-3.jpg",
    ],
  },
  {
    id: "koeln",
    city: "Köln",
    lon: 6.9603,
    lat: 50.9375,
    cardClass: "left-4 top-[47%] w-[21rem]",
    routeStop: true,
    arrivalProgress: 0.6516,
    routeLabel: "Köln",
    labelDx: 18,
    labelDy: 6,
    images: [
      "/images/kunden/koeln-1.jpg",
      "/images/kunden/koeln-2.jpg",
      "/images/kunden/koeln-3.jpg",
    ],
  },
  {
    id: "muenchen",
    city: "München",
    lon: 11.582,
    lat: 48.1351,
    cardClass: "right-[7%] bottom-0 w-[22rem]",
    routeStop: true,
    arrivalProgress: 0.985,
    routeLabel: "München",
    labelDx: 18,
    labelDy: 6,
    images: [
      "/images/kunden/muenchen-1.jpg",
      "/images/kunden/muenchen-2.jpg",
      "/images/kunden/muenchen-3.jpg",
    ],
  },
];

// Vereinfachte OSRM-Fahrroute Bremen -> Berlin -> Köln -> München.
// Die Route bleibt relativ direkt, trennt aber Hin- und Rückspur leicht voneinander.
const routeCoordinates = [
  [8.8017, 53.0793],
  [8.8547, 53.1146],
  [9.0783, 53.0156],
  [9.4081, 52.9022],
  [9.6648, 52.765],
  [9.87, 52.6856],
  [10.0462, 52.6384],
  [10.0795, 52.6216],
  [10.1753, 52.5484],
  [10.344, 52.4208],
  [10.5137, 52.3152],
  [10.9336, 52.2789],
  [11.1499, 52.2083],
  [11.3914, 52.1872],
  [11.6212, 52.1839],
  [11.6336, 52.1351],
  [11.6252, 52.1342],
  [11.6454, 52.1999],
  [11.9786, 52.2358],
  [12.2569, 52.249],
  [12.6407, 52.3399],
  [12.9749, 52.3032],
  [13.1568, 52.3892],
  [13.2793, 52.5029],
  [13.3315, 52.5132],
  [13.4011, 52.5183],
  [13.3502, 52.5151],
  [13.2891, 52.5105],
  [13.1887, 52.4037],
  [13.0353, 52.2986],
  [12.8109, 52.1699],
  [12.5028, 51.9752],
  [12.3034, 51.8168],
  [12.1867, 51.5567],
  [12.0498, 51.5081],
  [11.9668, 51.4917],
  [11.8987, 51.4748],
  [11.7693, 51.4012],
  [11.3325, 51.4412],
  [11.042, 51.4665],
  [10.7801, 51.4719],
  [10.6036, 51.4339],
  [10.3981, 51.4017],
  [10.1446, 51.4043],
  [9.9111, 51.4071],
  [9.9006, 51.5314],
  [9.9267, 51.5334],
  [9.8493, 51.4375],
  [9.6771, 51.3987],
  [9.5129, 51.2611],
  [9.2814, 51.3349],
  [9.1291, 51.4531],
  [8.8627, 51.5373],
  [8.4282, 51.5899],
  [7.8137, 51.5301],
  [7.5178, 51.5045],
  [7.4681, 51.51],
  [7.4827, 51.4561],
  [7.4521, 51.3984],
  [7.2622, 51.2997],
  [7.2527, 51.2106],
  [7.1518, 51.1167],
  [7.0099, 51.0306],
  [6.9845, 50.9446],
  [6.9772, 50.9293],
  [7.0976, 50.8515],
  [7.2294, 50.7639],
  [7.4144, 50.617],
  [7.6154, 50.5254],
  [7.7757, 50.4556],
  [7.8972, 50.4527],
  [7.9494, 50.4134],
  [8.158, 50.3548],
  [8.2524, 50.2054],
  [8.4053, 50.0447],
  [8.6573, 50.0606],
  [8.9205, 50.0512],
  [9.249, 49.9959],
  [9.373, 49.9064],
  [9.5113, 49.8392],
  [9.5796, 49.7711],
  [9.8241, 49.7485],
  [9.992, 49.7388],
  [10.238, 49.7801],
  [10.4684, 49.7708],
  [10.7103, 49.7309],
  [10.9181, 49.629],
  [11.1283, 49.5018],
  [11.2036, 49.3512],
  [11.33, 49.0521],
  [11.4384, 48.9468],
  [11.4794, 48.7209],
  [11.5951, 48.537],
  [11.6159, 48.3249],
  [11.591, 48.1751],
  [11.5843, 48.1377],
  [11.5821, 48.1352],
];

// Deutschlandumriss aus deutschlandGeoJSON, für die Website vereinfacht.
const germanyOutline = [
  [5.8716, 51.0508],
  [6.1718, 51.1529],
  [6.0782, 51.2447],
  [6.232, 51.366],
  [6.2204, 51.5092],
  [5.964, 51.7416],
  [5.9721, 51.8319],
  [6.169, 51.845],
  [6.1071, 51.889],
  [6.1589, 51.9054],
  [6.4175, 51.8256],
  [6.4023, 51.8748],
  [6.7427, 51.8991],
  [6.8354, 51.9955],
  [6.7007, 52.0738],
  [7.0693, 52.2393],
  [7.0063, 52.4695],
  [6.7649, 52.4649],
  [6.6838, 52.5561],
  [6.7683, 52.5652],
  [6.7438, 52.6471],
  [7.0519, 52.6358],
  [7.0943, 52.8465],
  [7.2615, 52.9975],
  [7.2492, 53.3299],
  [6.9986, 53.3613],
  [7.0397, 53.5382],
  [7.3169, 53.6835],
  [8.0158, 53.7107],
  [8.1725, 53.5546],
  [8.0736, 53.4649],
  [8.2525, 53.399],
  [8.3164, 53.4663],
  [8.2308, 53.5204],
  [8.2719, 53.6099],
  [8.5708, 53.5182],
  [8.4836, 53.6943],
  [8.6081, 53.8787],
  [9.0997, 53.8629],
  [8.8197, 54.0215],
  [8.9825, 54.0465],
  [8.8075, 54.1732],
  [8.9519, 54.3129],
  [8.5803, 54.304],
  [8.6858, 54.3571],
  [8.6086, 54.3862],
  [9.0236, 54.4726],
  [8.8064, 54.4704],
  [8.8903, 54.5926],
  [8.5245, 54.8826],
  [8.6938, 54.9143],
  [9.4353, 54.7885],
  [9.6136, 54.876],
  [9.8431, 54.7562],
  [9.9553, 54.7801],
  [10.0347, 54.6724],
  [9.5453, 54.5093],
  [9.7147, 54.4912],
  [10.0342, 54.6699],
  [10.0275, 54.5504],
  [9.8403, 54.4674],
  [10.1992, 54.456],
  [10.1319, 54.3112],
  [10.3186, 54.4357],
  [10.7047, 54.3049],
  [11.1281, 54.3907],
  [11.0586, 54.3543],
  [11.0936, 54.1979],
  [10.7542, 54.0549],
  [10.8908, 53.9557],
  [11.1792, 54.0157],
  [11.4547, 53.9004],
  [11.4836, 53.9685],
  [11.3781, 53.9974],
  [11.4925, 54.0229],
  [11.4903, 53.9682],
  [11.6225, 54.076],
  [11.5325, 54.049],
  [11.5564, 54.0954],
  [12.1247, 54.1501],
  [12.5197, 54.4843],
  [12.9625, 54.4376],
  [12.6708, 54.4226],
  [12.8103, 54.3451],
  [13.0197, 54.439],
  [13.1058, 54.2818],
  [13.4158, 54.1751],
  [13.4569, 54.0907],
  [13.7186, 54.164],
  [13.8069, 54.1032],
  [13.7442, 54.0293],
  [13.9142, 53.9224],
  [13.8247, 53.8662],
  [13.9375, 53.9085],
  [13.9058, 53.9899],
  [13.9597, 53.934],
  [14.0469, 53.9965],
  [13.9742, 54.0638],
  [13.7692, 54.019],
  [13.8125, 54.099],
  [13.7492, 54.159],
  [13.8125, 54.1774],
  [14.2214, 53.9301],
  [14.2173, 53.8654],
  [13.8064, 53.8582],
  [14.2831, 53.7388],
  [14.2153, 53.7026],
  [14.3249, 53.6186],
  [14.4489, 53.2616],
  [14.3457, 53.0529],
  [14.1425, 52.9611],
  [14.1213, 52.8403],
  [14.6391, 52.58],
  [14.5289, 52.3964],
  [14.5709, 52.2896],
  [14.6996, 52.2411],
  [14.6693, 52.1216],
  [14.7413, 52.0734],
  [14.5867, 51.8236],
  [14.7387, 51.6669],
  [14.6981, 51.5585],
  [14.9339, 51.4823],
  [15.0381, 51.2403],
  [14.8051, 50.8289],
  [14.6119, 50.8548],
  [14.6517, 50.9326],
  [14.5601, 50.9235],
  [14.5951, 50.9885],
  [14.5017, 51.0515],
  [14.294, 51.0542],
  [14.2469, 50.9732],
  [14.4009, 50.9423],
  [14.3723, 50.8886],
  [13.8508, 50.7182],
  [13.549, 50.7132],
  [13.4652, 50.5965],
  [13.3749, 50.6437],
  [13.196, 50.5006],
  [13.0333, 50.5085],
  [12.977, 50.4143],
  [12.5161, 50.4001],
  [12.3276, 50.1797],
  [12.1941, 50.3229],
  [12.0859, 50.2554],
  [12.256, 50.0623],
  [12.5477, 49.9271],
  [12.4029, 49.7552],
  [12.5279, 49.6878],
  [12.6611, 49.4322],
  [13.0336, 49.3086],
  [13.1802, 49.1444],
  [13.4037, 49.0518],
  [13.4016, 48.9839],
  [13.6313, 48.9506],
  [13.836, 48.7751],
  [13.8099, 48.5909],
  [13.7211, 48.5168],
  [13.5032, 48.5965],
  [13.4106, 48.3777],
  [12.753, 48.1173],
  [13.0011, 47.8522],
  [12.9113, 47.7312],
  [13.0816, 47.6914],
  [13.0538, 47.4949],
  [12.7998, 47.5615],
  [12.7828, 47.6759],
  [12.5061, 47.6289],
  [12.436, 47.7007],
  [12.2588, 47.6762],
  [12.2543, 47.74],
  [12.1744, 47.6989],
  [12.2093, 47.6012],
  [11.6363, 47.5983],
  [11.2739, 47.391],
  [10.9775, 47.3961],
  [10.863, 47.478],
  [10.8831, 47.5381],
  [10.4322, 47.5856],
  [10.4716, 47.4331],
  [10.2316, 47.2699],
  [10.1647, 47.2736],
  [10.2269, 47.3929],
  [10.096, 47.3549],
  [10.0908, 47.4566],
  [9.9712, 47.5505],
  [9.7742, 47.5968],
  [9.6887, 47.544],
  [9.044, 47.8237],
  [9.2129, 47.69],
  [9.1641, 47.6536],
  [8.9916, 47.748],
  [8.9419, 47.662],
  [8.8082, 47.7417],
  [8.7279, 47.6968],
  [8.7304, 47.7661],
  [8.568, 47.8144],
  [8.4044, 47.68],
  [8.6071, 47.676],
  [8.5847, 47.6003],
  [7.6078, 47.581],
  [7.5121, 47.6961],
  [7.6222, 47.9737],
  [7.5779, 48.1214],
  [7.7452, 48.3298],
  [7.8359, 48.6337],
  [8.2289, 48.9706],
  [7.6353, 49.0542],
  [7.4456, 49.184],
  [7.2934, 49.1152],
  [7.058, 49.1126],
  [6.9243, 49.2231],
  [6.738, 49.1646],
  [6.5354, 49.4342],
  [6.3548, 49.465],
  [6.5283, 49.8086],
  [6.3123, 49.8355],
  [6.0984, 50.0599],
  [6.1704, 50.2363],
  [6.4033, 50.3219],
  [6.3747, 50.4459],
  [6.1808, 50.5331],
  [6.2784, 50.6164],
  [5.9632, 50.7951],
  [6.0829, 50.9218],
  [5.8716, 51.0508],
  [5.8716, 51.0508],
];

function project([lon, lat]: number[]) {
  return {
    x: ((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * MAP_WIDTH,
    y: ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * MAP_HEIGHT,
  };
}

function pathFromCoordinates(points: number[][]) {
  return points
    .map((point, i) => {
      const { x, y } = project(point);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const routePath = pathFromCoordinates(routeCoordinates);
const outlinePath = pathFromCoordinates(germanyOutline);

function mapScrollToRouteProgress(scrollProgress: number) {
  const berlinProgress = 0.2499;
  const koelnProgress = 0.6516;

  if (scrollProgress <= 0.14) return 0;
  if (scrollProgress < 0.35) return ((scrollProgress - 0.14) / 0.21) * berlinProgress;
  if (scrollProgress <= 0.52) return berlinProgress;
  if (scrollProgress < 0.73) {
    return berlinProgress + ((scrollProgress - 0.52) / 0.21) * (koelnProgress - berlinProgress);
  }
  if (scrollProgress <= 0.84) return koelnProgress;
  if (scrollProgress < 0.99) return koelnProgress + ((scrollProgress - 0.84) / 0.15) * (1 - koelnProgress);
  return 1;
}

function CustomerCard({
  stop,
  revealed = true,
  className = "",
}: {
  stop: (typeof stops)[number];
  revealed?: boolean;
  className?: string;
}) {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const [imageIndex, setImageIndex] = useState(0);
  const currentImage = stop.images[imageIndex] ?? stop.images[0];

  function previousImage() {
    setImageIndex((current) => (current - 1 + stop.images.length) % stop.images.length);
  }

  function nextImage() {
    setImageIndex((current) => (current + 1) % stop.images.length);
  }

  return (
    <figure
      className={`overflow-hidden rounded-sm border border-graphit/10 bg-kreide/40 shadow-sm backdrop-blur transition-all duration-500 ${
        revealed ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      } ${className}`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-graphit/5">
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans text-5xl font-black text-graphit/5">
          MINO
        </span>
        <img
          key={currentImage}
          src={currentImage}
          alt={`MINO-Kunde in ${stop.city}, Bild ${imageIndex + 1}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
          className="relative h-full w-full object-cover"
        />
        {stop.images.length > 1 && (
          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label={`${tc("Vorheriges Bild")} ${stop.city}`}
              onClick={previousImage}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-graphit/15 bg-kreide/80 text-graphit shadow-sm backdrop-blur transition-colors hover:bg-kreide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5 rounded-full bg-kreide/80 px-2.5 py-1.5 backdrop-blur">
              {stop.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`${stop.city} ${index + 1} ${tc("Bild anzeigen")}`}
                  onClick={() => setImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    imageIndex === index ? "w-5 bg-graphit" : "w-1.5 bg-graphit/25 hover:bg-graphit/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={`${tc("Nächstes Bild")} ${stop.city}`}
              onClick={nextImage}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-graphit/15 bg-kreide/80 text-graphit shadow-sm backdrop-blur transition-colors hover:bg-kreide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <figcaption className="px-4 py-3">
        <span className="font-sans text-2xl font-black tracking-tight">{stop.city}</span>
      </figcaption>
    </figure>
  );
}

function JourneyMap({
  pathRef,
  pathLen,
  progress,
  engaged,
  marker,
}: {
  pathRef: RefObject<SVGPathElement | null>;
  pathLen: number;
  progress: number;
  engaged: boolean;
  marker: { x: number; y: number; angle: number } | null;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="h-full w-full overflow-visible"
      fill="none"
    >
      <path d={outlinePath} className="fill-graphit/4 stroke-graphit/10" strokeWidth="1.5" />
      <path d={routePath} stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="text-kreide/70" />
      <path d={routePath} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-graphit/18" />
      <path
        ref={pathRef}
        d={routePath}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-graphit/55"
        style={{ strokeDasharray: pathLen || 1, strokeDashoffset: pathLen * (1 - progress) }}
      />
      {stops.map((stop) => {
        if (!stop.routeStop) return null;
        const { x, y } = project([stop.lon, stop.lat]);
        return (
          <g key={stop.id}>
            <circle cx={x} cy={y} r="13" className="fill-kreide stroke-graphit/25" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3.6" className="fill-graphit" />
            {stop.routeLabel && (
              <text
                x={x + (stop.labelDx ?? 16)}
                y={y + (stop.labelDy ?? 6)}
                className="fill-graphit font-sans text-[18px] font-semibold"
                stroke="var(--color-beton)"
                strokeWidth="8"
                paintOrder="stroke"
              >
                {stop.routeLabel}
              </text>
            )}
          </g>
        );
      })}
      {engaged && marker && <TrailerMarker x={marker.x} y={marker.y} angle={marker.angle} scale={0.82} />}
    </svg>
  );
}

export function CustomerJourney() {
  const { region } = useLocaleSettings();
  const tc = (text: string) => translateCopy(text, region.languageCode);
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [marker, setMarker] = useState<{ x: number; y: number; angle: number } | null>(null);
  const reduced = useRef(false);
  const revealedStops = stops.filter((stop) => stop.routeStop && progress >= (stop.arrivalProgress ?? 0) - 0.015);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (reduced.current) {
      setProgress(1);
      setEngaged(true);
      return;
    }
    let ticking = false;
    function update() {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const vh = window.innerHeight;
      const journeyRect = journeyRef.current?.getBoundingClientRect();
      const rect = journeyRect && journeyRect.height > 0 ? journeyRect : section.getBoundingClientRect();
      const total = rect.height - vh;
      const scrollProgress = total > 0 ? Math.min(1, Math.max(0, (vh * 0.18 - rect.top) / total)) : rect.top < 0 ? 1 : 0;
      setProgress(mapScrollToRouteProgress(scrollProgress));
      setEngaged(rect.top <= vh * 0.55);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || pathLen === 0) {
      setMarker(null);
      return;
    }
    const distance = pathLen * progress;
    const here = path.getPointAtLength(distance);
    const behind = path.getPointAtLength(Math.max(0, distance - 1));
    const ahead = path.getPointAtLength(Math.min(pathLen, distance + 1));
    setMarker({
      x: here.x,
      y: here.y,
      angle: Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * (180 / Math.PI) + 90,
    });
  }, [progress, pathLen]);

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-7xl border-t border-graphit/10 px-6 pt-24 pb-24 lg:px-10 lg:pt-32 lg:pb-32">
      <div className="max-w-md">
        <Eyebrow>{tc("Auf dem Weg zu dir")}</Eyebrow>
        <h2 className="mt-4 text-4xl leading-[0.95] tracking-normal lg:text-6xl">
          <span className="font-serif font-medium">{tc("Von Bremen")}</span>
          <br />
          <span className="font-sans font-black tracking-tight">{tc("bis München.")}</span>
        </h2>
        <p className="mt-5 font-sans text-lg leading-8 text-graphit/70">
          {tc("Überall in Deutschland stehen MINO-Anhänger — und dahinter Menschen, die ihren Traum längst leben.")}
        </p>
      </div>

      <div ref={journeyRef} className="relative mt-16 hidden min-h-[190rem] lg:block">
        <div className="sticky top-8 h-[calc(100vh-4rem)] min-h-[44rem]">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-full max-h-[64rem] aspect-[720/980] -translate-x-1/2 -translate-y-1/2">
            <JourneyMap pathRef={pathRef} pathLen={pathLen} progress={progress} engaged={engaged} marker={marker} />
          </div>
          {stops.filter((stop) => stop.routeStop).map((stop) => (
            <CustomerCard
              key={stop.id}
              stop={stop}
              revealed={progress >= (stop.arrivalProgress ?? 0) - 0.015}
              className={`absolute ${stop.cardClass}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-14 lg:hidden">
        <div className="mx-auto aspect-[720/980] w-full max-w-sm">
          <JourneyMap pathRef={pathRef} pathLen={pathLen} progress={progress} engaged={engaged} marker={marker} />
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {revealedStops.map((stop) => (
            <li key={stop.id}>
              <CustomerCard stop={stop} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
