import { Position } from "@/common/core/mj.game";
import { PlayerAreaHand } from "./playerarea-hand";
import { PlayerAreaOpenSet } from "./playerarea-openset";

export function PlayerAreaLeft() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <PlayerAreaOpenSet position={Position.West} />
      <PlayerAreaHand position={Position.West} />
    </div>
  );
}
