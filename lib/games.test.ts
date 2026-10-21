import { describe, expect, it } from "vitest";
import { games } from "./games";

const requiredCategories = ["tocar", "cores", "formas", "memoria", "numeros", "letras"] as const;

describe("game catalog", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = games.map((game) => game.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("provides the required fields for every game", () => {
    for (const game of games) {
      expect(game.title.trim()).not.toBe("");
      expect(game.shortDescription.trim()).not.toBe("");
      expect(game.seo.title.trim()).not.toBe("");
      expect(game.seo.description.trim()).not.toBe("");
      expect(game.faq.length).toBeGreaterThan(0);
      expect(game.image).toMatch(/^\/images\/.+\.(png|webp|jpg|jpeg)(?:\?[^\s]*)?$/);
    }
  });

  it("keeps the catalog categories represented", () => {
    const categories = new Set(games.map((game) => game.category));

    for (const category of requiredCategories) {
      expect(categories.has(category)).toBe(true);
    }
  });
});
