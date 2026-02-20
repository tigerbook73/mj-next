"use client";

import { HandTilesBottom } from "./HandTilesBottom";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";
import { useIsCurrentPlayer } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

export function PlayerTilesBottom() {
  const isCurrentPlayer = useIsCurrentPlayer(Direction.Bottom);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center transition-colors duration-300",
        isCurrentPlayer && "bg-amber-400/10 ring-2 ring-inset ring-amber-400/60",
      )}
    >
      <OpenSetTiles direction={Direction.Bottom} />
      <HandTilesBottom className="flex-1" />
    </div>
  );
}
