import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

// Build the pages object as before
const blogEntries = await getCollection("blogs");
const noteEntries = await getCollection("notes");
const projectEntries = await getCollection("projects");

const pages = Object.fromEntries(
  blogEntries
    .map((entry) => [`/${entry.collection}/${entry.id}`, entry.data])
    .concat(
      noteEntries.map((entry) => [
        `/${entry.collection}/${entry.id}`,
        entry.data,
      ]),
      projectEntries.map((entry) => [
        `/${entry.collection}/${entry.id}`,
        entry.data,
      ]),
    ),
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => {
    return {
      title: page.seo.title,
      description: page.seo.description,
      logo: {
        path: "public/images/avatar.png",
        size: [96, 96],
      },
      bgGradient: [
        [38, 50, 56], // Start deep blue-gray
        [63, 81, 181], // To indigo (or choose a color from your design tokens)
      ],
      bgImage: {
        path: "src/assets/images/og-background.png",
        fit: "cover",
        position: "center",
      },
      border: {
        color: [63, 81, 181],
        width: 8,
        side: "block-end",
      },
      padding: 64,
      font: {
        title: {
          color: [237, 237, 240], // White-ish
          size: 54,
          weight: "Bold",
          families: ["Inter"],
          lineHeight: 1.2,
        },
        description: {
          color: [200, 212, 226], // Softer blue-gray
          size: 28,
          weight: "normal",
          families: ["Inter"],
          lineHeight: 1.5,
        },
      },
      fonts: [
        "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
        "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
      ],
    };
  },
});
