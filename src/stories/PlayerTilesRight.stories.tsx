import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayerTilesRight } from "../components/PlayerTilesRight";

const meta = {
  title: "Components/PlayerTilesRight",
  component: PlayerTilesRight,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerTilesRight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
