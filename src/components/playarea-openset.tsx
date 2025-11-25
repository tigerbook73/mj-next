import { Tile } from "./tile";

export function PlayAreaOpenSet() {
  const tiles = [
    [1, 2, 3],
    [11, 15, 19],
    [40, 44, 48],
  ];
  return (
    <div className="flex h-full origin-top-left scale-90 transform items-center pl-2">
      {tiles.map((set, index) => (
        <div key={index} className="mr-1 flex">
          {set.map((tid) => (
            <Tile key={tid} tileId={tid} selected />
          ))}
        </div>
      ))}
    </div>
  );
}
