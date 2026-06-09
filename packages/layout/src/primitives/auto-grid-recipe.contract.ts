/**
 * DRIFT GUARD: AutoGridRecipe (faces.tsx) <-> autoGridConfig (recipes.ts)
 *
 * WHAT this file guards
 * ---------------------
 * `AutoGridRecipe` in `./faces` is a HAND-WRITTEN structural callable type describing
 * the variant argument that `recipe(autoGridConfig(space, mins))` accepts. It is NOT
 * derived from `autoGridConfig`, so an edit that adds/removes/renames a variant (key or
 * value) in `autoGridConfig` could silently leave `AutoGridRecipe` stale -- and nothing
 * else would catch it.
 *
 * WHY it exists
 * -------------
 * This is a TYPE-ONLY contract (it compiles to nothing). It derives the EXPECTED
 * variant-argument type directly from `autoGridConfig`'s actual `as const` output and
 * asserts it is EXACTLY equal to the argument type `AutoGridRecipe` declares. If the two
 * ever diverge, `_AssertAutoGridRecipeInSyncWithConfig` below stops compiling and
 * `tsc --noEmit` (run via `check-types`) fails.
 *
 * IF YOU HIT A COMPILE ERROR ON THE ASSERT LINE
 * ---------------------------------------------
 * `AutoGridRecipe` (packages/layout/src/primitives/faces.tsx) and `autoGridConfig`
 * (packages/layout/src/primitives/recipes.ts) have drifted. Reconcile their vocabulary: update the
 * hand-written `AutoGridRecipe` to match the variants `autoGridConfig` declares (or vice
 * versa) until the variant key/value sets match again.
 */
// Type-only imports (used solely in type positions); keeps the package theme-agnostic --
// we derive from our own config, not from VE runtime types.
import type { AutoGridRecipe } from './faces'
import type { autoGridConfig } from './recipes'

type Variants = ReturnType<typeof autoGridConfig>['variants']

type ExpectedAutoGridArg = {
  min?: keyof Variants['min']
  gap?: keyof Variants['gap']
}

type AutoGridRecipeArg = NonNullable<Parameters<AutoGridRecipe>[0]>

type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

type Expect<T extends true> = T

// Compile error here = AutoGridRecipe and autoGridConfig have drifted.
// Fix AutoGridRecipe (faces.tsx) or autoGridConfig (recipes.ts) so the vocabulary matches.
type _AssertAutoGridRecipeInSyncWithConfig = Expect<Equal<AutoGridRecipeArg, ExpectedAutoGridArg>>
