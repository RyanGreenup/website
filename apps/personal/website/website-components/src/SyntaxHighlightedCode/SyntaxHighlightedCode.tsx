import { createResource, Show } from "solid-js";

import { highlightCodeToHtml } from "./syntaxHighlighting";

import type { JSX } from "solid-js";
import type { SyntaxLanguage } from "./syntaxHighlighting";

export interface SyntaxHighlightedCodeProps {
  code: string;
  language: SyntaxLanguage | string;
}

/**
 * Async Shiki-backed code block.
 *
 * The highlighted HTML is generated from source code only. Shiki escapes token
 * text; unsupported languages render as escaped plain code via the shared
 * highlighting module.
 */
export function SyntaxHighlightedCode(props: SyntaxHighlightedCodeProps): JSX.Element {
  const [html] = createResource(
    () => ({ code: props.code, language: props.language }),
    highlightCodeToHtml,
  );

  return (
    <Show
      when={html()}
      fallback={
        <pre>
          <code>{props.code}</code>
        </pre>
      }
    >
      {(highlightedHtml) => <div innerHTML={highlightedHtml()} />}
    </Show>
  );
}
