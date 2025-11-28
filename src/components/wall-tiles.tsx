import { Tile } from "./tile";
import { cn } from "@/lib/utils";
import { Direction } from "@/lib/game-utils";

// Please node: the classes shall work with displayTiles logic below
const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]:
    "grid-cols-18 grid-flow-col grid-rows-2 gap-y-0.5 [direction:rtl]",
  [Direction.Top]: "grid-cols-18 grid-flow-col grid-rows-2 gap-y-0.5 ",
  [Direction.Left]: "grid-rows-18 grid-cols-2 gap-x-0.5 flex-col",
  [Direction.Right]: "grid-rows-18 grid-cols-2 gap-x-0.5",
  [Direction.None]: "",
};

interface WallTilesProps {
  direction: Direction;
}

export function WallTiles({ direction }: WallTilesProps) {
  const tiles = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];

  const displayTiles = (() => {
    if (direction === Direction.Top) {
      const result: typeof tiles = [];
      for (let i = 0; i < tiles.length - 1; i += 2) {
        [result[i], result[i + 1]] = [tiles[i + 1], tiles[i]];
      }
      return result;
    } else if (direction === Direction.Bottom) {
      return tiles;
    } else if (direction === Direction.Left) {
      return tiles.slice().reverse();
    } else if (direction === Direction.Right) {
      return tiles;
    } else {
      return tiles;
    }
  })();

  return (
    <div className={cn("grid", flexClasses[direction])}>
      {displayTiles.map((tid) => (
        <Tile key={tid} tileId={tid * 4} direction={direction} size="1" />
      ))}
    </div>
  );
}
