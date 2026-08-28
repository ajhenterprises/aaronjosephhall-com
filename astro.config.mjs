import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Update once the production domain is live on Vercel.
const SITE_URL = "https://aaronjosephhall.com";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
