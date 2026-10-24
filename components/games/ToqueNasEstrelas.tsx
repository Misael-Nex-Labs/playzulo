"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { soundManager } from "@/lib/sounds";

interface StarItem {
  id: number;
  name: string;
  x: number;
  y: number;
  size: number;
  fill: string;
  stroke: string;
  glow: string;
  floatDuration: number;
  floatDelay: number;
  pulseCount: number;
  isAwake: boolean;
}

interface BurstStar {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
  rotate: number;
}

// Constelações / arranjos espaçados para que as estrelas nunca se sobreponham
// nem fiquem em cima da lua (canto superior direito) ou das colinas (base)
const CONSTELLATION_LAYOUTS: { x: number; y: number }[][] = [
  [
    { x: 18, y: 24 },
    { x: 48, y: 18 },
    { x: 76, y: 28 },
    { x: 31, y: 46 },
    { x: 64, y: 45 },
    { x: 16, y: 66 },
    { x: 47, y: 68 },
    { x: 82, y: 64 },
  ],
  [
    { x: 24, y: 20 },
    { x: 56, y: 22 },
    { x: 15, y: 44 },
    { x: 42, y: 38 },
    { x: 72, y: 40 },
    { x: 28, y: 66 },
    { x: 58, y: 64 },
    { x: 84, y: 58 },
  ],
  [
    { x: 16, y: 30 },
    { x: 38, y: 18 },
    { x: 64, y: 24 },
    { x: 26, y: 52 },
    { x: 52, y: 48 },
    { x: 78, y: 46 },
    { x: 38, y: 70 },
    { x: 68, y: 68 },
  ],
  [
    { x: 20, y: 22 },
    { x: 46, y: 28 },
    { x: 74, y: 32 },
    { x: 18, y: 52 },
    { x: 48, y: 54 },
    { x: 80, y: 54 },
    { x: 32, y: 70 },
    { x: 64, y: 70 },
  ],
];

const INITIAL_STARS: Omit<StarItem, "pulseCount" | "isAwake">[] = [
  {
    id: 0,
    name: "Estrela Pêssego",
    x: CONSTELLATION_LAYOUTS[0][0].x,
    y: CONSTELLATION_LAYOUTS[0][0].y,
    size: 76,
    fill: "#ffe0b2",
    stroke: "#eab676",
    glow: "rgba(255, 224, 178, 0.75)",
    floatDuration: 4.2,
    floatDelay: 0,
  },
  {
    id: 1,
    name: "Estrela Creme",
    x: CONSTELLATION_LAYOUTS[0][1].x,
    y: CONSTELLATION_LAYOUTS[0][1].y,
    size: 84,
    fill: "#fff9c4",
    stroke: "#dfca78",
    glow: "rgba(255, 249, 196, 0.8)",
    floatDuration: 4.8,
    floatDelay: 0.4,
  },
  {
    id: 2,
    name: "Estrela Rosa Chá",
    x: CONSTELLATION_LAYOUTS[0][2].x,
    y: CONSTELLATION_LAYOUTS[0][2].y,
    size: 74,
    fill: "#f8bbd0",
    stroke: "#d88fa8",
    glow: "rgba(248, 187, 208, 0.75)",
    floatDuration: 4.5,
    floatDelay: 0.8,
  },
  {
    id: 3,
    name: "Estrela Menta",
    x: CONSTELLATION_LAYOUTS[0][3].x,
    y: CONSTELLATION_LAYOUTS[0][3].y,
    size: 70,
    fill: "#d4e6a5",
    stroke: "#ABBB6C",
    glow: "rgba(171, 187, 108, 0.65)",
    floatDuration: 5.0,
    floatDelay: 0.2,
  },
  {
    id: 4,
    name: "Estrela Dourada Suave",
    x: CONSTELLATION_LAYOUTS[0][4].x,
    y: CONSTELLATION_LAYOUTS[0][4].y,
    size: 82,
    fill: "#ffe0b2",
    stroke: "#e2ae6c",
    glow: "rgba(255, 224, 178, 0.8)",
    floatDuration: 4.4,
    floatDelay: 0.6,
  },
  {
    id: 5,
    name: "Estrela Sonhadora",
    x: CONSTELLATION_LAYOUTS[0][5].x,
    y: CONSTELLATION_LAYOUTS[0][5].y,
    size: 72,
    fill: "#fff9c4",
    stroke: "#dfca78",
    glow: "rgba(255, 249, 196, 0.75)",
    floatDuration: 4.7,
    floatDelay: 1.0,
  },
  {
    id: 6,
    name: "Estrela Doce",
    x: CONSTELLATION_LAYOUTS[0][6].x,
    y: CONSTELLATION_LAYOUTS[0][6].y,
    size: 78,
    fill: "#f8bbd0",
    stroke: "#d88fa8",
    glow: "rgba(248, 187, 208, 0.75)",
    floatDuration: 4.3,
    floatDelay: 0.3,
  },
  {
    id: 7,
    name: "Estrela Serena",
    x: CONSTELLATION_LAYOUTS[0][7].x,
    y: CONSTELLATION_LAYOUTS[0][7].y,
    size: 74,
    fill: "#ffe0b2",
    stroke: "#eab676",
    glow: "rgba(255, 224, 178, 0.75)",
    floatDuration: 4.9,
    floatDelay: 0.7,
  },
];

function shufflePositions(positions: { x: number; y: number }[]) {
  const copy = [...positions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.map((pos) => ({
    x: Math.max(14, Math.min(84, pos.x + (Math.random() - 0.5) * 6)),
    y: Math.max(18, Math.min(72, pos.y + (Math.random() - 0.5) * 6)),
  }));
}

function RoundedStarSvg({
  fill,
  stroke,
  isAwake,
}: {
  fill: string;
  stroke: string;
  isAwake: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full overflow-visible select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Corpo da estrela de 5 pontas com cantos arredondados e macios */}
      <polygon
        points="50,8 62,34 91,38 70,58 75,87 50,73 25,87 30,58 9,38 38,34"
        fill={fill}
        stroke={stroke}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Brilho interno superior para aspecto de brinquedo de madeira/pelúcia */}
      <ellipse
        cx="43"
        cy="30"
        rx="9"
        ry="5"
        transform="rotate(-22 43 30)"
        fill="rgba(255, 255, 255, 0.55)"
      />

      {/* Bochechas suaves */}
      <circle
        cx="35"
        cy="56"
        r="4.5"
        fill="#f8bbd0"
        opacity={isAwake ? 0.85 : 0.45}
      />
      <circle
        cx="65"
        cy="56"
        r="4.5"
        fill="#f8bbd0"
        opacity={isAwake ? 0.85 : 0.45}
      />

      {/* Olhinhos e sorriso zen */}
      {isAwake ? (
        <g stroke="#607d8b" strokeWidth="3.2" strokeLinecap="round" fill="none">
          {/* Olhinhos felizes arqueados */}
          <path d="M 36 49 Q 40 44 44 49" />
          <path d="M 56 49 Q 60 44 64 49" />
          {/* Sorriso aberto calmo */}
          <path d="M 44 57 Q 50 63 56 57" />
        </g>
      ) : (
        <g fill="#607d8b">
          <circle cx="40" cy="49" r="2.6" />
          <circle cx="60" cy="49" r="2.6" />
          <path
            d="M 46 57 Q 50 60 54 57"
            stroke="#607d8b"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

function MiniStarSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full overflow-visible" aria-hidden="true">
      <polygon
        points="20,3 25,14 37,16 28,24 30,36 20,30 10,36 12,24 3,16 15,14"
        fill={color}
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ToqueNasEstrelas() {
  const [stars, setStars] = useState<StarItem[]>(() =>
    INITIAL_STARS.map((s) => ({
      ...s,
      pulseCount: 0,
      isAwake: false,
    }))
  );
  const [bursts, setBursts] = useState<BurstStar[]>([]);
  const [touchedCount, setTouchedCount] = useState(0);
  const burstIdRef = useRef(0);
  const layoutIndexRef = useRef(0);
  const rearrangeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rearrangeTimerRef.current) {
        window.clearTimeout(rearrangeTimerRef.current);
      }
    };
  }, []);

  const allAwake = stars.every((s) => s.isAwake);

  useEffect(() => {
    if (!allAwake) return;

    rearrangeTimerRef.current = window.setTimeout(() => {
      soundManager.playSuccess();
      layoutIndexRef.current =
        (layoutIndexRef.current + 1) % CONSTELLATION_LAYOUTS.length;
      const nextPositions = shufflePositions(
        CONSTELLATION_LAYOUTS[layoutIndexRef.current]
      );

      setStars((prev) =>
        prev.map((star, index) => ({
          ...star,
          x: nextPositions[index].x,
          y: nextPositions[index].y,
          isAwake: false,
        }))
      );
    }, 1000);

    return () => {
      if (rearrangeTimerRef.current) {
        window.clearTimeout(rearrangeTimerRef.current);
      }
    };
  }, [allAwake]);

  const spawnBurstAt = (xPercent: number, yPercent: number, baseColor: string) => {
    const angles = [0, 60, 120, 180, 240, 300];
    const palette = [baseColor, "#fff9c4", "#ffe0b2", "#f8bbd0"];
    const newBursts: BurstStar[] = angles.map((deg, idx) => {
      const rad = (deg * Math.PI) / 180;
      const distance = 36 + (idx % 2) * 16;
      return {
        id: burstIdRef.current++,
        x: xPercent,
        y: yPercent,
        dx: Math.cos(rad) * distance,
        dy: Math.sin(rad) * distance,
        color: palette[idx % palette.length],
        size: idx % 2 === 0 ? 22 : 16,
        rotate: (idx % 2 === 0 ? 1 : -1) * 25,
      };
    });

    setBursts((prev) => [...prev.slice(-24), ...newBursts]);

    const idsToRemove = new Set(newBursts.map((b) => b.id));
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !idsToRemove.has(b.id)));
    }, 950);
  };

  const activateStar = (star: StarItem) => {
    soundManager.playStarChime(star.id);
    setTouchedCount((c) => c + 1);

    setStars((prev) =>
      prev.map((item) =>
        item.id === star.id
          ? { ...item, pulseCount: item.pulseCount + 1, isAwake: true }
          : item
      )
    );

    spawnBurstAt(star.x, star.y, star.fill);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#cbe5f6] via-[#e0f7ff] to-[#eef9ff] text-zen-gray select-none"
      style={{ touchAction: "none" }}
      aria-label="Céu de estrelas calmo. Toque nas estrelas para vê-las brilhar e ouvir notas suaves."
    >
      {/* Lua Crescente Suave no canto superior */}
      <motion.div
        className="pointer-events-none absolute right-8 top-6 h-16 w-16 sm:h-20 sm:w-20"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 80 80" className="h-full w-full drop-shadow-sm">
          <path
            d="M 52 14 A 26 26 0 1 0 66 54 A 22 22 0 1 1 52 14 Z"
            fill="#fff9c4"
            stroke="#dfca78"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Nuvens suaves flutuando devagar */}
      <motion.div
        className="pointer-events-none absolute left-[6%] top-[14%] h-10 w-32 rounded-full bg-white/55 blur-[1px]"
        animate={{ x: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[18%] top-[36%] h-8 w-24 rounded-full bg-white/45 blur-[1px]"
        animate={{ x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Colinas suaves na base para dar profundidade acolhedora ao céu */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-6 h-[22%] rounded-t-[50%] bg-[#ABBB6C]/35 scale-x-125"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-8 h-[15%] rounded-t-[45%] bg-[#ABBB6C]/50 scale-x-110"
        aria-hidden="true"
      />

      {/* Estrelas Interativas */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.button
            key={star.id}
            type="button"
            aria-label={star.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-zen-green/50"
            style={{
              width: star.size,
              height: star.size,
              touchAction: "none",
              filter: star.isAwake
                ? `drop-shadow(0 0 18px ${star.glow})`
                : `drop-shadow(0 4px 8px rgba(96, 125, 139, 0.12))`,
            }}
            initial={{
              opacity: 0,
              scale: 0.7,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: 1,
              left: `${star.x}%`,
              top: `${star.y}%`,
              y: [0, -7, 0],
              scale: star.isAwake ? [1, 1.02, 1] : 1,
              rotate: star.isAwake ? [0, 8, -6, 0] : [0, 2, -2, 0],
            }}
            whileTap={{ scale: 0.96 }}
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              left: { duration: 1.1, ease: "easeInOut" },
              top: { duration: 1.1, ease: "easeInOut" },
              y: {
                duration: star.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.floatDelay,
              },
              scale: { duration: 0.6, ease: "easeInOut" },
              rotate: {
                duration: star.isAwake ? 0.7 : 5,
                repeat: star.isAwake ? 0 : Infinity,
                ease: "easeInOut",
              },
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (event.pointerType === "touch") return;
              activateStar(star);
            }}
            onTouchStart={(event) => {
              event.preventDefault();
              event.stopPropagation();
              activateStar(star);
            }}
            onKeyDown={(event) => {
              // Keyboard activation: Enter or Space.
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activateStar(star);
              }
            }}
          >
            {/* Halo luminoso suave quando a estrela acorda */}
            <AnimatePresence>
              {star.isAwake && (
                <motion.span
                  key={`halo-${star.pulseCount}`}
                  initial={{ opacity: 0.75, scale: 0.75 }}
                  animate={{ opacity: 0.35, scale: 1.25 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ backgroundColor: star.fill, filter: "blur(8px)" }}
                />
              )}
            </AnimatePresence>

            <RoundedStarSvg
              fill={star.fill}
              stroke={star.stroke}
              isAwake={star.isAwake}
            />
          </motion.button>
        ))}
      </div>

      {/* Mini-estrelas que se espalham suavemente ao tocar */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0.95, scale: 0.5, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: 0,
                scale: 1.02,
                x: b.dx,
                y: b.dy,
                rotate: b.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                marginLeft: -b.size / 2,
                marginTop: -b.size / 2,
              }}
            >
              <MiniStarSvg color={b.color} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        Estrelas acesas: {touchedCount}
      </p>
    </div>
  );
}
