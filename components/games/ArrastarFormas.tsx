"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sounds";

type ShapeKind = "circle" | "square" | "triangle" | "star" | "diamond" | "plus" | "egg" | "pentagon" | "blob" | "flower" | "star4";

type ShapeData = {
  id: ShapeKind;
  label: string;
  color: string;
};

const ALL_SHAPES: ShapeData[] = [
  { id: "circle", label: "Círculo", color: "var(--zen-pink)" },
  { id: "square", label: "Quadrado", color: "var(--zen-yellow)" },
  { id: "triangle", label: "Triângulo", color: "var(--zen-green)" },
  { id: "star", label: "Estrela", color: "#b2ebf2" },
  { id: "diamond", label: "Losango", color: "#e1bee7" },
  { id: "plus", label: "Sinal de Mais", color: "#ffcc80" },
  { id: "egg", label: "Ovo", color: "#ffab91" },
  { id: "pentagon", label: "Pentágono", color: "#a5d6a7" },
  { id: "blob", label: "Amoeba", color: "#bcaaa4" },
  { id: "flower", label: "Flor", color: "#f48fb1" },
  { id: "star4", label: "Estrela Guia", color: "#90caf9" },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const getTargetPosition = (index: number, total: number) => {
  if (total <= 3) {
    const lefts = ["20%", "50%", "80%"];
    return { left: lefts[index], top: "78%" };
  }
  if (total === 4) {
    const lefts = ["28%", "72%", "28%", "72%"];
    const tops = ["66%", "66%", "88%", "88%"];
    return { left: lefts[index], top: tops[index] };
  }
  const lefts = ["20%", "50%", "80%", "35%", "65%"];
  const tops = ["66%", "66%", "66%", "88%", "88%"];
  return { left: lefts[index], top: tops[index] };
};

const getStartPosition = (index: number, total: number) => {
  if (total <= 3) {
    const lefts = ["20%", "50%", "80%"];
    return { left: lefts[index], top: "25%" };
  }
  if (total === 4) {
    const lefts = ["28%", "72%", "28%", "72%"];
    const tops = ["15%", "15%", "36%", "36%"];
    return { left: lefts[index], top: tops[index] };
  }
  const lefts = ["20%", "50%", "80%", "35%", "65%"];
  const tops = ["15%", "15%", "15%", "36%", "36%"];
  return { left: lefts[index], top: tops[index] };
};

const SHAPE_SIZE = 96;

function getShapePath(kind: ShapeKind) {
  switch (kind) {
    case "triangle": return { type: "polygon", points: "48,4 92,92 4,92" };
    case "star": return { type: "polygon", points: "48,5 61,35 94,35 68,54 78,85 48,65 18,85 28,54 2,35 35,35" };
    case "diamond": return { type: "polygon", points: "48,5 92,48 48,91 4,48" };
    case "plus": return { type: "polygon", points: "32,4 64,4 64,32 92,32 92,64 64,64 64,92 32,92 32,64 4,64 4,32 32,32" };
    case "pentagon": return { type: "polygon", points: "48,4 92,38 75,92 21,92 4,38" };
    case "egg": return { type: "path", d: "M 48 8 C 68 8, 84 40, 84 64 C 84 84, 66 90, 48 90 C 30 90, 12 84, 12 64 C 12 40, 28 8, 48 8 Z" };
    case "blob": return { type: "path", d: "M 55 12 C 85 10, 92 40, 80 65 C 68 90, 80 90, 45 88 C 15 85, 8 60, 18 35 C 28 10, 25 14, 55 12 Z" };
    case "flower": return { type: "path", d: "M 48 38 C 25 5, 5 25, 38 48 C 5 71, 25 91, 48 58 C 71 91, 91 71, 58 48 C 91 25, 71 5, 48 38 Z" };
    case "star4": return { type: "polygon", points: "48,4 56,40 92,48 56,56 48,92 40,56 4,48 40,40" };
    default: return null;
  }
}

function ShapeIcon({ kind, color }: { kind: ShapeKind; color: string }) {
  if (kind === "circle") {
    return <div aria-hidden="true" className="h-[96px] w-[96px] rounded-full" style={{ backgroundColor: color }} />;
  }
  if (kind === "square") {
    return <div aria-hidden="true" className="h-[96px] w-[96px] rounded-2xl" style={{ backgroundColor: color }} />;
  }

  const shapeData = getShapePath(kind);
  if (!shapeData) return null;

  return (
    <svg aria-hidden="true" width="96" height="96" viewBox="0 0 96 96">
      {shapeData.type === "polygon" ? (
        <polygon points={shapeData.points} fill={color} />
      ) : (
        <path d={shapeData.d} fill={color} />
      )}
    </svg>
  );
}

function ShapeSilhouette({ kind }: { kind: ShapeKind }) {
  if (kind === "circle") {
    return <div aria-hidden="true" className="h-[96px] w-[96px] rounded-full border-[4px] border-dashed border-zen-gray/45" />;
  }
  if (kind === "square") {
    return <div aria-hidden="true" className="h-[96px] w-[96px] rounded-2xl border-[4px] border-dashed border-zen-gray/45" />;
  }

  const shapeData = getShapePath(kind);
  if (!shapeData) return null;

  return (
    <svg aria-hidden="true" width="96" height="96" viewBox="0 0 96 96" className="opacity-45">
      {shapeData.type === "polygon" ? (
        <polygon points={shapeData.points} fill="none" stroke="var(--zen-gray)" strokeWidth="4" strokeDasharray="8 8" strokeLinejoin="round" />
      ) : (
        <path d={shapeData.d} fill="none" stroke="var(--zen-gray)" strokeWidth="4" strokeDasharray="8 8" strokeLinejoin="round" />
      )}
    </svg>
  );
}

type DraggableShapeProps = {
  shape: ShapeData;
  onMatch: () => void;
  areaRef: React.RefObject<HTMLDivElement | null>;
};

function DraggableShape({ shape, onMatch, areaRef }: DraggableShapeProps) {
  const shapeRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = () => {
    if (!areaRef.current || !shapeRef.current) return;
    const element = shapeRef.current;
    
    const target = areaRef.current.querySelector(`[data-target="${shape.id}"]`);
    if (!target) return;

    const shapeRect = element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const shapeCenter = {
      x: shapeRect.left + shapeRect.width / 2,
      y: shapeRect.top + shapeRect.height / 2,
    };

    const isInside =
      shapeCenter.x >= targetRect.left &&
      shapeCenter.x <= targetRect.right &&
      shapeCenter.y >= targetRect.top &&
      shapeCenter.y <= targetRect.bottom;

    if (isInside) {
      onMatch();
    }
  };

  return (
    <motion.div
      layoutId={`shape-${shape.id}`}
      ref={shapeRef}
      className="cursor-grab active:cursor-grabbing p-2 pointer-events-auto"
      drag
      dragSnapToOrigin={true}
      dragElastic={0.15}
      dragMomentum={false}
      onPointerDown={(event) => {
        event.stopPropagation();
        soundManager.playPop();
      }}
      onTouchStart={(event) => event.stopPropagation()}
      onDragEnd={(event) => {
        event.stopPropagation();
        handleDragEnd();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ touchAction: "none", zIndex: 30 }}
      aria-label={`Arraste o ${shape.label}`}
      role="button"
      tabIndex={0}
    >
      <ShapeIcon kind={shape.id} color={shape.color} />
    </motion.div>
  );
}

export default function ArrastarFormas() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [round, setRound] = useState(1);
  const [matched, setMatched] = useState<ShapeKind[]>([]);
  
  const [roundConfig, setRoundConfig] = useState(() => {
    const selectedShapes = shuffleArray(ALL_SHAPES.slice(0, 5)).slice(0, 3);
    return {
      activeShapes: selectedShapes,
      targets: shuffleArray(selectedShapes),
      starts: shuffleArray(selectedShapes),
    };
  });

  const showCelebration = matched.length === roundConfig.activeShapes.length;

  const isMatched = useCallback((kind: ShapeKind) => matched.includes(kind), [matched]);

  const handleMatch = (kind: ShapeKind) => {
    soundManager.playSuccess();
    setMatched((current) => (current.includes(kind) ? current : [...current, kind]));
  };

  useEffect(() => {
    if (matched.length !== roundConfig.activeShapes.length) return;

    const nextRound = window.setTimeout(() => {
      setMatched([]);
      setRound((current) => {
        let newRound = current + 1;
        if (newRound > 11) {
          newRound = 1;
        }
        
        let count = 3;
        let selectedShapes: ShapeData[] = [];
        
        if (newRound <= 3) {
          count = 3;
          selectedShapes = shuffleArray(ALL_SHAPES.slice(0, 5)).slice(0, count);
        } else if (newRound <= 7) {
          count = 4;
          selectedShapes = shuffleArray(ALL_SHAPES.slice(0, 8)).slice(0, count);
        } else {
          count = 5;
          const advancedShapes = ALL_SHAPES.filter(s => ["blob", "egg", "flower", "star4"].includes(s.id));
          const basicShapes = ALL_SHAPES.filter(s => !["blob", "egg", "flower", "star4"].includes(s.id));
          
          const guaranteed = shuffleArray(advancedShapes).slice(0, 2);
          const others = shuffleArray([...advancedShapes.filter(s => !guaranteed.includes(s)), ...basicShapes]);
          selectedShapes = shuffleArray([...guaranteed, ...others.slice(0, 3)]);
        }
        
        setRoundConfig({
          activeShapes: selectedShapes,
          targets: shuffleArray(selectedShapes),
          starts: shuffleArray(selectedShapes),
        });
        return newRound;
      });
    }, 2000);

    return () => window.clearTimeout(nextRound);
  }, [matched, roundConfig.activeShapes.length]);

  return (
    <div
      ref={areaRef}
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#e0f7ff] to-[#fffcf5] text-zen-gray"
      style={{ touchAction: "none" }}
    >
      {/* Cenário de Fundo */}
      <div className="absolute top-8 right-10 w-20 h-20 rounded-full bg-zen-yellow/50 blur-[2px] pointer-events-none" />
      <div className="absolute top-10 right-12 w-16 h-16 rounded-full bg-zen-yellow/80 pointer-events-none" />

      <div className="absolute top-16 left-8 w-24 h-8 bg-white/70 rounded-full blur-[1px] pointer-events-none" />
      <div className="absolute top-12 left-12 w-12 h-12 bg-white/70 rounded-full blur-[1px] pointer-events-none" />
      <div className="absolute top-14 left-20 w-10 h-10 bg-white/70 rounded-full blur-[1px] pointer-events-none" />

      <div className="pointer-events-none absolute inset-x-0 bottom-[-10%] h-[55%] bg-[#ABBB6C]/20 rounded-t-[50%] scale-125" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-zen-cream/90 rounded-t-[40%] scale-110 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]" />

      <div className="pointer-events-none absolute right-6 top-6 z-10">
        <p className="text-sm font-bold text-zen-gray/60 bg-white/50 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
          Rodada {round}
        </p>
      </div>

      {/* Target Zones */}
      {roundConfig.targets.map((shape, index) => {
        const position = getTargetPosition(index, roundConfig.targets.length);
        const match = isMatched(shape.id);

        return (
          <div
            key={`target-${shape.id}`}
            data-target={shape.id}
            className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: position.left, top: position.top }}
            aria-label={`Lugar do ${shape.label}`}
          >
            <ShapeSilhouette kind={shape.id} />
            
            {match && (
              <motion.div
                layoutId={`shape-${shape.id}`}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                initial={{ filter: "drop-shadow(0px 0px 0px rgba(171,187,108,0))" }}
                animate={{ filter: "drop-shadow(0px 0px 16px rgba(171,187,108,1))" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <ShapeIcon kind={shape.id} color={shape.color} />
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Draggable Starts */}
      {roundConfig.starts.map((shape, index) => {
        const position = getStartPosition(index, roundConfig.starts.length);
        const match = isMatched(shape.id);

        if (match) return null;

        return (
          <div
            key={`start-wrapper-${shape.id}`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none"
            style={{ left: position.left, top: position.top }}
          >
            <DraggableShape
              shape={shape}
              onMatch={() => handleMatch(shape.id)}
              areaRef={areaRef}
            />
          </div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showCelebration ? 1 : 0, y: showCelebration ? 0 : 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-12 z-40 flex justify-center"
        aria-live="polite"
      >
        <div className="rounded-full bg-zen-green px-6 py-2 shadow-sm">
          <p className="text-lg font-bold text-white">Parabéns!</p>
        </div>
      </motion.div>
    </div>
  );
}
