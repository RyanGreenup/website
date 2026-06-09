import { PostCard } from "@rs/ryan-personal-website-components";

import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

// Blog list row for recent-writing strips and archive pages. Styling comes from
// the design system `postCard` recipe family and composes `TagChip` for tags.
const meta = {
  title: "Components/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  args: {
    href: "/blog/migration-ready-css-tokens",
    title: "Migration-ready CSS tokens",
    date: new Date("2026-05-18T00:00:00.000Z"),
    description:
      "A practical note on keeping design tokens portable while moving UI stacks.",
    tags: ["design", "css", "tokens"],
  },
  argTypes: {
    href: { control: "text" },
    title: { control: "text" },
    date: { control: "date" },
    description: { control: "text" },
    tags: { control: "object" },
  },
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const list: JSX.CSSProperties = {
  display: "grid",
  width: "min(100%, 44rem)",
};

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** A single post with content tags. */
export const WithTags: Story = {};

/** A post row without optional tags. */
export const WithoutTags: Story = {
  args: {
    href: "/blog/islands-without-the-guilt",
    title: "Islands without the guilt",
    date: new Date("2026-04-02T00:00:00.000Z"),
    description:
      "A short note on using islands only where interaction earns its place.",
    tags: [],
  },
};

/** Multiple rows in an archive-style list. */
export const ArchiveList: Story = {
  render: () => (
    <div style={list}>
      <PostCard
        href="/blog/migration-ready-css-tokens"
        title="Migration-ready CSS tokens"
        date={new Date("2026-05-18T00:00:00.000Z")}
        description="A practical note on keeping design tokens portable while moving UI stacks."
        tags={["design", "css", "tokens"]}
      />
      <PostCard
        href="/blog/islands-without-the-guilt"
        title="Islands without the guilt"
        date={new Date("2026-04-02T00:00:00.000Z")}
        description="A short note on using islands only where interaction earns its place."
        tags={["astro", "performance"]}
      />
      <PostCard
        href="/blog/lorem-ipsum-field-notes"
        title="Lorem ipsum field notes"
        date={new Date("2026-02-14T00:00:00.000Z")}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae fermentum lectus."
      />
    </div>
  ),
};
