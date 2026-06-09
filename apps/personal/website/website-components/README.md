# @rs/ryan-personal-website-components

Reusable SolidJS components for Ryan's personal website.

Styling is owned by the design system (`@rs/ryan-personal-website-design`): each
component consumes a vanilla-extract recipe, so colour and spacing come from the
typed theme contract and flip light/dark automatically. The components are
authored and reviewed in Storybook (`@rs/ryan-personal-website-storybook`).

The package is consumed as source inside the workspace (via the `@rs/source`
export condition), so Storybook and the Astro app compile the components and
their vanilla-extract styles directly. The `tsdown` build (`./dist`) is the
foundation for an external/SSG-published artifact.

## Development

- Run the playground (Vite):

```bash
pnpm run play
```

- Run the unit tests (Vitest, browser mode):

```bash
pnpm run test
```

- Build the library:

```bash
pnpm run build
```

## Adding a component

1. Create `src/<Name>/<Name>.tsx` and consume a design recipe for styling.
2. Re-export it from `src/index.ts`.
3. Add a story in `@rs/ryan-personal-website-storybook` (`src/<Name>/<Name>.stories.tsx`).
