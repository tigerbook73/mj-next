# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Online Mahjong game built with Next.js 15 (App Router, Turbopack), TypeScript, and Tailwind CSS v4. The frontend connects to a NestJS backend via REST (openapi-fetch) and WebSocket (socket.io-client).

## Commands

```bash
# Development
yarn dev                # Next.js dev server on port 9000 (Turbopack)
yarn storybook          # Storybook on port 6006

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

## Architecture

### Routing (App Router)
- `/` — Sign In (home)
- `/signup` — Sign Up
- `/lobby` — Lobby (protected)
- `/game` — Game board (protected)

All pages are client components (`"use client"`).

### Key Directories
- `src/components/ui/` — shadcn/ui primitives (Radix UI + CVA)
- `src/components/ui-ex/` — Custom extended UI components
- `src/components/` — Mahjong game components (Room, Tile, HandTiles, etc.)
- `src/common/core/` — Mahjong game engine logic (shared with backend, excluded from ESLint)
- `src/common/api/` — Auto-generated OpenAPI types from NestJS backend
- `src/common/protocols/` — WebSocket (GameSocket) and token storage
- `src/common/models/` — Data models (user, room, player, client)
- `src/store/` — Zustand stores (game-store, ui-store) with devtools
- `src/hooks/` — Custom hooks (useAuth for protected routes)
- `src/lib/` — Utilities: `cn()` helper, auth-service, profile-storage, API client
- `src/stories/` — Storybook stories with store decorators

### Auth Flow
JWT-based: tokens and user profile stored in localStorage. `useAuth` hook guards protected pages. API client auto-injects Bearer tokens via middleware.

### State Management
Zustand stores: `game-store` (Game instance) and `ui-store` (tile size, open tiles toggle).

### API Layer
- REST: openapi-fetch client with generated types, proxied via Next.js rewrites (`/api/*` → NestJS at `NESTJS_API_URL`)
- WebSocket: socket.io-client wrapped in `GameSocket` class with JWT auth and auto-reconnect

### Storybook
Storybook 10 with `@storybook/nextjs-vite`. Stories use UIStoreDecorator and GameStoreDecorator for isolated store state. Vitest browser tests via Playwright.

## Conventions

- Path alias: `@/*` → `./src/*`
- Component variants via CVA, class merging via `cn()` (clsx + tailwind-merge)
- Prettier: double quotes, semicolons, trailing commas, 80 char width, Tailwind plugin
- `src/common/` is shared code excluded from ESLint — treat as a library boundary
- Tests co-located as `*.spec.ts` / `*.test.ts`
- Tile assets: SVG files in `public/tiles/Regular/`
