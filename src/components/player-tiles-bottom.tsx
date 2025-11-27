import { HandTiles } from "./hand-tiles";
import { OpenSetTiles } from "./open-set-tiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesBottom() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <OpenSetTiles direction={Direction.Bottom} />
      <HandTiles direction={Direction.Bottom} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
