/**
 * Table recipe for the admin transaction table organism.
 *
 * This file holds every part of the admin TransferTable toolbar and
 * FilterPopover. The toolbar parts are `tableContainer` (outermost wrapper),
 * `tableToolbar` (flex toolbar of search plus filter chips), `tableSearch` (a
 * compact inline search input, not the labeled Field), `tableSearchIcon` (the
 * leading icon inside `tableSearch`), and `tableFilterChip` (an active-filter
 * chip in the toolbar). The header and cell parts are `tableHeaderCell` (the
 * inner flex container of a `<th>`, class `.hc`), `tableHeaderLabel` (column
 * label, class `.hl`), `tableSortButton` (sort mini-button, class `.sx`, with an
 * `active` variant), `tableFilterButton` (filter mini-button, class `.fx`, with
 * an `active` variant), `tableFilterPip` (active-filter indicator dot, class
 * `.pip`), and `tableCell` (a `<td>` with a `mono` variant). The popover parts
 * are `filterPopover` (floating column-filter panel, class `.pop`),
 * `popoverHeader` (header row, class `.ph`), `popoverTitle` (title text, class
 * `.t`), `popoverClear` (the "Clear" link, class `.clr`), `popoverOption`
 * (option row, class `.opt`), `popoverCheckbox` (visual checkbox, class `.cbx`,
 * with a `checked` variant), and `popoverFooter` (footer row with Reset and
 * Apply buttons, class `.pf`).
 *
 * There is no hard-coded hex. Mode-invariant values use tokens and colours use
 * `vars.roles.*`. Off-grid design-spec sizes (20px, 15px, 32px, 28px, 6px) use
 * literal strings with `// design spec` comments.
 */

import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize, tracking, transition } from '../tokens'
import { vars } from '../theme.css'

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export const tableContainer = style({
  position: 'relative',
  width: '100%',
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  background: vars.roles.bg.surface,
  fontSize: textSize.sm,
  overflow: 'hidden',
})

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

export const tableToolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['2'],
  padding: `9px 12px`, // design spec: 9px top/bottom, 12px left/right
  borderBottom: `1px solid ${vars.roles.border.base}`,
  background: vars.roles.bg.app,
  borderRadius: `${radius.lg} ${radius.lg} 0 0`,
})

// ---------------------------------------------------------------------------
// Search input — dedicated inline icon-input (NOT the labeled Field block)
// ---------------------------------------------------------------------------

export const tableSearch = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: '7px', // design spec
  height: '32px', // design spec
  padding: `0 ${space['3']}`,
  border: `1px solid ${vars.roles.border.strong}`,
  borderRadius: radius.md,
  background: vars.roles.bg.surface,
  color: vars.roles.fg.subtle,
  fontFamily: font.sans,
  fontSize: textSize.xs,
  transition: transition.fast,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.roles.brand.primary,
      boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
    },
    '&::placeholder': {
      color: vars.roles.fg.subtle,
    },
  },
})

export const tableSearchIcon = style({
  width: '14px', // design spec
  height: '14px', // design spec
  flexShrink: 0,
  pointerEvents: 'none',
})

// ---------------------------------------------------------------------------
// Filter chip in toolbar
// ---------------------------------------------------------------------------

export const tableFilterChip = style({
  // Reset browser <button> defaults; individual props below override shorthand.
  font: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  gap: space['1'],
  padding: `${space['1']} ${space['2']}`,
  background: vars.roles.brand.primarySubtle,
  border: `1px solid ${vars.roles.brand.primaryBorder}`,
  borderRadius: radius.sm,
  color: vars.roles.brand.primaryActive,
  fontSize: textSize['2xs'],
  fontWeight: '600',
  fontFamily: font.sans,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
})

// ---------------------------------------------------------------------------
// Header cell
// ---------------------------------------------------------------------------

export const tableHeaderCell = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px', // design spec
  padding: `7px 12px`, // design spec
  cursor: 'pointer',
  userSelect: 'none',
  transition: transition.fast,
  selectors: {
    '&:hover': {
      background: vars.roles.border.subtle,
    },
  },
})

export const tableHeaderLabel = style({
  fontSize: textSize['2xs'],
  fontWeight: '600',
  fontFamily: font.sans,
  color: vars.roles.fg.subtle,
  textTransform: 'uppercase',
  letterSpacing: tracking.wide,
  flex: 1,
})

// ---------------------------------------------------------------------------
// Sort mini-button
// ---------------------------------------------------------------------------

export const tableSortButton = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px', // design spec
    height: '20px', // design spec
    borderRadius: '5px', // design spec
    color: vars.roles.fg.faint,
    border: '1px solid transparent',
    background: 'transparent',
    padding: '0',
    cursor: 'pointer',
    transition: transition.fast,
    flexShrink: 0,
    selectors: {
      '&:hover': {
        color: vars.roles.fg.muted,
      },
    },
  },
  variants: {
    active: {
      true: {
        color: vars.roles.brand.primary,
        background: vars.roles.brand.primarySubtle,
      },
      false: {},
    },
  },
  defaultVariants: { active: false },
})

// ---------------------------------------------------------------------------
// Filter mini-button
// ---------------------------------------------------------------------------

export const tableFilterButton = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px', // design spec
    height: '20px', // design spec
    borderRadius: '5px', // design spec
    color: vars.roles.fg.faint,
    border: '1px solid transparent',
    background: 'transparent',
    padding: '0',
    cursor: 'pointer',
    transition: transition.fast,
    flexShrink: 0,
    selectors: {
      '&:hover': {
        color: vars.roles.fg.muted,
      },
    },
  },
  variants: {
    active: {
      true: {
        color: vars.roles.brand.primary,
        background: vars.roles.brand.primarySubtle,
        borderColor: vars.roles.brand.primaryBorder,
      },
      false: {},
    },
  },
  defaultVariants: { active: false },
})

export const tableFilterPip = style({
  position: 'absolute',
  top: '-2px', // design spec
  right: '-2px', // design spec
  width: '6px', // design spec
  height: '6px', // design spec
  borderRadius: radius.full,
  background: vars.roles.brand.primary,
  border: `1px solid ${vars.roles.bg.surface}`,
})

// ---------------------------------------------------------------------------
// Table cell
// ---------------------------------------------------------------------------

export const tableCell = recipe({
  base: {
    padding: `9px 12px`, // design spec
    borderBottom: `1px solid ${vars.roles.border.subtle}`,
    color: vars.roles.fg.base,
    fontFamily: font.sans,
    fontSize: textSize.sm,
    verticalAlign: 'middle',
    selectors: {
      'tr:last-child &': {
        borderBottom: 'none',
      },
    },
  },
  variants: {
    mono: {
      true: {
        fontFamily: font.mono,
        fontVariantNumeric: 'tabular-nums',
      },
      false: {},
    },
  },
  defaultVariants: { mono: false },
})

// ---------------------------------------------------------------------------
// Filter popover
// ---------------------------------------------------------------------------

export const filterPopover = style({
  position: 'absolute',
  top: '42px', // design spec: below toolbar
  right: '10px', // design spec
  width: '206px', // design spec
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  boxShadow: shadow.lg,
  zIndex: 5,
  overflow: 'hidden',
})

export const popoverHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `9px 12px`, // design spec
  borderBottom: `1px solid ${vars.roles.border.base}`,
})

export const popoverTitle = style({
  fontFamily: font.sans,
  fontSize: textSize.xs,
  fontWeight: '600',
  color: vars.roles.fg.base,
})

export const popoverClear = style({
  fontFamily: font.sans,
  fontSize: textSize['2xs'],
  fontWeight: '600',
  color: vars.roles.brand.primary,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0',
  transition: transition.fast,
  selectors: {
    '&:hover': {
      color: vars.roles.brand.primaryHover,
    },
  },
})

export const popoverOption = style({
  display: 'flex',
  alignItems: 'center',
  gap: '9px', // design spec
  padding: `7px 12px`, // design spec
  fontSize: textSize.xs,
  fontFamily: font.sans,
  cursor: 'pointer',
  transition: transition.fast,
  selectors: {
    '&:hover': {
      background: vars.roles.bg.app,
    },
  },
})

export const popoverCheckbox = recipe({
  base: {
    width: '15px', // design spec
    height: '15px', // design spec
    borderRadius: radius.xs,
    border: `1.5px solid ${vars.roles.border.strong}`, // design spec: 1.5px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: vars.roles.bg.surface,
    flexShrink: 0,
    transition: transition.fast,
    cursor: 'pointer',
    background: vars.roles.bg.surface,
    padding: '0',
  },
  variants: {
    checked: {
      true: {
        background: vars.roles.brand.primary,
        borderColor: vars.roles.brand.primary,
        color: vars.roles.brand.onPrimary,
      },
      false: {},
    },
  },
  defaultVariants: { checked: false },
})

export const popoverFooter = style({
  display: 'flex',
  gap: '7px', // design spec
  padding: `9px 12px`, // design spec
  borderTop: `1px solid ${vars.roles.border.base}`,
})

// ---------------------------------------------------------------------------
// Extracted inline styles — moved from component files
// ---------------------------------------------------------------------------

/** Applied to <table> to replace the former inline width/border-collapse. */
export const tableElement = style({
  width: '100%',
  borderCollapse: 'collapse',
})

/** Applied to each <th> to replace the former inline text-align/padding reset. */
export const tableHeaderTh = style({
  textAlign: 'left',
  padding: '0',
})

/** Applied to the status-badge wrapper <span> — replaces inline display:inline-flex. */
export const tableBadgeCell = style({
  display: 'inline-flex',
})

/** Applied to each footer button wrapper <span> — gives it a real box with flex:1. */
export const popoverFooterButton = style({
  flex: '1',
  minWidth: '0',
})
