import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tile, TILE_CATEGORIES } from "../components/tile";

const meta = {
  title: "Components/Tile",
  component: Tile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tileId: {
      control: "number",
      description: "Unique identifier for the tile",
    },
    back: {
      control: "boolean",
      description: "Show back of tile",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "1", "2", "3", "4", "6", "7", "8", "9"],
    },
    direction: {
      control: "select",
      options: ["0", "90", "180", "270", "-90"],
    },
    hoverable: {
      control: "boolean",
    },
    selected: {
      control: "boolean",
    },
    special: {
      control: "select",
      options: [
        "normal",
        "highlighted",
        "focused",
        "disabled",
        "warning",
        "success",
      ],
    },
    theme: {
      control: "select",
      options: ["Regular", "Black"],
    },
  },
} satisfies Meta<typeof Tile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tile stories
export const Default: Story = {
  args: {
    tileId: 1, // Man1
    size: "md",
  },
};

export const TileBack: Story = {
  args: {
    tileId: 1,
    back: true,
    size: "md",
  },
};

export const InvalidTile: Story = {
  args: {
    tileId: 999, // Invalid ID
    size: "md",
  },
};

// Size variations
export const Sizes: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex items-end gap-2">
      <Tile tileId={1} size="sm" />
      <Tile tileId={1} size="md" />
      <Tile tileId={1} size="lg" />
      <Tile tileId={1} size="xl" />
    </div>
  ),
};

export const NumericSizes: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex items-end gap-2">
      <Tile tileId={1} size="1" />
      <Tile tileId={1} size="2" />
      <Tile tileId={1} size="3" />
      <Tile tileId={1} size="4" />
      <Tile tileId={1} size="6" />
      <Tile tileId={1} size="7" />
      <Tile tileId={1} size="8" />
      <Tile tileId={1} size="9" />
    </div>
  ),
};

// Direction variations
export const Directions: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-4">
      <Tile tileId={1} direction="0" />
      <Tile tileId={1} direction="90" />
      <Tile tileId={1} direction="180" />
      <Tile tileId={1} direction="270" />
    </div>
  ),
};

// Interactive states
export const Interactive: Story = {
  args: {
    tileId: 1,
    hoverable: true,
    onClick: (id) => alert(`Clicked tile ${id}`),
  },
};

export const Selected: Story = {
  // args: {
  //   tileId: 1,
  //   selected: true,
  //   hoverable: true,
  // },
  args: { tileId: 1 },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Tile tileId={1} />
      <Tile tileId={1} selected />
      <Tile tileId={1} direction="90" />
      <Tile tileId={1} direction="90" selected />
      <Tile tileId={1} direction="180" />
      <Tile tileId={1} direction="180" selected />
      <Tile tileId={1} direction="270" />
      <Tile tileId={1} direction="270" selected />
    </div>
  ),
};

// Special effects
export const SpecialEffects: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Tile tileId={1} special="normal" />
      <Tile tileId={1} special="highlighted" />
      <Tile tileId={1} special="focused" />
      <Tile tileId={1} special="disabled" />
      <Tile tileId={1} special="warning" />
      <Tile tileId={1} special="success" />
    </div>
  ),
};

// Theme variations
export const Themes: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-4">
      <div className="text-center">
        <Tile tileId={1} theme="Regular" />
        <p className="mt-2 text-sm">Regular</p>
      </div>
      <div className="text-center">
        <Tile tileId={1} theme="Black" />
        <p className="mt-2 text-sm">Black</p>
      </div>
    </div>
  ),
};

// Tile categories showcase
export const Characters: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.CHARACTERS.map((id) => (
        <Tile key={id} tileId={id} size="sm" />
      ))}
    </div>
  ),
};

export const Dots: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.DOTS.map((id) => (
        <Tile key={id} tileId={id} size="sm" />
      ))}
    </div>
  ),
};

export const Bamboo: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.BAMBOO.map((id) => (
        <Tile key={id} tileId={id} size="sm" />
      ))}
    </div>
  ),
};

export const Winds: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.WINDS.map((id) => (
        <Tile key={id} tileId={id} size="sm" />
      ))}
    </div>
  ),
};

export const Dragons: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.DRAGONS.map((id) => (
        <Tile key={id} tileId={id} size="sm" />
      ))}
    </div>
  ),
};

// Game-like demonstration
export const MahjongHand: Story = {
  args: { tileId: 1 },
  render: () => (
    <div className="rounded-lg bg-green-800 p-4">
      <div className="flex gap-1">
        <Tile tileId={1} hoverable selected />
        <Tile tileId={2} hoverable />
        <Tile tileId={3} hoverable />
        <Tile tileId={11} hoverable />
        <Tile tileId={12} hoverable />
        <Tile tileId={13} hoverable />
        <Tile tileId={21} hoverable />
        <Tile tileId={22} hoverable />
        <Tile tileId={23} hoverable />
        <Tile tileId={31} hoverable />
        <Tile tileId={31} hoverable />
        <Tile tileId={35} hoverable />
        <Tile tileId={35} hoverable />
      </div>
    </div>
  ),
};
