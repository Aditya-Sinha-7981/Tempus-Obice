# Tempus Obice

An interactive fantasy world atlas and personal portfolio site.

Built for Rajveer Shukla as a personal blog-style website featuring an interactive world map, a searchable résumé, Game Design Documents (GDDs), and game deconstruction analyses.

## Live Site

Deployed on Vercel via GitHub.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 7.x (Static Site Generation) |
| Interactive UI | React 19 |
| Map Engine | Leaflet with CRS.Simple |
| Styling | Plain CSS with CSS Variables |
| Content | Astro Content Collections (JSON + Markdown) |
| PDFs | Browser-native `<iframe>` rendering |

## Project Structure

```
tempus-obice/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── pdfs/
│       ├── Rajveer_Shukla_Resume.pdf
│       ├── gdds/
│       │   ├── G.D.D. Dictator Quest.pdf
│       │   ├── G.D.D. Dominion Control.pdf
│       │   ├── G.D.D. Dusha.pdf
│       │   └── G.D.D. of Power Shard.pdf
│       └── deconstructions/
│           └── Game Deconstruction of Temple Run.pdf
├── src/
│   ├── assets/
│   │   └── maps/
│   │       └── world.webp          # Fantasy world map image
│   ├── components/
│   │   ├── App.tsx                 # Root React app (owns state)
│   │   ├── Header.astro            # Site navigation header
│   │   ├── Map/
│   │   │   └── WorldMap.tsx        # Leaflet interactive map
│   │   └── Sidebar/
│   │       └── Sidebar.tsx         # Location info sidebar
│   ├── content/
│   │   ├── locations/              # JSON location definitions
│   │   │   └── crystal-peaks.json
│   │   └── stories/                # Markdown story files
│   │       └── crystal-peaks-origin.md
│   ├── data/
│   │   └── pdfs.ts                 # Central PDF catalog
│   ├── layouts/
│   │   └── BaseLayout.astro        # Shared page layout
│   ├── pages/
│   │   ├── index.astro             # Home (interactive map)
│   │   ├── resume.astro            # Résumé PDF viewer
│   │   ├── gdds.astro              # GDDs archive
│   │   ├── deconstructions.astro   # Deconstructions archive
│   │   └── view.astro              # Generic PDF viewer
│   ├── styles/
│   │   ├── global.css              # CSS variables, resets, base
│   │   ├── header.css              # Navigation styles
│   │   ├── map.css                 # Map + Leaflet + dev tools
│   │   ├── sidebar.css             # Sidebar styles
│   │   └── archive.css             # Archive + PDF viewer styles
│   ├── types/
│   │   └── content.ts              # TypeScript interfaces
│   └── utils/
│       ├── content.ts              # Content collection helpers
│       └── coords.ts               # Coordinate conversion utilities
├── src/content.config.ts           # Astro content collections schema
├── astro.config.mjs                # Astro configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — Interactive fantasy world map |
| `/resume` | Embedded résumé PDF viewer |
| `/gdds` | Personal Game Design Documents archive |
| `/deconstructions` | Game Deconstruction documents archive |
| `/view?file=...&title=...&back=...` | Generic PDF viewer |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Dev server runs at `http://localhost:4321`.

## Deployment to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Astro static sites — no extra configuration needed
4. Framework preset: `Astro`
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

## Design System

- **Background:** `#0d0f12`
- **Panels:** `#1a1d22`
- **Text:** `#e8e6e1`
- **Accent:** `#c9a84c` (single accent color only)
- **Muted:** `#8a8a8a`

No gradients. No glassmorphism. No bright neon. Dark fantasy aesthetic.

## Content Management

### Adding a New Map Location

1. Add a JSON file to `src/content/locations/my-location.json`:
```json
{
  "id": "my-location",
  "name": "My Location",
  "description": "A short description of this place.",
  "coordinates": [1500, 2200],
  "markerIcon": "crystal",
  "storyIds": ["my-location-story"]
}
```

2. Place the marker using Dev Mode (press `C` on the map) to get coordinates.

3. Optionally add stories to `src/content/stories/`.

### Adding a New Story

1. Create `src/content/stories/my-story.md`:
```md
---
title: "Story Title"
locationId: "my-location"
summary: "A brief summary."
order: 1
---

Story content in Markdown.
```

### Adding a New PDF (GDD or Deconstruction)

1. Drop the PDF into `public/pdfs/gdds/` or `public/pdfs/deconstructions/`
2. Edit `src/data/pdfs.ts` and add an entry to the `gdds` or `deconstructions` array
3. Rebuild

### Updating the Résumé

1. Replace `public/pdfs/Rajveer_Shukla_Resume.pdf` with the new file
2. If the filename changes, update `resume.file` in `src/data/pdfs.ts`

## Developer Tools

Press `C` on the home page (or click the **Dev Tools** button) to enable coordinate mode:
- Hover to see live coordinates
- Click anywhere on the map to copy coordinates to clipboard
- A temporary pulse marker appears at the clicked location

## Architecture Principles

- **Astro** owns routing, static rendering, and content collections
- **React** is used ONLY for the interactive map and sidebar (single island)
- **Leaflet** owns map rendering; never recreate the map instance
- **State** lives only in `App.tsx`; no Context API, no Redux, no Zustand
- **Content-driven** — new locations and stories require only JSON/Markdown files
- **No backend, no database, no CMS**
