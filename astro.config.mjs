// @ts-check
import { defineConfig, fontProviders } from "astro/config";
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
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-geist",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Geist-Regular.woff2"],
            style: "normal",
            weight: 400,
          },
          {
            src: ["./src/assets/fonts/Geist-Medium.woff2"],
            style: "normal",
            weight: 500,
          },
          {
            src: ["./src/assets/fonts/Geist-SemiBold.woff2"],
            style: "normal",
            weight: 600,
          },
          {
            src: ["./src/assets/fonts/Geist-Bold.woff2"],
            style: "normal",
            weight: 700,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "GeistVariable",
      cssVariable: "--font-geist-variable",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Geist-Variable.woff2"],
            style: "normal",
            weight: "variable",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "GeistMono",
      cssVariable: "--font-geist-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/GeistMono-Variable.woff2"],
            style: "normal",
            weight: "variable",
          },
        ],
      },
    },
  ],
});
