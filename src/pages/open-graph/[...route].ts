import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const blogEntries = await getCollection("blogs");
const noteEntries = await getCollection("notes");
const projectEntries = await getCollection("projects");

const pages = Object.fromEntries(
  blogEntries
    .map((entry) => [`/blog/${entry.id}`, entry.data])
    .concat(
      noteEntries.map((entry) => [`/notes/${entry.id}`, entry.data]),
      projectEntries.map((entry) => [`/projects/${entry.id}`, entry.data]),
    ),
);

export const { getStaticPaths, GET } = await OGImageRoute({
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
        [241, 234, 219],
        [232, 223, 201],
      ],
      bgImage: {
        path: "src/assets/images/og-background.png",
        fit: "cover",
        position: "center",
      },
      border: {
        color: [180, 101, 30],
        width: 8,
        side: "block-end",
      },
      padding: 64,
      font: {
        title: {
          color: [26, 21, 16],
          size: 54,
          weight: "Bold",
          families: ["IBM Plex Mono"],
          lineHeight: 1.2,
        },
        description: {
          color: [59, 51, 42],
          size: 28,
          weight: "normal",
          families: ["IBM Plex Sans"],
          lineHeight: 1.5,
        },
      },
      fonts: [
        "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-700-normal.ttf",
        "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-400-normal.ttf",
      ],
    };
  },
});
