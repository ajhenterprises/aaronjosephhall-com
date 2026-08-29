import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// Update once the production domain is live on Vercel.
const SITE_URL = "https://aaronjosephhall.com";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  // Server output + adapter enable the /api/speaking-request serverless
  // endpoint. Every page is still statically prerendered at build time
  // (see `export const prerender = true` in each page) — only that one
  // API route runs per-request.
  output: "server",
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
