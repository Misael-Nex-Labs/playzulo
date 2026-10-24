import { describe, expect, it } from "vitest";
import { games } from "@/lib/games";
import { fallbackGameIcon, gameComponents, iconMap } from "@/lib/game-registry";

describe("game UI registry", () => {
  it("registers a playable component for every catalog game", () => {
    for (const game of games) {
      expect(gameComponents[game.slug], `missing playable component for ${game.slug}`).toBeDefined();
    }

    expect(Object.keys(gameComponents)).toHaveLength(games.length);
  });

  it("registers a dedicated icon for every game and preserves a fallback", () => {
    for (const game of games) {
      expect(iconMap[game.icon], `missing icon mapping for ${game.slug}: ${game.icon}`).toBeDefined();
    }

    expect(fallbackGameIcon).toBeDefined();
  });
});
