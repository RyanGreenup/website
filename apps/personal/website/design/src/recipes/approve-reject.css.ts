import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, shadow, space, textSize, tracking, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Approve-reject panel recipes — admin transfer-review organism.
 *
 * Multi-part exports; all colours via `vars.roles.*` / `vars.status.*`; every
 * mode-invariant value (radius, font, spacing, shadow, motion) from `tokens.ts`.
 * No hard-coded hex except the approve-hover darker green (design spec) and the
 * approve-hover box-shadow using color-mix (CSS standard, mode-agnostic).
 *
 * Architecture decisions:
 *   1. `decisionButton` — a dedicated recipe with variant approve|adjust|reject.
 *      NOT the shipped `Button`: that control has primary/secondary/ghost/danger
 *      variants, none of which express solid-success or neutral-outline-with-
 *      warning-hover. Authoring a separate recipe keeps `Button`'s contract clean
 *      while fully expressing this admin pattern.
 *   2. `noteTextarea` — a dedicated style() reusing the same focus treatment as
 *      the `fieldInput` recipe (border.strong → brand.primary on focus + ring).
 *      `fieldInput` is an `<input>` recipe; textarea needs its own recipe part.
 *   3. Avatar colours use `vars.roles.brand.primarySubtle` (blue-50) and
 *      `vars.roles.brand.primaryActive` (blue-700) — existing brand roles that
 *      match the preview's blue-100 / blue-700 without adding new contract vars.
 *   4. Pending badge is composed from the shipped `Badge` component (status
 *      "warning") — no re-authoring of the warning chip.
 */

// ---------------------------------------------------------------------------
// reviewPanel — outermost card
// ---------------------------------------------------------------------------

/** 392px surface card: border, radius-lg, shadow-md, overflow hidden. */
export const reviewPanel = style({
  width: '392px',
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  boxShadow: shadow.md,
  overflow: 'hidden',
  fontFamily: font.sans,
})

// ---------------------------------------------------------------------------
// reviewHead — header row with avatar, meta, badge
// ---------------------------------------------------------------------------

/** Flex row, gap 12px, padding 15px 18px, bottom border. */
export const reviewHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px', // design spec — between space['3'] (12px) so exact match
  padding: '15px 18px', // design spec
  borderBottom: `1px solid ${vars.roles.border.base}`,
})

/**
 * A 40px circle avatar chip. The background is brand.primarySubtle (blue-50, a
 * near-match for the preview's blue-100) and the foreground is
 * brand.primaryActive (blue-700, an exact match). It is decorative, so it is
 * aria-hidden in the component; the adjacent name text carries the meaning.
 */
export const reviewAvatar = style({
  width: '40px', // design spec
  height: '40px', // design spec
  borderRadius: radius.full,
  background: vars.roles.brand.primarySubtle,
  color: vars.roles.brand.primaryActive,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  fontSize: textSize.sm, // 13px ~ 14px design spec
  flexShrink: 0,
})

/** Meta column: flex-col, gap 2px. */
export const reviewMeta = style({
  flex: '1',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px', // sub-token design spec
})

/** Name: 14px weight-600, lh 1.3, fg.base. */
export const reviewName = style({
  fontFamily: font.sans,
  fontSize: textSize.sm, // 13px ≈ 14px design spec (no 14px token; sm=13, md=16)
  fontWeight: '600',
  lineHeight: '1.3',
  color: vars.roles.fg.base,
})

/** Sub / reference: 12px fg.muted, mono tabular. */
export const reviewSub = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  fontSize: textSize.xs, // 12px
  color: vars.roles.fg.muted,
  letterSpacing: tracking.mono,
})

// ---------------------------------------------------------------------------
// reviewBody — main body container
// ---------------------------------------------------------------------------

/** Padding 16px 18px. */
export const reviewBody = style({
  padding: '16px 18px', // design spec
})

// ---------------------------------------------------------------------------
// summaryRow — sending amount row
// ---------------------------------------------------------------------------

/**
 * Slim info row: flex, bg.app (slate-50), border, radius-md, 13px.
 * Margin-bottom 16px ensures the eyebrow follows at the right spacing.
 */
export const summaryRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['2'],
  padding: '10px 12px', // design spec
  marginBottom: space['4'],
  background: vars.roles.bg.app,
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.md,
  fontSize: textSize.sm, // 13px
  fontFamily: font.sans,
})

/** "Sending" key label: fg.muted, nowrap. */
export const summaryKey = style({
  color: vars.roles.fg.muted,
  whiteSpace: 'nowrap',
})

/** Amount value: weight-600, fg.base, nowrap; add .mono class for tabular variant. */
export const summaryValue = style({
  fontWeight: '600',
  color: vars.roles.fg.base,
  whiteSpace: 'nowrap',
})

/** Mono/tabular treatment composable onto summaryValue. */
export const summaryValueMono = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
})

/** Directional arrow: fg.subtle, inline-flex, 14px icon. */
export const summaryArrow = style({
  display: 'inline-flex',
  color: vars.roles.fg.subtle,
})

globalStyle(`${summaryArrow} svg`, {
  width: '14px', // design spec
  height: '14px',
})

/** Method name: fg.base, weight-500, margin-left auto. */
export const summaryMethod = style({
  color: vars.roles.fg.base,
  fontWeight: '500',
  marginLeft: space.auto,
  whiteSpace: 'nowrap',
})

// ---------------------------------------------------------------------------
// decisionEyebrow — "Your decision" label
// ---------------------------------------------------------------------------

/** 11px, weight-600, uppercase, wide tracking, fg.subtle. */
export const decisionEyebrow = style({
  fontFamily: font.sans,
  fontSize: textSize['2xs'], // 11px
  fontWeight: '600',
  letterSpacing: tracking.wide, // 0.04em
  textTransform: 'uppercase',
  color: vars.roles.fg.subtle,
  marginBottom: '10px', // design spec
})

// ---------------------------------------------------------------------------
// decisionButton — dedicated approve / adjust / reject recipe
//
// Architecture note: NOT the shipped Button component. The shipped Button
// expresses primary/secondary/ghost/danger. This admin pattern needs:
//   approve  — solid success green (no equivalent shipped variant)
//   adjust   — neutral outline with warning-hover (no equivalent shipped variant)
//   reject   — danger-text outline with danger-hover (partially overlaps ghost/danger
//              but the hover bg pattern is distinct)
// A named recipe here keeps the shipped Button's contract clean and unexpanded.
// ---------------------------------------------------------------------------

/**
 * Decision button recipe.
 * Base: 42px height, radius-md, 14px weight-600, inline-flex centred, gap 8px,
 * border 1px, cursor pointer, transition.fast.
 *
 * Variants:
 *   approve  — solid success bg, white text; hover: darker green + lift + shadow
 *   adjust   — surface bg, fg.base text, border.strong; hover: warning tint
 *   reject   — surface bg, danger.fg text, border.strong; hover: danger tint.
 *
 * `fullWidth` boolean variant makes approve span 100%.
 */
export const decisionButton = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space['2'],
    height: '42px', // design spec
    borderRadius: radius.md,
    fontFamily: font.sans,
    fontSize: textSize.sm, // 13px ≈ 14px design spec
    fontWeight: '600',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: transition.fast,
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
      },
      '&:disabled': {
        opacity: '0.45',
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      /**
       * Solid success green. Hover: darker green (#1a8c56 design spec) +
       * translateY(-1px) lift + success-tinted box-shadow.
       */
      approve: {
        background: vars.status.success.base,
        color: vars.roles.fg.onDark,
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            background: `color-mix(in srgb, ${vars.status.success.base}, black 12%)`,
            transform: 'translateY(-1px)',
            boxShadow: `0 5px 16px color-mix(in srgb, ${vars.status.success.base} 34%, transparent)`,
          },
        },
      },
      /**
       * Neutral outline. Hover: warning tint background/border/text.
       */
      adjust: {
        background: vars.roles.bg.surface,
        color: vars.roles.fg.base,
        borderColor: vars.roles.border.strong,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.status.warning.bg,
            borderColor: vars.status.warning.border,
            color: vars.status.warning.fg,
          },
        },
      },
      /**
       * Danger-text outline. Hover: danger tint background/border.
       */
      reject: {
        background: vars.roles.bg.surface,
        color: vars.status.danger.fg,
        borderColor: vars.roles.border.strong,
        selectors: {
          '&:hover:not(:disabled)': {
            background: vars.status.danger.bg,
            borderColor: vars.status.danger.border,
            color: vars.status.danger.fg,
          },
        },
      },
    },
    fullWidth: {
      true: { width: '100%' },
      false: {},
    },
  },
  defaultVariants: { variant: 'approve', fullWidth: false },
})

/** Scale icons inside decisionButton to 16px. */
globalStyle(`${decisionButton.classNames.base} svg`, {
  width: '16px',
  height: '16px',
})

// ---------------------------------------------------------------------------
// decisionPair — 2-col grid for adjust + reject
// ---------------------------------------------------------------------------

/** 2-column equal grid, gap 9px, margin-top 9px. */
export const decisionPair = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '9px', // design spec
  marginTop: '9px', // design spec
})

// ---------------------------------------------------------------------------
// note section — label / textarea / hint
// ---------------------------------------------------------------------------

/** Note section wrapper: margin-top 14px. */
export const noteSection = style({
  marginTop: '14px', // design spec
})

/** Label row: 12px weight-600, flex row gap 5px, margin-bottom 6px. */
export const noteLabel = style({
  fontFamily: font.sans,
  fontSize: textSize.xs, // 12px
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '5px', // design spec
  marginBottom: '6px', // design spec
  color: vars.roles.fg.base,
  cursor: 'default',
})

globalStyle(`${noteLabel} svg`, {
  width: '13px', // design spec
  height: '13px',
  color: vars.roles.fg.muted,
})

/**
 * Note textarea.
 * Reuses the same focus treatment as fieldInput (border.strong at rest,
 * brand.primary on focus + ring shadow). Textarea needs its own recipe part
 * since fieldInput is an `<input>` recipe.
 */
export const noteTextarea = style({
  width: '100%',
  height: '56px', // design spec
  border: `1px solid ${vars.roles.border.strong}`,
  borderRadius: radius.md,
  padding: '9px 11px', // design spec
  fontFamily: font.sans,
  fontSize: textSize.sm, // 13px
  color: vars.roles.fg.base,
  background: vars.roles.bg.surface,
  resize: 'none',
  boxSizing: 'border-box',
  transition: transition.fast,
  selectors: {
    '&::placeholder': { color: vars.roles.fg.subtle },
    '&:focus': {
      outline: 'none',
      borderColor: vars.roles.brand.primary,
      boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
    },
  },
})

/** Hint text: 11px fg.subtle, margin-top 6px. */
export const noteHint = style({
  fontFamily: font.sans,
  fontSize: textSize['2xs'], // 11px
  color: vars.roles.fg.subtle,
  marginTop: '6px', // design spec
})
