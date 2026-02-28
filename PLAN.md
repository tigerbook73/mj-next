# feature: enable the motion of the tiles

## requirements

- final version of the game should have the motion of the tiles, which means that the tiles will move to the destination when there is an action.
- step1: implement the motion of the tiles when the player clicks on them (HandTiles only).
- step2: implement the motion of the first time appearance of one tile or id from -1 to valid
- step3: implement the motion of the tiles when the player clicks on them (HandTiles only).
- step4: implement the motion of the tiles when the player discard one tile (move the discarded tiles from the hand to the discard area).
- step5: implement the motion of the tiles when the player peng/gang/zhi one tile

when doing the real plan, we shall implement them step by step.

---

## step1 - DONE

## step2 - (current step)

## step3 - TODO

When a new tile is picked from the wall:

- The `picked` slot in `HandTilesBottom` animates in (slide + fade from the right/top).
- Use `AnimatePresence` + `initial` / `animate` on the picked tile's `motion.div`.
- Trigger: `player.picked` changes while it was previously `TileCore.voidId`.

Files likely involved: `HandTilesBottom.tsx`, possibly `Tile.tsx`.

---

## step4 - TODO

When the player discards a tile:

- The discarded tile animates from its hand position to the discard area.
- Requires `layoutId` shared between `HandTilesBottom` and the discard tiles component.
- Complex: involves cross-component coordinate tracking.

Files likely involved: `HandTilesBottom.tsx`, discard tiles component, `Tile.tsx`.

---

## step5 - TODO

When the player performs peng / gang / chi:

- Tiles animate from the discard pile into the player's shown-tiles (meld) area.
- Similar to step3 but in reverse and for meld groups.

Files likely involved: meld/shown-tiles components, discard tiles component, `Tile.tsx`.
