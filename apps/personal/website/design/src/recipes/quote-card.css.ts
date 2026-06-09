import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize } from '../tokens'
import { vars } from '../theme.css'

/**
 * Quote-card recipes for the money/rate/fee/net quote card.
 *
 * The recipe set has ten parts. `quoteCard` is the outer card (width 330px,
 * surface bg, border, shadow-md, radius-xl). `quoteTop` is the top bar (promo
 * chip plus expiry, flex space-between). `quoteExpiry` is the mono clock label
 * (warning.fg, 11px weight-600). `quoteRow` is the key/value row (flex
 * space-between, baseline, padding 7px 18px). `quoteRowKey` is the row key label
 * (13px fg.muted). `quoteRowValue` is the row value (mono tabular-nums, 14px
 * weight-500, with tone and font variants). `quoteNet` is the net footer
 * (brand.primarySubtle bg, teal border-top). `quoteNetKey` is the net label
 * (12px weight-600, accentStrong). `quoteNetValue` is the net amount (mono
 * tabular, 24px weight-600, accentStrong, -0.5px tracking). `quotePromoChip` is
 * the promo chip (inline-flex, radius-sm rounded rect, promo colours).
 *
 * Architecture note: `quotePromoChip` is a dedicated recipe part styled to match
 * the design-kit preview exactly via `border-radius: var(--radius-sm)` (a rounded
 * rectangle, NOT a pill). All promo colours flow through `vars.status.promo.*`.
 *
 * All colours come from `vars.*`, with no hard-coded hex. Static tokens
 * (radius, space, font, textSize) are mode-invariant and come from tokens.ts.
 *
 * Two font sizes sit off-grid. The 14px row value has no exact token (nearest is
 * textSize.sm at 13px), so it uses a literal '0.875rem' with a design-spec
 * comment. The 24px net value maps exactly to textSize['2xl'] (1.5rem = 24px).
 */

// ---------------------------------------------------------------------------
// quoteCard — outer card shell
// ---------------------------------------------------------------------------

/**
 * Card shell: 330px wide, surface bg, 1px border, radius-xl, shadow-md, overflow hidden.
 */
export const quoteCard = style({
  width: '330px',
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.xl,
  boxShadow: shadow.md,
  overflow: 'hidden',
})

// ---------------------------------------------------------------------------
// quoteTop — top bar row (promo badge + expiry)
// ---------------------------------------------------------------------------

/**
 * Top bar: flex row, space-between, align-center, padding 16px 18px.
 */
export const quoteTop = style({
  padding: `${space['4']} 18px`,  // 16px 18px — design spec
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

// ---------------------------------------------------------------------------
// quoteRows — rows <dl> wrapper (resets browser default margin/padding on dl/dd)
// ---------------------------------------------------------------------------

/**
 * Rows wrapper: resets browser-default margin and padding on the <dl> element.
 * Browsers apply margin to <dl> and margin-inline-start: 40px to <dd> by default.
 */
export const quoteRows = style({
  margin: 0,
  padding: 0,
})

globalStyle(`${quoteRows} dd`, {
  margin: 0,
})

// ---------------------------------------------------------------------------
// quotePromoChip — promo chip (rounded rect, NOT pill)
// ---------------------------------------------------------------------------

/**
 * Promo chip: radius-sm rounded rectangle, promo status colours.
 * Display inline-flex; padding ~3px 9px (space['0.5'] + space['2'] approximation).
 * Inner svg icon sized 12×12 via globalStyle below.
 */
export const quotePromoChip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space['1'],             // ~4px (space['1'] = 0.25rem = 4px); design spec ~5px gap
  padding: `3px ${space['2']}`, // 3px 8px — 3px is sub-token (no exact step); space['2'] = 8px ≈ 9px spec
  borderRadius: radius.sm,     // 0.375rem = 6px — rounded RECTANGLE (not pill) ✓ design-kit
  background: vars.status.promo.bg,
  color: vars.status.promo.fg,
  border: `1px solid ${vars.status.promo.border}`,
  fontSize: textSize['2xs'],   // 0.6875rem = 11px ✓
  fontWeight: '600',
})

globalStyle(`${quotePromoChip} svg`, {
  width: '12px',
  height: '12px',
})

// ---------------------------------------------------------------------------
// quoteExpiry — mono clock label (warning.fg)
// ---------------------------------------------------------------------------

/**
 * Expiry timer: mono 11px weight-600, warning.fg, flex row with clock icon.
 * Icon sizing handled via globalStyle on the component side (or inline in TSX).
 */
export const quoteExpiry = style({
  fontFamily: font.mono,
  fontSize: textSize['2xs'],   // 0.6875rem = 11px ✓
  fontWeight: '600',
  color: vars.status.warning.fg,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',                  // sub-token nudge — no 4px token; design spec 4px
})

// ---------------------------------------------------------------------------
// quoteRow — key/value row
// ---------------------------------------------------------------------------

/**
 * Row container: flex row, space-between, baseline-aligned.
 * Padding 7px 18px — sub-token nudge (no 7px step).
 */
export const quoteRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '7px 18px',         // design spec — no 7px token; literal px with spec comment
})

// ---------------------------------------------------------------------------
// quoteRowKey — row label
// ---------------------------------------------------------------------------

/**
 * Row key: sans 13px fg.muted.
 */
export const quoteRowKey = style({
  fontFamily: font.sans,
  fontSize: textSize.sm,       // 0.8125rem = 13px ✓
  color: vars.roles.fg.muted,
})

// ---------------------------------------------------------------------------
// quoteRowValue — row value (variants: tone, font)
// ---------------------------------------------------------------------------

/**
 * Row value.
 *
 * Base: mono tabular-nums 14px weight-500, fg.base.
 * 14px has no exact token — nearest is textSize.sm (13px); using literal
 * '0.875rem' (14px) per design spec.
 *
 * Variants:
 *   tone: 'default' | 'promo'  — promo highlights with status.promo.fg + weight-600
 *   font: 'mono' | 'sans'      — sans override for receiving-method row.
 */
export const quoteRowValue = recipe({
  base: {
    fontFamily: font.mono,
    fontVariantNumeric: 'tabular-nums',
    fontSize: '0.875rem',      // 14px — design spec; no exact textSize token
    fontWeight: '500',
    color: vars.roles.fg.base,
  },
  variants: {
    tone: {
      default: {},             // inherits base fg.base
      promo: {
        color: vars.status.promo.fg,
        fontWeight: '600',
      },
    },
    font: {
      mono: {
        fontFamily: font.mono,
      },
      sans: {
        fontFamily: font.sans,
        fontVariantNumeric: 'normal',  // reset tabular-nums for sans text
      },
    },
  },
  defaultVariants: { tone: 'default', font: 'mono' },
})

// ---------------------------------------------------------------------------
// quoteNet — net footer
// ---------------------------------------------------------------------------

/**
 * Net footer: brand.primarySubtle bg, 1px teal-100 (accentSubtle) top border,
 * flex row space-between align-center, padding 14px 18px.
 */
export const quoteNet = style({
  background: vars.roles.brand.primarySubtle,
  borderTop: `1px solid ${vars.roles.accentSubtle}`,
  padding: '14px 18px',        // design spec — no 14px token; literal px with spec comment
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,                   // reset browser default <dl> margin
})

globalStyle(`${quoteNet} dd`, {
  margin: 0,                   // reset browser default dd margin-inline-start: 40px
})

// ---------------------------------------------------------------------------
// quoteNetKey — net footer label
// ---------------------------------------------------------------------------

/**
 * Net footer key: sans 12px weight-600, accentStrong (teal-700 / teal-300 dark).
 */
export const quoteNetKey = style({
  fontFamily: font.sans,
  fontSize: textSize.xs,       // 0.75rem = 12px ✓
  fontWeight: '600',
  color: vars.roles.accentStrong,
})

// ---------------------------------------------------------------------------
// quoteNetValue — net footer value
// ---------------------------------------------------------------------------

/**
 * Net footer value: mono tabular-nums 24px weight-600, accentStrong, -0.5px tracking.
 * 24px maps exactly to textSize['2xl'] (1.5rem).
 */
export const quoteNetValue = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  fontSize: textSize['2xl'],   // 1.5rem = 24px ✓
  fontWeight: '600',
  color: vars.roles.accentStrong,
  letterSpacing: '-0.5px',     // design spec
})
