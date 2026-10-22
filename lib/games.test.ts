import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { games } from "./games";

const imagesDir = resolve(process.cwd(), "public", "images");

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

describe("game catalog — image assets", () => {
  it("references an existing image file under public/images", () => {
    for (const game of games) {
      const imageName = game.image.split("?")[0].split("/").pop() ?? "";
      expect(imageName, `missing image name for "${game.slug}"`).not.toBe("");

      expect(existsSync(resolve(imagesDir, imageName)), `"${game.slug}" image not found: ${imageName}`).toBe(true);
    }
  });

  it("has non-empty SEO keywords", () => {
    for (const game of games) {
      expect(game.seo.keywords?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("has non-empty FAQ answers", () => {
    for (const game of games) {
      for (const item of game.faq) {
        expect(item.question.trim()).not.toBe("");
        expect(item.answer.trim()).not.toBe("");
      }
    }
  });
});
