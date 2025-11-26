import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";

export function PlayerAreaTop() {
  return (
    <div className="flex h-full w-full flex-row-reverse items-center justify-between">
      <PlayerAreaOpenSet position={Position.North} />
      <PlayerAreaHand position={Position.North} />
      <div className="w-1/8 h-full"></div>
    </div>
  );
}
