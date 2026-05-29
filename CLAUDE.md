# CLAUDE.md — Interreg CENTRAL EUROPE Dashboard
> POC for TNCOOP territorial analysis — T33 × Open Economics project

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
npm run deploy       # GitHub Pages
```

## Stack

- React 18 + Vite 5 (JSX, no TypeScript)
- CSS Modules for component styles
- d3-geo for NUTS2 map projection
- recharts for charts
- react-router-dom for routing (HashRouter — GitHub Pages compatible)
- Deployed on GitHub Pages via `gh-pages`

## Project structure

```
src/
├── data/
│   ├── data.js              ← 81 NUTS2 regions, regional data (time series)
│   ├── themes.js            ← Themes → Sub-themes → Indicators catalogue
│   └── nuts2_ce.geojson
├── hooks/
│   └── useAppState.js       ← global state (year, countries, focus region)
├── pages/
│   ├── ThemesPage.jsx       ← 8-theme grid (homepage)
│   ├── SubThemesPage.jsx    ← sub-theme list per theme
│   └── IndicatorPage.jsx    ← indicator detail (Section A metadata + Section B analytical)
├── components/
│   ├── Sidebar.jsx/.css     ← nav + filters
│   ├── TopNav.jsx/.css      ← dynamic breadcrumb
│   ├── KpiStrip.jsx         ← 4 KPI cards
│   ├── MapSection.jsx       ← NUTS2 map + trend chart
│   ├── RankingChart.jsx     ← horizontal bar chart
│   ├── DataTable.jsx        ← paginated table
│   └── Footer.jsx
├── App.jsx                  ← routing + layout shell
└── index.css                ← OE design tokens
```

## Development workflow

User stories and session prompts live in `docs/dev/`.

```
docs/dev/
├── DEV_PLAN.md      ← overview, data model, execution order
├── US-001.md        ← Routing & page scaffold
├── US-002.md        ← Data layer (themes.js)
├── US-003.md        ← Themes page (homepage)
├── US-004.md        ← Sub-themes page
├── US-005.md        ← Indicator page — Section A (metadata)
└── US-006.md        ← Indicator page — Section B (analytical)
```

**How to work on a user story:**
1. Read this CLAUDE.md first for full project context
2. Read the specific `docs/dev/US-NNN.md` file for the task
3. Follow the "Claude Code prompt" section inside the US file — it contains the exact instructions, acceptance criteria, and constraints
4. Do NOT modify files outside the scope defined in the US file
5. Run `npm run dev` to verify the result before committing

**Execution order:**
| # | US | Depends on | Creates/modifies |
|---|-----|-----------|-----------------|
| 1 | US-001 | — | main.jsx, App.jsx, src/pages/*, TopNav.jsx |
| 2 | US-002 | — | src/data/themes.js |
| 3 | US-003 | US-001, US-002 | src/pages/ThemesPage.jsx + .css |
| 4 | US-004 | US-001, US-002 | src/pages/SubThemesPage.jsx + .css |
| 5 | US-005 | US-001, US-002 | src/pages/IndicatorPage.jsx + .css |
| 6 | US-006 | US-005 | src/pages/IndicatorPage.jsx + .css |

US-001 and US-002 are independent and can run in parallel.

## TNCOOP data hierarchy

8 Themes (dimensions):
1. Demography & geography
2. Innovation, research & SMEs
3. Environment & climate change
4. Digital connectivity & transport
5. Sustainable regional development
6. Cultural heritage & tourism
7. Housing
8. People to people action & engagement

Each theme → N sub-themes, split into:
- **TNCOOP** (orange `#F4A261`): indicators from the TNCOOP fiche
- **Additional** (purple `#8338EC`): extra indicators outside the current fiche

Each sub-theme → 1+ indicators, each with:
- **Section A** (metadata): territorial scale, indicator code, metadata ref, link to fiche, coverage 21-27, coverage 28-34, temporal coverage
- **Section B** (analytical, 9 fields): name, description, interpretation/limit, trend, territorial pattern, functional linkage, cooperation needs, ESPON maps, pattern analysis (4 statistical clusters)

## Design system

Colors:
- `--violet: #5B4FCF`            — buttons, accents
- `--violet-dark: #3D2B8E`       — sidebar, header
- `--violet-light: #EEF0FD`      — hover backgrounds, pills
- Sidebar bg: `#1A1730`
- TNCOOP badge: `#F4A261` (orange)
- Additional badge: `#8338EC` (purple)

Font: `Atkinson Hyperlegible Next` (sans) + `Atkinson Hyperlegible Mono` (numbers)

## Routing

| Route | Page | Description |
|-------|------|-------------|
| `/` | ThemesPage | 8-theme grid |
| `/theme/:themeId` | SubThemesPage | Sub-theme list (orange/purple badges) |
| `/theme/:themeId/sub/:subId` | IndicatorPage | Detail: Section A metadata + Section B analytical |

Use `HashRouter` (not BrowserRouter) — required for GitHub Pages.

## Anti-patterns

- DO NOT use TypeScript — project is JSX only
- DO NOT remove the existing GeoJSON map — it will be reused in the indicator page
- DO NOT hardcode data in JSX — everything goes in `src/data/`
- DO NOT use BrowserRouter — HashRouter is required for GitHub Pages
- DO NOT change base fonts or design system colors
- DO NOT create unnecessary wrapper components — keep it flat, max 2 levels of nesting
- DO NOT modify files outside the scope defined in the current US file