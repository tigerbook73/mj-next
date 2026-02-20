"use client";

import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { Direction, CommonUtil } from "@/lib/game-utils";
import { useGameStore, useRoomStore } from "@/store";

// wall tile length is always 36
const WallTileLength = 36;

// Please node: the classes shall work with displayTiles logic below
const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]:
    "grid-cols-18 grid-flow-col grid-rows-2 gap-y-0.5 [direction:rtl]",
  [Direction.Top]: "grid-cols-18 grid-flow-col grid-rows-2 gap-y-0.5 ",
  [Direction.Left]: "grid-rows-18 grid-cols-2 gap-x-0.5 flex-col",
  [Direction.Right]: "grid-rows-18 grid-cols-2 gap-x-0.5",
  [Direction.None]: "",
};

interface WallTilesProps {
  direction: Direction;
}

export function WallTiles({ direction }: WallTilesProps) {
  const game = useGameStore((state) => state.game)!;
  const myPosition = useRoomStore((state) => state.myPosition)!;

  const position = CommonUtil.mapPosition(myPosition, direction);
  const wall = game.walls[position];

  const tiles: number[] = wall.tiles.slice();
  for (let i = tiles.length; i < WallTileLength; i++) {
    tiles.push(-1);
  }

  const displayTiles = (() => {
    if (direction === Direction.Top) {
      const result: typeof tiles = [];
      for (let i = 0; i < tiles.length - 1; i += 2) {
        [result[i], result[i + 1]] = [tiles[i + 1], tiles[i]];
      }
      return result;
    } else if (direction === Direction.Bottom) {
      return tiles;
    } else if (direction === Direction.Left) {
      return tiles.slice().reverse();
    } else if (direction === Direction.Right) {
      return tiles;
    } else {
      return tiles;
    }
  })();

  return (
    <div className={cn("grid", flexClasses[direction])}>
      {displayTiles.map((tid, index) => (
        <Tile key={index} tileId={tid} direction={direction} size={75} back />
      ))}
    </div>
  );
}
