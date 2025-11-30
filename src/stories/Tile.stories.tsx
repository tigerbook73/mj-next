import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tile, TILE_CATEGORIES, type TileProps } from "../components/Tile";
import { Direction } from "@/lib/game-utils";
import { useUIStore } from "@/store";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreDecorator = (Story: any, context: any) => {
  const setTileSize = useUIStore((state) => state.setTileSize);
  const tileSize = context.args.tileSize;

  useEffect(() => {
    if (setTileSize && tileSize) {
      setTileSize(tileSize);
    }
  }, [tileSize, setTileSize]);

  return <Story />;
};

const meta = {
  title: "Components/Tile",
  component: Tile,
  decorators: [StoreDecorator],
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
      options: {
        xs: "xs",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "60 %": 60,
        "70 %": 70,
        "80 %": 80,
        "90 %": 90,
        "100 %": 100,
        "110 %": 110,
        "120 %": 120,
        "130 %": 130,
        "140 %": 140,
      } as unknown as string[],
    },
    direction: {
      control: "select",
      options: [
        Direction.Bottom,
        Direction.Right,
        Direction.Top,
        Direction.Left,
      ],
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
    tileSize: {
      control: { type: "range", min: 10, max: 100, step: 1 },
      description: "Global tile size in pixels (UI Store)",
      table: {
        category: "Store",
      },
    },
  },
} as Meta<TileProps & { tileSize: number }>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  tileId: 1,
  size: "md" as TileProps["size"],
  tileSize: 40,
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
      {["xs", "sm", "md", "lg", "xl"].map((size) => (
        <div className="flex flex-col items-center" key={size}>
          <Tile {...args} size={size as TileProps["size"]} />
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
      {[60, 70, 80, 90, 100, 110, 120, 130, 140].map((size) => (
        <div className="flex flex-col items-center" key={size}>
          <Tile {...args} size={size} />
          <div>{size}%</div>
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
      {[Direction.Bottom, Direction.Right, Direction.Top, Direction.Left].map(
        (dir) => (
          <div key={dir} className="flex flex-row items-center">
            <div className="w-10">{dir}</div>
            <div className="flex gap-1">
              <Tile {...args} direction={dir} />
              <Tile {...args} direction={dir} />
            </div>
          </div>
        ),
      )}
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
        <Tile {...args} tileId={0} hoverable />
        <Tile {...args} tileId={4} hoverable selected />
        <Tile {...args} tileId={8} hoverable />
        <Tile {...args} tileId={36} hoverable />
        <Tile {...args} tileId={40} hoverable />
        <Tile {...args} tileId={44} hoverable />
        <Tile {...args} tileId={72} hoverable />
        <Tile {...args} tileId={76} hoverable />
        <Tile {...args} tileId={80} hoverable />
        <Tile {...args} tileId={108} hoverable />
        <Tile {...args} tileId={108} hoverable />
        <Tile {...args} tileId={124} hoverable />
        <Tile {...args} tileId={-1} hoverable />
        <Tile {...args} tileId={124} hoverable />
      </div>
    </div>
  ),
};
