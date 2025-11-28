import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIConfigure {
  tileSize: string;
  setTileSize?: (size: string) => void;
  resetTileSize?: () => void;
}

export const useUIStore = create<UIConfigure>()(
  devtools(
    (set) => ({
      tileSize: "20px",
      setTileSize: (size) => set({ tileSize: size }),
      resetTileSize: () => set({ tileSize: "20px" }),
    }),
    { name: "UIStore" },
  ),
);
