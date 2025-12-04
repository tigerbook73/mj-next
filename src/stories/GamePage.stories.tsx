import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Game from "@/app/game/page";
import { GameStoreDecorator } from "./game-store.decorator";
import { UIStoreDecorator } from "./ui-store.decorator";

const meta = {
  title: "App/GamePage",
  component: Game,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [GameStoreDecorator, UIStoreDecorator],
} satisfies Meta<typeof Game>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
