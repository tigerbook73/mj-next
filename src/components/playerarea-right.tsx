import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";

export function PlayerAreaRight() {
  return (
    <div className="flex h-full w-full flex-col-reverse items-center justify-between">
      <PlayerAreaOpenSet position={Position.East} />
      <PlayerAreaHand position={Position.East} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
