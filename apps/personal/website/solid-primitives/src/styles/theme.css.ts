// NOTE: the actual type is null, not much we can do to favour undefined
// oxlint-disable unicorn/no-null
import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalKeyframes,
} from "@vanilla-extract/css";

const toKebabCase = (stringVal: string) =>
  stringVal.replaceAll(/[A-Z]/gu, (char) => `-${char.toLowerCase()}`);

/**
 * LOCAL DEMO SKIN. NOT THE CANONICAL DESIGN SYSTEM.
 *
 * These `vars` / `tokens` re-encode a sample brand palette only so the headless
 * primitives in `exemplars/` can be shown skinned. The authoritative design
 * contract lives in the consuming design system. Do not treat these values as a
 * source of truth and do not import them from product components: bind the
 * consuming design system's `theme` contract instead. This copy exists to
 * demonstrate that the headless primitives accept any skin.
 */
export const vars = createGlobalThemeContract(
  {
    color: {
      ni: {
        charcoal: null,
        darkBlue: null,
        darkGrey: null,
        faint: null,
        gradientBlue: null,
        green: null,
        grey: null,
        midBlue: null,
        midnight: null,
        muted: null,
        offWhite: null,
        orange: null,
        overlayBlue: null,
        red: null,
        slate: null,
        trueBlue: null,
        vibrantBlue: null,
        vibrantPurple: null,
        white: null,
        yellow: null,
      },
      // oxlint-disable-next-line sort-keys
      surface: {
        "50": null,
        "100": null,
        "200": null,
        "300": null,
        "400": null,
        "500": null,
        "600": null,
        "700": null,
        "800": null,
        "900": null,
        "950": null,
      },
    },
  },
  (_value, path) => path.map((segment) => toKebabCase(segment)).join("-"),
);

createGlobalTheme(":root", vars, {
  color: {
    ni: {
      charcoal: "#242424",
      darkBlue: "#060c35",
      darkGrey: "#2d3639",
      faint: "#eaeaea",
      gradientBlue: "#170e68",
      green: "#40f033",
      grey: "#c8c8c8",
      midBlue: "#0e0e68",
      midnight: "#0f172b",
      muted: "#a4a4a4",
      offWhite: "#f2f2f2",
      orange: "#ff7300",
      overlayBlue: "#0a1133",
      red: "#e51414",
      slate: "#62748e",
      trueBlue: "#1e00be",
      vibrantBlue: "#00aaff",
      vibrantPurple: "#8232ff",
      white: "#ffffff",
      yellow: "#ffff00",
    },
    surface: {
      "100": "#ffffff",
      "200": "#ffffff",
      "300": "#ffffff",
      "400": "#ffffff",
      "50": "#ffffff",
      "500": "#ffffff",
      "600": "#ffffff",
      "700": "#ffffff",
      "800": "#ffffff",
      "900": "#ffffff",
      "950": "#ffffff",
    },
  },
});

export const tokens = createGlobalThemeContract(
  {
    aspect: {
      heroBanner: null,
      heroBannerFull: null,
    },
    breakpoint: {
      "2xl": null,
      lg: null,
      md: null,
      sm: null,
      xl: null,
    },
    container: {
      modal: null,
    },
    font: {
      helvetica: null,
      outfit: null,
    },
    fontWeight: {
      bold: null,
      light: null,
      medium: null,
      normal: null,
      semibold: null,
    },
    lineHeight: {
      "2xl": null,
      "3xl": null,
      "4xl": null,
      "5xl": null,
      "6xl": null,
      "7xl": null,
      "8xl": null,
      "9xl": null,
      base: null,
      caption: null,
      lg: null,
      md: null,
      sm: null,
      xl: null,
      xs: null,
    },
    radius: {
      accordion: null,
      card: null,
    },
    shadow: {
      accordion: null,
      card: null,
      cardSoft: null,
    },
    spacing: {
      accordion: {
        block: null,
        contentBlockEnd: null,
        contentBlockStart: null,
        contentInline: null,
        inline: null,
      },
      headerHeight: null,
    },
    text: {
      "2xl": null,
      "3xl": null,
      "4xl": null,
      "5xl": null,
      "6xl": null,
      "7xl": null,
      "8xl": null,
      "9xl": null,
      base: null,
      caption: null,
      lg: null,
      md: null,
      sm: null,
      xl: null,
      xs: null,
    },
    ui: {
      primary: null,
      secondary: null,
    },
    // oxlint-disable-next-line id-length
    z: {
      header: null,
      navContent: null,
      navDropdown: null,
      navOverlay: null,
    },
  },
  (_value, path) => path.map((segment) => toKebabCase(segment)).join("-"),
);

createGlobalTheme(":root", tokens, {
  aspect: {
    heroBanner: "1440 / 349",
    heroBannerFull: "1440 / 772",
  },
  breakpoint: {
    "2xl": "1640px",
    lg: "1080px",
    md: "768px",
    sm: "640px",
    xl: "1280px",
  },
  container: {
    modal: "51rem",
  },
  font: {
    helvetica: "Helvetica, Arial, sans-serif",
    outfit:
      "'Outfit Variable', 'Outfit', Helvetica, Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  },
  fontWeight: {
    bold: "700",
    light: "300",
    medium: "500",
    normal: "400",
    semibold: "600",
  },
  lineHeight: {
    "2xl": "1.75rem",
    "3xl": "2.1875rem",
    "4xl": "2.5rem",
    "5xl": "3.25rem",
    "6xl": "3.25rem",
    "7xl": "3.875rem",
    "8xl": "3.875rem",
    "9xl": "3.875rem",
    base: "1.125rem",
    caption: "1.0625rem",
    lg: "1.5625rem",
    md: "1.4375rem",
    sm: "1.125rem",
    xl: "1.875rem",
    xs: "1.1875rem",
  },
  radius: {
    accordion: tokens.radius.card,
    card: "10px",
  },
  shadow: {
    accordion: tokens.shadow.card,
    card: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
    cardSoft: "0px 4px 20px 0px rgba(0, 0, 0, 0.12)",
  },
  spacing: {
    accordion: {
      block: "1.8125rem",
      contentBlockEnd: "4.375rem",
      contentBlockStart: "3.125rem",
      contentInline: "3.125rem",
      inline: "2.125rem",
    },
    headerHeight: "4rem",
  },
  text: {
    "2xl": "1.5625rem",
    "3xl": "1.875rem",
    "4xl": "2.1875rem",
    "5xl": "2.5rem",
    "6xl": "2.8125rem",
    "7xl": "3.125rem",
    "8xl": "3.4375rem",
    "9xl": "3.75rem",
    base: "1rem",
    caption: "0.9375rem",
    lg: "1.25rem",
    md: "1.125rem",
    sm: "0.875rem",
    xl: "1.375rem",
    xs: "0.8125rem",
  },
  ui: {
    primary: vars.color.ni.trueBlue,
    secondary: vars.color.ni.vibrantBlue,
  },
  // oxlint-disable-next-line id-length
  z: {
    header: "40",
    navContent: "3",
    navDropdown: "1",
    navOverlay: "2",
  },
});

export const transition = "300ms ease-in-out";

globalKeyframes("slide-down", {
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" },
});

globalKeyframes("slide-up", {
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(-100%)" },
});
