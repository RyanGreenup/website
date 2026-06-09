import { globalStyle, style } from '@vanilla-extract/css'

const desktopSelector = '&[data-viewport="desktop"]'

export const root = style({
  vars: {
    '--dashboard-layout-nav-height': '3.875rem',
    '--dashboard-layout-bottom-bar-height': '4.75rem',
    '--dashboard-layout-sidebar-width': '252px',
    '--dashboard-layout-drawer-width': '286px',
    '--dashboard-layout-z-scrim': '43',
    '--dashboard-layout-z-drawer': '44',
    '--dashboard-layout-z-bottom-bar': '45',
    '--dashboard-layout-z-navbar': '50',
  },
  height: '100dvh',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'var(--dashboard-layout-nav-height) 1fr',
  gridTemplateAreas: '"bar" "main"',
  selectors: {
    [desktopSelector]: {
      gridTemplateColumns: 'var(--dashboard-layout-sidebar-width) 1fr',
      gridTemplateAreas: '"side bar" "side main"',
    },
  },
})

export const sidebar = style({
  gridArea: 'side',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
})

export const navbar = style({
  gridArea: 'bar',
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  zIndex: 'var(--dashboard-layout-z-navbar)',
})

export const main = style({
  gridArea: 'main',
  minWidth: 0,
  overflowY: 'auto',
})

export const scrim = style({
  display: 'none',
})

export const bottomBar = style({
  display: 'none',
})

globalStyle(`${root}[data-viewport="mobile"] ${sidebar}`, {
  position: 'fixed',
  top: 'var(--dashboard-layout-nav-height)',
  left: 0,
  bottom: 'var(--dashboard-layout-bottom-bar-height)',
  width: 'var(--dashboard-layout-drawer-width)',
  zIndex: 'var(--dashboard-layout-z-drawer)',
  overflowY: 'auto',
  transform: 'translateX(-105%)',
  transition: 'transform 280ms cubic-bezier(.2, .8, .2, 1)',
})

globalStyle(`${root}[data-viewport="mobile"] ${sidebar}[data-open="true"]`, {
  transform: 'translateX(0)',
})

globalStyle(`${root}[data-viewport="mobile"] ${main}`, {
  paddingBottom: 'var(--dashboard-layout-bottom-bar-height)',
})

globalStyle(`${root}[data-viewport="mobile"] ${scrim}`, {
  display: 'block',
  position: 'fixed',
  top: 'var(--dashboard-layout-nav-height)',
  left: 0,
  right: 0,
  bottom: 'var(--dashboard-layout-bottom-bar-height)',
  zIndex: 'var(--dashboard-layout-z-scrim)',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 280ms cubic-bezier(.2, .8, .2, 1)',
})

globalStyle(`${root}[data-viewport="mobile"] ${scrim}[data-open="true"]`, {
  opacity: 1,
  pointerEvents: 'auto',
})

globalStyle(`${root}[data-viewport="mobile"] ${bottomBar}`, {
  display: 'flex',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  height: 'var(--dashboard-layout-bottom-bar-height)',
  zIndex: 'var(--dashboard-layout-z-bottom-bar)',
})
