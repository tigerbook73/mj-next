# Refactor Auth Guard: Use Next.js Middleware

## Context

Currently, all auth protection is client-side: protected pages (`/lobby`, `/game`) call `useAuth()` which initializes `authService`, makes a `GET /api/auth/me` call, and redirects to `/` if unauthenticated. Public pages (`/`, `/signup`) do the reverse — redirecting to `/lobby` if already signed in. This causes a flash of loading screen on every navigation. Moving the guard to Next.js middleware enables server-side redirects before the page is sent to the browser.

## Approach

Use Next.js middleware to check for the `auth_token` cookie. This is a **presence check** (not JWT verification) — if the cookie exists, assume authenticated; if missing, redirect. This handles the common case instantly. The client-side `authService` still handles the authoritative check (expired tokens, profile loading, WebSocket connection).

## Changes

### 1. Create `src/middleware.ts`

- Define protected paths: `/lobby`, `/game`
- Define guest-only paths: `/`, `/signup`
- Logic:
  - If request is to a **protected path** and `auth_token` cookie is absent → redirect to `/`
  - If request is to a **guest-only path** and `auth_token` cookie is present → redirect to `/lobby`
  - Otherwise → `NextResponse.next()`
- Use `config.matcher` to only run on relevant paths (exclude `/_next`, `/api`, static files)

### 2. Simplify `useAuth` hook — `src/hooks/useAuth.ts`

- Remove redirect logic (`router.push("/")`) — middleware handles this
- Keep: `authService.initialize()`, profile state, `isLoading`, subscription for reactive logout
- On logout (subscription fires with `null` user), still redirect to `/` since the cookie is already cleared by the server and subsequent middleware runs will enforce it anyway
- Fix the bug on line 29: `!authService.getCurrentUser` → `!authService.getCurrentUser()`

### 3. Simplify sign-in page — `src/app/page.tsx`

- Remove the `useEffect` that calls `authService.initialize()` to check if already signed in — middleware handles the redirect
- Remove `checkingAuth` state and `<LoadingScreen />` guard

### 4. Simplify sign-up page — `src/app/signup/page.tsx`

- Same changes as sign-in: remove the `authService.initialize()` check and `checkingAuth` loading state

### 5. Simplify protected pages — `src/app/lobby/page.tsx`, `src/app/game/page.tsx`

- Keep `useAuth()` call (needed for profile data, WebSocket init, reactive logout)
- Keep `isLoading` + `<LoadingScreen />` (still needed while `authService.initialize()` runs to fetch profile and connect socket)
- No redirect logic changes needed in these pages since `useAuth` will handle that

## File Summary

| File | Action |
|------|--------|
| `src/middleware.ts` | **Create** — new middleware for route protection |
| `src/hooks/useAuth.ts` | **Edit** — remove redirect logic, fix bug |
| `src/app/page.tsx` | **Edit** — remove auth check + loading state |
| `src/app/signup/page.tsx` | **Edit** — remove auth check + loading state |
| `src/app/lobby/page.tsx` | No changes needed |
| `src/app/game/page.tsx` | No changes needed |

## Verification

1. `yarn build` — ensure no compilation errors
2. `yarn lint` — ensure no lint errors
3. Manual testing:
   - Visit `/lobby` without cookie → should redirect to `/`
   - Visit `/` with valid cookie → should redirect to `/lobby`
   - Sign in → should land on `/lobby`
   - Sign out from `/lobby` → should redirect to `/`
   - Refresh `/lobby` while signed in → should load normally
