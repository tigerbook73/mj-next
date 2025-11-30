"use client";

import { cn } from "@/lib/utils";
import { Tile } from "./Tile";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { JSX } from "react";
import { useGameStore } from "@/store";
import { Position } from "@/common/core/mj.game";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

const scaleClasses: Record<Direction, string> = {
  [Direction.Bottom]: "origin-top-left scale-100 -mt-2",
  [Direction.Top]: "origin-bottom-right scale-100 -mb-2",
  [Direction.Left]: "origin-top-right scale-100 -mr-2",
  [Direction.Right]: "origin-bottom-left scale-100 -ml-2",
  [Direction.None]: "",
};
interface OpenSetTilesProps {
  direction: Direction;
  className?: string;
}

export function OpenSetTiles({
  direction,
  className,
}: OpenSetTilesProps): JSX.Element {
  const game = useGameStore((state) => state.game)!;
  const position = CommonUtil.mapPosition(Position.South, direction);
  const player = game.players[position]!;

  const openSets = player.openedSets;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        flexClasses[direction],
        scaleClasses[direction],
        className,
      )}
    >
      {openSets.map((set, index) => (
        <div key={index} className={cn("flex", flexClasses[direction])}>
          {set.tiles.map((tid) => (
            <Tile
              key={tid}
              tileId={tid}
              direction={direction}
              size={80}
              special={set.target === tid ? "success" : "normal"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
