"use client";

import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { PlayerActionDisplay } from "./PlayerActionDisplay";
import { Direction } from "@/lib/game-utils";
import { useIsCurrentPlayer, currentPlayerClasses } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

export function PlayerTilesTop() {
  const isCurrentPlayer = useIsCurrentPlayer(Direction.Top);

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-row-reverse items-center justify-between transition-colors duration-300",
        isCurrentPlayer && currentPlayerClasses,
      )}
    >
      <OpenSetTiles direction={Direction.Top} />
      <HandTiles direction={Direction.Top} className="flex-1" />
      <PlayerActionDisplay direction={Direction.Top} />
    </div>
  );
}
