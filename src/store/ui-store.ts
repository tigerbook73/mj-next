import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIConfigure {
  tileSize: number; // in pixels
  setTileSize?: (size: number) => void;
  resetTileSize?: () => void;
}

export const useUIStore = create<UIConfigure>()(
  devtools(
    (set) => ({
      tileSize: 30,
      setTileSize: (size) => set({ tileSize: size }),
      resetTileSize: () => set({ tileSize: 30 }),
    }),
    { name: "UIStore" },
  ),
);
