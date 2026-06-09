import katex, { type KatexOptions } from "katex";
import "katex/dist/katex.min.css";
import { createMemo, type JSX } from "solid-js";

type StrictOption = NonNullable<KatexOptions["strict"]>;

type SupportedKatexOptions = Pick<
  KatexOptions,
  | "displayMode"
  | "errorColor"
  | "fleqn"
  | "leqno"
  | "macros"
  | "maxSize"
  | "output"
  | "strict"
  | "throwOnError"
>;

export interface MathTexProps extends SupportedKatexOptions {
  /** TeX expression to render, without surrounding dollar delimiters. */
  tex: string;
  class?: string;
}

interface RenderResult {
  html?: string;
  error?: string;
}

const defaultStrict: StrictOption = (errorCode) =>
  errorCode === "newLineInDisplayMode" ? "ignore" : "warn";

function renderMathTex(props: MathTexProps): RenderResult {
  try {
    return {
      html: katex.renderToString(props.tex, {
        displayMode: props.displayMode,
        errorColor: props.errorColor,
        fleqn: props.fleqn,
        leqno: props.leqno,
        macros: props.macros,
        maxSize: props.maxSize,
        output: props.output,
        strict: props.strict ?? defaultStrict,
        throwOnError: props.throwOnError ?? false,
      }),
    };
  } catch (error) {
    if (error instanceof katex.ParseError) {
      return { error: error.message };
    }

    throw error;
  }
}

/**
 * Render a TeX expression using KaTeX.
 *
 * Invalid input is non-fatal by default (`throwOnError: false`), matching
 * KaTeX's authoring-friendly mode while still allowing stricter usage.
 */
export function MathTex(props: MathTexProps): JSX.Element {
  const result = createMemo<RenderResult>(() => renderMathTex(props));

  if (props.displayMode === true) {
    return (
      <div class={props.class} aria-invalid={result().error !== undefined}>
        {result().html !== undefined ? (
          <div innerHTML={result().html} />
        ) : (
          <code>{result().error}</code>
        )}
      </div>
    );
  }

  return (
    <span class={props.class} aria-invalid={result().error !== undefined}>
      {result().html !== undefined ? (
        <span innerHTML={result().html} />
      ) : (
        <code>{result().error}</code>
      )}
    </span>
  );
}
