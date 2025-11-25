import { PlayAreaHand } from "./playarea-hand";
import { PlayAreaOpenSet } from "./playarea-openset";

export function PlayAreaMe() {
  return (
    <div className="flex h-full w-full items-center justify-between">
      <PlayAreaOpenSet />
      <div className="w-2" />
      <PlayAreaHand />
    </div>
  );
}
