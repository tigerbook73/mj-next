import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesLeft() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <OpenSetTiles direction={Direction.Left} />
      <HandTiles direction={Direction.Left} className="flex-1" />
    </div>
  );
}
