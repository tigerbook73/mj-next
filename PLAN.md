# Auth Refactor Plan: Match Updated Server JWT Flow

## Current State Analysis

### Server JWT Flow (updated)
| Aspect | How it works now |
|--------|-----------------|
| **Login/Register response** | Returns `{ userId, email, name }` — **no token in body** |
| **JWT delivery** | HTTP-only cookie `auth_token` (7-day expiry, `httpOnly: true`, `sameSite: lax`) |
| **JWT extraction** | Server reads `req.cookies?.auth_token` via Passport JWT strategy |
| **WS token** | `GET /auth/ws-token` (requires cookie auth) → returns `{ token: "..." }` (10-min, type: "ws") |
| **WS guard** | Validates `socket.handshake.auth?.token`, **rejects HTTP tokens** (checks `type === "ws"`) |
| **Profile** | `GET /auth/me` (requires cookie auth) → returns `UserResponseDto` |
| **Logout** | `POST /auth/logout` → clears `auth_token` cookie server-side |

### Client Issues (what's broken / deprecated)

1. **`tokenStorage` in localStorage is now useless** — Server sets HTTP-only cookies; `data.accessToken` and `data.expiresIn` don't exist on the response DTO anymore. Sign-in/sign-up pages reference `data.accessToken` which will be `undefined`.

2. **`authService.storeProfileAfterAuth()` calls `/api/auth/profile`** — This endpoint doesn't exist. The server endpoint is `/api/auth/me`.

3. **`authService.verifyToken()` also calls `/api/auth/profile`** — Same wrong endpoint.

4. **`authService.isAuthenticated()` checks `tokenStorage.getToken()`** — With HTTP-only cookies, JS can't read the token. This check always fails.

5. **`authService.logout()` clears localStorage token** — Doesn't call `POST /api/auth/logout` to clear the server cookie.

6. **`GameSocket` constructor takes a raw token** — Should instead fetch a WS-specific token from `/api/auth/ws-token` before connecting.

7. **`UserProfile` interface in `profile-storage.ts`** — Duplicates `UserResponseDto` from OpenAPI types. Should use the generated type.

8. **Bearer token middleware in `client.ts`** — Manually injects `Authorization: Bearer` header from localStorage. With cookies, the browser auto-sends the cookie; this middleware is unnecessary for REST calls.

## Step-by-Step Refactor Plan

### Step 1: Fix REST API client — remove manual Bearer token injection
**Files:** `src/lib/client.ts`

- Remove the `onRequest` middleware that manually sets `Authorization: Bearer`.
- Configure `openapi-fetch` with `credentials: "include"` so the browser auto-sends cookies.
- Remove the `tokenStorage` re-export (no longer needed from this file).

### Step 2: Fix auth-service — align with server endpoints and cookie-based auth
**Files:** `src/lib/auth-service.ts`

- **`storeProfileAfterAuth()`** → Call `GET /api/auth/me` (not `/api/auth/profile`).
- **`verifyToken()`** → Call `GET /api/auth/me`. On success, cache profile locally. On failure (401), clear local profile cache.
- **`isAuthenticated()`** → Only check if `profileStorage.getProfile()` exists (can't check cookie from JS). The real validation happens server-side when `verifyToken()` is called.
- **`logout()`** → Call `POST /api/auth/logout` (server clears cookie) + clear local `profileStorage`.
- **Remove** `tokenStorage` import and all references. Token is managed by the browser cookie jar.
- **Use `UserResponseDto`** from generated OpenAPI types instead of custom `UserProfile`.

### Step 3: Remove `profile-storage.ts` custom `UserProfile` type, use OpenAPI type
**Files:** `src/lib/profile-storage.ts`, all importers

- Replace `UserProfile` with `components["schemas"]["UserResponseDto"]` from `@/common/api/apis`.
- Create a type alias `type UserProfile = components["schemas"]["UserResponseDto"]` for convenience, co-located in `profile-storage.ts` or `auth-service.ts`.
- Update all imports.

### Step 4: Fix sign-in and sign-up pages — remove token handling from response
**Files:** `src/app/page.tsx`, `src/app/signup/page.tsx`

- Remove `tokenStorage` import and `tokenStorage.setToken(data.accessToken, data.expiresIn)` calls — the cookie is set automatically by the server response.
- After successful login/register, just call `authService.storeProfileAfterAuth()` and redirect.
- Update auto-redirect check: replace `authService.isAuthenticated()` with `authService.getProfileFromCache()`.

### Step 5: Fix `useAuth` hook — ensure proper server-side verification
**Files:** `src/hooks/useAuth.ts`

- Current logic is mostly correct (checks cache, then verifies with server). Just ensure it calls the right endpoint (fixed in Step 2).
- Update `UserProfile` import to use the new type alias.

### Step 6: Refactor `GameSocket` — integrate WS token flow
**Files:** `src/common/protocols/game-socket.ts`

- Add a static async factory method or a `connectWithAuth()` method that:
  1. Calls `GET /api/auth/ws-token` to get a short-lived WS token
  2. Passes it in `socket.handshake.auth.token`
- Update `connect(token)` method — keep for manual reconnect, but add a `connectWithWsToken()` that fetches and uses a fresh WS token.
- On `connect_error` with "Unauthorized" or "Invalid token type", attempt to fetch a new WS token and retry once (handle token expiry gracefully).

### Step 7: Fix lobby page logout
**Files:** `src/app/lobby/page.tsx`

- `handleSignOut` should call `await authService.logout()` (now async since it calls the server).

### Step 8: Clean up deprecated token storage usage
**Files:** `src/common/protocols/token-storage.ts`, `src/lib/client.ts`

- `LocalStorageTokenStorage` and `localTokenStorage` — evaluate if still needed. If the only consumer was the REST client Bearer middleware (now removed) and direct page usage (now removed), this can be deleted.
- If `GameSocket` still uses it for WS token caching, keep a minimal version. Otherwise, remove.

### Step 9: Update `next.config.ts` proxy — ensure cookies are forwarded
**Files:** `next.config.ts`

- Verify that the API proxy rewrites (`/api/*` → NestJS) forward `Set-Cookie` headers properly. Next.js rewrites should handle this by default, but confirm.
- If using `credentials: "include"`, ensure no CORS issues in dev mode.

## Risks & Considerations

| Risk | Mitigation |
|------|------------|
| **Cookie not forwarded through Next.js proxy** | Test in dev mode; if rewrites don't forward `Set-Cookie`, may need a custom Next.js API route or adjust proxy config |
| **`credentials: "include"` + CORS** | In dev, if frontend and API are on different origins, server must set `Access-Control-Allow-Credentials: true` and explicit `Access-Control-Allow-Origin` (not `*`). The Next.js rewrite proxy makes this same-origin, so likely fine. |
| **`isAuthenticated()` is now a weak check** | It only checks local cache. A stale profile in localStorage could cause a brief flash before `verifyToken()` redirects. This is acceptable UX — the `useAuth` hook already handles this pattern. |
| **WS token expiry (10 min)** | If a user stays on the lobby page without connecting for >10 min, the WS token will expire. Fetch the WS token just before connecting, not at page load. |
| **Logout needs to be async** | `handleSignOut` becomes async. Ensure the `POST /auth/logout` call completes (or at least fires) before redirect. |
| **`src/common/` is shared code** | Changes to `game-socket.ts` need to remain compatible with the shared library boundary. Don't import from `@/lib/` inside `src/common/`. Pass the WS token into `GameSocket` from the caller. |

## Testing Considerations

1. **Manual E2E flow**: Sign in → verify cookie is set → navigate to lobby → verify `/auth/me` works → sign out → verify cookie is cleared → verify redirect to sign-in
2. **WS connection**: Sign in → fetch WS token → connect GameSocket → verify connection succeeds → wait 10+ min → reconnect → verify new WS token is fetched
3. **Token expiry**: Wait for cookie to expire (or manually clear it) → navigate to protected page → verify redirect to sign-in
4. **Auto sign-in**: Sign in → close tab → reopen → verify profile loads from cache → verify server verification succeeds
5. **Unit tests**: Mock `client.GET`/`client.POST` calls in auth-service tests; verify correct endpoints are called

## Dependency Order

```
Step 1 (client.ts) ─┐
Step 3 (types)     ──┼── Step 2 (auth-service) ── Step 4 (pages) ── Step 5 (useAuth)
                     │                                                     │
                     └── Step 6 (GameSocket) ──────────────────────────────┘
                                                                           │
                                                              Step 7 (lobby) ── Step 8 (cleanup) ── Step 9 (proxy)
```
