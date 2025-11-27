import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";
import { Direction } from "@/lib/game-utils";

export function PlayerAreaLeft() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <PlayerAreaOpenSet direction={Direction.Left} />
      <PlayerAreaHand direction={Direction.Left} />
      <div className="h-1/8 w-full"></div>
    </div>
  );
}
