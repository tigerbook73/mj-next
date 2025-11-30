import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HandTiles } from "../components/HandTiles";
import { Direction } from "@/lib/game-utils";

const meta = {
  title: "Components/HandTiles",
  component: HandTiles,
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
    className: { control: "text" },
  },
} satisfies Meta<typeof HandTiles>;

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
