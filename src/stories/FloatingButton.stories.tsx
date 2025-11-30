import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FloatingButton from "../components/ui-ex/FloatingButton";
import { Plus, Settings } from "lucide-react";

const meta = {
  title: "UI-Ex/FloatingButton",
  component: FloatingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    positionClass: { control: "text" },
  },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Plus className="h-6 w-6" />,
    label: "Add",
  },
};

export const CustomPosition: Story = {
  args: {
    icon: <Settings className="h-6 w-6" />,
    label: "Settings",
    positionClass: "bottom-6 left-6",
  },
};
