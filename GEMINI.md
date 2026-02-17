# Gemini Code Understanding

This document provides a high-level overview of the `mj-next` project to assist Large Language Models in understanding the codebase.

## Project Overview

`mj-next` is a web-based Mahjong game built with Next.js and TypeScript. It features a modern frontend stack, a clear separation of concerns, and a component-based architecture for rendering the game.

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React, with Storybook for development and testing.
- **State Management**: Likely Zustand or a similar flux-like library (inferred from `src/store/`).

## Directory Structure

The project follows a standard Next.js structure with a `src` directory.

-   `src/app/`: Contains the application's pages and routes.
    -   `game/`: The main game interface.
    -   `lobby/`: The pre-game lobby where players can gather.
    -   `signup/`: User registration page.
-   `src/common/`: Core business logic, independent of the UI.
    -   `core/`: Contains the primary Mahjong game logic (`mj.game.ts`).
    -   `models/`: Defines the data structures for the game (e.g., `player.model.ts`, `room.model.ts`).
    -   `protocols/`: Handles communication with the backend server, likely via WebSockets (`game-socket.ts`).
-   `src/components/`: Reusable React components for building the UI.
    -   `HandTiles.tsx`, `DiscardTiles.tsx`, `WallTiles.tsx`: Components for rendering different tile sets.
    -   `Room.tsx`: The main component that assembles the game board.
    -   `ui/`: Base UI elements like buttons, dialogs, etc.
-   `src/lib/`: Utility functions and services.
    -   `auth-service.ts`: Handles user authentication.
    -   `game-utils.ts`: Helper functions related to game logic.
-   `src/store/`: Global state management.
    -   `game-store.ts`: Manages the state of the Mahjong game (e.g., player hands, discard pile, current turn).
    -   `ui-store.ts`: Manages UI-related state.
-   `public/`: Static assets.
    -   `tiles/`: Contains the SVG images for the Mahjong tiles.

## Key Files for AI/Agent Interaction

To develop an AI agent capable of playing the game, the following files are most relevant:

-   **`src/common/models/**/*.ts`**: Understand the data structures representing the game state (players, hands, tiles, etc.).
-   **`src/store/game-store.ts`**: This is the "source of truth" for the client-side game state. An AI would need to read this state to make decisions. The actions defined here represent the possible moves a player can make.
-   **`src/common/protocols/game-socket.ts`**: Defines the contract for communicating with the game server. An AI would use this to send actions (like discarding a tile) and receive updates.
-   **`src/common/core/mj.game.ts`**: Contains the fundamental rules of the game. While the server will enforce these rules, this file is crucial for developing a valid move-generation algorithm.
