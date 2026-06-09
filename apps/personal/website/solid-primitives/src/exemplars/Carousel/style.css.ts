import { globalStyle, style } from "@vanilla-extract/css";

import { tokens, vars } from "../../styles/theme.css";

/**
 * The exemplar mirrors the primitive's supported CSS selector range for
 * zero-based carousel slide states.
 */
const INDICATOR_INDEX_ZERO = 0;

/**
 * The second zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_ONE = 1;

/**
 * The third zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_TWO = 2;

/**
 * The fourth zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_THREE = 3;

/**
 * The fifth zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_FOUR = 4;

/**
 * The sixth zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_FIVE = 5;

/**
 * The seventh zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_SIX = 6;

/**
 * The eighth zero-based slide index used by generated active indicator CSS.
 */
const INDICATOR_INDEX_SEVEN = 7;

const activeIndicatorSelectors = [
  INDICATOR_INDEX_ZERO,
  INDICATOR_INDEX_ONE,
  INDICATOR_INDEX_TWO,
  INDICATOR_INDEX_THREE,
  INDICATOR_INDEX_FOUR,
  INDICATOR_INDEX_FIVE,
  INDICATOR_INDEX_SIX,
  INDICATOR_INDEX_SEVEN,
] as const;

export const carousel = style({
  background: vars.color.ni.white,
  border: `1px solid ${vars.color.ni.grey}`,
  borderRadius: tokens.radius.card,
  boxShadow: "0 18px 48px rgb(15 23 42 / 14%)",
  maxWidth: "42rem",
  overflow: "hidden",
  padding: "0.75rem",
});

globalStyle(`${carousel} [data-carousel-viewport]`, {
  borderRadius: "calc(0.5rem - 2px)",
});

globalStyle(`${carousel} [data-carousel-item]`, {
  aspectRatio: "16 / 10",
  background: vars.color.ni.offWhite,
});

globalStyle(`${carousel} img`, {
  display: "block",
});

globalStyle(`${carousel} [data-carousel-control]`, {
  alignItems: "center",
  background: "rgb(255 255 255 / 88%)",
  border: `1px solid ${vars.color.ni.grey}`,
  borderRadius: "999px",
  boxShadow: "0 12px 26px rgb(15 23 42 / 18%)",
  color: vars.color.ni.darkBlue,
  display: "inline-flex",
  fontFamily: tokens.font.outfit,
  fontSize: "0",
  justifyContent: "center",
  marginRight: "1rem",
  transition: "background-color 160ms ease, opacity 180ms ease, transform 160ms ease",
});

globalStyle(`${carousel} [data-carousel-side="previous"]`, {
  marginLeft: "1rem",
});

globalStyle(`${carousel} [data-carousel-side="next"]`, {
  marginRight: "1rem",
});

globalStyle(`${carousel} [data-carousel-side="previous"]::after`, {
  content: '"‹"',
  fontSize: "1.75rem",
  lineHeight: 1,
  marginTop: "-0.125rem",
});

globalStyle(`${carousel} [data-carousel-side="next"]::after`, {
  content: '"›"',
  fontSize: "1.75rem",
  lineHeight: 1,
  marginTop: "-0.125rem",
});

globalStyle(`${carousel} [data-carousel-control]:hover`, {
  background: vars.color.ni.white,
});

globalStyle(`${carousel} [data-carousel-side="previous"]:hover`, {
  transform: "translateY(-50%) translateX(-2px)",
});

globalStyle(`${carousel} [data-carousel-side="next"]:hover`, {
  transform: "translateY(-50%) translateX(2px)",
});

globalStyle(`${carousel} [data-carousel-control][data-carousel-disabled]`, {
  opacity: "0 !important",
});

globalStyle(`${carousel} [data-carousel-indicator]`, {
  alignItems: "center",
  background: vars.color.ni.offWhite,
  border: `1px solid ${vars.color.ni.grey}`,
  borderRadius: "999px",
  color: vars.color.ni.muted,
  display: "inline-flex",
  fontFamily: tokens.font.outfit,
  fontSize: tokens.text.sm,
  fontWeight: 700,
  justifyContent: "center",
  transition: "background-color 160ms ease, color 160ms ease, transform 160ms ease",
});

globalStyle(`${carousel} [data-carousel-indicator]:hover`, {
  color: vars.color.ni.darkBlue,
  transform: "translateY(-1px)",
});

for (const index of activeIndicatorSelectors) {
  globalStyle(`${carousel}:has(input[value="${index}"]:checked) [data-carousel-index="${index}"]`, {
    background: vars.color.ni.darkBlue,
    color: vars.color.ni.white,
  });
}
