import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SpeedDial from "../components/ui-ex/SpeedDial";
import { Home, Settings, User } from "lucide-react";

const actions = [
  { icon: <Home className="h-4 w-4" />, label: "Home", onClick: () => {} },
  {
    icon: <Settings className="h-4 w-4" />,
    label: "Settings",
    onClick: () => {},
  },
  { icon: <User className="h-4 w-4" />, label: "Profile", onClick: () => {} },
];

const meta = {
  title: "UI-Ex/SpeedDial",
  component: SpeedDial,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    direction: {
      control: "select",
      options: ["up", "down", "left", "right"],
    },
    trigger: {
      control: "select",
      options: ["click", "hover"],
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[300px] w-full border border-dashed border-gray-300 bg-gray-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions,
    position: "bottom-right",
    direction: "up",
  },
};

export const TopLeftDown: Story = {
  args: {
    actions,
    position: "top-left",
    direction: "down",
  },
};

export const HoverTrigger: Story = {
  args: {
    actions,
    position: "bottom-left",
    direction: "right",
    trigger: "hover",
  },
};
