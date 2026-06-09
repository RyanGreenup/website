import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize, tracking } from '../tokens'
import { vars } from '../theme.css'

/**
 * Stat recipes render the metric tile on the hi-fi customer home (Sent,
 * Transfers, In progress, Recipients). The tile carries an uppercase label, a
 * big mono tabular value, and an optional delta line that trends up (success)
 * or down (danger).
 *
 * The recipe set is multi-part. The `stat` is the surface shell (surface bg,
 * 1px base border, radius-lg, shadow, and 16px/18px padding). The `statKey` is
 * the uppercase eyebrow label (semibold text-2xs sans, tracking-wide,
 * fg.subtle). The `statValue` is the big number (mono tabular-nums semibold
 * text-3xl, fg.base); a nested `<small>` suffix is text-sm medium fg.subtle.
 * The `statDelta` is the delta line (inline-flex with a leading arrow icon; the
 * component sizes the icon 14px via lucide's `size` prop). The `trend` variant
 * colours it: up gives status.success.fg, down gives status.danger.fg, and the
 * default (no trend) gives fg.muted.
 *
 * All colours come from `vars.*`; no hard-coded hex. Static tokens (radius,
 * shadow, space, font, textSize, tracking) are mode-invariant and come from
 * tokens.ts. Font weights are CSS literals (no weight token, matching the
 * card / quote-card precedent). Off-grid geometry (18px inset, 6px / 5px gaps,
 * 1.05 line-height, -0.5px tracking, 14px icon) uses bare-px literals with a
 * `// hi-fi spec` comment, following the quote-card precedent for off-grid
 * values.
 */

// ---------------------------------------------------------------------------
// stat -- surface shell
// ---------------------------------------------------------------------------

/**
 * Stat surface: surface bg, 1px base border, radius-lg, hairline shadow,
 * 16px vertical / 18px horizontal padding.
 *
 * The hi-fi spec wanted a `--shadow-2xs` hairline; the nearest shipped token is
 * `shadow.sm` (= `--shadow-xs` in the preview). 18px is off-grid (no 18px
 * space token) so the horizontal inset is a literal; the 16px vertical inset is
 * `space['4']`.
 */
export const stat = style({
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  boxShadow: shadow.sm, // hi-fi spec wanted --shadow-2xs hairline; nearest shipped token
  padding: `${space['4']} 18px`, // hi-fi spec -- no 18px token; literal px with spec comment
})

// ---------------------------------------------------------------------------
// statKey -- uppercase eyebrow label
// ---------------------------------------------------------------------------

/**
 * Label: semibold text-2xs (11px) sans, tracking-wide, uppercase, fg.subtle.
 */
export const statKey = style({
  fontFamily: font.sans,
  fontSize: textSize['2xs'],
  fontWeight: '600',
  letterSpacing: tracking.wide,
  textTransform: 'uppercase',
  color: vars.roles.fg.subtle,
})

// ---------------------------------------------------------------------------
// statValue -- the big number
// ---------------------------------------------------------------------------

/**
 * Value: mono tabular-nums semibold text-3xl (28px), fg.base, tight line-height
 * and negative tracking. A nested `<small>` suffix is text-sm medium fg.subtle.
 */
export const statValue = style({
  marginTop: '6px', // hi-fi spec -- no 6px token; literal px with spec comment
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  fontWeight: '600',
  fontSize: textSize['3xl'],
  lineHeight: '1.05', // hi-fi spec
  letterSpacing: '-0.5px', // hi-fi spec
  color: vars.roles.fg.base,
})

/** Nested `<small>` value suffix: text-sm medium fg.subtle. */
globalStyle(`${statValue} small`, {
  fontSize: textSize.sm,
  fontWeight: '500',
  color: vars.roles.fg.subtle,
})

// ---------------------------------------------------------------------------
// statDelta -- delta line (with trend variant)
// ---------------------------------------------------------------------------

/**
 * Delta: inline-flex with a leading 14px arrow icon, semibold text-xs sans.
 *
 * `trend` selects the colour: undefined/unset gives fg.muted (plain delta, the
 * component renders no icon), up gives status.success.fg, down gives
 * status.danger.fg.
 */
export const statDelta = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px', // hi-fi spec -- no 5px token; literal px with spec comment
    marginTop: space['2'], // 8px
    fontFamily: font.sans,
    fontSize: textSize.xs,
    fontWeight: '600',
    color: vars.roles.fg.muted,
  },
  variants: {
    trend: {
      up: { color: vars.status.success.fg },
      down: { color: vars.status.danger.fg },
    },
  },
})
