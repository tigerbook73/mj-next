import { HandTilesBottom } from "./HandTilesBottom";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesBottom() {
  return (
    <div className="relative flex h-full w-full items-center">
      <OpenSetTiles direction={Direction.Bottom} />
      <HandTilesBottom className="flex-1" />
    </div>
  );
}
