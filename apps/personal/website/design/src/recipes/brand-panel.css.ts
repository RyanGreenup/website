import { keyframes, style } from '@vanilla-extract/css'

import { font, leading, radius, space, textSize, tracking } from '../tokens'
import { vars } from '../theme.css'

/**
 * Auth brand panel — the marketing aside beside the sign-in form.
 *
 * A deliberately **always-dark** surface: the navy background, teal highlight,
 * and white primary text come from the typed contract's `brandPanel` role
 * (identical light/dark), so this recipe holds no hex. The muted-white overlays
 * (eyebrow, rate-card chrome, hairlines) are mode-invariant `rgba(255,255,255,…)`
 * literals layered on top of that dark surface — contract-legal (only `#hex` is
 * banned), and the honest way to express "X% white over navy".
 */

/** Pulsing halo on the live-rate dot. */
const pulse = keyframes({
  '0%': { boxShadow: '0 0 0 0 currentColor' },
  '70%': { boxShadow: '0 0 0 7px transparent' },
  '100%': { boxShadow: '0 0 0 7px transparent' },
})

/** The panel shell: dark surface, padding, vertical rhythm, faint grid texture. */
export const brandPanel = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: space['10'],
  padding: `${space['12']} 3.5rem`, // 48px 56px
  background: vars.roles.brandPanel.bg,
  color: vars.roles.brandPanel.onBg,
  selectors: {
    // Faint outbound-grid texture, flat (no gradients of colour — just hairlines).
    // `z-index: -1` keeps it above the panel background but behind the content.
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-10%',
      right: '-10%',
      width: '80%',
      height: '70%',
      zIndex: -1,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
      backgroundSize: '44px 44px',
      opacity: 0.8,
      pointerEvents: 'none',
    },
  },
  '@media': {
    'screen and (max-width: 960px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: space['6'],
      padding: `${space['8']} ${space['10']}`, // 32px 40px
    },
    'screen and (max-width: 600px)': {
      justifyContent: 'flex-start',
      gap: space['3'],
      padding: `${space['5']} ${space['6']}`, // 20px 24px
      selectors: { '&::before': { display: 'none' } },
    },
  },
})

/** Middle block (eyebrow + headline + rate teaser + trust list), pinned toward the bottom. */
export const brandBody = style({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.75rem', // 28px
  maxWidth: '28.75rem', // 460px
  '@media': {
    'screen and (max-width: 960px)': { marginTop: 0, gap: space['5'], maxWidth: '32.5rem' },
    'screen and (max-width: 600px)': { display: 'none' },
  },
})

/** Tracked-out overline above the headline. */
export const brandEyebrow = style({
  fontSize: textSize.xs,
  fontWeight: '600',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,.64)',
  '@media': { 'screen and (max-width: 960px)': { display: 'none' } },
})

/** The marketing headline. */
export const brandHeading = style({
  fontSize: textSize['4xl'],
  fontWeight: '700',
  lineHeight: '1.18',
  letterSpacing: '-0.6px',
  margin: `${space['2']} 0 0`,
  textWrap: 'balance',
  '@media': { 'screen and (max-width: 960px)': { fontSize: '1.625rem' } }, // 26px
})

/** Teal-highlighted emphasis word inside the headline. */
export const brandHeadingEm = style({
  fontStyle: 'normal',
  color: vars.roles.brandPanel.accent,
})

/** Live-rate teaser card (glassy hairline panel over the navy). */
export const brandRate = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem', // 10px
  padding: '16px 18px',
  borderRadius: radius.lg,
  border: '1px solid rgba(255,255,255,.18)',
  background: 'rgba(255,255,255,.07)',
  '@media': { 'screen and (max-width: 960px)': { minWidth: '15rem' } },
})

export const brandRateTop = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space['3'],
})

export const brandRateLabel = style({
  fontSize: textSize.xs,
  fontWeight: '600',
  letterSpacing: tracking.wide,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,.62)',
})

export const brandRateLive = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: textSize['2xs'],
  fontWeight: '600',
  color: vars.roles.brandPanel.accent,
})

/** The pulsing dot; `currentColor` is the live-rate teal. */
export const brandRatePulse = style({
  width: '7px',
  height: '7px',
  borderRadius: radius.full,
  background: 'currentColor',
  boxShadow: '0 0 0 0 currentColor',
  animation: `${pulse} 2.2s ease-out infinite`,
  '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
})

export const brandRateValue = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
  fontSize: '1.375rem', // 22px
  fontWeight: '500',
  letterSpacing: '-0.3px',
})

export const brandRateUnit = style({
  color: 'rgba(255,255,255,.6)',
  fontWeight: '400',
})

export const brandRateFoot = style({
  fontSize: textSize.xs,
  color: 'rgba(255,255,255,.56)',
})

/** Trust list — three reassurance rows with iconed chips. */
export const brandTrust = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  margin: 0,
  padding: 0,
  '@media': {
    'screen and (max-width: 960px)': { flexDirection: 'row', flexWrap: 'wrap', gap: space['5'] },
  },
})

export const brandTrustItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['3'],
  listStyle: 'none',
  fontSize: '0.875rem', // 14px
  color: 'rgba(255,255,255,.86)',
  '@media': { 'screen and (max-width: 960px)': { fontSize: textSize.sm } },
})

export const brandTrustIcon = style({
  width: '30px',
  height: '30px',
  borderRadius: radius.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: 'rgba(255,255,255,.1)',
  color: vars.roles.brandPanel.accent,
})

/** Fine-print regulatory footer; hidden once the panel collapses to a band. */
export const brandFoot = style({
  fontSize: textSize.xs,
  lineHeight: leading.normal,
  color: 'rgba(255,255,255,.52)',
  borderTop: '1px solid rgba(255,255,255,.12)',
  paddingTop: space['5'],
  '@media': { 'screen and (max-width: 960px)': { display: 'none' } },
})
