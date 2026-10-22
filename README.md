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

Open the local URL printed by Vite. The app starts with a 10 × 10 board and 15 mines. The board and settings panel are centered in the viewport; larger custom boards scroll within the field area.

## Gameplay and settings

- Each square counts mines in its eight surrounding squares. Revealing an empty square automatically opens the connected empty area and its numbered edge.
- Revealing a mine ends the game and shows the minefield. The square that triggered the loss is highlighted; incorrect flags are marked separately.
- Win by revealing every non-mine square; flagging every mine is not required.
- Flags prevent covered squares from being revealed. The mine counter is the configured mine count minus the number of flags, so it can go below zero if you place too many.
- Choose **New game** to regenerate a field with the current settings, or apply new settings to start with a different board.
- Rows, columns, and mines must each be integers of at least 10. The mine count must also be less than the total number of squares.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run unit and component tests with Vitest |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |

## Controls

- Click or focus a covered square and press **Enter** or **Space** to reveal it.
- Right-click a covered square or focus it and press **F** to toggle a flag.
- The board is locked during the three-second countdown shown when the app opens, after **New game**, and after applying settings.
- The timer begins on the first revealed square and stops when the game is won or lost.
- Use the language control to cycle through English, Spanish, and Brazilian Portuguese (`pt-BR`). The document language is updated along with the interface.

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

Use the `@/` alias for internal source imports. It is configured in TypeScript and Vite. Unit and component tests live beside their related game logic or UI components.

The board uses short reveal animations for opened squares and a shake animation for the exploded mine. Animations respect the operating system's reduced-motion preference.

## Fonts and visual assets

The page loads **Montserrat** and **Happy Monkey** from Google Fonts. That request requires an internet connection; the system font stack is used as a fallback. The field texture and cell states are rendered with CSS and do not require external image assets.
