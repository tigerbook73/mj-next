"use client";

import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";
import { useIsCurrentPlayer } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

export function PlayerTilesRight() {
  const isCurrentPlayer = useIsCurrentPlayer(Direction.Right);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col-reverse items-center justify-between transition-colors duration-300",
        isCurrentPlayer && "bg-amber-400/10 ring-2 ring-inset ring-amber-400/60",
      )}
    >
      <OpenSetTiles direction={Direction.Right} />
      <HandTiles direction={Direction.Right} className="flex-1" />
    </div>
  );
}
