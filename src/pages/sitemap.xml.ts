import type { APIRoute } from "astro";
import { withBase } from "../utils/url";

const routes = [
  "/",
  "/about/",
  "/projects/",
  "/blog/",
  "/projects/campus-facilities/",
  "/projects/trajectory-visualizer/",
];

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character);

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("http://localhost:4321");
  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(new URL(withBase(route), origin).href)}</loc></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
