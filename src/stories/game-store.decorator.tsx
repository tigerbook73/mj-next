import { Game } from "@/common/core/mj.game";
import { useGameStore } from "@/store";
import { getFakeEvent } from "@/test/helper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GameStoreDecorator = (Story: any) => {
  const setGame = useGameStore((state) => state.setGame);
  const game = getFakeEvent().data.rooms[0].game as unknown as Game;
  setGame(game);

  return <Story />;
};
