import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { ProjectCard } from "../src";

test("renders project content, note, and tech tags", () => {
  const screen = render(() => (
    <ProjectCard
      title="Personal Website"
      description="A fast editorial portfolio."
      tech={["Astro", "SolidJS"]}
      note="Production"
    />
  ));

  expect(screen.getByRole("heading", { name: "Personal Website" })).toBeTruthy();
  expect(screen.getByText("A fast editorial portfolio.")).toBeTruthy();
  expect(screen.getByText("Production")).toBeTruthy();
  expect(screen.getByText("Astro")).toBeTruthy();
  expect(screen.getByText("SolidJS")).toBeTruthy();
});

test("renders source and live links when provided", () => {
  const screen = render(() => (
    <ProjectCard
      title="Project"
      description="Project description."
      tech={["TypeScript"]}
      github="https://github.com/example/project"
      live="https://example.com"
    />
  ));

  const source = screen.getByRole("link", { name: "Source" });
  const live = screen.getByRole("link", { name: "Live" });

  expect(source.getAttribute("href")).toBe("https://github.com/example/project");
  expect(live.getAttribute("href")).toBe("https://example.com");
});
