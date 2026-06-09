import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { Button } from "../src";

test("renders a button with its label and a recipe class", () => {
  const screen = render(() => <Button variant="primary">Click me</Button>);
  const el = screen.getByRole("button");
  expect(el.textContent).toBe("Click me");
  // The class comes from the design `button` recipe, so it must be non-empty.
  expect(el.className.length).toBeGreaterThan(0);
  expect(el.getAttribute("type")).toBe("button");
});

test("renders a navigable anchor when href is provided", () => {
  const screen = render(() => <Button href="/about">About</Button>);
  const el = screen.getByRole("link");
  expect(el.tagName).toBe("A");
  expect(el.getAttribute("href")).toBe("/about");
});
