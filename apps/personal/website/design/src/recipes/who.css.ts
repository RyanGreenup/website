import { style } from '@vanilla-extract/css'

import { font, radius, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * Who recipes for the compact identity chip (avatar plus name).
 *
 * This is a smaller sibling of MiniRow: a round 30px initials disc next to a
 * name, with no sub line and no divider. In the hi-fi the `.who*` CSS is
 * table-scoped (`.table .who`); here it is lifted to a standalone,
 * non-table-scoped recipe so it is reusable beyond the customer transfers table
 * (Task 11 composes it as the recipient cell).
 *
 * `base` carries only mode-invariant tokens (radius, font, size). All colours
 * come from the typed theme contract (`vars.roles.*`) so light and dark flip
 * automatically with no hard-coded hex.
 *
 * The multi-part exports are as follows. `who` is the flex row (avatar plus
 * name). `whoAvatar` is the round initials disc (sunken bg, muted fg, xs
 * semibold). `whoName` is the name line (base fg, semibold).
 */

// 10px gap is off the 4px space grid (between space[2]=8 and space[3]=12); the
// hi-fi spec is a deliberate 10px -- keep the literal with a comment.
const ROW_GAP = '10px'
// Fixed 30px disc -- a deliberate hi-fi size, not on the spacing scale.
const AVATAR_SIZE = '30px'

// ---------------------------------------------------------------------------
// Row
// ---------------------------------------------------------------------------

/** Flex row: avatar + name, vertically centred. */
export const who = style({
  display: 'flex',
  alignItems: 'center',
  gap: ROW_GAP,
})

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

/** Round initials disc: fixed 30px, sunken bg, muted fg, xs semibold text. */
export const whoAvatar = style({
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
  fontSize: textSize.xs,
  fontWeight: '600',
})

// ---------------------------------------------------------------------------
// Name
// ---------------------------------------------------------------------------

/**
 * Recipient name -- base fg, semibold.
 *
 * The source only sets weight + colour on `.who__nm`; its font-size is
 * inherited from context (the table body in the hi-fi). We pin the table-body
 * size `textSize.sm` (13px) as a sensible standalone default so the chip reads
 * consistently outside a table.
 */
export const whoName = style({
  fontFamily: font.sans,
  // Table-body default -- source only sets weight+colour; size is inherited.
  fontSize: textSize.sm,
  fontWeight: '600',
  color: vars.roles.fg.base,
})
