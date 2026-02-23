"use client";

import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useRoomStore } from "@/store/room-store";
import { useActionStore, WINNING_ACTIONS } from "@/store/action-store";
import { GameHistoryActionType } from "@/common/core/mj.game";
import { TileCore } from "@/common/core/mj.tile-core";
import type { GameHistoryRecord } from "@/common/core/mj.game";
import type { TileId } from "@/common/core/mj.tile-core";
import { Tile } from "./Tile";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const actionLabels: Partial<Record<GameHistoryActionType, string[]>> = {
  [GameHistoryActionType.Chi]: ["吃"],
  [GameHistoryActionType.Peng]: ["碰"],
  [GameHistoryActionType.Gang]: ["杠"],
  [GameHistoryActionType.Angang]: ["暗", "杠"],
  [GameHistoryActionType.Zimo]: ["自", "摸"],
  [GameHistoryActionType.Hu]: ["胡"],
  // Drop: intentionally omitted — show tile only
};

function getTilesToShow(record: GameHistoryRecord): TileId[] {
  const { tiles, target } = record;

  const all = target !== TileCore.voidId ? [...tiles, target] : [...tiles];
  return all.sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Direction-aware layout classes
// ---------------------------------------------------------------------------

const defaultPositionClasses: Partial<Record<Direction, string>> = {
  [Direction.Top]: "top-[calc(100%_+_min(20vh,20vw))] left-1/2 -translate-x-1/2",
  [Direction.Left]: "left-[calc(100%_+_min(20vh,20vw))] top-1/2 -translate-y-1/2",
  [Direction.Right]: "right-[calc(100%_+_min(20vh,20vw))] top-1/2 -translate-y-1/2",
  [Direction.Bottom]: "bottom-[calc(100%_+_min(20vh,20vw))] left-1/2 -translate-x-1/2",
};

// Outer panel flex: controls char/tiles order
const containerFlexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row", // char left  | tiles right
  [Direction.Top]: "flex-row-reverse", // tiles left | char right
  [Direction.Left]: "flex-col", // char top   | tiles below
  [Direction.Right]: "flex-col", // char top   | tiles below
  [Direction.None]: "flex-row",
};

// Inner tiles flex: controls tile order within the tiles group
const tilesFlexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row items-end",
  [Direction.Top]: "flex-row-reverse items-end",
  [Direction.Left]: "flex-col items-center",
  [Direction.Right]: "flex-col items-center",
  [Direction.None]: "flex-row items-end",
};

// Chars flex: same direction as tiles, always center-aligned
const charsFlexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row items-center",
  [Direction.Top]: "flex-row-reverse items-center",
  [Direction.Left]: "flex-col items-center",
  [Direction.Right]: "flex-col items-center",
  [Direction.None]: "flex-row items-center",
};

// Label rotation: character faces inward toward the board center
const labelRotationClasses: Record<Direction, string> = {
  [Direction.Bottom]: "",
  [Direction.Top]: "rotate-180",
  [Direction.Left]: "rotate-90",
  [Direction.Right]: "-rotate-90",
  [Direction.None]: "",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PlayerActionDisplayProps {
  direction: Direction;
  /** When true, only show winning actions (hu/zimo). Used for the local player. */
  winningOnly?: boolean;
  className?: string;
}

export function PlayerActionDisplay({ direction, winningOnly = false, className }: PlayerActionDisplayProps) {
  const myPosition = useRoomStore((state) => state.myPosition);
  const lastAction = useActionStore((state) => state.lastAction);

  if (myPosition === null) {
    return null;
  }

  const absolutePosition = CommonUtil.mapPosition(myPosition, direction);
  const record = lastAction?.position === absolutePosition ? lastAction : null;

  if (!record) {
    return null;
  }

  const isWinning = WINNING_ACTIONS.has(record.type);
  if (winningOnly && !isWinning) {
    return null;
  }

  const chars = actionLabels[record.type];
  const tilesToShow = getTilesToShow(record);
  const positionClass = className ?? defaultPositionClasses[direction] ?? "";

  return (
    <div
      className={cn(
        "absolute z-20 flex items-center gap-2 rounded-xl bg-black/10 px-4 py-3 shadow-xl",
        containerFlexClasses[direction],
        positionClass,
      )}
    >
      {chars && (
        <div
          className={cn(
            "flex rounded-xl px-4 py-3 font-bold text-white shadow",
            charsFlexClasses[direction],
            isWinning ? "bg-red-500" : "bg-amber-500",
            labelRotationClasses[direction],
          )}
          style={{
            fontSize: isWinning ? "clamp(0.5rem, 4vw, 3rem)" : "clamp(1rem, 2.5vw, 1.75rem)",
          }}
        >
          {chars.map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
      )}
      {tilesToShow.length > 0 && (
        <div className={cn("flex gap-0.5", tilesFlexClasses[direction])}>
          {tilesToShow.map((tileId, i) => (
            <Tile key={`${tileId}-${i}`} tileId={tileId} direction={direction} size="lg" />
          ))}
        </div>
      )}
    </div>
  );
}
