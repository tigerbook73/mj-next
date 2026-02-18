import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Room from "../components/Room";
import { Position } from "../common/core/mj.game";
import { RoomStatus } from "../common/models/room.model";

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
          role: "Player",
          type: "Human",
          position: Position.East,
        },
        {
          userName: "Bob",
          roomName: "Lobby Room 1",
          role: "Player",
          type: "Human",
          position: Position.South,
        },
      ],
    },
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
          role: "Player",
          type: "Human",
          position: Position.East,
        },
        {
          userName: "Bob",
          roomName: "Full Room",
          role: "Player",
          type: "Human",
          position: Position.South,
        },
        {
          userName: "Charlie",
          roomName: "Full Room",
          role: "Player",
          type: "Human",
          position: Position.West,
        },
        {
          userName: "Dave",
          roomName: "Full Room",
          role: "Player",
          type: "Human",
          position: Position.North,
        },
      ],
    },
  },
};

export const EmptyRoom: Story = {
  args: {
    room: {
      name: "Empty Room",
      state: RoomStatus.Open,
      players: [],
    },
  },
};
