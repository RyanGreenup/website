/**
 * Build-time fixture for faces.browser.test.tsx.
 *
 * Calls recipe() in a .css.ts context so vanilla-extract can generate real
 * CSS class names. The test imports the compiled callable from here, not from
 * a raw recipe() call in the test file.
 *
 * Uses a deliberately non-uniremit space scale to prove the factory is
 * theme-agnostic: 'section' → 2rem → 32px at root 16px.
 */
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import {
  autoGridConfig,
  flowConfig,
  splitGridConfig,
  splitGridMainStyle,
  splitGridRailStyle,
} from '../primitives/recipes'

export const testSpace = { '2': '0.5rem', '4': '1rem', '6': '1.5rem', '8': '2rem' } as const

export const testFlow = recipe(flowConfig(testSpace))

const testMins = { xs: '8rem', sm: '12rem', md: '16rem', lg: '20rem', xl: '24rem' } as const
export const testAutoGrid = recipe(autoGridConfig(testSpace, testMins))

export const testRails = { sm: '18rem', md: '22rem', lg: '26rem' } as const
export const testBreakpoint = { desktop: '1024px' } as const
export const testSplitGrid = recipe(splitGridConfig(testSpace, testRails, testBreakpoint))
export const testSplitGridMain = style(splitGridMainStyle)
export const testSplitGridRail = style(splitGridRailStyle)
