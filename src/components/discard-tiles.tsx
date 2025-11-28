import { Tile } from "./tile";
import { cn } from "@/lib/utils";
import { Direction } from "@/lib/game-utils";

// Please node: the classes shall work with displayTiles logic below
const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "grid-cols-12 grid-rows-3 gap-y-0.5 ",
  [Direction.Top]: "grid-cols-12 grid-rows-3 gap-y-0.5 ",
  [Direction.Left]: "grid-rows-12 grid-cols-2 gap-x-0.5 grid-flow-col",
  [Direction.Right]: "grid-rows-12 grid-cols-3 gap-x-0.5 grid-flow-col",
  [Direction.None]: "",
};

interface WallTilesProps {
  direction: Direction;
}

export function DiscardTiles({ direction }: WallTilesProps) {
  const width = 12;
  const tiles = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];
  const fullLength = width * 3;
  for (let i = tiles.length; i < fullLength; i++) {
    tiles.push(-1);
  }

  const displayTiles = (() => {
    if (direction === Direction.Top) {
      return tiles.slice().reverse();
    } else if (direction === Direction.Bottom) {
      return tiles;
    } else if (direction === Direction.Left) {
      return tiles
        .slice(width * 2, width * 3)
        .concat(tiles.slice(width, width * 2))
        .concat(tiles.slice(0, width));
    } else if (direction === Direction.Right) {
      return tiles
        .slice(0, width)
        .reverse()
        .concat(tiles.slice(width, width * 2).reverse())
        .concat(tiles.slice(width * 2, width * 3).reverse());
    } else {
      return tiles;
    }
  })();

  return (
    <div className={cn("grid", flexClasses[direction])}>
      {displayTiles.map((tid, index) => (
        <Tile
          key={`${tid}-${index}`}
          tileId={tid < 0 ? tid : tid * 4}
          direction={direction}
          size="2"
        />
      ))}
    </div>
  );
}
