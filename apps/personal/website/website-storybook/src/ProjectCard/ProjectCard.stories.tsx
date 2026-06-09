import { ProjectCard } from "@rs/ryan-personal-website-components";

import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

// Bordered project summary card. Styling comes from the design system
// `projectCard` recipe family and composes `TagChip` for tech metadata.
const meta = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  args: {
    title: "Personal Website",
    description:
      "A fast editorial portfolio built with Astro, SolidJS, and typed design tokens.",
    tech: ["Astro", "SolidJS", "Vanilla Extract"],
    note: "Production",
    github: "https://github.com/RyanGreenup/kubernetes-3",
    live: "https://example.com",
    comingSoon: false,
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    tech: { control: "object" },
    note: { control: "text" },
    github: { control: "text" },
    live: { control: "text" },
    comingSoon: { control: "boolean" },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const grid: JSX.CSSProperties = {
  display: "grid",
  "grid-template-columns": "repeat(auto-fit, minmax(18rem, 1fr))",
  gap: "1rem",
  width: "min(100%, 56rem)",
};

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** A card with both source and live links. */
export const WithLinks: Story = {};

/** A card without optional note or footer links. */
export const Minimal: Story = {
  args: {
    title: "Draft Notes",
    description: "A small writing tool for collecting rough ideas before publishing.",
    tech: ["SolidJS", "IndexedDB"],
    note: undefined,
    github: undefined,
    live: undefined,
  },
};

/** Multiple project cards in a responsive grid. */
export const Grid: Story = {
  render: () => (
    <div style={grid}>
      <ProjectCard
        title="Personal Website"
        description="A fast editorial portfolio built with Astro, SolidJS, and typed design tokens."
        tech={["Astro", "SolidJS", "Vanilla Extract"]}
        note="Production"
        github="https://github.com/RyanGreenup/kubernetes-3"
        live="https://example.com"
      />
      <ProjectCard
        title="Kubernetes Generator"
        description="TypeScript tooling for generating GitOps manifests from reusable app primitives."
        tech={["TypeScript", "Kustomize", "Flux"]}
        note="Open source"
        github="https://github.com/RyanGreenup/kubernetes-3"
      />
    </div>
  ),
};

/** A private, unreleased project showing the Coming Soon badge. */
export const ComingSoon: Story = {
  args: {
    title: "Unreleased Tool",
    description: "A private project under active development. No public repository yet.",
    tech: ["Rust", "WASM", "SolidJS"],
    note: undefined,
    github: undefined,
    live: undefined,
    comingSoon: true,
  },
};

/** Mixed grid showing released and unreleased cards side by side. */
export const MixedGrid: Story = {
  render: () => (
    <div style={grid}>
      <ProjectCard
        title="Personal Website"
        description="A fast editorial portfolio built with Astro, SolidJS, and typed design tokens."
        tech={["Astro", "SolidJS", "Vanilla Extract"]}
        note="Production"
        github="https://github.com/RyanGreenup/kubernetes-3"
        live="https://example.com"
      />
      <ProjectCard
        title="Unreleased Tool"
        description="A private project under active development. No public repository yet."
        tech={["Rust", "WASM", "SolidJS"]}
        comingSoon
      />
      <ProjectCard
        title="Kubernetes Generator"
        description="TypeScript tooling for generating GitOps manifests from reusable app primitives."
        tech={["TypeScript", "Kustomize", "Flux"]}
        note="Open source"
        github="https://github.com/RyanGreenup/kubernetes-3"
      />
    </div>
  ),
};
