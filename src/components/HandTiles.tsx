"use client";

import { useLayoutEffect, useRef } from "react";
import { Tile } from "./Tile";
import { cn } from "@/lib/utils";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useGameStore, useRoomStore, useTileFlightStore } from "@/store";
import { tilePositionRegistry } from "@/lib/tile-position-registry";

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

  const isWinner = game.winner === player.position;

  const containerRef = useRef<HTMLDivElement>(null);
  const prevPickedRef = useRef(player.picked);

  // Animate the newly picked tile flying from its wall slot to the hand.
  useLayoutEffect(() => {
    const prev = prevPickedRef.current;
    prevPickedRef.current = player.picked;

    if (player.picked === prev || player.picked < 0) {
      return;
    }
    const fromRect = tilePositionRegistry.get(player.picked);
    if (!fromRect) {
      return;
    }
    const el = containerRef.current?.querySelector(`[data-tile-id="${player.picked}"]`);
    if (el) {
      tilePositionRegistry.delete(player.picked);
      useTileFlightStore.getState().startFlight(player.picked, fromRect, el.getBoundingClientRect(), true);
    }
  });

  const tiles = player.handTiles.slice();
  tiles.push(-1);
  tiles.push(player.picked);

  return (
    <div ref={containerRef} className={cn("flex items-center justify-center", flexClasses[direction], className)}>
      {tiles.map((tid, index) => (
        <Tile key={`${tid}-${index}`} tileId={tid} direction={direction} size="md" hoverable={false} back={!isWinner} />
      ))}
    </div>
  );
}
