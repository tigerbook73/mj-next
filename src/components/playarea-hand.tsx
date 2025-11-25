import { Tile } from "./tile";

export function PlayAreaHand() {
  const tiles = [11, 12, 13, -1, -1];
  return (
    <div className="just flex h-full items-center">
      {tiles.map((tid, index) => (
        <div key={index} className="mr-1 flex">
          <Tile key={tid} tileId={tid} hoverable />
        </div>
      ))}
    </div>
  );
}
