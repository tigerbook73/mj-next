"use client";

import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { GameState } from "@/common/core/mj.game";
import { useGameStore, useRoomStore } from "@/store";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

interface HandTilesProps {
  direction: Exclude<Direction, typeof Direction.Bottom | typeof Direction.None>;
  className?: string;
}

export function HandTiles({ direction, className }: HandTilesProps) {
  const game = useGameStore((state) => state.game)!;
  const myPosition = useRoomStore((state) => state.myPosition)!;

  const position = CommonUtil.mapPosition(myPosition, direction);
  const player = game.players[position]!;

  const isGameOver = game.state === GameState.End;
  const isWinner = isGameOver && game.current?.position === player.position;

  const tiles = player.handTiles.slice();
  tiles.push(-1);
  tiles.push(player.picked);

  return (
    <div className={cn("flex items-center justify-center", flexClasses[direction], className)}>
      {tiles.map((tid, index) => (
        <Tile key={`${tid}-${index}`} tileId={tid} direction={direction} size="md" hoverable={false} back={!isWinner} />
      ))}
    </div>
  );
}
