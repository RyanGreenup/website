/**
 * Data-table recipe — themes the @impress/solid-primitives VirtualizedDataTable.
 *
 * The primitive renders a div grid and emits data-part hooks
 * (root/scroll/header/header-row/header-cell/body/row/cell). We attach the
 * `dataTableTheme` class to the primitive's root and theme its parts via scoped
 * globalStyle. Colours use vars.roles.*; no hard-coded hex. Off-grid design-spec
 * sizes use literal strings with `// design spec` comments.
 */

import { globalStyle, style } from '@vanilla-extract/css'

import { font, radius, textSize, tracking, transition } from '../tokens'
import { vars } from '../theme.css'

/** Attach to <VirtualizedDataTable class={dataTableTheme} …>. Provides bounded height. */
export const dataTableTheme = style({
  width: '100%',
  height: '420px', // design spec: default viewport height; consumers may override
  border: `1px solid ${vars.roles.border.base}`,
  borderRadius: radius.lg,
  background: vars.roles.bg.surface,
  fontSize: textSize.sm,
  overflow: 'hidden',
})

globalStyle(`${dataTableTheme} [data-part="header"]`, {
  background: vars.roles.bg.app,
  borderBottom: `1px solid ${vars.roles.border.base}`,
})

globalStyle(`${dataTableTheme} [data-part="header-cell"]`, {
  display: 'flex',
  alignItems: 'center',
  gap: '6px', // design spec
  padding: '7px 12px', // design spec
  fontFamily: font.sans,
  fontSize: textSize['2xs'],
  fontWeight: '600',
  color: vars.roles.fg.subtle,
  textTransform: 'uppercase',
  letterSpacing: tracking.wide,
  transition: transition.fast,
})

globalStyle(`${dataTableTheme} [data-part="header-cell"][data-sortable="true"]:hover`, {
  background: vars.roles.border.subtle,
})

globalStyle(`${dataTableTheme} [data-part="header-cell"]:focus-visible`, {
  outline: `2px solid ${vars.roles.brand.primary}`,
  outlineOffset: '-2px',
})

globalStyle(`${dataTableTheme} [data-part="row"]`, {
  borderBottom: `1px solid ${vars.roles.border.subtle}`,
})

globalStyle(`${dataTableTheme} [data-part="cell"]`, {
  display: 'flex',
  alignItems: 'center',
  padding: '9px 12px', // design spec
  fontFamily: font.sans,
  fontSize: textSize.sm,
  color: vars.roles.fg.base,
})

/** Wrap mono cell content (reference/send/receive) with this. */
export const dataTableMono = style({
  fontFamily: font.mono,
  fontVariantNumeric: 'tabular-nums',
})
