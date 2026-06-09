import { style } from "@vanilla-extract/css";

import { tokens, vars } from "../../styles/theme.css";

const colors = vars.color.ni;

// Light themed styling layered over the behavioural Button primitive.
export const button = style({
  backgroundColor: tokens.ui.primary,
  border: "none",
  borderRadius: tokens.radius.card,
  color: colors.white,
  fontFamily: tokens.font.outfit,
  fontSize: tokens.text.base,
  fontWeight: 600,
  padding: "0.5rem 1rem",
  selectors: {
    "&:active": {
      backgroundColor: colors.darkBlue,
    },
    "&:disabled": {
      backgroundColor: colors.muted,
    },
    "&:hover:not(:disabled)": {
      backgroundColor: colors.midBlue,
    },
  },
  transition: "background-color 150ms ease",
});
