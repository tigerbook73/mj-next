import { Tile } from "./tile";
import { cn } from "@/lib/utils";
import { Direction } from "@/lib/game-utils";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

interface HandTilesProps {
  direction: Direction;
}

export function HandTiles({ direction }: HandTilesProps) {
  const tiles = [11, 12, 13, -1, -1];

  return (
    <div
      className={cn("flex items-center justify-center", flexClasses[direction])}
    >
      {tiles.map((tid) => (
        <Tile
          key={tid}
          tileId={tid}
          direction={direction}
          size="sm"
          hoverable={direction === Direction.Bottom}
        />
      ))}
    </div>
  );
}
