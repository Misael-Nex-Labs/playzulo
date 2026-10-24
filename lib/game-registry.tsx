import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Brain,
  Calculator,
  Gamepad2,
  MousePointer2,
  Palette,
  Shapes,
  Sprout,
  Star,
  Sun,
} from "lucide-react";
import type { ReactNode } from "react";

import TocarNasBolhas from "@/components/games/TocarNasBolhas";
import CoresDosBichinhos from "@/components/games/CoresDosBichinhos";
import ToqueNasEstrelas from "@/components/games/ToqueNasEstrelas";
import Numeros from "@/components/games/Numeros";
import Letrinha from "@/components/games/Letrinha";
import Sol from "@/components/games/Sol";
import OJardimQueAcorda from "@/components/games/OJardimQueAcorda";
import ArrastarFormas from "@/components/games/ArrastarFormas";
import MemoriaDosBichinhos from "@/components/games/MemoriaDosBichinhos";

export const iconMap: Record<string, LucideIcon> = {
  MousePointer2,
  Sprout,
  Shapes,
  Palette,
  Brain,
  Star,
  "123": Calculator,
  BookOpen,
  Sun,
};

export const fallbackGameIcon = Gamepad2;

export const gameComponents: Record<string, ReactNode> = {
  "tocar-nas-bolhas": <TocarNasBolhas />,
  "o-jardim-que-acorda": <OJardimQueAcorda />,
  "arrastar-formas": <ArrastarFormas />,
  "memoria-dos-bichinhos": <MemoriaDosBichinhos />,
  "cores-dos-bichinhos": <CoresDosBichinhos />,
  "toque-nas-estrelas": <ToqueNasEstrelas />,
  numeros: <Numeros />,
  letrinha: <Letrinha />,
  sol: <Sol />,
};
