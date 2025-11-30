"use client";

import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useGameStore } from "@/store";
import { Position } from "@/common/core/mj.game";

// Please node: the classes shall work with displayTiles logic below
const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "grid-cols-12 grid-rows-3 gap-y-0.5 ",
  [Direction.Top]: "grid-cols-12 grid-rows-3 gap-y-0.5 ",
  [Direction.Left]: "grid-rows-12 grid-cols-2 gap-x-0.5 grid-flow-col",
  [Direction.Right]: "grid-rows-12 grid-cols-3 gap-x-0.5 grid-flow-col",
  [Direction.None]: "",
};

interface WallTilesProps {
  direction: Direction;
}

export function DiscardTiles({ direction }: WallTilesProps) {
  const width = 12;

  const game = useGameStore((state) => state.game)!;
  const position = CommonUtil.mapPosition(Position.South, direction);
  const discard = game.discards[position]!;

  const tiles: number[] = discard.tiles.slice();

  const fullLength = width * 3;
  for (let i = tiles.length; i < fullLength; i++) {
    tiles.push(-1);
  }

  const displayTiles = (() => {
    if (direction === Direction.Top) {
      return tiles.slice().reverse();
    } else if (direction === Direction.Bottom) {
      return tiles;
    } else if (direction === Direction.Left) {
      return tiles
        .slice(width * 2, width * 3)
        .concat(tiles.slice(width, width * 2))
        .concat(tiles.slice(0, width));
    } else if (direction === Direction.Right) {
      return tiles
        .slice(0, width)
        .reverse()
        .concat(tiles.slice(width, width * 2).reverse())
        .concat(tiles.slice(width * 2, width * 3).reverse());
    } else {
      return tiles;
    }
  })();

  return (
    <div className={cn("grid", flexClasses[direction])}>
      {displayTiles.map((tid, index) => (
        <Tile
          key={`${tid}-${index}`}
          tileId={tid}
          direction={direction}
          size={60}
        />
      ))}
    </div>
  );
}
