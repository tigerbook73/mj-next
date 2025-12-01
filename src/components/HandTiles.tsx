"use client";

import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useGameStore } from "@/store";
import { Position } from "@/common/core/mj.game";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

interface HandTilesProps {
  direction: Direction;
  className?: string;
}

export function HandTiles({ direction, className }: HandTilesProps) {
  const game = useGameStore((state) => state.game)!;
  const position = CommonUtil.mapPosition(Position.South, direction);
  const player = game.players[position]!;

  const tiles = player.handTiles.slice();
  tiles.push(-1);
  tiles.push(player.picked);

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        flexClasses[direction],
        className,
      )}
    >
      {tiles.map((tid, index) => (
        <Tile
          key={`${tid}-${index}`}
          tileId={tid}
          direction={direction}
          size="md"
          hoverable={direction === Direction.Bottom}
          back={direction !== Direction.Bottom}
        />
      ))}
    </div>
  );
}
