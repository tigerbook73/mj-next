import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";

export function PlayerAreaTop() {
  return (
    <div className="flex h-full w-full flex-row items-center justify-between">
      <PlayerAreaHand position={Position.North} />
      <PlayerAreaOpenSet position={Position.North} />
    </div>
  );
}
