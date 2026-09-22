import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import tailwindcss from "@tailwindcss/vite";

const [owner = "", repoName = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserSite = repoName === `${owner}.github.io`;
const base = process.env.GITHUB_ACTIONS && !isUserSite ? `/${repoName}` : "/";
const site = process.env.PUBLIC_SITE_URL || (owner ? `https://${owner}.github.io` : "http://localhost:4321");

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  output: "static",
  site,
  base,

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
