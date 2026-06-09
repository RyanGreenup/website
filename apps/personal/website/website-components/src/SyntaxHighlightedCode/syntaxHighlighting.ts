import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import astro from "shiki/langs/astro.mjs";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import jsx from "shiki/langs/jsx.mjs";
import json from "shiki/langs/json.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import githubDark from "shiki/themes/github-dark.mjs";
import githubLight from "shiki/themes/github-light.mjs";

export const syntaxLanguages = [
  "astro",
  "bash",
  "css",
  "html",
  "javascript",
  "js",
  "jsx",
  "json",
  "shellscript",
  "ts",
  "tsx",
  "typescript",
] as const;

export type SyntaxLanguage = (typeof syntaxLanguages)[number];

export interface HighlightCodeInput {
  code: string;
  language: SyntaxLanguage | string;
}

const highlighter = createHighlighterCore({
  langs: [astro, bash, css, html, javascript, jsx, json, shellscript, tsx, typescript],
  themes: [githubLight, githubDark],
  engine: createJavaScriptRegexEngine(),
});

export function isSyntaxLanguage(language: string): language is SyntaxLanguage {
  return syntaxLanguages.includes(language as SyntaxLanguage);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function plainCodeToHtml(code: string): string {
  return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

/**
 * Highlights code with a small Shiki bundle.
 *
 * Unsupported languages fall back to escaped plain code so consumers can pass
 * user-provided language labels without turning rendering into an exception.
 */
export async function highlightCodeToHtml(input: HighlightCodeInput): Promise<string> {
  if (!isSyntaxLanguage(input.language)) {
    return plainCodeToHtml(input.code);
  }

  return (await highlighter).codeToHtml(input.code, {
    lang: input.language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light",
    cssVariablePrefix: "--shiki-",
  });
}
