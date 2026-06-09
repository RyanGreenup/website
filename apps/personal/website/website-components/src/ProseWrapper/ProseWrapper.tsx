import { prose } from "@rs/ryan-personal-website-design/recipes";

import type { JSX } from "solid-js";

export interface ProseWrapperProps {
  children?: JSX.Element;
}

/**
 * Reading-column wrapper for rendered Markdown and long-form content.
 *
 * Descendant typography is owned by the design system's `prose` recipe, which
 * mirrors the lifted Astro wrapper's markdown-oriented global element rules.
 */
export function ProseWrapper(props: ProseWrapperProps): JSX.Element {
  return <div class={prose}>{props.children}</div>;
}
