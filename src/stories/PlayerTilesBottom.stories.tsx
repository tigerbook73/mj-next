import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayerTilesBottom } from "../components/PlayerTilesBottom";

const meta = {
  title: "Components/PlayerTilesBottom",
  component: PlayerTilesBottom,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerTilesBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
