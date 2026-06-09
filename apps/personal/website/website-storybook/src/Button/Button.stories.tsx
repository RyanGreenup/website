import { Button } from "@rs/ryan-personal-website-components";

import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

// The website's primary action control. Styling comes entirely from the design
// system `button` recipe, so every variant flips light/dark with the theme.
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "danger", "link"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    href: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const row: JSX.CSSProperties = {
  display: "flex",
  "align-items": "center",
  gap: "1rem",
  "flex-wrap": "wrap",
};

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** Every visual treatment side by side. */
export const Variants: Story = {
  render: () => (
    <div style={row}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/** The three sizes. */
export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** Link form: renders a navigable anchor for in-page or cross-page navigation. */
export const AsLink: Story = {
  args: { href: "#", children: "As link" },
};
