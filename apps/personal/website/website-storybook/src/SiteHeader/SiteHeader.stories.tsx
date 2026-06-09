import { SiteHeader } from "@rs/ryan-personal-website-components";
import { themeToggle } from "@rs/ryan-personal-website-design/recipes";

import type { Meta, StoryObj } from "storybook-solidjs-vite";

function ThemeButton() {
  return (
    <button type="button" class={themeToggle} aria-label="Toggle colour theme">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  );
}

// Sticky portfolio header. Styling comes from the design system `siteHeader`
// recipe family; the theme control is supplied through the action slot.
const meta = {
  title: "Components/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  args: {
    currentPath: "/projects",
    brandHref: "/",
    brandLabel: "Dana Reyes - home",
    brandMark: "DR",
    brandName: "Dana Reyes",
  },
  argTypes: {
    currentPath: { control: "text" },
    brandHref: { control: "text" },
    brandLabel: { control: "text" },
    brandMark: { control: "text" },
    brandName: { control: "text" },
    navItems: { control: "object" },
    mobileMenuOpen: { control: "boolean" },
    onMobileMenuOpenChange: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  render: (args) => <SiteHeader {...args} actions={<ThemeButton />} />,
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground bound to the controls panel. */
export const Playground: Story = {};

/** Blog subroutes keep the Blog item active. */
export const BlogArticleActive: Story = {
  args: {
    currentPath: "/blog/islands-without-the-guilt",
  },
};

/** A customized lockup and shorter nav for product/editorial contexts. */
export const CustomBrandAndNav: Story = {
  args: {
    brandHref: "/work",
    brandLabel: "Ryan Greenup - work",
    brandMark: "RG",
    brandName: "Ryan Greenup",
    currentPath: "/notes",
    navItems: [
      { href: "/work", label: "Work" },
      { href: "/notes", label: "Notes" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

const mobileViewport = {
  parameters: {
    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
      },
    },
  },
  globals: { viewport: { value: "mobile", isRotated: false } },
} satisfies Partial<Story>;

/**
 * Narrow viewport, sheet closed: the inline nav collapses to the hamburger
 * opener. Toggle the menu to watch the sheet slide in from the right.
 */
export const Mobile: Story = {
  ...mobileViewport,
  args: {
    currentPath: "/projects",
  },
};

/** Narrow viewport with the slide-in sheet held open for visual inspection. */
export const MobileSheetOpen: Story = {
  ...mobileViewport,
  args: {
    currentPath: "/projects",
    mobileMenuOpen: true,
  },
};
