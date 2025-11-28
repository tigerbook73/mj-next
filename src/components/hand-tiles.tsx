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
  className?: string;
}

export function HandTiles({ direction, className }: HandTilesProps) {
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, -1, 14];

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        flexClasses[direction],
        className,
      )}
    >
      {tiles.map((tid, index) => (
        <Tile
          key={`${tid}-${index}`}
          tileId={tid}
          direction={direction}
          size="md"
          hoverable={direction === Direction.Bottom}
        />
      ))}
    </div>
  );
}
