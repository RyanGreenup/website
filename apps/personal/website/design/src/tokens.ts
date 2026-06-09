/**
 * Design token constants — single source of truth for all static values.
 *
 * Static tokens (fonts, sizes, radii, spacing, motion) are defined here as
 * TypeScript constants so VE style() and sprinkles get typed auto-complete.
 *
 * Dynamic tokens (surfaces, borders, fg, accent) remain as CSS custom
 * properties on :root because they vary between light and dark mode.
 */

export const font = {
  sans: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
  /** Alias of mono for money, rates, and deposit references (tabular numerals). */
  num: "'IBM Plex Mono', ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
} as const

/** Font weight scale. */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const textSize = {
  // 10px
  '3xs': '0.625rem',
  // 11px
  '2xs': '0.6875rem',
  // 12px
  xs: '0.75rem',
  // 13px
  sm: '0.8125rem',
  // 16px
  md: '1rem',
  // 18px
  lg: '1.125rem',
  // 20px
  xl: '1.25rem',
  // 24px
  '2xl': '1.5rem',
  // 28px
  '3xl': '1.75rem',
  // 34px
  '4xl': '2.125rem',
  // 42px, display/hero heading
  '5xl': '2.625rem',
} as const

export const leading = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.55',
  relaxed: '1.7',
  /** Mono blocks: references, code, deposit IDs. */
  mono: '1.6',
} as const

export const tracking = {
  tight: '-0.01em',
  normal: '0em',
  wide: '0.04em',
  mono: '0.02em',
} as const

export const radius = {
  none: '0',
  // 4px
  xs: '0.25rem',
  // 6px
  sm: '0.375rem',
  // 8px
  md: '0.5rem',
  // 12px
  lg: '0.75rem',
  // 16px
  xl: '1rem',
  pill: '999px',
  full: '50%',
} as const

export const space = {
  '0': '0',
  // 4px
  '1': '0.25rem',
  // 8px
  '2': '0.5rem',
  // 12px
  '3': '0.75rem',
  // 16px
  '4': '1rem',
  // 20px
  '5': '1.25rem',
  // 24px
  '6': '1.5rem',
  // 32px
  '8': '2rem',
  // 40px
  '10': '2.5rem',
  // 48px
  '12': '3rem',
  auto: 'auto',
} as const

export const duration = {
  fast: '120ms',
  base: '180ms',
  slow: '280ms',
} as const

export const ease = {
  out: 'cubic-bezier(0.2, 0, 0, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Derived transition presets

/** Elevation and focus-ring tokens. Light/dark pairs let mode-aware contracts auto-switch. */
export const shadow = {
  sm: '0 1px 3px rgba(20, 27, 32, 0.08), 0 1px 2px rgba(20, 27, 32, 0.04)',
  smDark: '0 1px 2px rgba(0, 0, 0, 0.40), 0 1px 3px rgba(0, 0, 0, 0.50)',
  md: '0 4px 12px rgba(20, 27, 32, 0.10), 0 1px 3px rgba(20, 27, 32, 0.06)',
  mdDark: '0 6px 18px rgba(0, 0, 0, 0.50), 0 1px 3px rgba(0, 0, 0, 0.40)',
  lg: '0 12px 32px rgba(20, 27, 32, 0.14), 0 4px 8px rgba(20, 27, 32, 0.06)',
  focus: '0 0 0 3px rgba(35, 80, 181, 0.40)',
  focusDark: '0 0 0 3px rgba(156, 192, 255, 0.45)',
} as const

export const transition = {
  none: 'none',
  fast: `background-color ${duration.fast} ${ease.out}, color ${duration.fast} ${ease.out}, border-color ${duration.fast} ${ease.out}, box-shadow ${duration.fast} ${ease.out}, transform ${duration.fast} ${ease.out}, opacity ${duration.fast} ${ease.out}`,
  base: `background-color ${duration.base} ${ease.out}, color ${duration.base} ${ease.out}, border-color ${duration.base} ${ease.out}, box-shadow ${duration.base} ${ease.out}, transform ${duration.base} ${ease.out}, opacity ${duration.base} ${ease.out}`,
  slow: `background-color ${duration.slow} ${ease.out}, color ${duration.slow} ${ease.out}, border-color ${duration.slow} ${ease.out}, box-shadow ${duration.slow} ${ease.out}, transform ${duration.slow} ${ease.out}, opacity ${duration.slow} ${ease.out}`,
  colors: `background-color ${duration.fast} ${ease.out}, color ${duration.fast} ${ease.out}, border-color ${duration.fast} ${ease.out}`,
  transform: `transform ${duration.base} ${ease.out}`,
} as const

/**
 * Responsive breakpoints — the single source of truth for the width at which the
 * desktop layout takes over (sidebar becomes a static column; SplitGrid expands
 * from a stacked column into main + rail). The app shell and the SplitGrid recipe
 * both read this so they collapse at the same width by construction.
 */
export const breakpoint = {
  // 1024px — desktop layout (sidebar + rail) takes over.
  desktop: '1024px',
} as const
