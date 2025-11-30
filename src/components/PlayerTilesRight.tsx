import { HandTiles } from "./HandTiles";
import { OpenSetTiles } from "./OpenSetTiles";
import { Direction } from "@/lib/game-utils";

export function PlayerTilesRight() {
  return (
    <div className="flex h-full w-full flex-col-reverse items-center justify-between">
      <OpenSetTiles direction={Direction.Right} />
      <HandTiles direction={Direction.Right} className="flex-1" />
    </div>
  );
}
