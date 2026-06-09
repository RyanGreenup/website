import type { JSXElement } from 'solid-js'
// Type-only imports: the recipe vocabulary has a single source (the configs in
// `./recipes`), and these faces derive their types from it rather than restating
// it. Type-only keeps the package theme-agnostic -- no VE runtime types leak in.
import type {
  autoGridConfig,
  flowConfig,
  gapConfig,
  splitGridConfig,
} from './recipes'
import type { RecipeVariantArg } from './variant-arg'

type FlowVariants = ReturnType<typeof flowConfig>['variants']

/** Shared gap vocabulary across the layout faces. Derived from `gapConfig`. */
export type Gap = keyof ReturnType<typeof gapConfig>
export type Align = keyof FlowVariants['align']
export type Justify = keyof FlowVariants['justify']

/** The runtime shape of a `flow` recipe (what `recipe(flowConfig(space))` returns). */
export type FlowRecipe = (variants?: RecipeVariantArg<FlowVariants>) => string

export interface StackProps {
  /** Spacing between children. Default `section`. */
  gap?: Gap
  children: JSXElement
}

/** Build a Stack (vertical flow) bound to a design's `flow` recipe. */
export const createStack = (flow: FlowRecipe) => {
  const Stack = (props: StackProps): JSXElement => (
    <div class={flow({ direction: 'column', gap: props.gap ?? 'section' })}>
      {props.children}
    </div>
  )
  return Stack
}

export interface ClusterProps {
  /** Spacing between children. Default `normal`. */
  gap?: Gap
  /** Cross-axis alignment. Default `center`. */
  align?: Align
  /** Main-axis distribution. Default `start`. */
  justify?: Justify
  /** Whether children wrap onto multiple rows. Default `true`. */
  wrap?: boolean
  children: JSXElement
}

/** Build a Cluster (horizontal flow) bound to a design's `flow` recipe. */
export const createCluster = (flow: FlowRecipe) => {
  const Cluster = (props: ClusterProps): JSXElement => (
    <div
      class={flow({
        direction: 'row',
        gap: props.gap ?? 'normal',
        align: props.align ?? 'center',
        justify: props.justify ?? 'start',
        wrap: props.wrap ?? true,
      })}
    >
      {props.children}
    </div>
  )
  return Cluster
}

type AutoGridVariants = ReturnType<typeof autoGridConfig>['variants']
export type AutoGridMin = keyof AutoGridVariants['min']
export type AutoGridRecipe = (variants?: RecipeVariantArg<AutoGridVariants>) => string
export interface AutoGridProps {
  /** Wrap threshold (smallest a cell may get before the row drops one). Default `md`. */
  min?: AutoGridMin
  /** Gap between cells. Default `normal`. */
  gap?: Gap
  children: JSXElement
}

/** Build an AutoGrid (breakpoint-free auto-fit grid) bound to a design's `autoGrid` recipe. */
export const createAutoGrid = (autoGrid: AutoGridRecipe) => {
  const AutoGrid = (props: AutoGridProps): JSXElement => (
    <div class={autoGrid({ min: props.min ?? 'md', gap: props.gap ?? 'normal' })}>
      {props.children}
    </div>
  )
  return AutoGrid
}

type SplitGridVariants = ReturnType<typeof splitGridConfig>['variants']
export type SplitGridRailWidth = keyof SplitGridVariants['rail']
export type SplitGridRailSide = keyof SplitGridVariants['railSide']
export type SplitGridGap = Gap
export type SplitGridRecipe = (variants?: RecipeVariantArg<SplitGridVariants>) => string

export interface SplitGridProps {
  /** The primary column content. Always first in the DOM. */
  main: JSXElement
  /** The secondary rail content. */
  rail: JSXElement
  /** Rail width at desktop. Default `md`. */
  railWidth?: SplitGridRailWidth
  /** Side the rail sits on at desktop. Default `right`. */
  railSide?: SplitGridRailSide
  /** Gap between columns / stacked rows. Default `normal`. */
  gap?: Gap
}

/** Build a SplitGrid bound to a design's splitGrid recipe and slot classes. */
export const createSplitGrid = (
  splitGrid: SplitGridRecipe,
  splitGridMainClass: string,
  splitGridRailClass: string,
) => {
  const SplitGrid = (props: SplitGridProps): JSXElement => (
    <div
      class={splitGrid({
        gap: props.gap ?? 'normal',
        rail: props.railWidth ?? 'md',
        railSide: props.railSide ?? 'right',
      })}
    >
      <div class={splitGridMainClass}>{props.main}</div>
      <div class={splitGridRailClass}>{props.rail}</div>
    </div>
  )
  return SplitGrid
}

/**
 * Build a Spacer bound to a design's `spacer` class. `spacerClass` should be the
 * return value of `style(spacerStyle)` from the design package.
 */
export const createSpacer = (spacerClass: string) => {
  const Spacer = (): JSXElement => <div class={spacerClass} />
  return Spacer
}
