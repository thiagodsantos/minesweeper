# Minesweeper — Field Notes

A responsive, classic Minesweeper game built with React, Vite, TypeScript, Tailwind CSS, and i18next. The interface takes inspiration from a nostalgic green arcade field and supports English, Spanish, and Brazilian Portuguese.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The app starts with a 10 × 10 board and 15 mines. Use the field settings to change rows, columns, and mines; rows, columns, and mines must each be at least 10, and the mine count must be less than the number of squares.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run unit and component tests with Vitest |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |

## Controls

- Click or press Enter/Space on a covered square to reveal it.
- Right-click or focus a square and press **F** to toggle a flag.
- Choose **New game** to generate a fresh field with the current settings.
- Use the language control to cycle between English, Spanish, and Portuguese (Brazil).
- The board remains locked during the three-second start countdown.

## Project structure

The UI follows Atomic Design; game logic remains separate from rendering:

```text
src/
├── components/
│   ├── atoms/       # Buttons, board cells, marks, and small display elements
│   ├── molecules/   # Composed controls and row/header groups
│   ├── organisms/   # Board, field, settings form, and game card
│   └── templates/   # Page layout composition
├── features/
│   ├── game/        # Typed game rules, board generation, and validation
│   └── settings/    # Default board settings and settings behavior
├── i18n/            # English, Spanish, and pt-BR resources
├── pages/           # Page-level game state and orchestration
└── shared/          # Reusable hooks and utilities
```

Use the `@/` alias for internal source imports. It is configured in TypeScript and Vite.

## Fonts and visual assets

The page loads **Montserrat** and **Happy Monkey** from Google Fonts. That request requires an internet connection; the system font stack is used as a fallback. The field texture and cell states are rendered with CSS and do not require external image assets.
