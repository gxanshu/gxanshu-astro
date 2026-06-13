// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./src/lib/remark.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://gxanshu.in",
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "slack-dark",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      optimize: true,
      syntaxHighlight: "shiki",
    }),
  ],
});
