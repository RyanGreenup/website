// Base styles and design tokens. global.css pulls in the IBM Plex webfonts and
// the plain-CSS token layer; theme.css registers the typed role/status theme
// contract on :root so the recipes resolve their colours (and flip light/dark).
import "@rs/ryan-personal-website-design/global.css";
import "@rs/ryan-personal-website-design/theme.css";
import basePreview from "@rs/storybook/preview";

import type { Preview } from "storybook-solidjs-vite";

const preview: Preview = {
  ...basePreview,
};

export default preview;
