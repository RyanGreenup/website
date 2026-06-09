import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * Checklist recipes render a verification checklist of pass and wait rows.
 *
 * The `base` slot carries only mode-invariant tokens (radius, spacing, font,
 * shadow). All colours come from the typed theme contract (`vars.roles.*` and
 * `vars.status.*`), so light and dark flip automatically with no hard-coded hex.
 *
 * The set has six parts. `checklistContainer` is the outer card wrapper
 * (border, radius, shadow). `checklistHeader` is the optional header row (bg,
 * border-bottom, label). `checklistRow` is each item row (flex, gap, padding,
 * border-bottom). `checklistIconDisc` is the 22px circle disc holding the status
 * icon, with the variants `pass` and `wait`. `checklistRowText` is the item
 * label text. `checklistRowStatus` is the trailing status label, with the
 * variants `pass` and `wait`.
 */

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

/** The outer card wrapper. */
export const checklistContainer = style({
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  overflow: 'hidden',
  boxShadow: shadow.sm,
})

// ---------------------------------------------------------------------------
// List reset
// ---------------------------------------------------------------------------

/**
 * Plain `<ul>` reset — removes browser list margins/padding/bullets.
 * Applied via `class` on the `<ul>` so component authors emit zero inline CSS.
 */
export const checklistList = style({
  margin: '0',
  padding: '0',
  listStyle: 'none',
})

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

/** Optional header row — slate-50 bg, border-bottom, 12px weight-600 muted label. */
export const checklistHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['2'],
  padding: `${space['3']} ${space['4']}`, // space['3'] = 12px — nearest token to 10px
  background: vars.roles.bg.app,
  borderBottom: `1px solid ${vars.roles.border.base}`,
  fontFamily: font.sans,
  fontSize: textSize.xs,
  fontWeight: '600',
  color: vars.roles.fg.muted,
})

globalStyle(`${checklistHeader} svg`, {
  width: '14px',
  height: '14px',
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

/** A single checklist item row. Border-bottom removed from last child via globalStyle. */
export const checklistRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['2'], // 8px — nearest token to 10px
  padding: `${space['3']} ${space['4']}`, // space['3'] = 12px — nearest token to 11px
  borderBottom: `1px solid ${vars.roles.border.base}`,
})

globalStyle(`${checklistRow}:last-child`, {
  borderBottom: 'none',
})

// ---------------------------------------------------------------------------
// Icon disc — status variant
// ---------------------------------------------------------------------------

/** 22px circle disc containing a 13px icon. Variant controls colours. */
export const checklistIconDisc = recipe({
  base: {
    width: '22px',
    height: '22px',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    status: {
      /** Pass: solid success green disc, white icon. */
      pass: {
        background: vars.status.success.base,
        color: vars.roles.fg.onDark,
      },
      /** Wait: warning-tint disc with warning border and warning icon colour. */
      wait: {
        background: vars.status.warning.bg,
        color: vars.status.warning.base,
        border: `1.5px solid ${vars.status.warning.border}`,
      },
    },
  },
  defaultVariants: { status: 'pass' },
})

globalStyle(`${checklistIconDisc.classNames.base} svg`, {
  width: '13px',
  height: '13px',
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Row text
// ---------------------------------------------------------------------------

/** The item label — 13px weight 500 fg.base. */
export const checklistRowText = style({
  fontFamily: font.sans,
  fontSize: textSize.sm,
  fontWeight: '500',
  color: vars.roles.fg.base,
})

// ---------------------------------------------------------------------------
// Row status label — status variant
// ---------------------------------------------------------------------------

/** The trailing status label — 11px weight 600. Variant controls colour. */
export const checklistRowStatus = recipe({
  base: {
    marginLeft: space.auto,
    fontFamily: font.sans,
    fontSize: textSize['2xs'],
    fontWeight: '600',
  },
  variants: {
    status: {
      pass: { color: vars.status.success.fg },
      wait: { color: vars.status.warning.fg },
    },
  },
  defaultVariants: { status: 'pass' },
})
