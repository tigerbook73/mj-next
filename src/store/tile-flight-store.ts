import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TileId } from "@/common";

export interface FlightRecord {
  tileId: TileId;
  fromRect: DOMRect;
  toRect: DOMRect;
  /** When true the ghost renders the back face (e.g. wall → hand pick animation). */
  back?: boolean;
}

export interface TileFlightStoreState {
  flights: FlightRecord[];
  startFlight: (tileId: TileId, fromRect: DOMRect, toRect: DOMRect, back?: boolean) => void;
  clearFlight: (tileId: TileId) => void;
}

export const useTileFlightStore = create<TileFlightStoreState>()(
  devtools(
    (set) => ({
      flights: [],
      startFlight: (tileId, fromRect, toRect, back) =>
        set((s) => ({
          flights: [...s.flights.filter((f) => f.tileId !== tileId), { tileId, fromRect, toRect, back }],
        })),
      clearFlight: (tileId) =>
        set((s) => ({
          flights: s.flights.filter((f) => f.tileId !== tileId),
        })),
    }),
    { name: "TileFlightStore" },
  ),
);
