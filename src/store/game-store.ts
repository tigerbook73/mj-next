import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Game } from "@/common/core/mj.game";

interface GameState {
  game: Game | null;
  setGame: (game: Game) => void;
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
