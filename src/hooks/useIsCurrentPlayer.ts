import { useGameStore, useRoomStore } from "@/store";
import { Direction, CommonUtil } from "@/lib/game-utils";

export function useIsCurrentPlayer(direction: Direction): boolean {
  const game = useGameStore((state) => state.game);
  const myPosition = useRoomStore((state) => state.myPosition);
  return (
    game != null &&
    myPosition != null &&
    game.current?.position === CommonUtil.mapPosition(myPosition, direction)
  );
}
