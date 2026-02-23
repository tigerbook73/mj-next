"use client";

import { HandTilesBottom } from "./HandTilesBottom";
import { OpenSetTiles } from "./OpenSetTiles";
import { PlayerActionDisplay } from "./PlayerActionDisplay";
import { Direction } from "@/lib/game-utils";
import { useIsCurrentPlayer, currentPlayerClasses } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

export function PlayerTilesBottom() {
  const isCurrentPlayer = useIsCurrentPlayer(Direction.Bottom);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center transition-colors duration-300",
        isCurrentPlayer && currentPlayerClasses,
      )}
    >
      <PlayerActionDisplay direction={Direction.Bottom} winningOnly />
      <OpenSetTiles direction={Direction.Bottom} />
      <HandTilesBottom className="flex-1" />
    </div>
  );
}
