import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesTop() {
  return (
    <div className="flex h-full w-full flex-row-reverse items-center justify-between">
      <OpenSetTiles direction={Direction.Top} />
      <HandTiles direction={Direction.Top} className="flex-1" />
    </div>
  );
}
