import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, space, textSize, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Selector recipes for the corridor option-card and payment-method selectors.
 *
 * The `base` carries only mode-invariant tokens (radius, font, spacing, motion).
 * All colours come from the typed theme contract (`vars.roles.*` and
 * `vars.status.*`) so light and dark flip automatically with no hard-coded hex.
 *
 * The exports are multi-part. `optionCard` is the clickable button wrapper.
 * `optionCardSubtitle` is the mono subtitle line inside an option card.
 * `optionCardBlockedTag` is the "Not supported yet" danger row.
 * `paymentMethodOption` is the payment-method row button. `paymentMethodIcon`
 * is the icon slot inside a payment-method row. `selectorGroupLabel` is the
 * mono group label above a selector set.
 */

// ---------------------------------------------------------------------------
// Option card (corridor variant) — column card with optional subtitle
// ---------------------------------------------------------------------------

/** The clickable wrapper button for a corridor option. */
export const optionCard = recipe({
  base: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: space['1'], // ~4px (closest to the 3px gap in preview)
    padding: `${space['2']} ${space['3']}`, // 8px 12px — nearest tokens to 10px 12px
    borderRadius: radius.md,
    border: `1px solid ${vars.roles.border.strong}`,
    background: vars.roles.bg.surface,
    fontFamily: font.sans,
    fontSize: textSize.sm, // 13px
    fontWeight: '600',
    color: vars.roles.fg.base,
    textAlign: 'left',
    cursor: 'pointer',
    transition: transition.fast,
    boxSizing: 'border-box',
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
      },
    },
  },
  variants: {
    state: {
      /** Default: border.strong, bg.surface. */
      default: {},
      /** Selected: brand.primary border + 1px ring, brand.primarySubtle bg. */
      selected: {
        borderColor: vars.roles.brand.primary,
        boxShadow: `0 0 0 1px ${vars.roles.brand.primary}`,
        background: vars.roles.brand.primarySubtle,
      },
      /** Blocked: 60% opacity, dashed border, not interactive. */
      blocked: {
        opacity: '0.6',
        borderStyle: 'dashed',
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: { state: 'default' },
})

/** The mono subtitle beneath the label inside an option card. */
export const optionCardSubtitle = style({
  fontFamily: font.mono,
  fontWeight: '400',
  color: vars.roles.fg.subtle,
  fontSize: textSize['2xs'], // 11px
})

/** The "Not supported yet" blocked tag row — danger colour. */
export const optionCardBlockedTag = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space['1'], // 4px
  fontSize: textSize['2xs'], // ~10px — closest token to 10px is 2xs (11px)
  color: vars.status.danger.fg,
  fontWeight: '600',
  marginTop: space['1'],
})

globalStyle(`${optionCardBlockedTag} svg`, {
  width: textSize['2xs'], // 11px — matches textSize['2xs'] = 0.6875rem
  height: textSize['2xs'],
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Payment-method option — row with leading icon
// ---------------------------------------------------------------------------

/** The clickable wrapper button for a payment-method option. */
export const paymentMethodOption = recipe({
  base: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    gap: space['2'], // 8px — nearest token to the 7px gap in preview
    padding: `${space['2']} ${space['2']}`, // 8px 8px — nearest to 8px 10px
    borderRadius: radius.md,
    border: `1px solid ${vars.roles.border.strong}`,
    background: vars.roles.bg.surface,
    fontFamily: font.sans,
    fontSize: textSize.xs, // 12px
    fontWeight: '600',
    color: vars.roles.fg.base,
    cursor: 'pointer',
    transition: transition.fast,
    boxSizing: 'border-box',
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
      },
    },
  },
  variants: {
    state: {
      /** Default: border.strong, bg.surface. */
      default: {},
      /** Selected: brand border + ring + subtle bg. */
      selected: {
        borderColor: vars.roles.brand.primary,
        boxShadow: `0 0 0 1px ${vars.roles.brand.primary}`,
        background: vars.roles.brand.primarySubtle,
      },
    },
  },
  defaultVariants: { state: 'default' },
})

/** Icon slot inside a payment-method option — recolors on selected state via currentColor. */
export const paymentMethodIcon = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    color: vars.roles.fg.muted,
  },
  variants: {
    state: {
      default: {},
      /** Selected: icon colour flips to brand.primary. */
      selected: {
        color: vars.roles.brand.primary,
      },
    },
  },
  defaultVariants: { state: 'default' },
})

globalStyle(`${paymentMethodIcon.classNames.base} svg`, {
  // 15px — source of truth: preview `.pmo svg { width:15px }`.
  // No exact token exists (nearest: textSize.sm = 0.8125rem / textSize.md = 1rem).
  width: '0.9375rem',
  height: '0.9375rem',
})

// ---------------------------------------------------------------------------
// Group label — mono 10px label above a selector group
// ---------------------------------------------------------------------------

/** Mono group label (e.g. "CORRIDOR — supported pairs only"). */
export const selectorGroupLabel = style({
  fontFamily: font.mono,
  fontSize: textSize['2xs'], // 11px — nearest token to 10px
  color: vars.roles.fg.subtle,
  marginBottom: space['2'], // 8px — nearest to 7px
})
