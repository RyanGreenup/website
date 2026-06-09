import { button } from "@rs/ryan-personal-website-design/recipes";

import type { JSX } from "solid-js";

export interface ButtonProps {
  /** Visual treatment. Maps directly to the design system `button` recipe. */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "link";
  /** Control height and padding. */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the available inline space. */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  /** When set, the control renders as a navigable `<a>` instead of a `<button>`. */
  href?: string;
  onClick?: (event: MouseEvent) => void;
  children?: JSX.Element;
}

/**
 * The website's primary action control.
 *
 * All styling is owned by the design system's `button` recipe, so every variant
 * flips light and dark automatically and no colour is hard-coded here. Importing
 * the recipe also registers the design theme contract on `:root`, so the button
 * is themed wherever it renders. Pass `href` to render a navigable anchor (the
 * call-to-action pattern the old component library conveyed).
 */
export function Button(props: ButtonProps): JSX.Element {
  const className = (): string =>
    button({ variant: props.variant, size: props.size, fullWidth: props.fullWidth });

  if (props.href !== undefined) {
    return (
      <a class={className()} href={props.href} onClick={props.onClick}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      class={className()}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
