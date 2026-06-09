import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { flowConfig, gapConfig, spacerStyle } from '@impress/layout'

import { space } from '../tokens'

/**
 * The shared gap scale for every layout primitive (Stack, Cluster, AutoGrid,
 * SplitGrid), bound to uniremit's `space` tokens. One curated rhythm so spacing
 * stays consistent: tight → section. Re-exported for the grid recipes; never
 * redeclared. The mechanism lives in `@impress/layout` (`gapConfig`).
 */
export const gapVariants = gapConfig(space)

/**
 * The single flex engine behind the Stack (column) and Cluster (row)
 * faces, bound to uniremit tokens. Layout only; owns no colours. The recipe
 * config comes from `@impress/layout` (`flowConfig`); `recipe()` is called here
 * so vanilla-extract extracts the CSS in the design package. Faces consume this.
 */
export const flow = recipe(flowConfig(space))

/**
 * A flex child that grows to push its siblings apart inside a flow
 * (replaces ad-hoc `margin-left:auto` / `flex:1` divs). Config from
 * `@impress/layout` (`spacerStyle`).
 */
export const spacer = style(spacerStyle)
