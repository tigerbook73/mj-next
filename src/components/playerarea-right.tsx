import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";

export function PlayerAreaRight() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <PlayerAreaHand position={Position.East} />
      <PlayerAreaOpenSet position={Position.East} />
    </div>
  );
}
