"use client";

import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";
import { useIsCurrentPlayer } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

export function PlayerTilesTop() {
  const isCurrentPlayer = useIsCurrentPlayer(Direction.Top);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-row-reverse items-center justify-between transition-colors duration-300",
        isCurrentPlayer && "bg-amber-400/10 ring-2 ring-inset ring-amber-400/60",
      )}
    >
      <OpenSetTiles direction={Direction.Top} />
      <HandTiles direction={Direction.Top} className="flex-1" />
    </div>
  );
}
