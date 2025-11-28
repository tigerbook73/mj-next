import { HandTiles } from "./hand-tiles";
import { OpenSetTiles } from "./open-set-tiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesTop() {
  return (
    <div className="flex h-full w-full flex-row-reverse items-center justify-between">
      <OpenSetTiles direction={Direction.Top} />
      <HandTiles direction={Direction.Top} />
    </div>
  );
}
