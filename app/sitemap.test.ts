import { describe, expect, it } from "vitest";
import { games } from "@/lib/games";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const siteUrl = "https://playzulo.vercel.app";

const categorySlugs = ["tocar-na-tela", "cores", "formas", "memoria", "numeros", "letras"] as const;

describe("sitemap coverage", () => {
  const routes = sitemap();
  const routeUrls = routes.map((route) => route.url);

  it("covers every game route", () => {
    for (const game of games) {
      expect(routeUrls).toContain(`${siteUrl}/jogos/${game.slug}`, `missing game route for ${game.slug}`);
    }
  });

  it("covers every category route", () => {
    for (const slug of categorySlugs) {
      expect(routeUrls).toContain(`${siteUrl}/categorias/${slug}`, `missing category route for ${slug}`);
    }
  });

  it("includes the static site pages", () => {
    expect(routeUrls).toContain(siteUrl, "missing home route");
    expect(routeUrls).toContain(`${siteUrl}/jogos`, "missing /jogos route");
    expect(routeUrls).toContain(`${siteUrl}/sobre`, "missing /sobre route");
    expect(routeUrls).toContain(`${siteUrl}/privacidade`, "missing /privacidade route");
  });
});

describe("robots.txt", () => {
  it("points at the generated sitemap", () => {
    const config = robots();
    expect(config.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });

  it("allows all user agents", () => {
    const config = robots();
    expect(config.rules.userAgent).toBe("*");
    expect(config.rules.allow).toBe("/");
  });
});
