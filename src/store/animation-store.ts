import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TileId } from "@/common";

export interface AnimationStoreState {
  tileId: TileId | null;
  fromRect: DOMRect | null;
  toRect: DOMRect | null;
  startFlightImmediate: (tileId: TileId, fromRect: DOMRect, toRect: DOMRect) => void;
  clearFlight: () => void;
}

export const useAnimationStore = create<AnimationStoreState>()(
  devtools(
    (set) => ({
      tileId: null,
      fromRect: null,
      toRect: null,
      startFlightImmediate: (tileId, fromRect, toRect) => set({ tileId, fromRect, toRect }),
      clearFlight: () => set({ tileId: null, fromRect: null, toRect: null }),
    }),
    { name: "AnimationStore" },
  ),
);
