import { style } from '@vanilla-extract/css'

import { font, space, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * KV recipes, a standalone key/value pair row.
 *
 * The `style()` set has three parts. `kv` is the container `<dl>` (flex,
 * space-between, center, gap 12px) and resets the browser-default `<dl>` margin.
 * `kvKey` is the `<dt>` key label (sans, 13px, regular, fg.muted). `kvValue` is
 * the `<dd>` value (mono tabular-nums, 13px, medium, fg.base, right-aligned) and
 * resets the browser-default `<dd>` margin-inline-start.
 *
 * Source intent combines the hi-fi `.kv` layout with the QuoteCard `.quote__row`
 * text styling, the only place the hi-fi defines key/value text. The `.kv`
 * container is flex, center-aligned, space-between, gap 12px. The `.k` key is
 * weight-regular text-sm font-sans in fg-muted. The `.v` value is font-num with
 * tabular-nums, weight-medium, text-sm, fg, right-aligned.
 *
 * All colours come from `vars.roles.*`, with no hard-coded hex. Mode-invariant
 * values (gap, font, size) come from static tokens in tokens.ts. Font weights
 * are bare strings, since this design system has no weight token (see
 * quote-card).
 */

/**
 * Container <dl>: flex row, space-between, center-aligned, 12px gap.
 * Resets the browser-default margin applied to <dl>.
 */
export const kv = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space['3'], // 12px ✓ exact
  margin: 0, // reset browser default <dl> margin
})

/**
 * Key <dt>: sans 13px regular, fg.muted.
 */
export const kvKey = style({
  fontFamily: font.sans,
  fontSize: textSize.sm, // 0.8125rem = 13px ✓
  fontWeight: '400', // weight-regular
  color: vars.roles.fg.muted,
})

/**
 * Value <dd>: mono tabular-nums 13px medium, fg.base, right-aligned.
 * Resets the browser-default <dd> margin-inline-start: 40px.
 */
export const kvValue = style({
  margin: 0, // reset browser default <dd> margin-inline-start: 40px
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  fontSize: textSize.sm, // 0.8125rem = 13px ✓
  fontWeight: '500', // weight-medium
  color: vars.roles.fg.base,
  textAlign: 'right',
})
