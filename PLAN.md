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

## step5 - DONE

### Goal

When any player performs Chi / Peng / Gang / Angang, all tiles involved fly simultaneously into the meld area (`OpenSetTiles`):

- The claimed tile flies from the **discard pile** (face-up ghost).
- The hand tiles fly from the **player's hand** (face-up ghost).

Multiple simultaneous flights are already supported by `TileFlightStore` (array of `FlightRecord`).

### Mechanism — same FLIP + Ghost Portal as step 3

**`fromRect`** — captured in `app-service.ts` when the ACTION event arrives (before GAME_UPDATED removes tiles from DOM):

- `record.tiles` → hand tiles (queried from the hand DOM)
- `record.target` → the claimed discard tile (queried from the discard DOM), skipped for Angang (target = voidId)

**`toRect`** — captured in a `useLayoutEffect` inside `OpenSetTiles` after GAME_UPDATED.
Detects `openSets.length` increased by 1, then for each tile in the new set queries its landing slot in the meld container.

**Ghost face**:

- `tid === newSet.target` (claimed from discard) → `back=false` (always face-up in discard)
- Otherwise (hand tiles) → `back = (direction !== Direction.Bottom)` (face-up for self, back for opponents)

### Flow

```
① ACTION(Chi / Peng / Gang / Angang) arrives
   → app-service.ts: for each tile in record.tiles + record.target (if valid):
       querySelector([data-tile-id="X"]) → fromRect
       tilePositionRegistry.capture(X, fromRect)

② GAME_UPDATED → React re-renders
   → hand tiles leave player's hand
   → target tile remains in discard (marked "taken")
   → new OpenedSet appears in OpenSetTiles

③ useLayoutEffect in OpenSetTiles
   → openSets.length increased by 1 → newSet = openSets[last]
   → for each tid in newSet.tiles:
       fromRect = tilePositionRegistry.get(tid)
       toRect   = containerRef.querySelector([data-tile-id="tid"])
       back     = (tid !== newSet.target) && (direction !== Direction.Bottom)
       startFlight(tid, fromRect, toRect, back)

④ TileFlightOverlay: all ghost tiles fly simultaneously, each fading out on arrival
```

### Files

| File                              | Change                                                                    |
| --------------------------------- | ------------------------------------------------------------------------- |
| `src/lib/app-service.ts`          | Add `Chi`, `Peng`, `Gang`, `Angang` to the ACTION capture block           |
| `src/components/OpenSetTiles.tsx` | Add `containerRef`, `prevLengthRef`, `useLayoutEffect` for toRect capture |

### Key details

- No changes needed to `TileFlightStore` or `TileFlightOverlay` — multi-flight and `back` flag already supported.
- `record.target === TileCore.voidId` for Angang — skip target capture; all tiles are hand tiles.
- `newSet.target` in `OpenSetTiles` distinguishes the claimed discard tile from hand tiles for the ghost-face decision.
- `openSets` is append-only per game rules — the new set is always `openSets[openSets.length - 1]`.
- Risk: Low — 2 files, all changes additive.
