# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Online Mahjong game built with **Next.js 15** (App Router, Turbopack), **TypeScript**, and **Tailwind CSS v4**.  
Frontend connects to a **NestJS backend** via REST (`openapi-fetch`) and WebSocket (`socket.io-client`).

**Key dependencies:** React 19, Zustand 5, openapi-fetch, socket.io-client, Radix UI, CVA, Zod, React Hook Form, Framer Motion, mitt (event bus).

---

## Commands

```bash
# Development
yarn dev                # Next.js dev server (port 9000, Turbopack)
yarn start              # Production server (port 9000)
yarn storybook          # Storybook (port 6006)

# Build
yarn build              # Production build
yarn build-storybook    # Storybook static build

# Code Quality
yarn lint               # ESLint (flat config, ESLint 9)
yarn format             # Prettier write
yarn format:check       # Prettier check

# Testing
yarn test               # Jest unit tests
yarn test:watch         # Jest watch mode
yarn test:coverage      # Jest with coverage
```

---

## Architecture

### Routing (App Router)

| Route     | Component  | Notes        |
| --------- | ---------- | ------------ |
| `/`       | Sign In    | Home page    |
| `/signup` | Sign Up    | Registration |
| `/lobby`  | Lobby      | Protected    |
| `/game`   | Game Board | Protected    |

- All pages are **client components** (`"use client"`).
- Route protection: `src/middleware.ts` (redirects unauthenticated users) + `AppGuard` (component-level routing based on app state).

### Key Directories

- `src/app/` — Next.js App Router pages & root layout
- `src/components/ui/` — shadcn/ui primitives (Radix UI + CVA)
- `src/components/ui-ex/` — Custom UI extensions (FloatingButton, LoadingScreen, SpeedDial)
- `src/components/providers/` — App-level providers: `AppInitializer`, `AppGuard`
- `src/components/` — Mahjong game components (Room, Tile, HandTiles, etc.)
- `src/common/core/` — Mahjong game engine logic (shared with backend, excluded from ESLint/Jest)
- `src/common/api/` — Auto-generated OpenAPI types from backend
- `src/common/protocols/` — WebSocket event models & `GameSocket`
- `src/common/models/` — Data models (user, room, player, client)
- `src/common/test/` — Shared test utilities
- `src/store/` — Zustand stores with devtools
- `src/hooks/` — Custom hooks (`useIsCurrentPlayer`)
- `src/lib/` — Utilities (`cn()`, authService, client, socket-client, event-bus, app-service, game-utils)
- `src/stories/` — Storybook stories with store decorators
- `src/middleware.ts` — Route protection

### Providers

- **AppInitializer** — Initializes app: restores auth session, connects WebSocket, populates stores, emits events via `eventBus`.
- **AppGuard** — Reads Zustand stores (auth state, game status) to redirect at component level.

### Auth Flow

- JWT-based: tokens in cookies, user profile held in-memory by `AuthService`
- `authService` restores session via `GET /api/auth/me`
- Auth state synced to Zustand stores by `appService.wireEvents()` via event bus
- REST API client injects Bearer tokens automatically

### State Management (Zustand + Devtools)

- `game-store` — Game instance, current player, game phase
- `ui-store` — Tile size, open-tiles toggle
- `room-store` — Room info & player seats
- `user-store` — Current user profile
- `app-status-store` — App initialization flags
- `action-store` — Player actions (chi, peng, gang, hu, etc.)

All stores exported from `src/store/index.ts`.

### Event Bus

- Mitt-based (`src/lib/event-bus.ts`)
- Decouples modules: `appService` subscribes and updates Zustand stores
- Events: `user:pending`, `user:signed-in`, `user:signed-out`, `user:ws-token`, `socket:pending`, `socket:connected`, `socket:disconnected`, `socket:data`

### API Layer

- **REST:** openapi-fetch (`src/lib/client.ts`), auto-generated types, proxied via Next.js rewrites (`/api/*` → `NEXT_PUBLIC_API_URL`)
- **WebSocket:** socket.io-client wrapped in `GameSocket` (`src/common/protocols/game-socket.ts`) with JWT & auto-reconnect; low-level wrapper in `src/lib/socket-client.ts`

### Storybook

- Storybook 10 (`@storybook/nextjs-vite`)
- Stories use `UIStoreDecorator` & `GameStoreDecorator`
- Vitest browser tests via Playwright

---

## Conventions

- Path alias: `@/*` → `./src/*`
- Component variants via CVA, class merging via `cn()`
- Prettier: double quotes, semicolons, trailing commas, 120 char width, LF line endings
- Tailwind plugin: class sorting
- `src/common/` is shared library (excluded from ESLint/Jest)
- Tests: `*.spec.ts` / `*.test.ts`
- Tile assets: SVG in `public/tiles/Regular/`
- Forms: React Hook Form + Zod (`onBlur` validation)
- Animations: Framer Motion (SpeedDial, ActionPanel, etc.)

---

## Environment Variables

```bash
NEXT_PUBLIC_API_URL    # NestJS REST API base URL (default: http://localhost:3000)
NEXT_PUBLIC_WS_URL     # WebSocket URL (default: ws://localhost:3000)
```

Store in `.env.local` (git-ignored). `/api/*` rewrites point to `NEXT_PUBLIC_API_URL`.

---

## 🔒 Required Workflow Rules

### 1. PLAN Gate (MANDATORY)

For planning, refactoring, bug fixing, or any non-trivial change:

1. Create/update `PLAN.md` with step-by-step plan
2. STOP after writing plan
3. WAIT for explicit approval ("GO", "proceed", "implement")
4. **Never modify production code before approval**

---

### 2. Scoped Exploration Before Edits

**Step 1 — Start Narrow:** read files explicitly mentioned
**Step 2 — Expand Intentionally (if needed):** list suspected additional files, explain relevance

- 🟢 Low-risk: proceed without waiting
- 🟡 Medium-risk: may proceed unless user objects
- 🔴 High-risk: list impacted areas, wait for confirmation

**Step 3 — Confirm Scope:** summarize inferred impact
**Step 4 — Begin Edits:** only after scope alignment

**Guiding principle:** exploration is encouraged, but intentional, proportional, and scoped.

---

### 3. UI Changes — Single Component Rule

1. Edit **one component per iteration**
2. STOP and wait for review
3. Verify all props exist in type definitions
4. Do NOT batch multiple components unless instructed

Exception: if changes are low-risk and clearly related (e.g., add a new prop to multiple components).

---

## ✅ Execution Priority

PLAN Gate > File Scope Control > UI Single-Component Rule > Speed

```

```
