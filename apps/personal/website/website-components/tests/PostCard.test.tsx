import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { formatPostDate, PostCard } from "../src";

test("formats post dates like the Astro component", () => {
  expect(formatPostDate(new Date("2026-06-09T12:00:00.000Z"))).toEqual({
    iso: "2026-06-09",
    label: "9 June 2026",
  });
});

test("renders a linked post summary with date and tags", () => {
  const screen = render(() => (
    <PostCard
      href="/blog/migration-ready-css-tokens"
      title="Migration-ready CSS tokens"
      date={new Date("2026-05-18T00:00:00.000Z")}
      description="A practical note on keeping design tokens portable while moving UI stacks."
      tags={["design", "css", "tokens"]}
    />
  ));

  const link = screen.getByRole("link", { name: /Migration-ready CSS tokens/ });
  const time = screen.getByText("18 May 2026");

  expect(link.getAttribute("href")).toBe("/blog/migration-ready-css-tokens");
  expect(time.getAttribute("datetime")).toBe("2026-05-18");
  expect(screen.getByText("A practical note on keeping design tokens portable while moving UI stacks.")).toBeTruthy();
  expect(screen.getByText("design")).toBeTruthy();
  expect(screen.getByText("css")).toBeTruthy();
  expect(screen.getByText("tokens")).toBeTruthy();
});

test("omits the tag container when tags are absent", () => {
  const screen = render(() => (
    <PostCard
      href="/blog/islands-without-the-guilt"
      title="Islands without the guilt"
      date={new Date("2026-04-02T00:00:00.000Z")}
      description="Notes on using islands sparingly for editorial sites."
    />
  ));

  expect(screen.getByRole("heading", { name: "Islands without the guilt" })).toBeTruthy();
  expect(screen.queryByText("design")).toBeNull();
});
