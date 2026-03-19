# JSON Drift

> Let your JSON flow.

An interactive JSON visualizer that converts raw JSON into an explorable node graph. Paste or import any JSON, navigate its structure visually, inspect properties, and switch between 31 themes.

---

## Features

- **JSON to Node Graph** — parses any valid JSON and renders it as an interactive flow diagram with connected nodes
- **Live Monaco Editor** — VS Code-grade editor with real-time validation, syntax highlighting, and JSON formatting
- **Node Inspection** — click any node to open a property panel showing its keys, types, and values
- **Zoom to Node** — focus the canvas on any child node directly from the property panel
- **Breadcrumb Navigation** — track and navigate your path through nested JSON structure
- **31 Themes** — 18 light + 13 dark themes, all persisted across sessions
- **Import / Export** — load `.json` files or export the current JSON
- **Adaptive Controls** — zoom and fit-view controls reposition based on open panels

---

## Themes

**Light** — Daylight, Sunrise, Champagne Silk, Pearl Mist, Sage Whisper, Powder Blue, Blossom Pink, Golden Hour, Pure White, Warm Cream, Cool Gray, Soft Blue, Mint Fresh, Rose Blush, Lavender Mist, Paper White, Platinum, Ivory

**Dark** — Midnight, Eclipse, Ink Blue, Deep Space, Midnight Blue, Charcoal Professional, Warm Dark, Purple Haze, Forest Night, OLED Black, Slate Storm, Obsidian, Twilight Navy

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Routing | TanStack Router |
| State | Zustand |
| Graph | React Flow (XYFlow) |
| Editor | Monaco Editor |
| Styling | Tailwind CSS v4 |

---

## Getting Started

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

---

## Project Structure

```
src/
├── components/
│   ├── JsonInputPanel/     # Monaco editor panel
│   ├── PropertyPanel/      # Node property inspector
│   ├── nodes/              # Custom React Flow node components
│   └── ui/                 # Shared UI components
├── hooks/                  # useJsonFlow, useTheme, useJsonInput
├── store/                  # Zustand stores (flow, panel, theme)
├── types/                  # TypeScript interfaces
└── utils/                  # Theme definitions and CSS token logic
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Esc` | Close property panel |
