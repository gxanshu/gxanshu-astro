# Handoff: gxanshu.in Redesign

## Overview
Full redesign of the personal website for Anshu Meena (gxanshu.in) — a retro computing / amber CRT aesthetic built around IBM Plex typefaces. This covers 5 pages: homepage, blog index, blog post, projects index, and project detail.

## About the Design Files
The files in this bundle (`site/*.html`) are **design references created in HTML** — high-fidelity prototypes showing intended look and behavior. They are NOT production code to copy directly.

Your task is to **recreate these designs inside the existing Astro codebase** at gxanshu.in, using its established patterns (Astro components, Tailwind if present, MDX for content, etc.). The HTML files show exactly what each page should look like and how it should behave — translate that into Astro components faithfully.

## Fidelity
**High-fidelity.** The prototypes use final colors, typography, spacing, and interactions. Recreate pixel-for-pixel using Astro's component model. The design references are fully self-contained (fonts inlined via Google Fonts import, all CSS inlined) so you can open them directly in a browser to see the intended result.

---

## Design Tokens

### Colors
```
--paper:      #F1EADB   /* primary background — warm off-white */
--paper-2:    #E8DFC9   /* sunken panel background */
--paper-3:    #DCCFB2   /* sunken panel border */
--ink:        #1A1510   /* primary text / borders */
--ink-2:      #3B332A   /* secondary text */
--ink-3:      #6B5F4E   /* tertiary / meta text */
--rule:       #C9B88F   /* hairline rules, dashed borders */
--amber:      #B4651E   /* CRT amber accent */
--amber-hi:   #E2A44A   /* amber highlight */
--amber-bg:   #F5E6C6   /* amber wash background */
```

### Typography
- **Headings / monospace UI:** `IBM Plex Mono` — weights 400, 500, 600, 700
- **Body:** `IBM Plex Sans` — weights 400, 500, 600, 700
- **Long-form reading (blog posts):** `IBM Plex Serif` — 400, 400-italic, 500

Load from Google Fonts:
```
https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&display=swap
```

### Spacing scale (key values)
- Section gap: `64px`
- Page horizontal padding: `32px` (mobile: `20px`)
- Max content width: `920px` (blog post: `720px`)
- Hard pixel shadows: `3px 3px 0` or `4px 4px 0` — always `var(--ink)` color, hover shifts to `var(--amber)`

### Border radius
**None.** All elements use sharp 0px corners — this is intentional to the retro aesthetic.

### Box shadows
All shadows are offset pixel shadows (no blur), never CSS `box-shadow` with blur:
- Small: `3px 3px 0 var(--ink)`
- Medium: `4px 4px 0 var(--ink)`
- Large: `6px 6px 0 var(--ink)`
- On hover: replace ink with amber: `4px 4px 0 var(--amber)`

---

## Body Background
The body uses a subtle scanline + grain texture via CSS:
```css
background-image:
  repeating-linear-gradient(0deg,
    rgba(26,21,16,0.022) 0px, rgba(26,21,16,0.022) 1px,
    transparent 1px, transparent 3px),
  radial-gradient(circle at 20% 10%, rgba(180,101,30,0.04), transparent 40%),
  radial-gradient(circle at 80% 90%, rgba(180,101,30,0.035), transparent 45%);
```

---

## Shared Components

### `<SiteHeader>` (sticky)
- Sticky top, `border-bottom: 1px solid var(--ink)`, `background: var(--paper)`, `z-index: 5`
- Inner: `max-width: 920px`, `padding: 14px 32px`, flex row, `gap: 24px`
- **Brand mark**: amber square (`10px × 10px`, `box-shadow: 2px 2px 0 var(--ink)`) + `IBM Plex Mono 700 14px` text "gxanshu.in" (`.in` muted)
- **Nav links**: `IBM Plex Mono 12px`, `padding: 6px 10px`, `border: 1px solid transparent`. Active/hover: `background: var(--amber-bg)`, `border-color: var(--ink)`
- **⌘K button**: `IBM Plex Mono 11px`, `border: 1px solid var(--rule)`, `background: var(--paper-2)`, contains `<kbd>⌘K</kbd>` chip

### `<SiteFooter>`
- `border-top: 1px dashed var(--rule)`
- `IBM Plex Mono 11px`, `color: var(--ink-3)`
- Content: "© 2026 Anshu Meena · built in Rajasthan" (left) + GitHub · X · Email links (right)

### `.tag` chip
```css
display: inline-block; padding: 1px 6px;
font-family: IBM Plex Mono; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
color: var(--ink-2); background: var(--amber-bg); border: 1px solid var(--rule);
```

### `.dither` texture (placeholder art)
```css
background-color: var(--amber-bg);
background-image:
  linear-gradient(45deg, rgba(26,21,16,0.18) 25%, transparent 25%),
  linear-gradient(-45deg, rgba(26,21,16,0.18) 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, rgba(26,21,16,0.18) 75%),
  linear-gradient(-45deg, transparent 75%, rgba(26,21,16,0.18) 75%);
background-size: 4px 4px;
```

### `.dither-amber` (amber variant)
```css
background-color: var(--amber);
background-image:
  linear-gradient(45deg, rgba(255,240,200,0.35) 25%, transparent 25%),
  linear-gradient(-45deg, rgba(255,240,200,0.35) 25%, transparent 25%);
background-size: 3px 3px;
```

### Window chrome (`.window`)
Used for the nameplate and code preview panels:
```
border: 1.5px solid var(--ink); box-shadow: 4px 4px 0 var(--ink);
```
Title bar: `background: var(--ink); color: var(--paper); font: IBM Plex Mono 11px uppercase; padding: 5px 10px`
Three small squares (8×8px, `background: var(--paper)`) serve as fake window buttons.

### List rows (`.list-row`)
Used on all archive/list pages:
```
display: grid; grid-template-columns: 110px 1fr auto; gap: 20px;
padding: 14px 0; border-bottom: 1px dashed var(--rule);
```
Hover: `background: var(--amber-bg)`, negative margin trick (`margin: 0 -12px; padding: 14px 12px`)

### ⌘K Command Palette
Full-page overlay (`position: fixed; inset: 0; backdrop-filter: blur(2px); background: rgba(26,21,16,0.35)`)
- Palette panel: `width: min(560px, 92vw)`, window chrome style, `box-shadow: 6px 6px 0 var(--ink)`
- Input with amber caret, `IBM Plex Mono 14px`
- Results grouped by section header, keyboard navigable (↑↓ + Enter)
- Opens on `⌘K` / `Ctrl+K` or clicking the trigger button
- See `site/index.html` for the full self-contained JS implementation (search for `COMMAND.EXE`)

---

## Pages

### 1. Homepage (`site/index.html`)

**Hero — nameplate window**
- 2-col grid: nameplate (window chrome) left + stats sidebar right (`240px`)
- Nameplate body: `96px` pixel-art avatar (dither bg) + name/role/location meta
- Blinking amber status dot (CSS `steps(2)` animation)
- Amber dithered strip at bottom of nameplate (`8px` tall)
- Stats sidebar: 4 stats stacked, each with large mono number (`22px bold`) + label

**Bio block**
- `max-width: 680px`, `font-size: 16.5px / 18px (lede)`
- 3–4 paragraphs

**Connect grid**
- 4-col grid, `border: 1.5px solid var(--ink)`, `box-shadow: 3px 3px 0 var(--ink)`
- Each cell: icon square (22×22px, `background: var(--ink); color: var(--paper)`), label, value

**Recent Writing**
- Section header with "View all →" link
- Standard list rows (5 items)

**Projects**
- 2×2 card grid, each card: `88px` dither thumbnail + meta/title/desc
- Cards lift on hover: `transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--amber)`

**Experience timeline**
- `display: grid; grid-template-columns: 20px 1fr` per item
- Amber dot (`12px`, `border: 1.5px solid var(--ink)`) + dashed vertical line
- Each entry: role + company, date (right-aligned), location label, paragraph, tech tags

**Speaking section**
- Single `.box` panel with meta/title/venue/description

---

### 2. Blog Index (`site/blog.html`)

- Breadcrumb: `~ / blog`
- H1 "Writing" (`48px`)
- Filter chips (All / Linux / Web / Philosophy / Tooling) — JS filters the list
- Featured post: 2-col card (`240px` dither-amber art left, text right), lifts on hover
- Archive list: standard list rows with inline `.tag` chips

---

### 3. Blog Post (`site/post.html`)

- Reading progress bar: `3px` amber bar, `position: sticky; top: 49px` (below header), JS scrolls it
- Breadcrumb: `~ / blog / slug`
- Post H1: `IBM Plex Mono 36px`, tight letter-spacing
- Lede paragraph: `IBM Plex Serif italic 21px`, left amber border (`3px solid var(--amber)`)
- Body copy: `IBM Plex Serif 18px / 1.75` — this is the only place serif is used for body
- H2 within post: `IBM Plex Mono 18px`, dashed bottom border
- Blockquote: amber-bg panel with hard ink shadow, italic serif
- Code inline: `background: var(--paper-2); border: 1px solid var(--paper-3); padding: 1px 6px`
- "Keep reading" section: 2-col project cards at bottom

---

### 4. Projects Index (`site/projects.html`)

- Breadcrumb, H1 "Projects", subhead
- Language filter chips (All / Zig / TypeScript / Rust / Shell) — JS filters both big cards and list
- Featured: 2-col big card grid, each `160px` dither art header + body
- Archive list: standard list rows with `.tag` chips

---

### 5. Project Detail (`site/project.html`)

- 2-col header: title/desc/actions left + facts sidebar (`260px`) right
- Facts sidebar: `dl` with `grid-template-columns: 1fr 1fr`, amber "live" pill
- Code preview window: dark background (`#1A1510`), amber syntax highlighting, color swatches sidebar
- About section: 2-col (text left + sidebar right `280px`)
- Changelog: `grid-template-columns: 160px 1fr`, version chips (`background: var(--amber-bg)`)
- Related projects: 2-col card grid

**Syntax highlight colors (dark code panel):**
```
background:   #1A1510
base text:    #C9B88F
keywords:     #E2A44A  (amber)
types:        #F1EADB  (near-white)
functions:    #B4651E  (dark amber)
strings:      #D9B877  (italic)
comments:     #6B5F4E  (muted)
numbers:      #B4651E
```

---

## Interactions & Behavior

| Interaction | Behavior |
|---|---|
| ⌘K / Ctrl+K | Opens command palette overlay |
| Click outside palette | Closes palette |
| ↑↓ in palette | Navigates results |
| Enter in palette | Navigates to selected item |
| Filter chip click | Filters list, active chip gets `background: var(--ink); color: var(--paper)` |
| Card hover | `transform: translate(-1px,-1px)` + amber shadow |
| List row hover | Amber background wash, negative-margin bleed |
| Nav link hover/active | Amber background, ink border |
| Reading progress | Amber bar grows as user scrolls through post |

---

## Responsive Breakpoints

**≤ 680px:**
- Hero grid: single column
- Connect grid: 2×2
- Project grid: single column
- List rows: hide "read time" column
- H1: `32px`
- Page padding: `20px`

**≤ 720px (project/post detail):**
- `proj-header` and `two-col`: single column
- Code preview swatches: horizontal row
- Changelog: single column

---

## Files in This Bundle

| File | Description |
|---|---|
| `site/index.html` | Homepage (self-contained, all CSS/JS inlined) |
| `site/blog.html` | Blog index |
| `site/post.html` | Blog post detail |
| `site/projects.html` | Projects index |
| `site/project.html` | Project detail |

All files are fully self-contained — open any directly in a browser to see the design.

---

## Implementation Notes for Astro

1. **Create a base layout** `src/layouts/Base.astro` with the sticky header, footer, body background, and Google Fonts import.
2. **Command palette** can be a client-side Astro island (`client:load`) — extract the JS from any of the HTML files (search for `COMMAND.EXE`).
3. **CSS variables** should go in a global stylesheet (`src/styles/global.css`) imported in the base layout.
4. The **dither textures** are pure CSS — no image assets needed.
5. Replace the **pixel-art SVG avatar** with Anshu's real photo once available; keep the same `96×96` bordered frame.
6. The **retro window chrome** (`.window`, `.window-title`) is a reusable Astro component — useful for code blocks in blog posts too.
