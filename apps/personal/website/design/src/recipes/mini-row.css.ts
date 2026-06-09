import { style } from '@vanilla-extract/css'

import { font, radius, space, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * MiniRow recipes, the recipient list row on the home "Recipients" card.
 *
 * `base` carries only mode-invariant tokens (radius, spacing, font). All
 * colours come from the typed theme contract (`vars.roles.*`) so light and dark
 * flip automatically with no hard-coded hex.
 *
 * The set has five exports. `miniRow` is the flex row, and its `&:last-child`
 * drops the hairline bottom border. `miniRowAvatar` is the round initials disc
 * (sunken bg, muted fg). `miniRowGrow` is the flex:1 wrapper holding the
 * name/sub stack. `miniRowName` is the primary name line (block, base fg,
 * semibold base size). `miniRowSub` is the secondary corridor/relation line
 * (subtle fg, xs).
 */

// 11px gap is off the 4px space grid; nearest token is space[3] (12px) but the
// hi-fi spec is a deliberate 11px -- keep the literal with a comment.
const ROW_GAP = '11px'
const AVATAR_SIZE = '36px'
// hi-fi name/sub use line-height 1.3 (between leading.tight 1.2 and snug 1.35).
const TEXT_LEADING = '1.3'

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

/** Flex row: avatar + grow stack + trailing badge, hairline bottom divider. */
export const miniRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: ROW_GAP,
  paddingTop: space['3'], // 12px
  paddingBottom: space['3'], // 12px
  borderBottom: `1px solid ${vars.roles.border.subtle}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
})

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

/** Round initials disc: fixed 36px, sunken bg, muted fg, semibold sm text. */
export const miniRowAvatar = style({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  flex: 'none',
  borderRadius: radius.full,
  background: vars.roles.bg.sunken,
  color: vars.roles.fg.muted,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: font.sans,
  fontSize: textSize.sm,
  fontWeight: '600',
})

// ---------------------------------------------------------------------------
// Grow stack
// ---------------------------------------------------------------------------

/** Flex:1 wrapper so the trailing badge sits hard against the right edge. */
export const miniRowGrow = style({
  flex: 1,
  minWidth: 0,
})

// ---------------------------------------------------------------------------
// Name / sub
// ---------------------------------------------------------------------------

/** Primary recipient name -- block so it stacks above the sub line. */
export const miniRowName = style({
  display: 'block',
  fontFamily: font.sans,
  fontSize: textSize.md,
  fontWeight: '600',
  lineHeight: TEXT_LEADING,
  color: vars.roles.fg.base,
})

/** Secondary line: corridor + relation, subtle fg, smaller regular weight. */
export const miniRowSub = style({
  display: 'block',
  fontFamily: font.sans,
  fontSize: textSize.xs,
  fontWeight: '400',
  lineHeight: TEXT_LEADING,
  color: vars.roles.fg.subtle,
})
