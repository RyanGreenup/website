import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Toast recipes for notification toast cards (ok, brand, warning).
 *
 * `base` carries only mode-invariant tokens (radius, spacing, font, motion,
 * shadow). All colours come from the typed theme contract (`vars.roles.*`,
 * `vars.status.*`) so light and dark flip automatically with no hard-coded hex.
 *
 * The multi-part exports are as follows. `toastContainer` is the outer card
 * (position relative, flex row, border, shadow). `toastChip` is the
 * tone-coloured icon chip (variant: tone). `toastTitle` is the 13px 600-weight
 * title (fg.base). `toastDescription` is the 12px description text (fg.muted).
 * `toastValue` is the inline mono and tabular span for amounts and refs
 * (fg.base). `toastMeta` is the right column (flex-col align-end). `toastTime`
 * is the 11px timestamp (fg.subtle, nowrap). `toastClose` is the ghost 22px icon
 * close button (fg.subtle, fg.base on hover). `toastProgress` is the absolute
 * bottom progress bar (variant: tone for colour).
 *
 * Architecture note: `toastClose` is a dedicated ghost icon-button recipe inside
 * this file, not the shipped `Button` component. The shipped `Button` is a
 * padded text control with no icon-only mode, so distorting it would violate the
 * design contract of a reviewed component. A named `toastClose` recipe is the
 * correct, contract-compliant way to express this affordance.
 */

// ---------------------------------------------------------------------------
// Shared tone → colour map (chip bg, chip fg, progress colour).
// Keeping the map in ONE place ensures chip + progress stay in sync.
// ---------------------------------------------------------------------------

const toneChip = {
  success: {
    background: vars.status.success.bg,
    color: vars.status.success.base,
  },
  brand: {
    background: vars.roles.brand.primarySubtle,
    color: vars.roles.brand.primary,
  },
  warning: {
    background: vars.status.warning.bg,
    color: vars.status.warning.base,
  },
} as const

const toneProgressColor = {
  success: vars.status.success.base,
  brand: vars.roles.brand.primary,
  warning: vars.status.warning.base,
} as const

// ---------------------------------------------------------------------------
// toastContainer — outer card
// ---------------------------------------------------------------------------

/**
 * Outer toast card: position:relative flex-row surface, border, shadow-md.
 * Width 368px, radius-lg, overflow hidden for the bottom progress bar.
 */
export const toastContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: space['3'],
  width: '368px',
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  boxShadow: shadow.md,
  padding: `13px 14px`,
  overflow: 'hidden',
})

// ---------------------------------------------------------------------------
// toastChip — tone-coloured icon chip
// ---------------------------------------------------------------------------

/**
 * 34px square icon chip, radius-md, centred 18px icon.
 * Tone variant controls bg + fg colour pair.
 */
export const toastChip = recipe({
  base: {
    width: '34px',
    height: '34px',
    borderRadius: radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    tone: toneChip,
  },
  defaultVariants: { tone: 'success' },
})

/** Scale the icon inside the chip to 18px. */
globalStyle(`${toastChip.classNames.base} svg`, {
  width: '18px',
  height: '18px',
})

// ---------------------------------------------------------------------------
// toastBody — flex-1 body column (exported — part of the public recipe API)
// ---------------------------------------------------------------------------

/** Flex-1 body column; exported and consumed by the Toast component. */
export const toastBody = style({
  flex: '1',
  minWidth: 0,
  paddingTop: '1px', // optical alignment nudge
  display: 'flex',
  flexDirection: 'column',
  gap: '2px', // sub-token nudge; no 2px token
})

// ---------------------------------------------------------------------------
// toastTitle — 13px 600 fg.base
// ---------------------------------------------------------------------------

/** Title line: 13px weight-600, fg.base, snug line-height. */
export const toastTitle = style({
  fontFamily: font.sans,
  fontSize: textSize.sm,
  fontWeight: '600',
  color: vars.roles.fg.base,
  lineHeight: '1.35',
})

// ---------------------------------------------------------------------------
// toastDescription — 12px fg.muted
// ---------------------------------------------------------------------------

/** Description line: 12px fg.muted, slightly relaxed line-height. */
export const toastDescription = style({
  fontFamily: font.sans,
  fontSize: textSize.xs,
  color: vars.roles.fg.muted,
  lineHeight: '1.45',
})

// ---------------------------------------------------------------------------
// toastValue — inline mono/tabular span for amounts & refs
// ---------------------------------------------------------------------------

/**
 * Inline mono span for monetary amounts, references, and numeric values
 * embedded in the description. Uses tabular-nums to align digits cleanly.
 */
export const toastValue = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  color: vars.roles.fg.base,
})

// ---------------------------------------------------------------------------
// toastMeta — right column
// ---------------------------------------------------------------------------

/** Right meta column: flex-col align-end, gap 8px. */
export const toastMeta = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: space['2'],
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// toastTime — 11px timestamp
// ---------------------------------------------------------------------------

/** Timestamp: 11px fg.subtle, no-wrap. */
export const toastTime = style({
  fontFamily: font.sans,
  fontSize: textSize['2xs'],
  color: vars.roles.fg.subtle,
  whiteSpace: 'nowrap',
})

// ---------------------------------------------------------------------------
// toastClose — dedicated ghost icon-button (22px square)
//
// Architecture decision: this is NOT the shipped `Button` component — that is
// a padded text control with no icon-only mode. Extending Button with an
// icon-only size would be scope creep into a reviewed, contract-locked
// component. Instead, `toastClose` is a purpose-built ghost icon-button recipe
// here in the toast recipe file. This keeps each component's contract clean.
// ---------------------------------------------------------------------------

/**
 * Ghost 22px × 22px icon close button.
 * Transparent bg + fg.subtle by default; hover → bg.hover + fg.base.
 * Rendered as a real `<button type="button">` in the component.
 */
export const toastClose = style({
  width: '22px',
  height: '22px',
  borderRadius: radius.sm, // radius.sm = 0.375rem (6px)
  border: 'none',
  background: 'transparent',
  color: vars.roles.fg.subtle,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  transition: transition.colors,
  selectors: {
    '&:hover': {
      background: vars.roles.bg.hover,
      color: vars.roles.fg.base,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
    },
  },
})

/** Scale the x icon inside the close button. */
globalStyle(`${toastClose} svg`, {
  width: '14px',
  height: '14px',
})

// ---------------------------------------------------------------------------
// toastProgress — absolute bottom progress bar (variant: tone)
// ---------------------------------------------------------------------------

/**
 * Absolute bottom progress bar: 2px tall, opacity 0.55.
 * Colour matches the tone (success → green, brand → blue, warning → amber).
 * Width is set via inline style on the element (e.g. `style="width: 64%"`).
 */
export const toastProgress = recipe({
  base: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '2px',
    opacity: '0.55', // design spec value
  },
  variants: {
    tone: {
      success: { background: toneProgressColor.success },
      brand: { background: toneProgressColor.brand },
      warning: { background: toneProgressColor.warning },
    },
  },
  defaultVariants: { tone: 'success' },
})
