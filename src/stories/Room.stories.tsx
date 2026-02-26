import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Room from "../components/Room";
import { Position } from "../common/core/mj.game";
import { RoomStatus } from "../common/models/room.model";
import { PlayerModel, PlayerRole, UserType } from "@/common";
import { RoomModelInStore } from "@/store/room-store";

const meta = {
  title: "Components/Room",
  component: Room,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Room>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    room: {
      name: "Lobby Room 1",
      state: RoomStatus.Open,
      players: [
        {
          userName: "Alice",
          roomName: "Lobby Room 1",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.East,
        } as PlayerModel,
        {
          userName: "Bob",
          roomName: "Lobby Room 1",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.South,
        } as PlayerModel,
      ],
    } as unknown as RoomModelInStore,
  },
};

export const FullRoom: Story = {
  args: {
    room: {
      name: "Full Room",
      state: RoomStatus.Started,
      players: [
        {
          userName: "Alice",
          roomName: "Full Room",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.East,
        } as PlayerModel,
        {
          userName: "Bob",
          roomName: "Full Room",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.South,
        } as PlayerModel,
        {
          userName: "Charlie",
          roomName: "Full Room",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.West,
        } as PlayerModel,
        {
          userName: "Dave",
          roomName: "Full Room",
          role: PlayerRole.Player,
          type: UserType.Human,
          position: Position.North,
        } as PlayerModel,
      ],
    } as unknown as RoomModelInStore,
  },
};

export const EmptyRoom: Story = {
  args: {
    room: {
      name: "Empty Room",
      state: RoomStatus.Open,
      players: [],
    } as unknown as RoomModelInStore,
  },
};
