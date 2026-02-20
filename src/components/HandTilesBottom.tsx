"use client";

import { useState, useEffect, useMemo } from "react";
import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useGameStore, useRoomStore } from "@/store";
import { GameState, TileCore } from "@/common";
import type { TileId } from "@/common";
import { ActionPanel, type ActionItem } from "./ActionPanel";
import { socketClient } from "@/lib/socket-client";

// ---------------------------------------------------------------------------
// Helpers (replicating private TileCore methods with public APIs)
// ---------------------------------------------------------------------------

/** Returns pairs of hand tiles that can form a valid Chi with `target`. */
function getChiCombinations(
  handTiles: readonly TileId[],
  target: TileId,
): [TileId, TileId][] {
  const targetTile = TileCore.fromId(target);
  // Honor / special tiles cannot be used in Chi
  if (!targetTile.isWan() && !targetTile.isTong() && !targetTile.isTiao()) {
    return [];
  }

  const combinations: [TileId, TileId][] = [];
  const idx = targetTile.index;
  const type = targetTile.type;

  const find = (index: number) =>
    handTiles.find((id) => {
      const t = TileCore.fromId(id);
      return t.type === type && t.index === index;
    });

  // Case 1: t-2, t-1, target  (target at end)
  if (idx >= 3) {
    const t1 = find(idx - 2);
    const t2 = find(idx - 1);
    if (t1 !== undefined && t2 !== undefined) combinations.push([t1, t2]);
  }

  // Case 2: t-1, target, t+1  (target in middle)
  if (idx >= 2 && idx <= 8) {
    const t1 = find(idx - 1);
    const t2 = find(idx + 1);
    if (t1 !== undefined && t2 !== undefined) combinations.push([t1, t2]);
  }

  // Case 3: target, t+1, t+2  (target at start)
  if (idx <= 7) {
    const t1 = find(idx + 1);
    const t2 = find(idx + 2);
    if (t1 !== undefined && t2 !== undefined) combinations.push([t1, t2]);
  }

  return combinations;
}

/**
 * Returns 4 tiles of the same type for Angang, or null if not possible.
 * Uses name-based grouping (TileCore.canAngang uses raw IDs which is unreliable).
 */
function getAngangTiles(
  allTiles: readonly TileId[],
): [TileId, TileId, TileId, TileId] | null {
  const groups = new Map<string, TileId[]>();
  for (const t of allTiles) {
    const name = TileCore.fromId(t).name;
    const g = groups.get(name) ?? [];
    g.push(t);
    groups.set(name, g);
  }
  for (const g of groups.values()) {
    if (g.length >= 4) return g.slice(0, 4) as [TileId, TileId, TileId, TileId];
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

interface HandTilesBottomProps {
  className?: string;
}

export function HandTilesBottom({ className }: HandTilesBottomProps) {
  const game = useGameStore((state) => state.game)!;
  const myPosition = useRoomStore((state) => state.myPosition)!;

  const myAbsolutePosition = CommonUtil.mapPosition(
    myPosition,
    Direction.Bottom,
  );
  const player = game.players[myAbsolutePosition]!;

  const [selectedTile, setSelectedTile] = useState<TileId | null>(null);

  // Reset selected tile when the game state changes (e.g. after an action)
  useEffect(() => {
    setSelectedTile(null);
  }, [game.state, game.current?.position]);

  const isMyTurn =
    game.state === GameState.WaitingAction &&
    game.current?.position === myAbsolutePosition;

  // ---------------------------------------------------------------------------
  // Compute available actions
  // ---------------------------------------------------------------------------
  const actions = useMemo<ActionItem[]>(() => {
    if (!player) return [];

    // ── WaitingPass: another player just discarded ──────────────────────────
    if (
      game.state === GameState.WaitingPass &&
      game.current?.position !== myAbsolutePosition
    ) {
      const latestTile = game.latestTile;
      const result: ActionItem[] = [];

      // 碰
      if (TileCore.canPeng(player.handTiles, latestTile)) {
        const tiles = player.handTiles
          .filter((t) => TileCore.isSame(t, latestTile))
          .slice(0, 2) as [TileId, TileId];
        result.push({
          type: "peng",
          latestTile,
          tiles,
          onAction: () => socketClient.actionPeng(tiles),
        });
      }

      // 吃 — only the next player after current can Chi
      const nextPosition = ((game.current?.position ?? 0) + 1) % 4;
      if (
        myAbsolutePosition === nextPosition &&
        TileCore.canChi(player.handTiles, latestTile)
      ) {
        const options = getChiCombinations(player.handTiles, latestTile);
        if (options.length > 0) {
          result.push({
            type: "chi",
            latestTile,
            options,
            onAction: (ts) => socketClient.actionChi(ts),
          });
        }
      }

      // 杠
      if (TileCore.canGang(player.handTiles, latestTile)) {
        const tiles = player.handTiles
          .filter((t) => TileCore.isSame(t, latestTile))
          .slice(0, 3) as [TileId, TileId, TileId];
        result.push({
          type: "gang",
          latestTile,
          tiles,
          onAction: () => socketClient.actionGang(tiles),
        });
      }

      // 过 (always available in WaitingPass)
      result.push({
        type: "pass",
        onAction: () => socketClient.actionPass(),
      });

      // 胡
      if (TileCore.canHu(player.handTiles, latestTile)) {
        result.push({
          type: "hu",
          onAction: () => socketClient.actionHu(),
        });
      }

      return result;
    }

    // ── WaitingAction: my turn to act ────────────────────────────────────────
    if (isMyTurn) {
      const allTiles = [...player.handTiles, player.picked].filter(
        (t) => t !== TileCore.voidId,
      );
      const result: ActionItem[] = [];

      // 暗杠
      const angangTiles = getAngangTiles(allTiles);
      if (angangTiles) {
        result.push({
          type: "angang",
          onAction: () => socketClient.actionAngang(angangTiles),
        });
      }

      // 胡 (自摸)
      if (TileCore.canHu(allTiles)) {
        result.push({
          type: "hu",
          onAction: () => socketClient.actionZimo(),
        });
      }

      // 出牌 (when player has clicked a tile)
      if (selectedTile !== null && selectedTile !== TileCore.voidId) {
        result.push({
          type: "drop",
          tileId: selectedTile,
          onAction: () => {
            socketClient.actionDrop(selectedTile);
            setSelectedTile(null);
          },
        });
      }

      return result;
    }

    return [];
  }, [game, myAbsolutePosition, player, selectedTile, isMyTurn]);

  // ---------------------------------------------------------------------------
  // Tile list
  // ---------------------------------------------------------------------------
  const tiles = player.handTiles.slice();
  tiles.push(-1);
  tiles.push(player.picked);

  return (
    <div className={cn(className)}>
      {actions.length > 0 && (
        <div className="absolute bottom-[calc(100%_+_10vh)] left-1/2 z-10 -translate-x-1/2 pb-1">
          <ActionPanel actions={actions} />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-center",
          flexClasses[Direction.Bottom],
        )}
      >
        {tiles.map((tid, index) => (
          <Tile
            key={`${tid}-${index}`}
            tileId={tid}
            direction={Direction.Bottom}
            size="md"
            hoverable={true}
            back={false}
            onClick={isMyTurn ? setSelectedTile : undefined}
            selected={tid === selectedTile}
          />
        ))}
      </div>
    </div>
  );
}
