"use client";

import { useLayoutEffect, useRef } from "react";
import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useTileFlightStore, useGameStore, useRoomStore } from "@/store";
import { TileId } from "@/common";
import { tilePositionRegistry } from "@/lib/tile-position-registry";

const defaultCols = 14;
const defaultRows = 2;

// Please node: the classes shall work with displayTiles logic below
const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "gap-y-0.5",
  [Direction.Top]: "gap-y-0.5",
  [Direction.Left]: "gap-x-0.5 grid-flow-col",
  [Direction.Right]: "gap-x-0.5 grid-flow-col",
  [Direction.None]: "",
};

interface WallTilesProps {
  direction: Direction;
  cols?: number; // number of columns in horizontal layout (e.g. 12 or 15)
  rows?: number; // number of rows in horizontal layout (e.g. 3 or 2)
}

export function DiscardTiles({ direction, cols = defaultCols, rows = defaultRows }: WallTilesProps) {
  const game = useGameStore((state) => state.game)!;
  const myPosition = useRoomStore((state) => state.myPosition)!;

  const position = CommonUtil.mapPosition(myPosition, direction);
  const discard = game.discards[position]!;
  const gridRef = useRef<HTMLDivElement>(null);

  const tiles: number[] = discard.tiles.slice();

  const takenTiles = new Set<TileId>();
  for (const player of game.players) {
    if (!player) {
      continue;
    }
    for (const set of player.openedSets) {
      takenTiles.add(set.target);
    }
  }

  const fullLength = cols * rows;
  for (let i = tiles.length; i < fullLength; i++) {
    tiles.push(-1);
  }

  // Once the new tile appears in this discard grid, assemble both rects and
  // start the animation atomically. The "from" rect was captured by the ACTION
  // event handler (app-service) before GAME_UPDATED removed the tile from the hand.
  useLayoutEffect(() => {
    const lastTile = discard.tiles[discard.tiles.length - 1];
    if (lastTile === undefined || lastTile < 0) {
      return;
    }
    const fromRect = tilePositionRegistry.get(lastTile);
    if (!fromRect) {
      return;
    }
    const el = gridRef.current?.querySelector(`[data-tile-id="${lastTile}"]`);
    if (el) {
      tilePositionRegistry.delete(lastTile);
      useTileFlightStore.getState().startFlight(lastTile, fromRect, el.getBoundingClientRect());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discard.tiles.length, direction]);

  const displayTiles = (() => {
    if (direction === Direction.Top) {
      return tiles.slice().reverse();
    } else if (direction === Direction.Bottom) {
      return tiles;
    } else if (direction === Direction.Left) {
      // Concatenate rows from bottom to top to fill columns first
      const out: number[] = [];
      for (let r = rows - 1; r >= 0; r--) {
        const start = r * cols;
        out.push(...tiles.slice(start, start + cols));
      }
      return out;
    } else if (direction === Direction.Right) {
      // Concatenate each row reversed to fill columns first
      const out: number[] = [];
      for (let r = 0; r < rows; r++) {
        const start = r * cols;
        out.push(...tiles.slice(start, start + cols).reverse());
      }
      return out;
    } else {
      return tiles;
    }
  })();

  return (
    <div
      ref={gridRef}
      className={cn("grid gap-[1px]", flexClasses[direction])}
      style={
        direction === Direction.Left || direction === Direction.Right
          ? {
              gridTemplateRows: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))`,
              gridAutoFlow: "column",
            }
          : {
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }
      }
    >
      {displayTiles.map((tid, index) => (
        <Tile
          key={`${tid}-${index}`}
          tileId={tid}
          direction={direction}
          size={70}
          taken={takenTiles.has(tid)}
          special={tid === game.latestTile ? "warning" : undefined}
        />
      ))}
    </div>
  );
}
