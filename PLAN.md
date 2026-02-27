# Feature: Display Player Name / Position Labels on Game Board

## Requirements

1. Design a new component to display player name and position
2. The component shall be displayed in the center of the game page along each player's side
3. From each player's perspective, the component shall be located above the edge of his side in the center area
4. From each player's perspective, the first line displays the player's position and the second line displays the player's type (human/robot) and player's name. All text shall be centered and read correctly from each player's perspective
5. Any size-related dimension shall be defined using percentage of the game page size (vmin units, since the board is sized in vmin)

---

## Layout Context

The game board is a 3-level nested square grid (`w-[98vmin]`):

```
Outer grid (player tiles):  grid-cols-[10%_1fr_10%] grid-rows-[10%_1fr_10%]
Middle grid (wall tiles):   grid-cols-[13%_1fr_13%] grid-rows-[13%_1fr_13%]
Inner grid (discard piles): grid-cols-[15%_1fr_15%] grid-rows-[15%_1fr_15%]
```

The **wall layer** (middle grid container) spans the center 80% of the board. The 4 player tile sections (each 10%) surround it.

---

## Implementation Plan

### Step 1 — Create `PlayerInfoLabel` component

**File:** `src/components/PlayerInfoLabel.tsx`

**Logic:**
- Accept a single prop: `direction: Direction`
- Read `myPosition` and `myRoom` from `useRoomStore`
- Derive the absolute `Position` of the player at that direction:
  `playerPosition = CommonUtil.mapPosition(myPosition, direction)`
- Look up the player: `myRoom.findPlayerByPosition(playerPosition)`
- Display two lines:
  - Line 1: `CommonUtil.positionToText(playerPosition)` → e.g., `东 / 南 / 西 / 北`
  - Line 2: type label + `" "` + player name → e.g., `人 张三` or `机器人 AI-1`
  - Type label: `"人"` for `UserType.Human`, `"机器人"` for `UserType.Bot`
- Apply rotation based on direction so text reads upright from each player's perspective:
  - `Direction.Bottom` → `rotate-0` (reads normally from bottom)
  - `Direction.Left`   → `rotate-90` (reads normally from left)
  - `Direction.Top`    → `rotate-180` (reads normally from top)
  - `Direction.Right`  → `-rotate-90` (reads normally from right)
- Render nothing if `myPosition` is null or player is not found

**Sizing (all vmin-based = percentage of game page):**
- Font size: `text-[1.5vmin]`
- Padding: `px-[0.8vmin] py-[0.3vmin]`
- Border radius: `rounded-[0.4vmin]`
- Line height: `leading-[1.8vmin]`

**Visual style:**
- Background: `bg-green-900/85` (blends with board's dark green, readable over wall tiles)
- Text: `text-white text-center`
- Subtle ring: `ring-1 ring-green-600`

---

### Step 2 — Add labels to `game/page.tsx`

**Placement:** Absolute positioning within the **wall layer** (middle grid container div).

The wall layer div currently has:
```tsx
<div className={`grid ${middleEdge} overflow-hidden bg-green-800 ring-2 ring-green-500`}>
```

Changes:
1. Add `relative` to its className
2. Remove `overflow-hidden` from the wall layer (the outer grid already clips the board shape; keeping it here would clip the labels that sit on the boundary edge)
3. Add 4 `PlayerInfoLabel` instances **after** the grid children, positioned at the 4 outer edges:

```tsx
{/* Player info labels — absolute, at each edge of the center board */}
<PlayerInfoLabel direction={Direction.Bottom} className="absolute bottom-0 left-1/2 -translate-x-1/2" />
<PlayerInfoLabel direction={Direction.Top}    className="absolute top-0    left-1/2 -translate-x-1/2" />
<PlayerInfoLabel direction={Direction.Left}   className="absolute left-0   top-1/2  -translate-y-1/2" />
<PlayerInfoLabel direction={Direction.Right}  className="absolute right-0  top-1/2  -translate-y-1/2" />
```

Each label sits at the outer edge of the wall layer — the border between the center board and each player's tile section. From each player's perspective this is "just above the edge of their side, in the center area".

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/PlayerInfoLabel.tsx` | New component (create) |
| `src/app/game/page.tsx` | Add `relative`, remove `overflow-hidden` from wall layer div; add 4 `<PlayerInfoLabel>` instances |

---

## Data Flow

```
useRoomStore → myPosition (Position)
             → myRoom (RoomModel)
                └─ findPlayerByPosition(playerPosition) → PlayerModel
                    ├─ .position → CommonUtil.positionToText() → "东"/"南"/"西"/"北"
                    ├─ .type    → "人" or "机器人"
                    └─ .userName → displayed name

CommonUtil.mapPosition(myPosition, direction) → playerPosition
```

---

## Visual Result (from bottom player's perspective)

```
┌─────────────────────────────────┐
│     [北 | 机器人 AI-1]           │  ← top of center board
│                                 │
│  [西]              [东]          │
│  [人 王五]         [人 李四]      │
│        │  discards  │           │
│                                 │
│     [南 | 人 张三]               │  ← bottom of center board (above my tiles)
└─────────────────────────────────┘
              ↑ (my tiles below)
```

Each label reads upright from the respective player's viewpoint.
