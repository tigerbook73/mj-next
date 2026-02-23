import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionPanel } from "@/components/ActionPanel";
import { UIStoreDecorator } from "./ui-store.decorator";

// Tile IDs (TileCore instance IDs):
// Man1: 0-3, Man2: 4-7, Man3: 8-11, Man4: 12-15, Man5: 16-19
// Man6: 20-23, Pin1: 24-27, Pin2: 28-31, Pin3: 32-35

const meta = {
  title: "Components/ActionPanel",
  component: ActionPanel,
  parameters: {
    layout: "centered",
  },
  decorators: [UIStoreDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof ActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const PengOnly: Story = {
  args: {
    actions: [
      {
        type: "peng",
        latestTile: 8, // Man3 (discarded)
        tiles: [9, 10], // Man3 + Man3 (hand tiles)
        onAction: () => console.log("碰"),
      },
    ],
  },
};

export const ChiSingle: Story = {
  args: {
    actions: [
      {
        type: "chi",
        latestTile: 8, // Man3
        options: [[0, 4]], // Man1 + Man2 → 1,2,3 sequence
        onAction: (tiles) => console.log("吃", tiles),
      },
    ],
  },
};

export const ChiMultiple: Story = {
  args: {
    actions: [
      {
        type: "chi",
        latestTile: 8, // Man3
        options: [
          [0, 4], // Man1 + Man2 → 1,2,3
          [12, 16], // Man4 + Man5 → 3,4,5
        ],
        onAction: (tiles) => console.log("吃", tiles),
      },
    ],
  },
};

export const DropAction: Story = {
  args: {
    actions: [
      {
        type: "drop",
        tileId: 20, // Man6
        onAction: () => console.log("出牌"),
      },
    ],
  },
};

export const AllActions: Story = {
  args: {
    actions: [
      {
        type: "peng",
        latestTile: 8, // Man3 (discarded)
        tiles: [9, 10], // Man3 + Man3 (hand tiles)
        onAction: () => console.log("碰"),
      },
      {
        type: "chi",
        latestTile: 8, // Man3
        options: [
          [0, 4], // Man1 + Man2
          [12, 16], // Man4 + Man5
        ],
        onAction: (tiles) => console.log("吃", tiles),
      },
      {
        type: "gang",
        latestTile: 8, // Man3 (discarded)
        tiles: [9, 10, 11], // Man3 × 3 (hand tiles)
        onAction: () => console.log("杠"),
      },
      {
        type: "pass",
        onAction: () => console.log("过"),
      },
      {
        type: "hu",
        latestTile: 8, // Man3 (discarded)
        onAction: () => console.log("胡"),
      },
    ],
  },
};

export const ZimoOnly: Story = {
  args: {
    actions: [
      {
        type: "zimo",
        tiles: [8], // Man3 (self-drawn)
        onAction: () => console.log("自摸"),
      },
    ],
  },
};

export const AnGangAndHu: Story = {
  args: {
    actions: [
      {
        type: "angang",
        options: [[0, 1, 2, 3]], // 4x Man1
        onAction: (tiles) => console.log("暗杠", tiles),
      },
      {
        type: "hu",
        latestTile: 8, // Man3 (discarded)
        onAction: () => console.log("胡"),
      },
    ],
  },
};

export const AnGangMultipleOptions: Story = {
  args: {
    actions: [
      {
        type: "angang",
        options: [
          [0, 1, 2, 3], // 4x Man1
          [24, 25, 26, 27], // 4x Pin1
        ],
        onAction: (tiles) => console.log("暗杠", tiles),
      },
    ],
  },
};
