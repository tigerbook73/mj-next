import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayerTilesLeft } from "../components/PlayerTilesLeft";

const meta = {
  title: "Components/PlayerTilesLeft",
  component: PlayerTilesLeft,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerTilesLeft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
