import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Game } from "@/common/core/mj.game";

export type GameInStore = Omit<
  typeof Game.prototype,
  "reversePickPosition" | "reversePickIndex" | "passedPlayers" | "queuedActions"
>;

interface GameState {
  game: GameInStore | null;
  setGame: (game: GameInStore | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  devtools(
    (set) => ({
      game: null,
      setGame: (game) => set({ game }),
      resetGame: () => set({ game: null }),
    }),
    { name: "GameStore" },
  ),
);
