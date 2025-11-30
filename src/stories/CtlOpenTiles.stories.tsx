import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtlOpenTiles } from "../components/CtlOpenTiles";
import { useUIStore } from "@/store";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreDecorator = (Story: any, context: any) => {
  const setOpenTiles = useUIStore((state) => state.setOpenTiles);
  const openTiles = context.args.openTiles;

  useEffect(() => {
    if (setOpenTiles && typeof openTiles === "boolean") {
      setOpenTiles(openTiles);
    }
  }, [openTiles, setOpenTiles]);

  return <Story />;
};

const meta = {
  title: "Components/CtlOpenTiles",
  component: CtlOpenTiles,
  decorators: [StoreDecorator],
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
