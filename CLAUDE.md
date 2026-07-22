# CLAUDE.md

Project context for Claude Code when working in this repository.

## Project overview

**TaskHub** — a Trello/Jira-style Kanban task management SPA. Boards contain columns, columns contain tasks. Client-side only: there is no custom backend in this repo — all persistence goes through Firebase (Firestore for data, Firebase Auth for login/register) directly from the browser.

Stack: React 19 + TypeScript, built with Vite 8, MUI (Material UI) for components/styling, Zustand for state, react-router-dom v7 for routing, react-hook-form for forms, date-fns for date utilities.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — `tsc -b && vite build`. `noUnusedLocals` / `noUnusedParameters` are enabled in tsconfig, so unused variables/imports fail the build, not just lint.
- `npm run lint` — ESLint (flat config, `eslint.config.js`)
- `npm run preview` — preview the production build

There is no test script and no test framework installed (no Jest/Vitest/RTL). Testing is greenfield.

## Directory map (`src/`)

- `components/` — shared UI components, flat, one component per file (`TaskCard.tsx`, `ColumnCard.tsx`, `BoardCard.tsx`, and their matching `*Dialog.tsx` create/edit dialogs)
- `pages/` — route-level components; `pages/authPages/` holds pages behind `ProtectedRoutes` (Dashboard, Board, MyTasks, SavedTasks, Task, About)
- `layout/` — `Layout.tsx` fetches all app data (boards/columns/tasks/users) on mount; `Navbar`, `Sidebar`
- `router/` — `Router.tsx` (route definitions), `ProtectedRoutes.tsx` (auth guard, redirects to `/login`), `routes.ts` (path constants)
- `store/` — Zustand stores (singular name, not `stores/`)
- `services/` — Firestore CRUD, one file per entity (`taskFirebaseService.ts`, `boardFirebaseService.ts`, `columnFirebaseService.ts`, `UserFirebaseService.ts` — note the inconsistent capital `U`)
- `data/` — static config and small pure helpers: color maps (`avatarColors.ts`, `boardColors.ts`, `columnColors.ts`), `mockData.ts` (demo users/boards), `taskUtils.ts` (priority config/colors), `taskFiltersInBoard.tsx`
- `providers/ProjectThemeProvider.tsx` — MUI theme + dark/light mode (persisted to localStorage)
- `types/dataTypes.ts` — single source of truth for shared types (`Task`, `Column`, `Board`, `User`, `Priority`, `Role`, `FilterMode`)
- `config/firebase.ts` — Firebase app/auth/firestore init from `import.meta.env` vars

## State management

Zustand, one store per domain in `src/store/`: `taskStore`, `boardStore`, `columnStore`, `userStore`, `authStore`, `loadingStore`.

Pattern: `create<T>((set, get) => ({ ... }))`, default-exported as `useXStore`. Actions call the matching `services/*FirebaseService.ts` function, then update local state (optimistic update, not a re-fetch). Components read state via `useXStore(s => s.field)`, or `useShallow` when selecting multiple fields/actions at once. `useLoadingStore` holds a single shared `isLoading` boolean used across async operations. `useAuthStore` also registers Firebase's `onAuthStateChanged` listener and owns login/logout.

## Domain model

`Board 1--* Column 1--* Task`. `Task *--1 User` via `assigneeId`. `Task *--* User` via `savedBy: string[]` (users who bookmarked the task). Firestore collections mirror the types 1:1: `tasks`, `boards`, `columns`, `users`. `User.role` (`admin` | `member`) gates admin-only UI, e.g. "New Board" is only shown to admins.

## Conventions

- One component per file, PascalCase filename matching the export; always `export default memo(Component)`.
- Styling is inline via MUI's `sx` prop only — no CSS Modules, no styled-components. Dark/light branches are keyed off `useTheme().isDark`.
- Forms use `react-hook-form` (`useForm` / `Controller` / `register`), consistently across dialogs and login/register pages.
- No path aliases configured — always use relative imports (`../store/...`).
- `verbatimModuleSyntax` is on — use `import type { ... }` for type-only imports.
- Icons are individual `@mui/icons-material/X` imports, not a generic `Icon` component.
- Card components are inconsistent in prop shape: `TaskCard` takes `{ task: Task }` and destructures inside; `ColumnCard`/`BoardCard` take spread-out scalar props (`id, boardId, title, color, ...`). Match whichever pattern the file you're editing already uses; don't silently unify them as a side effect of an unrelated change.

## Known gaps / traps

These are pre-existing states in the codebase, not bugs introduced by your session — don't "fix" them as a side effect of unrelated work:

- **Dates are fragile**: stored as locale strings via `toLocaleDateString('heb')` (see `TaskDialog.tsx`'s `onSubmit`) and re-parsed in `data/taskUtils.ts`'s `getPriorityColor` by manually splitting on `.` assuming `dd.mm.yyyy` order. `date-fns` is a dependency but underused for this.
- **Edit is not wired up**: `taskStore.ts`'s `updateTask` and `columnStore.ts`'s `updateColumn` are stub no-ops (`() => {}`). `TaskDialog`'s title says "Edit Task" but its submit handler currently calls `addTask` — only create is implemented.
- **Dead UI affordances**: edit/move-to-column menu items in `TaskCard.tsx` and buttons in `TaskPage.tsx` have their handlers commented out.
- **Type-safety gap**: `boardStore.ts`'s `getBoardById` is typed to return a non-nullable `Board` but internally uses `.find()`, which can return `undefined`.
- **`.env` holds live Firebase web config** (client-safe by Firebase's security model, but still gitignored — don't print or commit it).
- Deployed as a static SPA relying on `public/_redirects` (`/* /index.html 200`) for client-side routing (Netlify-style). Keep this in mind if touching routing or build output.

## Working in this repo

Per the user's global preferences, default to minimal, targeted changes: don't refactor, rename functions, or add tests/builds unless explicitly asked, and don't run git commands that change repo state unless explicitly instructed in the moment.
