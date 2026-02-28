# feature: enable the motion of the tiles

## requirements

- final version of the game should have the motion of the tiles, which means that the tiles will move to the destination when there is an action.
- step1: implement the motion of the tiles when the player clicks on them (HandTiles only).
- step2: implement the motion of the first time appearance of one tile or id from -1 to valid
- step3: implement the motion of the tiles when the player discard one tile (move the discarded tile from the hand to the discard area).
- step4: implement the motion of the tiles when the player picks a new tile from the wall.
- step5: implement the motion of the tiles when the player peng/gang/zhi one tile

when doing the real plan, we shall implement them step by step.

---

## step1 - DONE

## step2 - DONE

## step3 - DONE

## step4 - DONE

### Goal
When any player picks a tile from the wall, a ghost tile (back face) flies from the wall slot to the player's hand.

### Mechanism — same FLIP + Ghost Portal as step 3

**`fromRect`** — captured in `app-service.ts` when the `Pick` / `PickReverse` ACTION event arrives.
At that moment the wall tile is still in the DOM with `data-tile-id={tileId}` (all wall tiles carry their real IDs even though rendered face-down).
`record.tiles[0]` gives the exact tileId. Store rect in `tilePositionRegistry`.

**`toRect`** — captured in a `useLayoutEffect` inside `HandTilesBottom` / `HandTiles` after GAME_UPDATED.
Detect that `player.picked` changed from void to a valid ID, then query `[data-tile-id="${player.picked}"]` inside the hand container.

**Ghost face** — always the **back** tile image (`TILE_MAP[0]` = "Back"), because the tile comes from the wall face-down. The `FlightRecord` gets an optional `back` flag; `TileFlightOverlay` uses `TILE_MAP[0]` when it is set.

### Flow
```
① ACTION(Pick / PickReverse) arrives
   → app-service.ts: querySelector([data-tile-id="X"]) in wall DOM → fromRect
   → tilePositionRegistry.capture(X, fromRect)

② GAME_UPDATED → React re-renders
   → wall slot X becomes void / empty
   → player.picked = X (appears at end of hand)

③ useLayoutEffect in HandTilesBottom (or HandTiles for opponents)
   → prevPickedRef.current !== player.picked && player.picked ≥ 0
   → querySelector([data-tile-id="X"]) in containerRef → toRect
   → tilePositionRegistry.get(X) → fromRect
   → startFlight(X, fromRect, toRect, back=true)

④ TileFlightOverlay: ghost (back face) flies from wall slot → hand slot, fades out
```

### Files

| File | Change |
|---|---|
| `src/store/tile-flight-store.ts` | Add `back?: boolean` to `FlightRecord`; add `back?` param to `startFlight` |
| `src/components/TileFlightOverlay.tsx` | When `flight.back`, use `TILE_MAP[0]` ("Back") image |
| `src/lib/app-service.ts` | Add `Pick` and `PickReverse` to the ACTION capture block |
| `src/components/HandTilesBottom.tsx` | Add `containerRef`, `prevPickedRef`, `useLayoutEffect` for toRect capture |
| `src/components/HandTiles.tsx` | Same as HandTilesBottom for opponent players |

### Key details
- `record.tiles[0]` in a Pick record is `this.current.picked` — the exact physical tile ID.
- Wall tiles already have `data-tile-id` set to the real tile ID in the DOM (even though rendered back), so the query works without any WallTiles changes.
- `PickReverse` is the gang-draw variant (from the other end of the wall) — same capture logic.
- `prevPickedRef` is updated in `useLayoutEffect` without deps (runs after every render), same pattern used in HandTiles for the discard animation.
- Risk: Low — 5 files, all changes additive.

---

## step5 - TODO

When the player performs peng / gang / chi:

- Tiles animate from the discard pile into the player's shown-tiles (meld) area.
- Similar to step3 but in reverse and for meld groups.

Files likely involved: meld/shown-tiles components, discard tiles component, `Tile.tsx`.
