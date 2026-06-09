/**
 * Derive a recipe's callable argument type from its `variants` config.
 *
 * A vanilla-extract recipe built from `recipe(config)` accepts an optional object
 * keyed by the variant names, each value being one of that variant group's keys.
 * The one wrinkle: a group keyed `{ true, false }` is exposed as a `boolean` at
 * runtime, not the string literals `'true' | 'false'`. `VariantArg` encodes that
 * single rule so callable types can be derived straight from a config's variants
 * map instead of being restated by hand.
 */

/** One variant group's accepted value: `boolean` for a `{ true, false }` group, else its keys. */
type VariantArg<Group> = [keyof Group] extends ['true' | 'false'] ? boolean : keyof Group

/** The optional variant argument a `recipe(config)` callable accepts, derived from `config.variants`. */
export type RecipeVariantArg<Variants> = {
  [K in keyof Variants]?: VariantArg<Variants[K]>
}
