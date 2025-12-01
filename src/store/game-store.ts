import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Game } from "@/common/core/mj.game";
import { getFakeEvent } from "@/test/helper";

interface GameState {
  game: Game | null;
  setGame: (game: Game) => void;
  resetGame: () => void;
}

const testGame = Game.fromJSON(getFakeEvent().data.rooms[0].game);

export const useGameStore = create<GameState>()(
  devtools(
    (set) => ({
      game: testGame, // Initialize a new game with 4 players by default
      setGame: (game) => set({ game }),
      resetGame: () => set({ game: null }),
    }),
    { name: "GameStore" },
  ),
);
