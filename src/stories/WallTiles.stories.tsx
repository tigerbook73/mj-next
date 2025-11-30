import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WallTiles } from "../components/WallTiles";
import { Direction } from "@/lib/game-utils";

const meta = {
  title: "Components/WallTiles",
  component: WallTiles,
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
} satisfies Meta<typeof WallTiles>;

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

export const FullWallArea: Story = {
  args: {
    direction: Direction.Bottom,
  },
  render: () => (
    <div className="grid grid-cols-[15%_1fr_15%] grid-rows-[15%_1fr_15%] bg-green-900">
      <div></div>
      <WallTiles direction={Direction.Top} />
      <div></div>
      <WallTiles direction={Direction.Left} />
      <div></div>
      <WallTiles direction={Direction.Right} />
      <div></div>
      <WallTiles direction={Direction.Bottom} />
      <div></div>
    </div>
  ),
};
