import { Position } from "@/common/core/mj.game";
import { RotateDirection, Tile } from "./tile";
import { cn } from "@/lib/utils";

interface PlayerAreaHandProps {
  position: Position;
}

export function PlayerAreaHand({ position }: PlayerAreaHandProps) {
  const tiles = [11, 12, 13, -1, -1];

  let rotate: RotateDirection = "0";
  let flexClasses = "";
  if (position === Position.South) {
    rotate = "0";
    flexClasses = "flex-row";
  } else if (position === Position.North) {
    rotate = "180";
    flexClasses = "flex-row-reverse";
  } else if (position === Position.West) {
    rotate = "90";
    flexClasses = "flex-col";
  } else if (position === Position.East) {
    rotate = "-90";
    flexClasses = "flex-col-reverse";
  }

  return (
    <div className={cn("flex h-full items-center justify-end", flexClasses)}>
      {tiles.map((tid, index) => (
        <div key={index} className={cn("flex", flexClasses)}>
          <Tile key={tid} tileId={tid} rotate={rotate} size="sm" />
        </div>
      ))}
    </div>
  );
}
