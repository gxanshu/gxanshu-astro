# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Anshu Meena (gxanshu) built with Astro 5, based on the CVfolio template. Deployed at https://gxanshu.in. Showcases blog posts, notes, projects, work experience, and talks.

## Commands

- **Dev server:** `bun dev` (or `npm run dev`)
- **Build:** `bun run build` (or `npm run build`)
- **Preview production build:** `bun run preview`
- **Astro CLI:** `bun run astro <command>`

No test framework is configured.

## Architecture

**Stack:** Astro 5 (static site generation) + React 18 (client islands) + TailwindCSS 4 + MDX

**Content system:** Seven collections defined in `src/content.config.ts` using Astro Content Loader with Zod schema validation:
- `blogs`, `notes`, `projects` — date-sorted content with SEO metadata and optional images
- `pages` — static pages (index, 404, blog listing, etc.)
- `jobs`, `talks` — structured data for work history and speaking events
- `links` — YAML-based contact links

Content lives in `src/content/<collection>/` as `.md`, `.mdx`, or `.yml` files. All content with SEO fields uses a shared `seoSchema` that includes title, description, keywords, canonicalUrl, twitter, robots, and optional image.

**Routing:** File-based routing in `src/pages/`. Dynamic routes use `[...slug].astro` with `getStaticPaths()` for blogs, notes, and projects. OG images are generated dynamically at `/open-graph/[...route].ts` using `astro-og-canvas`.

**Layout:** Single `BaseLayout` wraps all pages, injecting SEO head tags, header, footer, and Astro `ClientRouter` for smooth transitions. The `Container` component is polymorphic (accepts an `as` prop).

**Styling:** TailwindCSS 4 with `@tailwindcss/typography`. Custom oklch()-based color palette defined as CSS variables in `src/styles/global.css`. Dark mode uses a CSS class toggle with palette inversion. Theme switching is a React island (`SwitchTheme.tsx`) using `client:only="react"`.

**Fonts:** Inter font family served locally from `src/assets/fonts/` via Astro's experimental fonts feature.

**Reading time:** Custom remark plugin at `src/lib/remark.mjs` injects `minutesRead` into frontmatter during markdown processing.

**Constants:** Author info and SEO defaults are in `src/lib/constants.ts`. Utility functions (date formatting, URL generation, draft filtering) are in `src/lib/utils.ts`.

## Content Authoring

Blog/note/project frontmatter requires `title`, `date`, and a nested `seo` object with at minimum `title` and `description`. Blog and project entries can include an optional `image` field. Prefix filenames with `_` to exclude from the collection.
