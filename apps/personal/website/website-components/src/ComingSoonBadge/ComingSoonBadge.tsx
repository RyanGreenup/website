import { comingSoonBadge } from "@rs/ryan-personal-website-design/recipes";

import type { JSX } from "solid-js";

export interface ComingSoonBadgeProps {
  /** Overrides the default "Coming Soon" label text. */
  label?: string;
}

/**
 * Badge for private or unreleased projects. Renders a purple pill with a
 * lock icon and a periodic shimmer sweep that signals exclusivity without
 * demanding attention. ARIA label communicates the full intent to screen readers.
 */
export function ComingSoonBadge(props: ComingSoonBadgeProps): JSX.Element {
  return (
    <span class={comingSoonBadge} aria-label="Private project, not yet released">
      <svg
        width="10"
        height="10"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        style="flex-shrink: 0"
      >
        <path d="M11 7V5a3 3 0 0 0-6 0v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1ZM7 5a1 1 0 1 1 2 0v2H7V5Zm1 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
      {props.label ?? "Coming Soon"}
    </span>
  );
}
