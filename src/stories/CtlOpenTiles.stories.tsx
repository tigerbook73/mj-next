import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtlOpenTiles } from "../components/CtlOpenTiles";

const meta = {
  title: "Components/CtlOpenTiles",
  component: CtlOpenTiles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    openTiles: {
      control: "boolean",
      description: "Initial state of open tiles (UI Store)",
      table: {
        category: "Store",
      },
    },
  },
} as Meta<React.ComponentProps<typeof CtlOpenTiles> & { openTiles: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    openTiles: false,
  },
};

export const Open: Story = {
  args: {
    openTiles: true,
  },
};
