import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TileId } from "@/common";

export interface FlightRecord {
  tileId: TileId;
  fromRect: DOMRect;
  toRect: DOMRect;
}

export interface TileFlightStoreState {
  flights: FlightRecord[];
  startFlight: (tileId: TileId, fromRect: DOMRect, toRect: DOMRect) => void;
  clearFlight: (tileId: TileId) => void;
}

export const useTileFlightStore = create<TileFlightStoreState>()(
  devtools(
    (set) => ({
      flights: [],
      startFlight: (tileId, fromRect, toRect) =>
        set((s) => ({
          flights: [...s.flights.filter((f) => f.tileId !== tileId), { tileId, fromRect, toRect }],
        })),
      clearFlight: (tileId) =>
        set((s) => ({
          flights: s.flights.filter((f) => f.tileId !== tileId),
        })),
    }),
    { name: "TileFlightStore" },
  ),
);
