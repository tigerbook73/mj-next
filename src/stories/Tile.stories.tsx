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
    rotate: {
      control: "select",
      options: ["0", "90", "180", "270"],
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

const defaultArgs = {
  tileId: 1,
  size: "md",
};

// Basic tile stories
export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const TileBack: Story = {
  args: {
    ...defaultArgs,
    back: true,
  },
};

export const InvalidTile: Story = {
  args: {
    ...defaultArgs,
    tileId: 999, // Invalid ID
  },
};

// Size variations
export const Sizes: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex items-end gap-2">
      {["sm", "md", "lg", "xl"].map((size) => (
        <div className="flex flex-col items-center" key={size}>
          <Tile {...args} size={size} />
          <div>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const NumericSizes: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex items-end gap-2">
      {["1", "2", "3", "4", "6", "7", "8", "9"].map((size) => (
        <div className="flex flex-col items-center" key={size}>
          <Tile {...args} size={size} />
          <div>{size}</div>
        </div>
      ))}
    </div>
  ),
};

// Direction variations
export const Directions: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {["0", "90", "180", "270"].map((dir) => (
        <div key={dir} className="flex flex-row items-center">
          <div className="w-10">{dir}°</div>
          <div className="flex gap-1">
            <Tile {...args} rotate={dir as "0" | "90" | "180" | "270"} />
            <Tile {...args} rotate={dir as "0" | "90" | "180" | "270"} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Selected: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      <Tile {...args} />
      <Tile {...args} selected />
      <Tile {...args} />
    </div>
  ),
};

// Special effects
export const SpecialEffects: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-4">
      <Tile {...args} special="normal" />
      <Tile {...args} special="highlighted" />
      <Tile {...args} special="focused" />
      <Tile {...args} special="disabled" />
      <Tile {...args} special="warning" />
      <Tile {...args} special="success" />
    </div>
  ),
};

// Theme variations
export const Themes: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-4">
      <div className="text-center">
        <Tile {...args} theme="Regular" />
        <p className="mt-2 text-sm">Regular</p>
      </div>
      <div className="text-center">
        <Tile {...args} theme="Black" />
        <p className="mt-2 text-sm">Black</p>
      </div>
    </div>
  ),
};

// Tile categories showcase
export const Characters: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.CHARACTERS.map((id) => (
        <Tile key={id} {...args} tileId={id} />
      ))}
    </div>
  ),
};

export const Dots: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.DOTS.map((id) => (
        <Tile key={id} {...args} tileId={id} />
      ))}
    </div>
  ),
};

export const Bamboo: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.BAMBOO.map((id) => (
        <Tile key={id} {...args} tileId={id} />
      ))}
    </div>
  ),
};

export const Winds: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.WINDS.map((id) => (
        <Tile key={id} {...args} tileId={id} />
      ))}
    </div>
  ),
};

export const Dragons: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="flex gap-1">
      {TILE_CATEGORIES.DRAGONS.map((id) => (
        <Tile key={id} {...args} tileId={id} />
      ))}
    </div>
  ),
};

// Game-like demonstration
export const MahjongHand: Story = {
  args: { ...defaultArgs },
  render: (args) => (
    <div className="rounded-lg bg-green-800 p-4">
      <div className="flex gap-1">
        <Tile {...args} tileId={1} hoverable />
        <Tile {...args} tileId={2} hoverable selected />
        <Tile {...args} tileId={3} hoverable />
        <Tile {...args} tileId={11} hoverable />
        <Tile {...args} tileId={12} hoverable />
        <Tile {...args} tileId={13} hoverable />
        <Tile {...args} tileId={21} hoverable />
        <Tile {...args} tileId={22} hoverable />
        <Tile {...args} tileId={23} hoverable />
        <Tile {...args} tileId={31} hoverable />
        <Tile {...args} tileId={31} hoverable />
        <Tile {...args} tileId={35} hoverable />
        <Tile {...args} tileId={-1} hoverable />
        <Tile {...args} tileId={35} hoverable />
      </div>
    </div>
  ),
};
