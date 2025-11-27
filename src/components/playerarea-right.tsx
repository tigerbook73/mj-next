import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";
import { Direction } from "@/lib/game-utils";

export function PlayerAreaRight() {
  return (
    <div className="flex h-full w-full flex-col-reverse items-center justify-between">
      <PlayerAreaOpenSet direction={Direction.Right} />
      <PlayerAreaHand direction={Direction.Right} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
