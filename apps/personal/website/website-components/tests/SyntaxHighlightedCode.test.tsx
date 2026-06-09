import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { SyntaxHighlightedCode } from "../src";
import { highlightCodeToHtml, plainCodeToHtml } from "../src/SyntaxHighlightedCode/syntaxHighlighting";

test("highlights supported code with Shiki dual-theme variables", async () => {
  const html = await highlightCodeToHtml({
    code: "const value = 1;",
    language: "typescript",
  });

  expect(html).toContain("shiki");
  expect(html).toContain("--shiki-dark");
  expect(html).toContain("value");
});

test("escapes unsupported plain code", () => {
  const html = plainCodeToHtml("<script>alert('x')</script>");
  expect(html).toContain("&lt;script&gt;");
  expect(html).not.toContain("<script>");
});

test("renders a code block fallback while highlighting loads", () => {
  const screen = render(() => (
    <SyntaxHighlightedCode code="const immediate = true;" language="typescript" />
  ));

  expect(screen.getByText("const immediate = true;")).toBeTruthy();
});
