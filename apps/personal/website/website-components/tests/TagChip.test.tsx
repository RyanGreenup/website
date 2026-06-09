import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { TagChip } from "../src";

test("renders a tag chip with its label and a recipe class", () => {
  const screen = render(() => <TagChip label="TypeScript" />);
  const el = screen.getByText("TypeScript");
  expect(el.tagName).toBe("SPAN");
  expect(el.className.length).toBeGreaterThan(0);
});

test("renders variant and mono combinations", () => {
  const screen = render(() => <TagChip label="SolidJS" mono variant="brand" />);
  const el = screen.getByText("SolidJS");
  expect(el.className.length).toBeGreaterThan(0);
});
