import { cn } from "@/lib/utils";
import { RotateDirection, Tile } from "./tile";
import { Direction } from "@/lib/game-utils";

interface PlayerAreaOpenSetProps {
  direction: Direction;
  className?: string;
}

export function PlayerAreaOpenSet({
  direction,
  className,
}: PlayerAreaOpenSetProps) {
  const tiles = [
    [1, 2, 3],
    [11, 15, 19],
    [40, 44, 48],
  ];

  let rotate: RotateDirection = "0";
  let flexClasses = "";
  let scaleClasses = "";
  if (direction === Direction.Bottom) {
    rotate = "0";
    flexClasses = "flex-row";
    scaleClasses = "origin-top-left scale-80 -mt-2";
  } else if (direction === Direction.Top) {
    rotate = "180";
    flexClasses = "flex-row-reverse";
    scaleClasses = "origin-bottom-right scale-80 -mb-2";
  } else if (direction === Direction.Left) {
    rotate = "90";
    flexClasses = "flex-col";
    scaleClasses = "origin-top-right scale-80 -mr-2";
  } else if (direction === Direction.Right) {
    rotate = "-90";
    flexClasses = "flex-col-reverse";
    scaleClasses = "origin-bottom-left scale-80 -ml-2";
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        flexClasses,
        scaleClasses,
        className,
      )}
    >
      {tiles.map((set, index) => (
        <div key={index} className={cn("flex", flexClasses)}>
          {set.map((tid) => (
            <Tile key={tid} tileId={tid} rotate={rotate} size="sm" />
          ))}
        </div>
      ))}
    </div>
  );
}
