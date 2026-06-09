import { page } from 'vitest/browser'
import { render } from 'solid-js/web'
import { afterEach, expect, test } from 'vitest'

// recipe() must run in a .css.ts build-time context; this fixture exports the
// compiled callable so the browser test gets real CSS class names.
import {
  testAutoGrid,
  testFlow,
  testSpace,
  testSplitGrid,
  testSplitGridMain,
  testSplitGridRail,
} from '../test/layout.test.css'
import { createAutoGrid, createCluster, createSpacer, createSplitGrid, createStack } from './faces'
import { flowConfig } from './recipes'

const Stack = createStack(testFlow)
const Cluster = createCluster(testFlow)
const AutoGrid = createAutoGrid(testAutoGrid)
const SplitGrid = createSplitGrid(testSplitGrid, testSplitGridMain, testSplitGridRail)

let dispose: (() => void) | undefined
afterEach(() => {
  dispose?.()
  dispose = undefined
  document.body.innerHTML = ''
})
const root = (): HTMLElement => document.body.firstElementChild as HTMLElement

test('createCluster lays children in a row with align/justify and binds gap', async () => {
  dispose = render(
    () => (
      <Cluster gap="tight" justify="between" align="end">
        <span>x</span>
        <span>y</span>
      </Cluster>
    ),
    document.body,
  )

  const computed = getComputedStyle(root())
  expect(computed.flexDirection).toBe('row')
  expect(computed.columnGap).toBe('8px') // tight -> gap:0.5rem -> 8px at 16px root
  expect(computed.justifyContent).toBe('space-between')
  expect(computed.alignItems).toBe('flex-end')
})

test('flowConfig variant vocabulary matches the FlowRecipe contract', () => {
  const v = flowConfig(testSpace).variants
  expect(Object.keys(v.direction).sort()).toEqual(['column', 'row'])
  expect(Object.keys(v.gap).sort()).toEqual(['loose', 'normal', 'section', 'tight'])
  expect(Object.keys(v.align).sort()).toEqual(['center', 'end', 'start', 'stretch'])
  expect(Object.keys(v.justify).sort()).toEqual(['between', 'center', 'end', 'start'])
  expect(Object.keys(v.wrap).sort()).toEqual(['false', 'true'])
})

test('createSpacer renders a flex:1 child', async () => {
  const Spacer = createSpacer('spacerclass')
  dispose = render(() => <Spacer />, document.body)
  const el = root()
  expect(el.className).toContain('spacerclass')
})

test('createStack lays children in a column and binds the section gap (32px)', async () => {
  dispose = render(
    () => (
      <Stack>
        <span>a</span>
        <span>b</span>
      </Stack>
    ),
    document.body,
  )

  await expect.element(page.getByText('a')).toBeInTheDocument()
  const computed = getComputedStyle(root())
  expect(computed.display).toBe('flex')
  expect(computed.flexDirection).toBe('column')
  expect(computed.rowGap).toBe('32px')
})

/** Resolved column count when AutoGrid(min) sits in a fixed-width box. */
const autoGridColCountAt = (width: string, min: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): number => {
  dispose?.()
  document.body.innerHTML = ''
  dispose = render(
    () => (
      <div>
        <AutoGrid min={min}>
          {Array.from({ length: 8 }, (_unused, i) => (
            <span>cell {i}</span>
          ))}
        </AutoGrid>
      </div>
    ),
    document.body,
  )
  const box = document.body.firstElementChild as HTMLElement
  box.style.width = width
  const grid = box.firstElementChild as HTMLElement
  return getComputedStyle(grid).gridTemplateColumns.split(' ').length
}

test('createAutoGrid renders a grid and binds the normal column gap (16px)', async () => {
  dispose = render(
    () => (
      <AutoGrid>
        <span>a</span>
        <span>b</span>
      </AutoGrid>
    ),
    document.body,
  )

  const computed = getComputedStyle(root())
  expect(computed.display).toBe('grid')
  expect(computed.columnGap).toBe('16px') // normal -> gap:1rem -> 16px at 16px root
})

test('createAutoGrid reflows column count from width alone via the min threshold', async () => {
  // md min = 16rem = 256px. Same component, two container widths:
  expect(autoGridColCountAt('600px', 'md')).toBe(2)
  expect(autoGridColCountAt('280px', 'md')).toBe(1)
  // A smaller min packs at least as many columns at the same width.
  expect(autoGridColCountAt('600px', 'xs')).toBeGreaterThanOrEqual(
    autoGridColCountAt('600px', 'lg'),
  )
})

const splitGridRoot = (): HTMLElement => document.body.firstElementChild as HTMLElement
const splitGridMain = (): HTMLElement => splitGridRoot().children[0] as HTMLElement
const splitGridRail = (): HTMLElement => splitGridRoot().children[1] as HTMLElement

test('createSplitGrid renders main + rail as a grid with main first in the DOM', async () => {
  dispose = render(
    () => <SplitGrid main={<p>the main</p>} rail={<p>the rail</p>} />,
    document.body,
  )

  await expect.element(page.getByText('the main')).toBeInTheDocument()
  await expect.element(page.getByText('the rail')).toBeInTheDocument()
  expect(getComputedStyle(splitGridRoot()).display).toBe('grid')
  expect(splitGridMain().textContent).toBe('the main')
  expect(splitGridRail().textContent).toBe('the rail')
})

test('createSplitGrid stacks below the desktop breakpoint', async () => {
  await page.viewport(800, 900)
  dispose = render(() => <SplitGrid main={<p>m</p>} rail={<p>r</p>} />, document.body)

  const main = splitGridMain().getBoundingClientRect()
  const rail = splitGridRail().getBoundingClientRect()
  expect(rail.top).toBeGreaterThan(main.top)
  expect(Math.abs(rail.width - main.width)).toBeLessThan(2)
})

test('createSplitGrid places the rail on either side at desktop without changing DOM order', async () => {
  await page.viewport(1280, 900)
  dispose = render(
    () => <SplitGrid railSide="left" main={<p>main</p>} rail={<p>rail</p>} />,
    document.body,
  )

  const main = splitGridMain().getBoundingClientRect()
  const rail = splitGridRail().getBoundingClientRect()
  expect(rail.left).toBeLessThan(main.left)
  expect(Math.round(rail.width)).toBe(352)
  expect(splitGridMain().textContent).toBe('main')
})
