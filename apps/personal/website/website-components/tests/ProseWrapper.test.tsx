import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { ProseWrapper } from "../src";

test("renders long-form children inside a recipe class", () => {
  const screen = render(() => (
    <ProseWrapper>
      <h2>Long-form heading</h2>
      <p>
        Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit.
      </p>
    </ProseWrapper>
  ));

  const heading = screen.getByRole("heading", { name: "Long-form heading" });
  const paragraph = screen.getByText(/Lorem ipsum/);

  expect(heading).toBeTruthy();
  expect(paragraph.parentElement?.className.length).toBeGreaterThan(0);
});

test("renders links, lists, blockquotes, code, and tables", () => {
  const screen = render(() => (
    <ProseWrapper>
      <p>
        Read the <a href="/notes">notes</a>.
      </p>
      <ul>
        <li>First point</li>
      </ul>
      <blockquote>Useful quoted context.</blockquote>
      <pre>
        <code>const value = 1;</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Example</td>
          </tr>
        </tbody>
      </table>
    </ProseWrapper>
  ));

  expect(screen.getByRole("link", { name: "notes" }).getAttribute("href")).toBe("/notes");
  expect(screen.getByText("First point")).toBeTruthy();
  expect(screen.getByText("Useful quoted context.")).toBeTruthy();
  expect(screen.getByText("const value = 1;")).toBeTruthy();
  expect(screen.getByRole("cell", { name: "Example" })).toBeTruthy();
});
