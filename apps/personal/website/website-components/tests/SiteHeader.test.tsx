import { fireEvent, render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { isSiteHeaderLinkActive, normalizeSiteHeaderPath, SiteHeader } from "../src";

test("normalizes and matches active header paths like the Astro component", () => {
  expect(normalizeSiteHeaderPath("/blog/")).toBe("/blog");
  expect(isSiteHeaderLinkActive("/", "/")).toBe(true);
  expect(isSiteHeaderLinkActive("/blog", "/blog/islands-without-the-guilt")).toBe(true);
  expect(isSiteHeaderLinkActive("/blog", "/projects")).toBe(false);
});

test("renders the default brand, nav, and active link", () => {
  const screen = render(() => <SiteHeader currentPath="/blog/islands-without-the-guilt" />);

  expect(screen.getByRole("link", { name: "Dana Reyes - home" }).getAttribute("href")).toBe(
    "/",
  );
  expect(screen.getByText("DR")).toBeTruthy();
  // "Blog" appears in both the desktop nav and the always-mounted sheet; both
  // must reflect the active route.
  const blogLinks = screen.getAllByText("Blog");
  expect(blogLinks).toHaveLength(2);
  for (const link of blogLinks) {
    expect(link.closest("a")?.getAttribute("aria-current")).toBe("page");
  }
  expect(screen.getByRole("button", { name: "Open navigation" })).toBeTruthy();
});

test("renders custom brand, nav items, and action slot", () => {
  const screen = render(() => (
    <SiteHeader
      brandHref="/work"
      brandLabel="Ryan Greenup - work"
      brandMark="RG"
      brandName="Ryan Greenup"
      currentPath="/notes"
      navItems={[
        { href: "/work", label: "Work" },
        { href: "/notes", label: "Notes" },
      ]}
      actions={<button type="button">Toggle theme</button>}
    />
  ));

  expect(screen.getByRole("link", { name: "Ryan Greenup - work" }).getAttribute("href")).toBe(
    "/work",
  );
  expect(screen.getByText("RG")).toBeTruthy();
  const notesLinks = screen.getAllByText("Notes");
  expect(notesLinks).toHaveLength(2);
  for (const link of notesLinks) {
    expect(link.closest("a")?.getAttribute("aria-current")).toBe("page");
  }
  expect(screen.getByRole("button", { name: "Toggle theme" })).toBeTruthy();
});

test("opens and closes the mobile sheet via data-open state", () => {
  const screen = render(() => <SiteHeader currentPath="/projects" />);
  const sheet = screen.container.querySelector("#site-header-mobile-nav");

  // The sheet is always mounted (so it can animate); closed means data-open=false.
  expect(sheet?.getAttribute("data-open")).toBe("false");
  expect(sheet?.getAttribute("aria-hidden")).toBe("true");

  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(sheet?.getAttribute("data-open")).toBe("true");
  expect(sheet?.getAttribute("aria-hidden")).toBe("false");

  // The backdrop and the in-sheet close button both dismiss; click the backdrop.
  fireEvent.click(screen.getAllByRole("button", { name: "Close navigation" })[0]);
  expect(sheet?.getAttribute("data-open")).toBe("false");
  expect(sheet?.getAttribute("aria-hidden")).toBe("true");
});
