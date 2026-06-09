import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { font, radius, space, textSize, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Tracker recipes for the status stepper (done, current, upcoming).
 *
 * The layout is responsive and mobile-first. A horizontal stepper cannot fit a
 * phone once it has several text labels, so the track is a vertical stack by
 * default and only lays out horizontally at or above the tablet breakpoint. Both
 * orientations share one connector trick. The line runs from the dot centre
 * across one full step box, landing on the next dot centre, so the `@media`
 * flips only the axis: which side the line pins to and which dimension it spans.
 *
 * `base` carries only mode-invariant tokens (radius, spacing, font, transition).
 * All colours come from the typed theme contract (`vars.roles.*` and
 * `vars.status.*`) so light and dark flip automatically with no hard-coded hex.
 *
 * The multi-part exports are as follows. `trackerTrack` is the outer flex
 * container (the `<ol>`) that goes from column to row at tablet. `trackerStep`
 * is each step (the `<li>`) that goes from row (dot plus label) to column at
 * tablet. `trackerDot` is the 30px dot circle (variant: done, current, or
 * upcoming). `trackerLabel` is the step name text (variant: done, current, or
 * upcoming). `trackerLine` is the absolute connector line (variant: done or
 * upcoming).
 *
 * The last step's line is hidden via globalStyle on `:last-child`.
 */

// Phone-to-tablet boundary at which the stepper goes horizontal. Bare px literal
// (media-query px aren't a design-token concern, per the stat-bar precedent), and
// 768px matches stat-bar's first breakpoint so co-located rows switch together.
const TABLET = '(min-width: 768px)'

// Dot geometry the connector is pinned to: 30px circle, centre at 15px; a 2px
// line is offset by half its thickness (1px) on its cross-axis to sit centred.
const DOT = 30
const DOT_CENTER = `${DOT / 2}px` // 15px
const LINE_OFFSET = `${DOT / 2 - 1}px` // 14px

// ---------------------------------------------------------------------------
// Track — the flex container
// ---------------------------------------------------------------------------

/** The outer flex container; applied to the <ol> element. Column on mobile, row at tablet. */
export const trackerTrack = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
  margin: '0',
  padding: '0',
  listStyle: 'none',
  '@media': {
    [TABLET]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
})

// ---------------------------------------------------------------------------
// Step — each flex item
// ---------------------------------------------------------------------------

/**
 * Each step. Mobile: a row (dot then label) with bottom padding that both spaces
 * the stacked dots and gives the vertical connector its run. Tablet: a centered
 * flex:1 column (the original horizontal layout), bottom padding removed.
 */
export const trackerStep = style({
  flex: '0 0 auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: space['2'], // 8px
  paddingBottom: space['6'], // 24px: vertical connector run between stacked dots
  position: 'relative',
  '@media': {
    [TABLET]: {
      flex: '1',
      flexDirection: 'column',
      paddingBottom: '0',
    },
  },
})

/** Drop the trailing connector gap under the last (vertical) step. */
globalStyle(`${trackerStep}:last-child`, {
  paddingBottom: '0',
})

// ---------------------------------------------------------------------------
// Dot — the status circle
// ---------------------------------------------------------------------------

/** 30px status dot circle. Variant controls colours. */
export const trackerDot = recipe({
  base: {
    width: '30px',
    height: '30px',
    borderRadius: radius.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    zIndex: 1,
    position: 'relative',
    transition: transition.fast,
  },
  variants: {
    status: {
      /** Done: solid success green, white icon. */
      done: {
        background: vars.status.success.base,
        border: `2px solid ${vars.status.success.base}`,
        color: vars.roles.fg.onDark,
      },
      /** Current: warning base fill + ring. */
      current: {
        background: vars.status.warning.base,
        border: `2px solid ${vars.status.warning.base}`,
        color: vars.roles.fg.onDark,
        boxShadow: `0 0 0 4px ${vars.status.warning.bg}`,
      },
      /** Upcoming: surface bg, strong border, subtle icon. */
      upcoming: {
        background: vars.roles.bg.surface,
        border: `2px solid ${vars.roles.border.strong}`,
        color: vars.roles.fg.subtle,
      },
    },
  },
  defaultVariants: { status: 'upcoming' },
})

globalStyle(`${trackerDot.classNames.base} svg`, {
  width: '15px',
  height: '15px',
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Label — step name text
// ---------------------------------------------------------------------------

/** 12px weight-600 step label. Variant controls colour. */
export const trackerLabel = recipe({
  base: {
    fontFamily: font.sans,
    fontSize: textSize.xs, // 12px
    fontWeight: '600',
    transition: transition.fast,
  },
  variants: {
    status: {
      done: { color: vars.roles.fg.base },
      current: { color: vars.status.warning.fg },
      upcoming: { color: vars.roles.fg.subtle },
    },
  },
  defaultVariants: { status: 'upcoming' },
})

// ---------------------------------------------------------------------------
// Line — absolute connector
// ---------------------------------------------------------------------------

/**
 * Connector between consecutive dots. Variant: done (success green) | upcoming
 * (border.strong); the last step's line is hidden via globalStyle.
 *
 * Mobile (default): VERTICAL. Pinned at the dot's horizontal centre (left), it
 * starts at the dot's vertical centre (top) and spans one full step box (the
 * `paddingBottom` run) down to the next dot's centre.
 * Tablet: HORIZONTAL, the axis swapped. Pinned at the dot's vertical centre
 * (top), starting at the dot's horizontal centre (left:50%) across to the next
 * dot.
 */
export const trackerLine = recipe({
  base: {
    position: 'absolute',
    top: DOT_CENTER, // 15px: dot vertical centre
    left: LINE_OFFSET, // 14px: dot horizontal centre, offset by half line width
    width: '2px',
    height: '100%',
    zIndex: 0,
    '@media': {
      [TABLET]: {
        top: LINE_OFFSET, // 14px: dot vertical centre, offset by half line width
        left: '50%', // dot horizontal centre
        width: '100%',
        height: '2px',
      },
    },
  },
  variants: {
    status: {
      done: { background: vars.status.success.base },
      upcoming: { background: vars.roles.border.strong },
    },
  },
  defaultVariants: { status: 'upcoming' },
})

/**
 * Hide the connector on the last step, same approach as checklist's
 * last-child border removal. Targets the recipe base class, not a data attr.
 */
globalStyle(`${trackerStep}:last-child ${trackerLine.classNames.base}`, {
  display: 'none',
})
