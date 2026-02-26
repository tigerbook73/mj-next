import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RoomModel } from "@/common/models/room.model";
import type { Position } from "@/common/core/mj.game";
import { PlayerModel } from "@/common/models/player.model";

export type RoomModelInStore = Omit<typeof RoomModel.prototype, "game">;
export type SeatModelInStore = Omit<typeof PlayerModel.prototype, "game">;

interface RoomState {
  // room list
  roomList: RoomModel[];
  setRoomList: (roomList: RoomModel[]) => void;

  // current room
  myRoom: RoomModel | null;
  setMyRoom: (room: RoomModel | null) => void;

  // player position in room
  myPosition: Position | null;
  setMyPosition: (position: Position | null) => void;

  // reset
  reset: () => void;
}

export const useRoomStore = create<RoomState>()(
  devtools(
    (set) => ({
      roomList: [],
      setRoomList: (roomList) => set({ roomList }, undefined, "setRoomList"),

      myRoom: null,
      setMyRoom: (myRoom) => set({ myRoom }, undefined, "setMyRoom"),

      myPosition: null,
      setMyPosition: (myPosition) => set({ myPosition }, undefined, "setMyPosition"),

      reset: () => set({ roomList: [], myRoom: null, myPosition: null }, undefined, "reset"),
    }),
    { name: "RoomStore" },
  ),
);
