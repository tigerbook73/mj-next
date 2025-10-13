import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../components/ui/button";
import { ChevronRight, Download, Plus, Search } from "lucide-react";

/**
 * Button component built with Radix UI and styled with Tailwind CSS.
 *
 * Buttons are used to trigger actions or events, such as submitting a form,
 * opening a dialog, canceling an action, or performing a delete operation.
 */
const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states. Built with accessibility and performance in mind.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style variant of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      description: "The size of the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    asChild: {
      control: { type: "boolean" },
      description:
        "Change the default rendered element for the one passed as a child, merging their props and behavior",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "When true, prevents the user from interacting with the button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "The default button style with primary styling.",
      },
    },
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants showcased together. Each variant serves different purposes and contexts.",
      },
    },
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button sizes for various use cases. Small for compact interfaces, default for general use, and large for prominent actions.",
      },
    },
  },
};

// Icon buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-sm" variant="outline">
        <Plus />
      </Button>
      <Button size="icon" variant="outline">
        <Search />
      </Button>
      <Button size="icon-lg" variant="outline">
        <Download />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon-only buttons in different sizes. Perfect for toolbars, action bars, and compact interfaces.",
      },
    },
  },
};

// Buttons with icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Plus />
        Add Item
      </Button>
      <Button variant="outline">
        <Download />
        Download
      </Button>
      <Button variant="secondary">
        Continue
        <ChevronRight />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons combined with icons for enhanced visual communication. Icons can be placed before or after the text.",
      },
    },
  },
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different button states including normal and disabled. Disabled buttons prevent user interaction and provide visual feedback.",
      },
    },
  },
};

// Interactive examples
export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        Processing...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Loading state examples showing how to combine spinners with buttons for async operations. The buttons are disabled during loading to prevent multiple submissions.",
      },
    },
  },
};
