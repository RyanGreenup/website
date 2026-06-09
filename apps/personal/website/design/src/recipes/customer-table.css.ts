import { globalStyle, style } from '@vanilla-extract/css'

import { font, space, textSize, tracking } from '../tokens'
import { vars } from '../theme.css'

/**
 * CustomerTable recipes -- the home "Recent transfers" table. A read-only
 * customer view of the shared `VirtualizedDataTable` primitive (no checkboxes,
 * no filter chips, no popover -- that machinery is the admin `TransferTable` variant).
 *
 * The primitive ships only structural CSS and emits `data-part` hooks
 * (`root`, `scroll`, `header`, `header-row`, `header-cell`, `body`, `row`,
 * `cell`). This recipe themes those parts via scoped `globalStyle` under the
 * `customerTable` root class, so the component authors **zero CSS**. The cell
 * renderers in the component use the exported helper classes (`numCell`,
 * `rateCell`, `monoCell`, `thRight`).
 *
 * Contract discipline: every colour reads `vars.roles.*` -- no hard-coded hex.
 * Mode-invariant values (font, spacing, type, tracking) come from `tokens.ts`.
 * Off-grid hi-fi geometry (14px / 13px / 11px insets) has no exact space token,
 * so it uses bare-px literals with a `// hi-fi spec` comment (the stat /
 * quote-card precedent for off-grid values).
 */

// ---------------------------------------------------------------------------
// customerTable -- root class passed to <VirtualizedDataTable class={…}>
// ---------------------------------------------------------------------------

/**
 * Root container theming. The `.tablecard` wrapper in the hi-fi pads the table
 * and allows horizontal overflow; here the consumer wraps the primitive in its
 * own bounded scroll region, so the root just carries the body type baseline.
 */
export const customerTable = style({
  fontFamily: font.sans,
  fontSize: textSize.sm,
  color: vars.roles.fg.base,
})

// ---------------------------------------------------------------------------
// header -- sticky header band + its cells
// ---------------------------------------------------------------------------

/** Header band: surface bg (so sticky rows don't bleed through) + hairline. */
globalStyle(`${customerTable} [data-part="header"]`, {
  background: vars.roles.bg.surface,
  borderBottom: `1px solid ${vars.roles.border.base}`,
})

/**
 * Header th: semibold text-xs sans, tracking-wide, uppercase, fg.subtle,
 * left-aligned, nowrap. Hi-fi inset `0 14px 11px`.
 */
globalStyle(`${customerTable} [data-part="header-cell"]`, {
  fontSize: textSize.xs,
  fontWeight: '600',
  letterSpacing: tracking.wide,
  textTransform: 'uppercase',
  color: vars.roles.fg.subtle,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  padding: '0 14px 11px', // hi-fi spec -- no 14px/11px token; literal px
})

// ---------------------------------------------------------------------------
// body -- rows + cells
// ---------------------------------------------------------------------------

/**
 * Body cell theming. Cells read `fg.base`, take the hi-fi inset `13px 14px`,
 * carry a faint slate-100 row divider, and align middle vertically.
 */
globalStyle(`${customerTable} [data-part="cell"]`, {
  display: 'flex',
  alignItems: 'center',
  color: vars.roles.fg.base,
  padding: '13px 14px', // hi-fi spec -- no 13px/14px token; literal px
  whiteSpace: 'nowrap',
})

// Per-row bottom border. NOTE: a `:last-child { border: none }` reset is
// intentionally NOT used -- under virtualization the DOM-last row is the last
// row of the current WINDOW (translateY positioning + overscan), not the last
// data row, so `:last-child` would strip the border from an arbitrary middle
// row as the user scrolls. Per-row borders are correct for a windowed table.
/** Row divider (slate-100 light) + nearest hover bg (slate-50). */
globalStyle(`${customerTable} [data-part="row"]`, {
  borderBottom: `1px solid ${vars.roles.border.subtle}`,
})

// Gate hover behind `@media (hover: hover)` so touch devices don't get a
// sticky highlight stuck on the last-tapped row (matches the hi-fi).
globalStyle(`${customerTable} [data-part="row"]:hover`, {
  '@media': {
    '(hover: hover)': {
      background: vars.roles.bg.app,
    },
  },
})

// ---------------------------------------------------------------------------
// cell helper classes -- applied inside the column cell/header renderers
// ---------------------------------------------------------------------------

// Shared mono tabular-nums base for the amount / rate / date cells -- composed
// into the exported helpers below (not exported itself, so it never reads as an
// orphan recipe export).
const monoCell = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
})

/**
 * Date cell: plain mono tabular-nums with NO colour override -- inherits the
 * cell's `fg.base`. Only the Rate column is muted in the hi-fi; the Date is
 * base foreground.
 */
export const dateCell = style([monoCell, { whiteSpace: 'nowrap' }])

/** Amount cell: mono tabular-nums, semibold, right-aligned, nowrap. */
export const numCell = style([
  monoCell,
  {
    fontWeight: '600',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    width: '100%',
  },
])

/** Rate cell: mono tabular-nums, muted fg, nowrap. */
export const rateCell = style([
  monoCell,
  {
    color: vars.roles.fg.muted,
    whiteSpace: 'nowrap',
  },
])

/** Right-aligned header label (pairs with the right-aligned amount column). */
export const thRight = style({
  textAlign: 'right',
  width: '100%',
})

// ---------------------------------------------------------------------------
// region -- the consumer's a11y scroll wrapper around the primitive
// ---------------------------------------------------------------------------

/**
 * Bounded scroll region (`role="region"`). Gives the virtualizer a measured
 * height so windowing works, and pads/overflows like the hi-fi `.tablecard`.
 */
export const customerTableRegion = style({
  height: '100%',
  overflowX: 'auto',
  padding: `${space['2']} ${space['2']} ${space['1']}`, // hi-fi .tablecard 8px 8px 4px
})
