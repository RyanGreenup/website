import { chip } from "@rs/ryan-personal-website-design/recipes";

import type { JSX } from "solid-js";

export interface TagChipProps {
  label: string;
  /** Mono renders the chip in IBM Plex Mono for tech tags. */
  mono?: boolean;
  /** Visual treatment. Maps to the design system `chip` tone. */
  variant?: "default" | "brand" | "accent";
}

/**
 * Small non-interactive tag chip used for technology tags and content metadata.
 *
 * Styling is owned by the design system's `chip` recipe, preserving the lifted
 * Astro component contract while using typed design tokens and theme roles.
 */
export function TagChip(props: TagChipProps): JSX.Element {
  const className = (): string => chip({ tone: props.variant, mono: props.mono });

  return <span class={className()}>{props.label}</span>;
}
