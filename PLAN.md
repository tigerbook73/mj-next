# Plan: ActionPanel Component (First Step)

## Context

The game page needs a floating action panel above HandTilesBottom that shows the current player's available actions (碰/吃/杠/暗杠/胡/过/出牌) with relevant tiles. This is the first step: create a standalone `ActionPanel` component with Storybook stories, before integrating it into the game page.

Key architectural constraint: `queuedActions` is omitted from `GameInStore` (see `src/store/game-store.ts`), so the parent component is responsible for computing available actions using `TileCore` utilities and passing them as props.

---

## Architecture

### ActionItem Type (discriminated union)

```typescript
export type ActionItem =
  | { type: 'peng' | 'gang' | 'angang' | 'hu' | 'pass'; onAction: () => void }
  | { type: 'chi'; options: [TileId, TileId][]; latestTile: TileId; onAction: (tiles: [TileId, TileId]) => void }
  | { type: 'drop'; tileId: TileId; onAction: () => void }
```

### ActionPanel Props

```typescript
interface ActionPanelProps {
  actions: ActionItem[];
  className?: string;
}
```

### Visual Layout (per card)

```
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│       碰         │   │       吃         │   │       过         │
│   (no tiles)     │   │  [T1]  T2   T3   │   │   (no tiles)     │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

- `碰 / 杠 / 暗杠 / 胡 / 过`: label button only, no tiles row
- `吃`: `[latestTile]` (highlighted) + 2 hand tiles; if multiple options exist, clicking any tile in the row cycles to the next option (internal `useState`)
- `出牌`: single tile displayed below label

### Display order: 碰 → 吃 → 杠/暗杠 → 过 → 胡 (per PLAN.md)

---

## Files to Create

### 1. `src/components/ActionPanel.tsx` (new)

- Export `ActionItem` type and `ActionPanel` component
- Use existing `Tile` component (`src/components/Tile.tsx`) for tile rendering
- Use `cn()` from `@/lib/utils` for class merging
- For `chi` action: internal `useState` tracks current option index; clicking cycles it
- Action label buttons call `onAction` with appropriate args
- Tile size: use `size="sm"` from `Tile` component

### 2. `src/stories/ActionPanel.stories.tsx` (new)

- Use `UIStoreDecorator` (`src/stories/ui-store.decorator.tsx`) for tile sizing
- Stories: `PengOnly`, `ChiSingle`, `ChiMultiple`, `AllActions`, `DropAction`
- Pass mock tile IDs from TILE_MAP (e.g., `TileId` values like `4`, `8`, `12`)
- `layout: "centered"`

---

## Files to Reference (read-only)

- `src/components/Tile.tsx` — `Tile` component, `TileId` type, `TILE_MAP`
- `src/components/HandTilesBottom.tsx` — styling reference
- `src/stories/ui-store.decorator.tsx` — decorator pattern
- `src/stories/game-store.decorator.tsx` — decorator pattern (not needed for step 1)
- `src/common/core/mj.tile-core.ts` — `TileId` type, `ActionType` enum

---

## PLAN.md Fix

The existing `PLAN.md` has a typo: `@src/commponents/Tile.tsx` → `@src/components/Tile.tsx`. Fix this as part of the work.

---

## Verification

1. Run `yarn storybook` and navigate to Components/ActionPanel
2. Verify all stories render correctly: buttons clickable, tile images shown
3. For `ChiMultiple` story: clicking tiles cycles through chi options
4. Run `yarn lint` to ensure no ESLint errors
