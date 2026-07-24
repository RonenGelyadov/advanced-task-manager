# TaskHub

TaskHub is a Trello/Jira-style Kanban task management SPA. Boards contain columns, columns contain tasks.

This is a client-side only application — there is no custom backend in this repo. All persistence (data storage and authentication) goes through **Firebase** (Firestore for data, Firebase Auth for login/register) directly from the browser.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** — build tool and dev server
- **MUI (Material UI)** — components and styling (via the `sx` prop)
- **Zustand** — state management
- **react-router-dom v7** — routing
- **react-hook-form** — forms
- **date-fns** — date utilities
- **Firebase** (Firestore + Auth) — persistence layer

## Getting started

Install dependencies:

```bash
npm install
```

You'll need a `.env` file with your Firebase project config (see `src/config/firebase.ts` for the expected `import.meta.env` variables).

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

There is currently no test script or test framework configured.

## Project structure

```
src/
├── components/   # Shared UI components (TaskCard, ColumnCard, BoardCard, dialogs, ...)
├── pages/        # Route-level components, incl. pages/authPages/ (protected routes)
├── layout/       # App layout, navbar, sidebar
├── router/       # Route definitions and auth guard
├── store/        # Zustand stores (one per domain)
├── services/     # Firestore CRUD, one file per entity
├── data/         # Static config and small pure helpers (colors, mock data, task utils)
├── providers/    # MUI theme provider (dark/light mode)
└── types/        # Shared TypeScript types
```

## Domain model

`Board 1--* Column 1--* Task`. A `Task` belongs to one `User` (`assigneeId`) and can be bookmarked by many users (`savedBy`). Firestore collections mirror the types 1:1: `tasks`, `boards`, `columns`, `users`.

More details on architecture, conventions, and known gaps are documented in [CLAUDE.md](./CLAUDE.md).
