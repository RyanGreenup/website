import { style } from '@vanilla-extract/css'

import { font, radius, space, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * RateChart recipes — the chrome around the home "AUD → NPR 30-day rate trend"
 * ECharts area chart (the `.chart*` block from the hi-fi styles.css).
 *
 * Two concerns live here:
 *
 *   1. **Chrome `style()` parts** — the relative container, the absolutely
 *      positioned "now" pill, the start/end scale and the custom legend with
 *      its line swatches. All colours flow through `vars.*` (no hard-coded hex);
 *      the `#fff` now-pill text maps to `vars.roles.brand.onPrimary`.
 *
 *   2. **`rateChartColors`** — a PLAIN object holding the one chart *series*
 *      colour (`line`) as a `vars.*` var-string (e.g.
 *      `"var(--roles-brand-primary)"`). The ECharts `<AreaChart>` paints onto a
 *      canvas, which cannot consume a CSS `var(...)` reference directly, so the
 *      component bridges it at runtime with `resolveCssColor(...)` from
 *      `@impress/echarts-charts`. Keeping the colour here (as `vars.*`) means the
 *      recipe stays the single source of truth and the component imports zero hex
 *      and no `@vanilla-extract/*`. The area-fill, gridline and axis colours are
 *      left to the chart library's defaults — `AreaChart` exposes no per-instance
 *      props to override them — and the alert threshold is surfaced through the
 *      legend swatch + aria-label rather than a chart markLine, so only the
 *      series line colour is contract-bridged.
 *
 * Several geometry values are off the 4px grid (14/7/18/3/2px) — they are bare
 * px literals with a spec comment, matching the stat / quote-card / stat-bar
 * off-grid precedent. Font weights are CSS literals (no weight token).
 */

const SEMIBOLD = '600'
const REGULAR = '400'

// ---------------------------------------------------------------------------
// Series colour bridged to the ECharts canvas via resolveCssColor (runtime).
// Plain value object — NOT a vanilla-extract recipe. The value is the typed
// contract var-string, so the canvas series stays in lockstep with the theme.
// ---------------------------------------------------------------------------

export const rateChartColors = {
  /** Live-rate series line (the only chart colour AreaChart lets us set). */
  line: vars.roles.brand.primary,
} as const

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

/** Relative container the now-pill is absolutely positioned within. */
export const rateChart = style({
  position: 'relative',
  marginTop: '14px', // hi-fi spec — off-grid (12px < 14px < 16px); literal px
})

/**
 * The "now" pill: brand-primary chip, on-primary text, mono tabular-nums
 * semibold, radius-sm, pinned top-right of the chart.
 */
export const rateChartNow = style({
  position: 'absolute',
  right: 0,
  top: '-4px', // hi-fi spec — off-grid nudge above the chart top
  padding: '2px 8px', // hi-fi spec — off-grid vertical inset; 8px == space-2
  borderRadius: radius.sm,
  background: vars.roles.brand.primary,
  color: vars.roles.brand.onPrimary,
  fontFamily: font.mono,
  fontSize: textSize.xs,
  fontWeight: SEMIBOLD,
  fontVariantNumeric: 'tabular-nums',
})

/** The start/end scale below the chart (e.g. "30 days ago" ↔ "Today"). */
export const rateChartScale = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: space['2'], // 8px
  fontFamily: font.sans,
  fontSize: textSize['2xs'],
  fontWeight: REGULAR,
  color: vars.roles.fg.subtle,
})

/** The custom legend row (Live rate + optional alert). */
export const rateChartLegend = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: space['4'], // 16px
  marginTop: '14px', // hi-fi spec — off-grid (12px < 14px < 16px); literal px
  fontFamily: font.sans,
  fontSize: textSize.xs,
  fontWeight: REGULAR,
  color: vars.roles.fg.muted,
})

/** A single legend item — swatch + label, inline-flex with a small gap. */
export const rateChartLegendItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px', // hi-fi spec — off-grid swatch↔label gap; literal px
})

/** The live-rate swatch: a 18px solid brand-primary line. */
export const rateChartSwatch = style({
  width: '18px', // hi-fi spec — off-grid swatch width; literal px
  height: 0,
  borderTop: `3px solid ${vars.roles.brand.primary}`, // 3px off-grid line weight
  borderRadius: '2px', // hi-fi spec — off-grid swatch rounding; literal px
})

/** The alert swatch: the same line, dashed and in promo.base. */
export const rateChartSwatchAlert = style({
  width: '18px', // hi-fi spec — off-grid swatch width; literal px
  height: 0,
  borderTop: `3px dashed ${vars.status.promo.base}`, // 3px off-grid line weight
  borderRadius: '2px', // hi-fi spec — off-grid swatch rounding; literal px
})

/** Fixed height for the ECharts container (keeps the hi-fi 640×200 ratio). */
export const rateChartCanvas = style({
  width: '100%',
  height: '200px', // hi-fi spec — chart viewport height (640×200 source aspect)
})
