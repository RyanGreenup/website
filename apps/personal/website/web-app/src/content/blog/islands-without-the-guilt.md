---
title: "Cached static sites generation is just warranty for an SSR Cache"
date: 2026-03-02
description: "A field report on building a content site where the only client-side script is a theme toggle — and why that constraint made everything else simpler."
tags: ["astro", "performance", "solidjs"]
draft: false
---

> [!NOTE]
> Work in progress

I had to untangle a CMS deploy pipeline that triggered a 40-join Strapi
nightmare on every edit.

I went through all the possible ways to optimize it with build caches etc. Ran
the numbers of cache-hit vs cache-miss (it's the cache-hit time that really
matters).

Ultimately though, if you cache with nitro at the server, you get the same
thing without the warranty of flat files. It seems simpler but it's much more
complex when you roll in all the moving parts.

Obviously you could just ISR with Vercel, but that's paying the problem away not
solving it. Just as well with Souin and assets on a digital ocean bucket where
cdn is free.
