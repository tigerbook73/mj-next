import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";
import { Direction } from "@/lib/game-utils";

export function PlayerAreaTop() {
  return (
    <div className="flex h-full w-full flex-row-reverse items-center justify-between">
      <PlayerAreaOpenSet direction={Direction.Top} />
      <PlayerAreaHand direction={Direction.Top} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
