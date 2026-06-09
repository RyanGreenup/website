import { TagChip } from "@rs/ryan-personal-website-components";

import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

// Small non-interactive tag chip. Styling comes from the design system `chip`
// recipe, matching the lifted Astro component while using typed design tokens.
const meta = {
  title: "Components/TagChip",
  component: TagChip,
  tags: ["autodocs"],
  args: {
    label: "TypeScript",
    variant: "default",
    mono: false,
  },
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "inline-radio",
      options: ["default", "brand", "accent"],
    },
    mono: { control: "boolean" },
  },
} satisfies Meta<typeof TagChip>;

export default meta;

type Story = StoryObj<typeof meta>;

const row: JSX.CSSProperties = {
  display: "flex",
  "align-items": "center",
  gap: "0.75rem",
  "flex-wrap": "wrap",
};

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** Every visual treatment side by side. */
export const Variants: Story = {
  render: () => (
    <div style={row}>
      <TagChip label="Default" variant="default" />
      <TagChip label="Brand" variant="brand" />
      <TagChip label="Accent" variant="accent" />
    </div>
  ),
};

/** Mono rendering for technology tags. */
export const Mono: Story = {
  render: () => (
    <div style={row}>
      <TagChip label="TypeScript" mono />
      <TagChip label="SolidJS" mono variant="brand" />
      <TagChip label="Vanilla Extract" mono variant="accent" />
    </div>
  ),
};
