import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Game, GameState } from "@/common/core/mj.game";
import { TileCore, type TileId } from "@/common/core/mj.tile-core";

export type GameInStore = Omit<
  typeof Game.prototype,
  "reversePickPosition" | "reversePickIndex" | "passedPlayers" | "queuedActions"
>;

interface GameStoreState {
  game: GameInStore | null;
  latestTile: TileId | null;
  setGame: (game: GameInStore | null) => void;
  resetGame: () => void;
}

function deriveLatestTile(
  game: GameInStore | null,
  prev: TileId | null,
): TileId | null {
  if (!game || game.state === GameState.Init) return null;
  if (game.latestTile !== TileCore.voidId) return game.latestTile;
  return prev;
}

export const useGameStore = create<GameStoreState>()(
  devtools(
    (set, get) => ({
      game: null,
      latestTile: null,
      setGame: (game) =>
        set({ game, latestTile: deriveLatestTile(game, get().latestTile) }),
      resetGame: () => set({ game: null, latestTile: null }),
    }),
    { name: "GameStore" },
  ),
);
