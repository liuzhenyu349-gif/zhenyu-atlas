import type { APIRoute } from "astro";
import { withBase } from "../utils/url";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("http://localhost:4321");
  const sitemapUrl = new URL(withBase("/sitemap.xml"), origin).href;

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
