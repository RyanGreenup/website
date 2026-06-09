---
title: "Website design as a Contract"
date: 2026-05-18
description: "How I attempted to standardise around semantic design contracts in our projects"
tags: ["css", "design-systems", "architecture"]
draft: false
---

Every team eventually has to adapt the Figma from design. It's always a mess
with components hand-drawn, no common design tokens and no way to easily script
a bulk download (but for an [MCP
client](https://tanstack.com/ai/latest/docs/tools/mcp) rather than the API).
Don't forget the amendments that _live_ in Slack too. This post is about my
feeble attempts to address it.

## The contract, not the Values

The core of it is simple. Components never name a color, size or anything semantic, they name a **role**:
The core idea is small. Components never name a colour. They name a **role**:

```css
.card {
  background: var(--roles-bg-surface);
  border: 1px solid var(--roles-border-base);
  color: var(--roles-fg-base);
}
```

```ts
import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const card = style({
  background: vars.roles.bg.surface,
  border: `1px solid ${vars.roles.border.base}`,
  color: vars.roles.fg.base,
});
```

There is one file that maps a role to a hex value, every thing else is
colorblind.

Map a semantic cue to a token, map a composition to a recipe and then scaffold
the styled component around those. This enforces a strict design contract, a
single place for the design team to point and a lot less wasted time.

My preference is Vanilla Extract as it's simple, straight forward and made here
in Melbourne. Panda is more feature rich but the distribution story is not
great. Tokenami looks promising. Tailwind sucks here, you can emulate the same
pattern with deeper styled components but it's not as nice as a typed CSS
library.

## The Pay Off

Firstly, give this to the design team, if they can atleast learn the common
names, you're speaking the same language.

Generally though, if the role names are stable, the values underneath are free
to change, the components and the design can change, in one place, without
everything diverging.

> The more things break when you delete the layer, the better you off you are
> for abstracting it.

With Turborepo and a monorepo, it's much easier to hoist that contract up and
get everything drinking from the same well. From there hoisting up the
components into primitives, foundational and styled component libraries isn't
just an ambition anymore. It is outright acheivable to `npm init tsdown@latest`
and dev against storybook directly. Again though, this is where typed CSS
libraries earn there keep and Tailwind, whilst awesome, is limited.

## What it Costs

One day, early in the project. Every one complaining that the things not live
yet. The design team telling you why CSS is wrong and Figma is right a lot for
the first two weeks. Discipline, patience and resolve really.

The next project that has to be themed is where the real pay-off is.
