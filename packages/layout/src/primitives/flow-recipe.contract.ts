/**
 * DRIFT GUARD: FlowRecipe (faces.tsx) <-> flowConfig (recipes.ts)
 *
 * WHAT this file guards
 * ---------------------
 * `FlowRecipe` in `./faces` is a HAND-WRITTEN structural callable type describing
 * the variant argument that `recipe(flowConfig(space))` accepts. It is NOT derived
 * from `flowConfig`, so an edit that adds/removes/renames a variant (key or value)
 * in `flowConfig` could silently leave `FlowRecipe` stale -- and nothing else would
 * catch it.
 *
 * WHY it exists
 * -------------
 * This is a TYPE-ONLY contract (it compiles to nothing). It derives the EXPECTED
 * variant-argument type directly from `flowConfig`'s actual `as const` output and
 * asserts it is EXACTLY equal to the argument type `FlowRecipe` declares. If the
 * two ever diverge, `_AssertFlowRecipeInSyncWithConfig` below stops compiling and
 * `tsc --noEmit` (run via `check-types`) fails.
 *
 * IF YOU HIT A COMPILE ERROR ON THE ASSERT LINE
 * ---------------------------------------------
 * `FlowRecipe` (packages/layout/src/primitives/faces.tsx) and `flowConfig`
 * (packages/layout/src/primitives/recipes.ts) have drifted. Reconcile their vocabulary:
 * update the hand-written `FlowRecipe` to match the variants `flowConfig` declares
 * (or vice versa) until the variant key/value sets match again.
 *
 * Note on `wrap`: vanilla-extract maps a `{ true, false }`-keyed variant to a
 * `boolean` runtime argument, which is why the expected `wrap` is `boolean` rather
 * than `'true' | 'false'`.
 */
import type { FlowRecipe } from './faces'
// Type-only import (used solely in `typeof` positions); keeps the package
// theme-agnostic -- we derive from our own config, not from VE runtime types.
import type { flowConfig } from './recipes'

type Variants = ReturnType<typeof flowConfig>['variants']

type ExpectedFlowArg = {
  direction?: keyof Variants['direction']
  gap?: keyof Variants['gap']
  align?: keyof Variants['align']
  justify?: keyof Variants['justify']
  wrap?: boolean
}

type FlowRecipeArg = NonNullable<Parameters<FlowRecipe>[0]>

type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

type Expect<T extends true> = T

// Compile error here = FlowRecipe and flowConfig have drifted.
// Fix FlowRecipe (faces.tsx) or flowConfig (recipes.ts) so the vocabulary matches.
type _AssertFlowRecipeInSyncWithConfig = Expect<Equal<FlowRecipeArg, ExpectedFlowArg>>
