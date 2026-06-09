import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { splitGridConfig, splitGridMainStyle, splitGridRailStyle } from '@impress/layout'

import { breakpoint, space } from '../tokens'

/**
 * The `splitGrid` recipe is the asymmetric main-plus-rail layout. Below the
 * desktop breakpoint it is a single stacked column (main then rail); at or above
 * it the grid expands into two columns. The rail width and side are variants;
 * because the desktop column order depends on both, they are expressed as
 * compoundVariants over rail and railSide. The `gap` reuses the shared layout
 * gap scale.
 *
 * The rail track sizes are intrinsic layout geometry (not theme tokens), so they
 * are bare rem literals. The desktop breakpoint comes from the shared token so
 * the shell and this layout collapse at the same width by construction.
 */
const rail = { sm: '18rem', md: '22rem', lg: '26rem' } as const

export const splitGrid = recipe(splitGridConfig(space, rail, breakpoint))

/** Main slot — occupies the `main` grid area (placement independent of DOM order). */
export const splitGridMain = style(splitGridMainStyle)
/** Rail slot — occupies the `rail` grid area, so railSide can flip sides without reordering the DOM. */
export const splitGridRail = style(splitGridRailStyle)
