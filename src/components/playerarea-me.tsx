import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";
import { Direction } from "@/lib/game-utils";

export function PlayerAreaMe() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <PlayerAreaOpenSet direction={Direction.Bottom} />
      <PlayerAreaHand position={Position.South} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
