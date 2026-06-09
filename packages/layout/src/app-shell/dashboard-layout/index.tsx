import {
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  type JSX,
  type JSXElement,
} from 'solid-js'

import { bottomBar, main, navbar, root, scrim, sidebar } from './dashboard-layout.css'

export type DashboardLayoutPart =
  | 'root'
  | 'sidebar'
  | 'navbar'
  | 'main'
  | 'scrim'
  | 'bottomBar'
  | 'navItem'

export interface DashboardLayoutClasses {
  root?: string
  sidebar?: string
  navbar?: string
  main?: string
  scrim?: string
  bottomBar?: string
  navItem?: string
}

export interface DashboardLayoutGeometry {
  navHeight?: string
  bottomBarHeight?: string
  sidebarWidth?: string
  drawerWidth?: string
  desktopBreakpoint?: string
  zScrim?: number
  zDrawer?: number
  zBottomBar?: number
  zNavbar?: number
}

export interface DashboardLayoutSlotContext {
  drawerOpen: () => boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  drawerTriggerProps: (options?: { label?: string }) => JSX.ButtonHTMLAttributes<HTMLButtonElement>
  navItemProps: (options?: {
    active?: boolean
    onSelect?: () => void
  }) => JSX.ButtonHTMLAttributes<HTMLButtonElement>
}

export interface DashboardLayoutProps {
  children: JSXElement
  brand?: (context: DashboardLayoutSlotContext) => JSXElement
  nav?: (context: DashboardLayoutSlotContext) => JSXElement
  search?: (context: DashboardLayoutSlotContext) => JSXElement
  actions?: (context: DashboardLayoutSlotContext) => JSXElement
  bottomBar?: (context: DashboardLayoutSlotContext) => JSXElement
  classes?: DashboardLayoutClasses
  geometry?: DashboardLayoutGeometry
  drawerOpen?: boolean
  defaultDrawerOpen?: boolean
  onDrawerOpenChange?: (open: boolean) => void
  sidebarLabel?: string
  bottomBarLabel?: string
}

const DEFAULT_BREAKPOINT = '1024px'

const classNames = (...names: Array<string | undefined>): string | undefined =>
  names.filter(Boolean).join(' ') || undefined

const drawerState = (open: boolean): 'open' | 'closed' => (open ? 'open' : 'closed')

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const firstFocusable = (el: HTMLElement | undefined): HTMLElement | undefined =>
  el?.querySelector<HTMLElement>(focusableSelector) ?? undefined

const geometryStyle = (geometry: DashboardLayoutGeometry | undefined): JSX.CSSProperties => ({
  '--dashboard-layout-nav-height': geometry?.navHeight,
  '--dashboard-layout-bottom-bar-height': geometry?.bottomBarHeight,
  '--dashboard-layout-sidebar-width': geometry?.sidebarWidth,
  '--dashboard-layout-drawer-width': geometry?.drawerWidth,
  '--dashboard-layout-z-scrim': geometry?.zScrim?.toString(),
  '--dashboard-layout-z-drawer': geometry?.zDrawer?.toString(),
  '--dashboard-layout-z-bottom-bar': geometry?.zBottomBar?.toString(),
  '--dashboard-layout-z-navbar': geometry?.zNavbar?.toString(),
})

export const DashboardLayout = (props: DashboardLayoutProps): JSXElement => {
  const drawerId = createUniqueId()
  const [internalOpen, setInternalOpen] = createSignal(props.defaultDrawerOpen ?? false)
  const [desktop, setDesktop] = createSignal(false)

  let sidebarRef: HTMLElement | undefined
  let restoreFocusTo: HTMLElement | undefined
  let initializedFocusEffect = false
  let lastOpen = false

  const isControlled = () => props.drawerOpen !== undefined
  const isOpen = () => props.drawerOpen ?? internalOpen()
  const viewport = () => (desktop() ? 'desktop' : 'mobile')

  const setOpen = (open: boolean): void => {
    if (!isControlled()) {
      setInternalOpen(open)
    }
    props.onDrawerOpenChange?.(open)
  }

  const closeDrawer = (): void => setOpen(false)
  const openDrawer = (): void => setOpen(true)
  const toggleDrawer = (): void => setOpen(!isOpen())

  const context = createMemo<DashboardLayoutSlotContext>(() => ({
    drawerOpen: isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    drawerTriggerProps: (options) => ({
      type: 'button',
      'aria-controls': drawerId,
      'aria-expanded': isOpen(),
      'aria-label': options?.label ?? 'Toggle menu',
      onClick: toggleDrawer,
    }),
    navItemProps: (options) => ({
      type: 'button',
      class: props.classes?.navItem,
      'data-part': 'nav-item',
      'aria-current': options?.active ? 'page' : undefined,
      onClick: () => {
        options?.onSelect?.()
        closeDrawer()
      },
    }),
  }))

  onMount(() => {
    const media = window.matchMedia(`(min-width: ${props.geometry?.desktopBreakpoint ?? DEFAULT_BREAKPOINT})`)
    const sync = (): void => {
      setDesktop(media.matches)
    }
    sync()
    media.addEventListener('change', sync)

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen()) {
        closeDrawer()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    onCleanup(() => {
      media.removeEventListener('change', sync)
      document.removeEventListener('keydown', onKeyDown)
    })
  })

  createEffect(() => {
    const open = isOpen()
    if (!initializedFocusEffect) {
      initializedFocusEffect = true
      lastOpen = open
      return
    }
    if (open === lastOpen) {
      return
    }
    lastOpen = open

    if (open) {
      restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
      queueMicrotask(() => firstFocusable(sidebarRef)?.focus())
      return
    }

    queueMicrotask(() => restoreFocusTo?.focus())
  })

  return (
    <div
      class={classNames(root, props.classes?.root)}
      data-part="shell-root"
      data-drawer={drawerState(isOpen())}
      data-viewport={viewport()}
      style={geometryStyle(props.geometry)}
    >
      <aside
        id={drawerId}
        ref={(el) => {
          sidebarRef = el
        }}
        class={classNames(sidebar, props.classes?.sidebar)}
        data-part="sidebar drawer"
        data-open={isOpen() ? 'true' : 'false'}
        aria-label={props.sidebarLabel ?? 'Primary'}
      >
        {props.brand?.(context())}
        {props.nav?.(context())}
      </aside>

      <header class={classNames(navbar, props.classes?.navbar)} data-part="navbar">
        {props.search?.(context())}
        {props.actions?.(context())}
      </header>

      <main class={classNames(main, props.classes?.main)} data-part="main">
        {props.children}
      </main>

      <div
        class={classNames(scrim, props.classes?.scrim)}
        data-part="scrim"
        data-open={isOpen() ? 'true' : 'false'}
        role="presentation"
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <nav
        class={classNames(bottomBar, props.classes?.bottomBar)}
        data-part="bottom-bar"
        aria-label={props.bottomBarLabel ?? 'Primary mobile'}
      >
        {props.bottomBar?.(context())}
      </nav>
    </div>
  )
}
