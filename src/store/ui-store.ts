"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIConfigure {
  // tile size
  tileSize: number; // in pixels
  setTileSize?: (size: number) => void;
  resetTileSize?: () => void;

  // open all tiles
  openTiles: boolean;
  setOpenTiles?: (open: boolean) => void;
  resetOpenTiles?: () => void;
}

export const useUIStore = create<UIConfigure>()(
  devtools(
    (set) => ({
      tileSize: 30,
      setTileSize: (size) => set({ tileSize: size }),
      resetTileSize: () => set({ tileSize: 30 }),

      openTiles: false,
      setOpenTiles: (open) => set({ openTiles: open }),
      resetOpenTiles: () => set({ openTiles: false }),
    }),
    { name: "UIStore" },
  ),
);
