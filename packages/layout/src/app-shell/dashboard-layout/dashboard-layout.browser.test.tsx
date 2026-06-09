import { page } from 'vitest/browser'
import { render } from 'solid-js/web'
import { afterEach, expect, test } from 'vitest'

import { DashboardLayout } from './index'

let dispose: (() => void) | undefined

afterEach(() => {
  dispose?.()
  dispose = undefined
  document.body.innerHTML = ''
})

const shell = (): HTMLElement => document.querySelector('[data-part="shell-root"]') as HTMLElement
const drawer = (): HTMLElement => document.querySelector('[data-part~="drawer"]') as HTMLElement

test('DashboardLayout renders the named shell regions without imposing visual content', async () => {
  dispose = render(
    () => (
      <DashboardLayout
        brand={() => <strong>UniRemit</strong>}
        nav={(ctx) => <button {...ctx.navItemProps({ active: true })}>Transfers</button>}
        search={() => <label>Search<input /></label>}
        actions={(ctx) => <button {...ctx.drawerTriggerProps({ label: 'Open navigation' })}>Menu</button>}
        bottomBar={(ctx) => <button {...ctx.navItemProps()}>Mobile transfers</button>}
      >
        <p>Transfer workspace</p>
      </DashboardLayout>
    ),
    document.body,
  )

  await expect.element(page.getByText('Transfer workspace')).toBeInTheDocument()
  expect(shell().dataset.drawer).toBe('closed')
  expect(drawer().getAttribute('aria-label')).toBe('Primary')
  expect(document.querySelector('[data-part="navbar"]')).toBeInstanceOf(HTMLElement)
  expect(document.querySelector('[data-part="main"]')).toBeInstanceOf(HTMLElement)
  expect(document.querySelector('[data-part="scrim"]')).toBeInstanceOf(HTMLElement)
  expect(document.querySelector('[data-part="bottom-bar"]')).toBeInstanceOf(HTMLElement)
  expect(document.querySelectorAll('[data-part="nav-item"]')).toHaveLength(2)
  expect(page.getByRole('button', { name: 'Transfers', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  )
})

test('DashboardLayout opens from a trigger and closes through the scrim', async () => {
  dispose = render(
    () => (
      <DashboardLayout
        actions={(ctx) => <button {...ctx.drawerTriggerProps({ label: 'Open navigation' })}>Menu</button>}
      >
        <p>Dashboard</p>
      </DashboardLayout>
    ),
    document.body,
  )

  await page.getByRole('button', { name: 'Open navigation' }).click()
  expect(shell().dataset.drawer).toBe('open')
  expect(drawer().dataset.open).toBe('true')

  document.querySelector<HTMLElement>('[data-part="scrim"]')?.click()
  expect(shell().dataset.drawer).toBe('closed')
  expect(drawer().dataset.open).toBe('false')
})

test('DashboardLayout closes the drawer when selecting a nav item', async () => {
  let selected = false
  dispose = render(
    () => (
      <DashboardLayout
        defaultDrawerOpen
        nav={(ctx) => (
          <button
            {...ctx.navItemProps({
              onSelect: () => {
                selected = true
              },
            })}
          >
            Recipients
          </button>
        )}
      >
        <p>Dashboard</p>
      </DashboardLayout>
    ),
    document.body,
  )

  expect(shell().dataset.drawer).toBe('open')
  await page.getByRole('button', { name: 'Recipients' }).click()
  expect(selected).toBe(true)
  expect(shell().dataset.drawer).toBe('closed')
})

test('DashboardLayout supports controlled drawer state changes', async () => {
  let requested: boolean | undefined
  dispose = render(
    () => (
      <DashboardLayout
        drawerOpen={false}
        onDrawerOpenChange={(open) => {
          requested = open
        }}
        actions={(ctx) => <button {...ctx.drawerTriggerProps({ label: 'Open navigation' })}>Menu</button>}
      >
        <p>Dashboard</p>
      </DashboardLayout>
    ),
    document.body,
  )

  await page.getByRole('button', { name: 'Open navigation' }).click()
  expect(requested).toBe(true)
  expect(shell().dataset.drawer).toBe('closed')
})

test('DashboardLayout applies mobile drawer, scrim, and bottom bar layout from root viewport state', async () => {
  await page.viewport(720, 900)
  dispose = render(
    () => (
      <DashboardLayout defaultDrawerOpen bottomBar={() => <button>Mobile home</button>}>
        <p>Dashboard</p>
      </DashboardLayout>
    ),
    document.body,
  )

  expect(shell().dataset.viewport).toBe('mobile')
  expect(getComputedStyle(drawer()).position).toBe('fixed')
  expect(getComputedStyle(drawer()).transform).toBe('matrix(1, 0, 0, 1, 0, 0)')
  expect(getComputedStyle(document.querySelector('[data-part="scrim"]') as HTMLElement).display).toBe(
    'block',
  )
  expect(getComputedStyle(document.querySelector('[data-part="bottom-bar"]') as HTMLElement).display).toBe(
    'flex',
  )
})

test('DashboardLayout moves focus into the drawer and restores it on close', async () => {
  dispose = render(
    () => (
      <DashboardLayout
        nav={() => <button>Transfers</button>}
        actions={(ctx) => <button {...ctx.drawerTriggerProps({ label: 'Open navigation' })}>Menu</button>}
      >
        <p>Dashboard</p>
      </DashboardLayout>
    ),
    document.body,
  )

  const trigger = page.getByRole('button', { name: 'Open navigation' })
  await trigger.click()
  await expect.element(page.getByRole('button', { name: 'Transfers' })).toHaveFocus()

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await expect.element(trigger).toHaveFocus()
  expect(shell().dataset.drawer).toBe('closed')
})
