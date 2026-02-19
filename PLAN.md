# Refactor App State Management

## Goal

Use `mitt` as an event bus to decouple services. Currently, services call each other directly and
mutate Zustand stores from many places, making the data-flow hard to follow. The refactor should
make the flow unidirectional:

```
AuthService / SocketClient  →  (emit events)  →  AppService  →  Zustand stores  →  React UI
```

---

## Constraints

- **`src/common/` is read-only** — files there are shared with another repo and must not be
  modified. This includes `GameSocket` (`game-socket.ts`) and `SocketClient` (`apis.models.ts`).
  The refactor must work around their limitations (e.g. single-callback per event) rather than
  change them.

---

## Current Problems

### 1. Tight coupling between services
- `auth-service.ts` directly imports `socket-client` and calls `socketClient.connect/disconnect`.
- `auth-service.ts` directly imports and mutates `app-status-store` (`setReady(true/false)`).

### 2. `isReady` is set from too many places
- `auth-service.ts`: sets `setReady(false)` at start, `setReady(true)` on failure or after logout.
- `AppInitializer.tsx`: sets `setReady(true)` inside the socket `onReceive` callback.
- There is no single owner of the "app is ready" state.

### 3. `AppInitializer.tsx` mixes too many concerns
- Calls `initSocket()` to create the socket singleton.
- Registers the socket `onReceive` handler and updates three Zustand stores directly.
- Subscribes to `authService` and updates `user-store` / `game-store`.
- Calls `authService.initialize()`.

### 4. `socket-client.ts` initialization is confusing
- `socketClient` export starts as `undefined` at module load time.
- `initSocket()` (called from `AppInitializer`) creates the socket without a token.
- Later, `authService.connectSocketClient()` calls `socketClient.connect(token)` which triggers a
  reconnect on the already-created socket. Two-phase init is easy to get wrong.

---

## Planned Changes

### Step 1 — Add `mitt` and define event types (`src/lib/event-bus.ts`)

Create a typed event bus with these events:

| Event                 | Payload       | Emitted by              |
|-----------------------|---------------|-------------------------|
| `user:pending`        | —             | AuthService             |
| `user:signed-in`      | `UserProfile` | AuthService             |
| `user:signed-out`     | —             | AuthService             |
| `user:ws-token`       | `string`      | AuthService             |
| `socket:pending`      | —             | AppService (see Step 4) |
| `socket:connected`    | —             | `socket-client.ts`      |
| `socket:disconnected` | —             | `socket-client.ts`      |
| `socket:data`         | `GameEvent`   | `socket-client.ts`      |

### Step 2 — Refactor `AuthService` (`src/lib/auth-service.ts`)

- Remove the direct imports of `socket-client` and `app-status-store`.
- Remove the existing `subscribe()` / `listeners` mechanism — replace with event bus entirely.
- Emit `user:pending` before the async auth check begins.
- Emit `user:signed-in` (with profile) when sign-in or restore succeeds.
- Emit `user:ws-token` (with the token string) after successfully fetching a WS token.
- Emit `user:signed-out` on logout or unauthorized response.

### Step 3 — Refactor `src/lib/socket-client.ts` (the singleton wrapper)

`GameSocket` / `SocketClient` in `src/common/` support only a single callback per event and cannot
be changed. Since `socket-client.ts` is the **sole** place that registers those callbacks, the
single-callback limit is not a practical problem. The wrapper should:

- Keep the `initSocket()` factory (creates the `SocketClient` singleton).
- After creation, immediately register callbacks that forward to the event bus:
  - `socketClient.onConnect()`    → emit `socket:connected`
  - `socketClient.onDisconnect()` → emit `socket:disconnected`
  - `socketClient.onReceive()`    → emit `socket:data`
- Export the `socketClient` singleton for use by `AppService`.

### Step 4 — Create `AppService` (`src/lib/app-service.ts`)

Single coordinator that owns all cross-cutting logic. It calls `initSocket()` to set up the
singleton, wires all event handlers, then kicks off `authService.initialize()`.

Event reactions:

| Event                 | Action                                                              |
|-----------------------|---------------------------------------------------------------------|
| `user:pending`        | `setReady(false)` — app is loading                                  |
| `user:signed-in`      | Update `user-store` with profile                                    |
| `user:ws-token`       | Emit `socket:pending`, then call `socketClient.connect(token)`      |
| `user:signed-out`     | Clear `user-store` + `game-store`, disconnect socket, `setReady(true)` |
| `socket:connected`    | No-op (wait for first data before declaring ready)                  |
| `socket:disconnected` | No-op or optional UI feedback                                       |
| `socket:data`         | Parse event, update `room-store` + `game-store`, `setReady(true)`  |

`AppService` is the **only** place that calls `setReady()`.

### Step 5 — Simplify `AppInitializer.tsx`

After the above, `AppInitializer` only needs to:
1. Call `appService.initialize()`.

All socket creation, store updates, and event wiring move out to `AppService`.

### Step 6 — `AppGuard.tsx` — no change

It reads from Zustand stores (`isReady`, `user`, `game`) and handles routing. No changes needed.

---

## Files Affected

| File                                          | Change                                         |
|-----------------------------------------------|------------------------------------------------|
| `src/lib/event-bus.ts`                        | **New** — mitt instance + typed event map      |
| `src/lib/app-service.ts`                      | **New** — event orchestrator                   |
| `src/lib/auth-service.ts`                     | Refactor — emit events, remove store/socket imports |
| `src/lib/socket-client.ts`                    | Refactor — forward socket callbacks to event bus |
| `src/components/providers/AppInitializer.tsx` | Simplify — delegate entirely to AppService     |
| `src/store/app-status-store.ts`               | No change                                      |
| `src/store/user-store.ts`                     | No change                                      |
| `src/store/game-store.ts`                     | No change                                      |
| `src/store/room-store.ts`                     | No change                                      |
| `src/components/providers/AppGuard.tsx`       | No change                                      |
| `src/common/**`                               | **No change** — read-only shared library       |
