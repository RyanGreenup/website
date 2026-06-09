import { globalStyle, style } from '@vanilla-extract/css'

import { font, radius, space, textSize, transition } from '../tokens'
import { vars } from '../theme.css'

/**
 * Upload recipes for the document-upload list (upload list, cards, dropzone).
 *
 * `base` carries only mode-invariant tokens (radius, spacing, font, motion).
 * All colours come from the typed theme contract (`vars.roles.*`) so light and
 * dark flip automatically with no hard-coded hex.
 *
 * The multi-part exports are as follows. `uploadList` is the flex-row container
 * for the document cards. `documentCard` is an individual document card (border,
 * bg, radius, padding). `documentName` is the file name row (12px weight-600,
 * icon plus text). `documentCaption` is the mono caption below the status chip
 * (10px, fg-subtle). `uploadDropzone` is the dashed drop target (a button,
 * column-center, with a dashed border-strong).
 */

// ---------------------------------------------------------------------------
// Upload list
// ---------------------------------------------------------------------------

/** Flex-row container that holds the document cards. */
export const uploadList = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: space['3'],
})

// ---------------------------------------------------------------------------
// Document card
// ---------------------------------------------------------------------------

/** Individual document card: bordered surface, radius-md, column flex. */
export const documentCard = style({
  flex: '1',
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.md,
  background: vars.roles.bg.surface,
  padding: `${space['3']} ${space['3']}`, // ~11px 12px
  display: 'flex',
  flexDirection: 'column',
  gap: space['2'],
  transition: transition.colors,
})

// ---------------------------------------------------------------------------
// Document name row
// ---------------------------------------------------------------------------

/** File name row — 12px weight-600 fg.base with a leading icon. */
export const documentName = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['1'], // ~6px
  fontFamily: font.sans,
  fontSize: textSize.xs,
  fontWeight: '600',
  color: vars.roles.fg.base,
})

/** Scale the file-type icon inside the name row. */
globalStyle(`${documentName} svg`, {
  width: '14px',
  height: '14px',
  flexShrink: 0,
  color: vars.roles.fg.muted,
})

// ---------------------------------------------------------------------------
// Document caption
// ---------------------------------------------------------------------------

/** Mono caption beneath the badge (e.g. "Expires 14 Aug 2031"). */
export const documentCaption = style({
  fontFamily: font.mono,
  fontSize: textSize['3xs'],
  color: vars.roles.fg.subtle,
  lineHeight: '1.4',
})

// ---------------------------------------------------------------------------
// Upload dropzone
// ---------------------------------------------------------------------------

/**
 * Drop target: dashed border-strong, radius-md, column-center, fg-subtle text.
 * Rendered as a `<button>` for keyboard accessibility.
 */
export const uploadDropzone = style({
  border: `1.5px dashed ${vars.roles.border.strong}`,
  borderRadius: radius.md,
  padding: space['3'], // ~14px
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space['1'], // ~5px
  color: vars.roles.fg.subtle,
  fontFamily: font.sans,
  fontSize: textSize.xs,
  lineHeight: '1.4',
  textAlign: 'center',
  background: 'transparent',
  cursor: 'pointer',
  width: '100%',
  transition: transition.colors,
  selectors: {
    '&:hover': {
      background: vars.roles.bg.hover,
      borderColor: vars.roles.border.base,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 3px ${vars.roles.brand.ring}`,
    },
  },
})

/** Scale the upload-cloud icon inside the dropzone. */
globalStyle(`${uploadDropzone} svg`, {
  width: '20px',
  height: '20px',
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Dropzone hint text
// ---------------------------------------------------------------------------

/** Smaller hint line inside the dropzone (file types + max size). */
export const uploadDropzoneHint = style({
  fontSize: textSize['3xs'],
  // fontFamily, color, lineHeight inherit from parent uploadDropzone
})
