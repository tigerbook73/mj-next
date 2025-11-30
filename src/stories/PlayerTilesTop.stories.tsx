import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayerTilesTop } from "../components/PlayerTilesTop";

const meta = {
  title: "Components/PlayerTilesTop",
  component: PlayerTilesTop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerTilesTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
