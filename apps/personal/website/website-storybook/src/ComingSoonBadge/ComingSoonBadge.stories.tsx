import { ComingSoonBadge } from "@rs/ryan-personal-website-components";
import { ProjectCard } from "@rs/ryan-personal-website-components";

import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

// Purple shimmer badge for private, unreleased projects. The lock icon and
// periodic shimmer sweep signal exclusivity without demanding attention.
const meta = {
  title: "Components/ComingSoonBadge",
  component: ComingSoonBadge,
  tags: ["autodocs"],
  args: {
    label: undefined,
  },
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<typeof ComingSoonBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

const row: JSX.CSSProperties = {
  display: "flex",
  "align-items": "center",
  gap: "1rem",
  "flex-wrap": "wrap",
};

const stack: JSX.CSSProperties = {
  display: "flex",
  "flex-direction": "column",
  gap: "1.25rem",
  "align-items": "flex-start",
};

const grid: JSX.CSSProperties = {
  display: "grid",
  "grid-template-columns": "repeat(auto-fit, minmax(18rem, 1fr))",
  gap: "1rem",
  width: "min(100%, 56rem)",
};

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** Default label next to custom label variants. */
export const Labels: Story = {
  render: () => (
    <div style={row}>
      <ComingSoonBadge />
      <ComingSoonBadge label="In Progress" />
      <ComingSoonBadge label="Private" />
      <ComingSoonBadge label="Stealth" />
    </div>
  ),
};

/** Badge composed inside a project card header. */
export const InProjectCard: Story = {
  render: () => (
    <div style={grid}>
      <ProjectCard
        title="Unreleased Tool"
        description="A private project under active development. No public repository yet."
        tech={["Rust", "WASM", "SolidJS"]}
        comingSoon
      />
      <ProjectCard
        title="Personal Website"
        description="A fast editorial portfolio built with Astro, SolidJS, and typed design tokens."
        tech={["Astro", "SolidJS", "Vanilla Extract"]}
        note="Production"
        github="https://github.com/RyanGreenup/kubernetes-3"
        live="https://example.com"
      />
    </div>
  ),
};

/** Badge at different scales to verify the pill shape holds. */
export const Scale: Story = {
  render: () => (
    <div style={stack}>
      <p style={{ "font-size": "0.75rem", margin: "0", color: "var(--roles-fg-muted)" }}>
        Standalone badge at natural size, paired with body text context.
      </p>
      <div style={row}>
        <ComingSoonBadge />
        <span style={{ "font-size": "0.9375rem" }}>Unreleased project details will appear here.</span>
      </div>
    </div>
  ),
};
