import { HandTiles } from "./hand-tiles";
import { OpenSetTiles } from "./open-set-tiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesBottom() {
  return (
    <div className="flex h-full w-full items-center">
      <OpenSetTiles direction={Direction.Bottom} />
      <HandTiles direction={Direction.Bottom} className="flex-1" />
    </div>
  );
}
