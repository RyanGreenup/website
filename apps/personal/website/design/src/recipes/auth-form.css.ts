import { keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, leading, radius, space, textSize, tracking, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Auth form chrome — the parts of the login / registration forms that are not
 * already covered by the shared `field` / `button` primitives: heads, the
 * password show/hide affordance, the remember/forgot meta row, checkbox, social
 * divider, form-level alert, success state, password-strength meter, and the
 * +61 mobile control.
 *
 * `base` carries only mode-invariant tokens; every colour reads from the typed
 * contract (`vars.roles.*` / `vars.status.*`), so light/dark flips automatically
 * and the file holds no hex. Components author zero CSS and consume these
 * finished recipes only.
 */

const INPUT_HEIGHT = '2.625rem' // 42px — matches `fieldInput`

/** Success-icon entrance. */
const pop = keyframes({
  from: { transform: 'scale(.7)', opacity: 0 },
  to: { transform: 'scale(1)', opacity: 1 },
})

/* ── Head ──────────────────────────────────────────────────────────────── */

export const authHead = style({ marginBottom: '1.625rem' }) // 26px

export const authHeadTitle = style({
  fontSize: '1.625rem', // 26px
  fontWeight: '700',
  letterSpacing: '-0.4px',
  margin: `0 0 ${space['2']}`,
  color: vars.roles.fg.base,
  '@media': { 'screen and (max-width: 600px)': { fontSize: '1.4375rem' } }, // 23px
})

export const authHeadText = style({
  fontSize: '0.9375rem', // 15px
  color: vars.roles.fg.muted,
  margin: 0,
})

export const authHeadLink = style({
  fontWeight: '600',
  textDecoration: 'none',
  color: vars.roles.brand.primary,
  selectors: { '&:hover': { textDecoration: 'underline' } },
})

/* ── Field layout ──────────────────────────────────────────────────────── */

export const authFields = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space['4'], // 16px field rhythm
})

export const authRow2 = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '14px',
  '@media': { 'screen and (max-width: 600px)': { gridTemplateColumns: '1fr', gap: space['4'] } },
})

/** A label row that can carry a trailing chip, for example the "Locked" lock badge. */
export const authLabelRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

/** The small "Locked" chip shown beside a read-only field's label. */
export const authFieldLock = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: textSize['2xs'],
  fontWeight: '600',
  color: vars.roles.fg.subtle,
})

/* ── Password show/hide ────────────────────────────────────────────────── */

/** Relative wrapper so the show/hide toggle can overlay the input's right edge. */
export const authControl = style({ position: 'relative' })

/** Extra right padding on a password `fieldInput` so text clears the toggle. */
export const authInputTrailing = style({ paddingRight: space['10'] })

export const authPwToggle = style({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 12px 0 6px',
  color: vars.roles.fg.subtle,
  selectors: {
    '&:hover': { color: vars.roles.fg.muted },
    '&:focus-visible': { outline: 'none', color: vars.roles.brand.primary },
  },
})

/* ── Meta row (remember + forgot) ──────────────────────────────────────── */

export const authMeta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space['4'],
  marginTop: '14px',
})

export const authForgot = style({
  fontSize: '0.875rem', // 14px
  fontWeight: '600',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  color: vars.roles.brand.primary,
  selectors: { '&:hover': { textDecoration: 'underline' } },
})

/* ── Checkbox ──────────────────────────────────────────────────────────── */

export const authCheck = recipe({
  base: {
    display: 'inline-flex',
    gap: '9px',
    cursor: 'pointer',
    userSelect: 'none',
    color: vars.roles.fg.muted,
  },
  variants: {
    layout: {
      inline: { alignItems: 'center', fontSize: '0.875rem', whiteSpace: 'nowrap' },
      block: { alignItems: 'flex-start', fontSize: textSize.sm, lineHeight: leading.normal },
    },
  },
  defaultVariants: { layout: 'inline' },
})

/** The square check box; `checked` flips it to the brand fill. */
export const authCheckBox = recipe({
  base: {
    width: '1.1875rem', // 19px
    height: '1.1875rem',
    borderRadius: radius.sm,
    border: `1.5px solid ${vars.roles.border.strong}`,
    background: vars.roles.bg.surface,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: vars.roles.brand.onPrimary,
    transition: transition.fast,
    // The visually-hidden native input still drives focus; ring the box.
    selectors: {
      'input:focus-visible + &': { boxShadow: 'var(--shadow-focus)' },
    },
  },
  variants: {
    checked: {
      true: { background: vars.roles.brand.primary, borderColor: vars.roles.brand.primary },
      false: {},
    },
    block: {
      true: { marginTop: '1px' },
      false: {},
    },
  },
  defaultVariants: { checked: false, block: false },
})

/** The visually-hidden native checkbox input (kept for keyboard + a11y). */
export const authCheckInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
})

export const authCheckLink = style({
  fontWeight: '600',
  textDecoration: 'none',
  color: vars.roles.brand.primary,
  selectors: { '&:hover': { textDecoration: 'underline' } },
})

/* ── Divider + social ──────────────────────────────────────────────────── */

export const authDivider = style({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  margin: '22px 0',
  color: vars.roles.fg.subtle,
  fontSize: textSize.xs,
  fontWeight: '600',
  letterSpacing: tracking.wide,
  textTransform: 'uppercase',
  selectors: {
    '&::before': { content: '""', height: '1px', flex: 1, background: vars.roles.border.base },
    '&::after': { content: '""', height: '1px', flex: 1, background: vars.roles.border.base },
  },
})

export const authSocial = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

/* ── Form-level alert ──────────────────────────────────────────────────── */

export const authAlert = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    border: '1px solid',
    borderRadius: radius.md,
    padding: '11px 13px',
    fontSize: textSize.sm,
    lineHeight: '1.45',
    marginBottom: '18px',
  },
  variants: {
    tone: {
      danger: {
        borderColor: vars.status.danger.border,
        background: vars.status.danger.bg,
        color: vars.status.danger.fg,
      },
      info: {
        borderColor: vars.status.info.border,
        background: vars.status.info.bg,
        color: vars.status.info.fg,
      },
    },
  },
  defaultVariants: { tone: 'danger' },
})

/* ── Success state ─────────────────────────────────────────────────────── */

export const authSuccess = style({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space['2'],
  padding: `${space['2']} 0`,
})

export const authSuccessIcon = recipe({
  base: {
    width: '68px',
    height: '68px',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space['2'],
    animation: `${pop} .4s cubic-bezier(.2,.8,.2,1) both`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
  variants: {
    tone: {
      success: { background: vars.status.success.bg, color: vars.status.success.base },
      info: { background: vars.status.info.bg, color: vars.status.info.base },
    },
  },
  defaultVariants: { tone: 'success' },
})

export const authSuccessTitle = style({
  fontSize: textSize['2xl'],
  fontWeight: '700',
  letterSpacing: '-0.3px',
  margin: 0,
  color: vars.roles.fg.base,
})

export const authSuccessText = style({
  fontSize: '0.9375rem', // 15px
  color: vars.roles.fg.muted,
  margin: 0,
  maxWidth: '20rem', // 320px
  lineHeight: leading.normal,
})

/* ── Password-strength meter ───────────────────────────────────────────── */

export const authStrength = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginTop: '2px',
})

/** The four-bar track. */
export const authStrengthBars = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '5px',
})

/**
 * One strength bar. The component fills the first N bars with the tone for the
 * current level (1 danger → 2 warning → 3 info → 4 success), leaving the rest
 * `none`. Per-bar so no child/nth-child selectors are needed (VE rejects those).
 */
export const authStrengthBar = recipe({
  base: {
    height: '4px',
    borderRadius: radius.pill,
    background: vars.roles.border.base,
    transition: transition.fast,
  },
  variants: {
    fill: {
      none: {},
      danger: { background: vars.status.danger.base },
      warning: { background: vars.status.warning.base },
      info: { background: vars.status.info.base },
      success: { background: vars.status.success.base },
    },
  },
  defaultVariants: { fill: 'none' },
})

export const authStrengthText = style({
  fontSize: textSize.xs,
  color: vars.roles.fg.subtle,
})

/* ── +61 mobile control ────────────────────────────────────────────────── */

export const authPhone = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    height: INPUT_HEIGHT,
    borderRadius: radius.md,
    border: `1px solid ${vars.roles.border.strong}`,
    background: vars.roles.bg.surface,
    overflow: 'hidden',
    transition: transition.fast,
    selectors: {
      '&:focus-within': {
        borderColor: vars.roles.brand.primary,
        boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
      },
    },
  },
  variants: {
    state: {
      default: {},
      error: {
        borderColor: vars.status.danger.base,
        selectors: {
          '&:focus-within': {
            borderColor: vars.status.danger.base,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.status.danger.base} 30%, transparent)`,
          },
        },
      },
    },
  },
  defaultVariants: { state: 'default' },
})

export const authPhonePrefix = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  paddingLeft: space['3'],
  fontFamily: font.mono,
  fontSize: '0.875rem', // 14px
  fontWeight: '600',
  whiteSpace: 'nowrap',
  color: vars.roles.fg.muted,
})

export const authPhoneFlag = style({
  width: '18px',
  height: '13px',
  borderRadius: radius.xs,
  overflow: 'hidden',
  display: 'inline-block',
  flexShrink: 0,
  boxShadow: `0 0 0 1px color-mix(in srgb, ${vars.roles.fg.base} 10%, transparent)`,
})

export const authPhoneInput = style({
  flex: 1,
  border: 'none',
  background: 'transparent',
  height: '100%',
  padding: `0 ${space['3']}`,
  fontFamily: font.sans,
  fontSize: textSize.sm,
  color: vars.roles.fg.base,
  outline: 'none',
  selectors: { '&::placeholder': { color: vars.roles.fg.subtle } },
})

/* ── Legal footer under the form ───────────────────────────────────────── */

export const authFormFoot = style({
  fontSize: textSize.xs,
  color: vars.roles.fg.subtle,
  textAlign: 'center',
  marginTop: '28px',
  lineHeight: leading.normal,
})

export const authFormFootLink = style({
  color: vars.roles.fg.muted,
  textDecoration: 'none',
  selectors: { '&:hover': { textDecoration: 'underline' } },
})
