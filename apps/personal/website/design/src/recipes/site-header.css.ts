import { style } from '@vanilla-extract/css'

import { font, radius, space, textSize, tracking } from '../tokens'
import { vars } from '../theme.css'

/**
 * Site header: a sticky, lightly-translucent bar over a blurred backdrop. Brand
 * lockup on the left, horizontal nav pushed to the right, and a square theme
 * toggle. The active nav link reads as brand-blue on a brand-subtle pill.
 *
 * Below `760px` the inline nav gives way to a slide-in sheet (the `navToggle` /
 * navSheet / navBackdrop / navIndex pieces): a right-hand sheet over a dimmed
 * backdrop, mono index numbers beside large links, theme toggle pinned at the
 * foot. The consuming app wires the open/close state and `prefers-reduced-motion`
 * is respected by keeping the transitions on `--ease-reveal`.
 *
 * Colours come from the typed contract; the translucent bar uses color-mix on
 * the app-bg role so it stays correct in both themes.
 */
export const siteHeader = style({
  position: 'sticky',
  top: 0,
  zIndex: 40,
  background: `color-mix(in srgb, ${vars.roles.bg.app} 86%, transparent)`,
  backdropFilter: 'saturate(140%) blur(8px)',
  borderBottom: `1px solid ${vars.roles.border.subtle}`,
})

export const headerInner = style({
  maxWidth: '72rem',
  marginInline: 'auto',
  padding: `${space['3']} ${space['6']}`,
  display: 'flex',
  alignItems: 'center',
  gap: space['6'],
})

export const brand = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space['3'],
  flexShrink: 0,
  whiteSpace: 'nowrap',
  fontWeight: '600',
  letterSpacing: tracking.tight,
  color: vars.roles.fg.base,
})

export const brandMark = style({
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  width: '30px',
  height: '30px',
  borderRadius: radius.md,
  background: vars.roles.brand.primary,
  color: vars.roles.brand.onPrimary,
  fontFamily: font.mono,
  fontSize: textSize.xs,
  fontWeight: '600',
  letterSpacing: '0.02em',
})

export const brandName = style({
  fontSize: textSize.md,
  '@media': {
    'screen and (max-width: 760px)': { display: 'none' },
  },
})

export const nav = style({
  marginInlineStart: 'auto',
  '@media': {
    'screen and (max-width: 760px)': { display: 'none' },
  },
})

export const navList = style({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: space['1'],
})

export const navLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '36px',
  paddingInline: space['3'],
  borderRadius: radius.md,
  fontSize: textSize.sm,
  fontWeight: '500',
  color: vars.roles.fg.muted,
  transition:
    'color var(--duration-base) var(--ease-standard), background-color var(--duration-base) var(--ease-standard)',
  selectors: {
    '&:hover': { color: vars.roles.fg.base, background: vars.roles.bg.hover },
    '&[aria-current="page"]': {
      color: vars.roles.brand.primary,
      background: vars.roles.brand.primarySubtle,
    },
  },
})

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['2'],
})

/** The square light/dark toggle button (also the only client island). */
export const themeToggle = style({
  display: 'inline-grid',
  placeItems: 'center',
  width: '44px',
  height: '44px',
  borderRadius: radius.md,
  border: `1px solid ${vars.roles.border.base}`,
  background: vars.roles.bg.surface,
  color: vars.roles.fg.muted,
  cursor: 'pointer',
  transition:
    'color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), background-color var(--duration-base) var(--ease-standard)',
  selectors: {
    '&:hover': {
      color: vars.roles.fg.base,
      borderColor: vars.roles.border.strong,
      background: vars.roles.bg.hover,
    },
  },
})

// ---------------------------------------------------------------------------
// Mobile slide-in sheet (shown < 760px; open/close state owned by the app)
// ---------------------------------------------------------------------------

/** The hamburger / close button; hidden on desktop. */
export const navToggle = style({
  display: 'none',
  marginInlineStart: 'auto',
  placeItems: 'center',
  width: '44px',
  height: '44px',
  borderRadius: radius.md,
  border: `1px solid ${vars.roles.border.base}`,
  background: vars.roles.bg.surface,
  color: vars.roles.fg.base,
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 760px)': { display: 'inline-grid' },
  },
})

/** Dimmed backdrop behind the sheet. */
export const navBackdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  background: `color-mix(in srgb, ${vars.roles.fg.base} 45%, transparent)`,
  backdropFilter: 'blur(2px)',
})

/** Right-hand sheet panel. */
export const navSheet = style({
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 51,
  height: '100dvh',
  width: 'min(82vw, 20rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: space['1'],
  padding: space['6'],
  background: vars.roles.bg.surface,
  borderLeft: `1px solid ${vars.roles.border.base}`,
  boxShadow: `-24px 0 60px color-mix(in srgb, ${vars.roles.fg.base} 18%, transparent)`,
})

/** Mono index number ("01".."06") beside each sheet link. */
export const navIndex = style({
  fontFamily: font.mono,
  fontSize: textSize.xs,
  letterSpacing: tracking.caps,
  color: vars.roles.fg.faint,
})

/** A large link row inside the sheet. */
export const navSheetLink = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: space['3'],
  paddingBlock: space['3'],
  fontSize: textSize.lg,
  fontWeight: '500',
  color: vars.roles.fg.base,
  borderBottom: `1px solid ${vars.roles.border.subtle}`,
})
