import { cn } from "@/lib/utils";
import { Tile } from "./tile";
import { Direction } from "@/lib/game-utils";
import { JSX } from "react";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

const scaleClasses: Record<Direction, string> = {
  [Direction.Bottom]: "origin-top-left scale-80 -mt-2",
  [Direction.Top]: "origin-bottom-right scale-80 -mb-2",
  [Direction.Left]: "origin-top-right scale-80 -mr-2",
  [Direction.Right]: "origin-bottom-left scale-80 -ml-2",
  [Direction.None]: "",
};
interface OpenSetTilesProps {
  direction: Direction;
  className?: string;
}

export function OpenSetTiles({
  direction,
  className,
}: OpenSetTilesProps): JSX.Element {
  const tiles = [
    [1, 2, 3],
    [11, 15, 19],
    [40, 44, 48],
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        flexClasses[direction],
        scaleClasses[direction],
        className,
      )}
    >
      {tiles.map((set, index) => (
        <div key={index} className={cn("flex", flexClasses[direction])}>
          {set.map((tid, index) => (
            <Tile
              key={tid}
              tileId={tid}
              direction={direction}
              size="sm"
              special={index < 2 ? "normal" : "success"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
