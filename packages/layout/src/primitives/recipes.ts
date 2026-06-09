/** The four space steps the gap scale needs, keyed by token name. */
export interface GapSpace {
  '2': string
  '4': string
  '6': string
  '8': string
}

/** Shared gap scale used by every layout face. tight -> section. */
export const gapConfig = (space: GapSpace) =>
  ({
    tight: { gap: space['2'] },
    normal: { gap: space['4'] },
    loose: { gap: space['6'] },
    section: { gap: space['8'] },
  }) as const

/**
 * Config for the `flow` engine recipe. Call inside a design's `.css.ts`:
 *   export const flow = recipe(flowConfig(space))
 *
 * The recipe's own `gap` default is `'normal'`; individual faces are expected
 * to supply their own gap default (e.g. Stack overrides it to `'section'`).
 */
export const flowConfig = (space: GapSpace) =>
  ({
    base: { display: 'flex' },
    variants: {
      direction: {
        column: { flexDirection: 'column' },
        row: { flexDirection: 'row' },
      },
      gap: gapConfig(space),
      align: {
        start: { alignItems: 'flex-start' },
        center: { alignItems: 'center' },
        end: { alignItems: 'flex-end' },
        stretch: { alignItems: 'stretch' },
      },
      justify: {
        start: { justifyContent: 'flex-start' },
        center: { justifyContent: 'center' },
        end: { justifyContent: 'flex-end' },
        between: { justifyContent: 'space-between' },
      },
      wrap: {
        true: { flexWrap: 'wrap' },
        false: { flexWrap: 'nowrap' },
      },
    },
    defaultVariants: { direction: 'column', gap: 'normal' },
  }) as const

/** Intrinsic minmax wrap thresholds for AutoGrid (geometry, not theme tokens). */
export interface AutoGridMins {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

/**
 * Config for the `autoGrid` engine recipe. Call inside a design's `.css.ts`:
 *   export const autoGrid = recipe(autoGridConfig(space, mins))
 * `gap` reuses the shared gap scale; `min` is the auto-fit wrap threshold (geometry).
 */
export const autoGridConfig = (space: GapSpace, mins: AutoGridMins) =>
  ({
    base: { display: 'grid' },
    variants: {
      // Keep this fan-out literal (not Object.fromEntries): `AutoGridRecipe` in
      // faces.tsx derives the exact `min` union from these keys. A computed map
      // would widen the keys to `string` and silently lose that vocabulary.
      min: {
        xs: { gridTemplateColumns: `repeat(auto-fit, minmax(${mins.xs}, 1fr))` },
        sm: { gridTemplateColumns: `repeat(auto-fit, minmax(${mins.sm}, 1fr))` },
        md: { gridTemplateColumns: `repeat(auto-fit, minmax(${mins.md}, 1fr))` },
        lg: { gridTemplateColumns: `repeat(auto-fit, minmax(${mins.lg}, 1fr))` },
        xl: { gridTemplateColumns: `repeat(auto-fit, minmax(${mins.xl}, 1fr))` },
      },
      gap: gapConfig(space),
    },
    defaultVariants: { min: 'md', gap: 'normal' },
  }) as const

/** Intrinsic rail widths for SplitGrid (geometry, not theme tokens). */
export interface SplitGridRails {
  sm: string
  md: string
  lg: string
}

export interface SplitGridBreakpoints {
  /** Width at which SplitGrid expands from stacked mobile layout to main + rail. */
  desktop: string
}

/** Config for the main SplitGrid slot. Call: export const splitGridMain = style(splitGridMainStyle) */
export const splitGridMainStyle = { gridArea: 'main' } as const

/** Config for the rail SplitGrid slot. Call: export const splitGridRail = style(splitGridRailStyle) */
export const splitGridRailStyle = { gridArea: 'rail' } as const

const desktopSplitGrid = (
  breakpoint: string,
  cols: string,
  areas: string,
): { '@media': Record<string, { gridTemplateColumns: string; gridTemplateAreas: string }> } => ({
  '@media': {
    [`screen and (min-width: ${breakpoint})`]: {
      gridTemplateColumns: cols,
      gridTemplateAreas: areas,
    },
  },
})

/**
 * Config for the `splitGrid` recipe. Call inside a design's `.css.ts`:
 *   export const splitGrid = recipe(splitGridConfig(space, rails, breakpoint))
 * `gap` reuses the shared gap scale; `rail` and `breakpoint` are layout geometry.
 */
export const splitGridConfig = (
  space: GapSpace,
  rails: SplitGridRails,
  breakpoint: SplitGridBreakpoints,
) =>
  ({
    base: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: '"main" "rail"',
    },
    variants: {
      gap: gapConfig(space),
      // Keep this fan-out literal: `SplitGridRecipe` in faces.tsx derives the
      // exact rail union from these keys.
      rail: { sm: {}, md: {}, lg: {} },
      railSide: { left: {}, right: {} },
    },
    compoundVariants: [
      {
        variants: { rail: 'sm', railSide: 'right' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `minmax(0, 1fr) ${rails.sm}`, '"main rail"'),
      },
      {
        variants: { rail: 'md', railSide: 'right' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `minmax(0, 1fr) ${rails.md}`, '"main rail"'),
      },
      {
        variants: { rail: 'lg', railSide: 'right' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `minmax(0, 1fr) ${rails.lg}`, '"main rail"'),
      },
      {
        variants: { rail: 'sm', railSide: 'left' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `${rails.sm} minmax(0, 1fr)`, '"rail main"'),
      },
      {
        variants: { rail: 'md', railSide: 'left' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `${rails.md} minmax(0, 1fr)`, '"rail main"'),
      },
      {
        variants: { rail: 'lg', railSide: 'left' } as const,
        style: desktopSplitGrid(breakpoint.desktop, `${rails.lg} minmax(0, 1fr)`, '"rail main"'),
      },
    ],
    defaultVariants: { gap: 'normal', rail: 'md', railSide: 'right' } as const,
  })

/** Config for the `spacer` style. Call: export const spacer = style(spacerStyle) */
export const spacerStyle = { flex: 1 } as const
