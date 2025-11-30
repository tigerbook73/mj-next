import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Room from "../components/Room";

const meta = {
  title: "Components/Room",
  component: Room,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    gameStarted: { control: "boolean" },
  },
} satisfies Meta<typeof Room>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Lobby Room 1",
    chairs: [
      { id: 1, player: "Alice" },
      { id: 2, player: "Bob" },
      { id: 3 },
      { id: 4 },
    ],
    gameStarted: false,
  },
};

export const FullRoom: Story = {
  args: {
    name: "Full Room",
    chairs: [
      { id: 1, player: "Alice" },
      { id: 2, player: "Bob" },
      { id: 3, player: "Charlie" },
      { id: 4, player: "Dave" },
    ],
    gameStarted: true,
  },
};

export const EmptyRoom: Story = {
  args: {
    name: "Empty Room",
    chairs: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    gameStarted: false,
  },
};
