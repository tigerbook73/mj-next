import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DiscardTiles } from "../components/DiscardTiles";
import { Direction } from "@/lib/game-utils";

const meta = {
  title: "Components/DiscardTiles",
  component: DiscardTiles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: [
        Direction.Bottom,
        Direction.Right,
        Direction.Top,
        Direction.Left,
      ],
    },
  },
} satisfies Meta<typeof DiscardTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
  args: {
    direction: Direction.Bottom,
  },
};

export const Right: Story = {
  args: {
    direction: Direction.Right,
  },
};

export const Top: Story = {
  args: {
    direction: Direction.Top,
  },
};

export const Left: Story = {
  args: {
    direction: Direction.Left,
  },
};
