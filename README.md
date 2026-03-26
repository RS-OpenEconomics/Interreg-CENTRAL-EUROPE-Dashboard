# Interreg Central Europe — Territorial Analysis Dashboard

**OpenEconomics · 2026**

A fully web-based, open-access interactive dashboard supporting the territorial analysis and strategy design process for the **Interreg Central Europe 2028–2034** programme. Developed by OpenEconomics as part of the technical offer submitted in consortium with T33 Srl.

🔗 **Live dashboard:** https://RS-OpenEconomics.github.io/Interreg-CENTRAL-EUROPE-Dashboard/

---

## Vision & Purpose

This dashboard is not a proof of concept. It is the foundation of the **official analytical and monitoring tool** for the Interreg CE 2028–34 strategy-building process. It is designed to:

- Transform static territorial analysis into an **interactive, explorable digital environment** accessible to all programme stakeholders without technical expertise
- Support **evidence-based dialogue** during Working Group CE28+ meetings and strategy consensus-building workshops
- Provide a **living reference tool** for the programme beyond the duration of the contract, communicating the territorial rationale to project promoters, national authorities and the European Commission
- Scale progressively from the current **unemployment rate prototype** to a **full multi-indicator, multi-thematic platform** covering all territorial dimensions of the TNCOOP fiche

---

## Current Status

| Component | Status |
|---|---|
| Choropleth map — real NUTS2 boundaries (Eurostat GISCO) | ✅ Live |
| Year slider 2015–2024 | ✅ Live |
| Country filter + Focus region (multi-select) | ✅ Live |
| KPI strip (Regional avg, Highest, Lowest, EU27) | ✅ Live |
| Trend over time (country averages + EU27 + selected regions) | ✅ Live |
| Regional ranking chart (All / Top 20 / Bottom 20) | ✅ Live |
| Full sortable data table with search | ✅ Live |
| Indicator: Unemployment rate (Eurostat lfst_r_lfu3rt) | ✅ Live |
| Multi-indicator / thematic sections | 🔜 Planned — v2 |
| Stakeholder survey integration | 🔜 Planned — post summer 2026 |
| Ukrainian oblasts extension | 🔜 Planned — subject to data availability |

---

## Planned Development Roadmap

### v2 — Multi-indicator platform (delivery: interim report, October 2026)
Full thematic structure aligned with the TNCOOP fiche for CE, including:

| Thematic Area | Example Indicators |
|---|---|
| Demography & Geography | Population density, median age, population change |
| Innovation, Research & SMEs | Regional Innovation Scoreboard, R&D expenditure (% GDP) |
| Environment & Climate Change | Renewable energy share, PM2.5, flood risk index |
| Digital Connectivity & Transport | Broadband access, proximity to major road network |
| Sustainable Regional Development | GDP per capita (PPS), unemployment, NEET rate, AROPE |
| Cultural Heritage & Tourism | Tourism intensity, employment in cultural sectors |
| Housing | Residential buying and renting prices (€/m²) |
| Quality of Government | EQI, travel time to hospital / secondary school |

### v3 — Survey integration (delivery: post-consultation, September 2026)
After the stakeholder consultation (June–August 2026), georeferenced survey responses will be integrated as an additional data layer. This will enable:
- Cross-referencing of **territorial challenges** (statistical analysis) with **cooperation needs** (stakeholder survey) at NUTS2 level
- Identification of "cooperation niches" as required under Task 2
- A dedicated Survey Dashboard section with: response overview map, thematic breakdown by region, challenges × needs matrix

### v4 — Geographic extension to Ukraine (conditional)
Subject to data availability and methodological comparability with Eurostat, coverage will extend to **western Ukrainian oblasts** bordering the CE programme area, drawing on the State Statistics Service of Ukraine (stat.gov.ua) and Eurostat where applicable. Assessment will be done indicator by indicator.

---

## Accessibility — WCAG 2.1 AA Compliance

This dashboard is committed to meeting **WCAG 2.1 Level AA** accessibility standards. All development must respect the following requirements:

### Colour & Contrast
- All text must meet a minimum contrast ratio of **4.5:1** against its background (AA standard)
- Large text (18px+ or 14px+ bold) must meet **3:1** minimum contrast
- The choropleth colour scale must never rely on colour alone to convey meaning — values must also be readable via tooltips and the data table
- Do not use red/green as the only distinguishing colours without additional cues (pattern, label, icon)

### Keyboard Navigation
- All interactive elements (filters, map regions, table rows, chart controls) must be fully operable via keyboard
- Focus order must follow a logical reading order
- Visible focus indicators must be present on all focusable elements (`outline` must never be set to `none` without a replacement)

### Screen Readers & Semantic HTML
- All images and SVG elements must have descriptive `aria-label` or `title` attributes
- The choropleth map SVG must include `role="img"` and `aria-label` describing the current state
- Form controls (sliders, selects, checkboxes) must have associated `<label>` elements
- Data tables must use proper `<th>` with `scope` attributes
- Page sections must use semantic landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`)

### Text & Typography
- Atkinson Hyperlegible is the primary font — it is specifically designed for legibility for users with low vision and dyslexia
- Minimum body font size: 14px
- Text must remain readable when browser zoom is set to 200%
- Line height must be at least 1.5× the font size for body text

### Interactive Components
- All tooltip information must also be available in a non-hover format (keyboard accessible)
- Sliders must expose current value to assistive technologies via `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Loading states must be communicated via `aria-live` regions
- Error states must be programmatically associated with their controls

### Testing Protocol
Before each release, run:
```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe https://RS-OpenEconomics.github.io/Interreg-CENTRAL-EUROPE-Dashboard/ --tags wcag2aa
```
Also test manually with:
- **Keyboard only** (Tab, Enter, Arrow keys, Escape)
- **Screen reader**: NVDA (Windows) or VoiceOver (Mac/iOS)
- **Browser zoom**: 200% and 400%
- **High contrast mode**: Windows High Contrast / forced-colors

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Charts | Recharts |
| Maps | D3-geo + Eurostat GISCO GeoJSON |
| Styling | CSS Modules + OE Design System tokens |
| Font | Atkinson Hyperlegible Next (Google Fonts) |
| Deploy | GitHub Pages via gh-pages |
| Data | Eurostat REST API / static JSON |

---

## Project Structure

```
src/
├── data/
│   └── data.js              ← NUTS2 regions + Eurostat time series
├── hooks/
│   └── useAppState.js       ← global state (year, countries, focus regions)
├── components/
│   ├── Sidebar.jsx          ← navigation + filters
│   ├── TopNav.jsx           ← breadcrumb + search
│   ├── KpiStrip.jsx         ← headline KPI cards
│   ├── MapSection.jsx       ← choropleth map (D3) + trend chart
│   ├── RankingChart.jsx     ← regional ranking bar chart
│   ├── DataTable.jsx        ← full sortable data table
│   └── Footer.jsx
├── App.jsx                  ← layout orchestration
└── index.css                ← OE Design System tokens
public/
├── nuts2_ce.geojson         ← NUTS2 boundaries (Eurostat GISCO, 2021)
└── eu_countries.geojson     ← EU country outlines (background layer)
```

---

## Design System

Based on the **OpenEconomics Design System 2.0** (Figma file: `ULFrjRJzopTyLKczdJLJkn`).

Key tokens:
```css
--violet:       #5B4FCF;   /* primary — buttons, active states */
--violet-dark:  #3D2B8E;   /* sidebar, deep accents */
--violet-light: #EEF0FD;   /* backgrounds, hover states */
--font:         'Atkinson Hyperlegible Next', sans-serif;
--font-mono:    'Atkinson Hyperlegible Mono', monospace;
```

---

## Setup & Development

```bash
# Install dependencies
npm install

# Development server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
# → https://RS-OpenEconomics.github.io/Interreg-CENTRAL-EUROPE-Dashboard/
```

### Updating data
To update the underlying dataset with a new Excel export from Eurostat:
1. Replace `Interreg_NUTS2_Unemployment_Rate_.xlsx` in the project root
2. Run `python3 build_data.py` to regenerate `src/data/data.js`
3. Run `npm run deploy` to republish

---

## Data Sources

| Dataset | Source | Coverage |
|---|---|---|
| Unemployment rate | Eurostat · lfst_r_lfu3rt | NUTS 2 · 81 regions · 2015–2024 |
| NUTS2 boundaries | Eurostat GISCO · 2021 edition · 20M scale | 9 programme countries |
| EU country outlines | Eurostat GISCO · NUTS level 0 | EU27 |

---

## Licence & Attribution

Developed by **OpenEconomics** for the Interreg Central Europe 2028–34 territorial analysis and strategy building support project, in consortium with **T33 Srl**.

Data: © European Union, Eurostat, [reuse authorised](https://ec.europa.eu/eurostat/about-us/policies/copyright).

---

*OpenEconomics · [openeconomics.net](https://openeconomics.net) · 2026*
