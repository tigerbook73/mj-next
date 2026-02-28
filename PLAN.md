# feature: enable the motion of the tiles

## requirements

- final version of the game should have the motion of the tiles, which means that the tiles will move to the destination when there is an action.
- step1: implement the motion of the tiles when the player clicks on them (HandTiles only).
- step2: implement the motion of the first time appearance of one tile or id from -1 to valid
- step4: implement the motion of the tiles when the player discard one tile (move the discarded tile from the hand to the discard area).
- step3: implement the motion of the tiles when the player clicks on them (HandTiles only).
- step5: implement the motion of the tiles when the player peng/gang/zhi one tile

when doing the real plan, we shall implement them step by step.

---

## step1 - DONE

## step2 - DONE

## step3 - REVERTED (needs redesign)

### goal
When the bottom player discards a tile, it visually flies from the hand area to the discard area.

### mechanism — Framer Motion `layoutId`
- Each physical tile has a unique `id` (confirmed: TileCore comment — "4 tiles with the same face have different ids", `id` is 0–135).
- When a tile leaves `HandTilesBottom` and appears in `DiscardTiles`, both render the same `layoutId`.
- Framer Motion animates it between the two positions automatically.
- `AnimatePresence` in `HandTilesBottom` is required to enable the exit side of the animation.
- `LayoutGroup` at the game page level scopes all layout animations together.

### prerequisite concern — `initial={{ opacity: 0 }}` (step 2)
When `layoutId` matches an existing element, Framer Motion **skips** `initial` and uses the layout animation instead. So:
- Discarded tile flying from hand → discard: ✓ layout animation takes over, no opacity-0 flash
- Opponent tile newly appearing in discard: ✓ no matching `layoutId` → fades in normally (step 2)

### plan

**1. `src/components/Tile.tsx`**
- Add `layoutId?: string` to `TileProps`
- Pass it to `motion.div`: `<motion.div layoutId={layoutId} ...>`

**2. `src/components/HandTilesBottom.tsx`**
- Import `AnimatePresence` from `framer-motion`
- Wrap the tiles `<div>` in `<AnimatePresence>`
- Pass `layoutId={tid >= 0 ? String(tid) : undefined}` on each `<Tile>` (skip `-1` empty slots)

**3. `src/components/DiscardTiles.tsx`**
- Pass `layoutId={tid >= 0 ? String(tid) : undefined}` on each `<Tile>` (skip `-1` empty slots)

**4. `src/app/game/page.tsx`**
- Import `LayoutGroup` from `framer-motion`
- Wrap the inner game board `<div>` (the `aspect-square` grid) in `<LayoutGroup>`

### scope
- 4 files, all changes additive (new prop, new wrapper)
- `HandTiles.tsx` (opponent hands): no changes — opponent discards have no matching `layoutId` in their hand, so they just fade in via step 2
- Risk: Medium

---

## step4 - TODO

When a new tile is picked from the wall:

- The `picked` slot in `HandTilesBottom` animates in (slide + fade from the right/top).
- Use `AnimatePresence` + `initial` / `animate` on the picked tile's `motion.div`.
- Trigger: `player.picked` changes while it was previously `TileCore.voidId`.

Files likely involved: `HandTilesBottom.tsx`, possibly `Tile.tsx`.

---

## step5 - TODO

When the player performs peng / gang / chi:

- Tiles animate from the discard pile into the player's shown-tiles (meld) area.
- Similar to step3 but in reverse and for meld groups.

Files likely involved: meld/shown-tiles components, discard tiles component, `Tile.tsx`.
