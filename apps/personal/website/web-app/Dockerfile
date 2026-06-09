# syntax=docker/dockerfile:1
#
# Ryan's Personal Website; Astro SSR (apps/personal/website/web-app).
#
# Astro builds a standalone Node.js server via @astrojs/node.  The build context
# is the MONOREPO ROOT; docker-compose.yml sets `context: ../../..` accordingly.
#
# Two targets:
#   dev     Node + pnpm + turbo running `turbo run dev` (Astro dev server).
#           Source is kept live by Compose `develop.watch`; the install layer
#           only re-runs when a manifest or lockfile changes.
#   runner  Production: built Astro standalone server on :3000.

ARG NODE_VERSION=22-alpine
ARG PNPM_VERSION=9.0.0
ARG TURBO_VERSION=2.9.16
# Package NAME for turbo prune/filter. Must match the "name" field in
# apps/personal/website/web-app/package.json.
ARG APP=@rs/ryan-personal-website
ARG APP_DIR=apps/personal/website/web-app

# --- base: node + pnpm + turbo, shared by every stage ---
FROM node:${NODE_VERSION} AS base
ARG PNPM_VERSION
ARG TURBO_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate \
  && npm install -g turbo@${TURBO_VERSION}
WORKDIR /app

# --- pruner: isolate the target app + its workspace deps + a pruned lockfile ---
FROM base AS pruner
ARG APP
COPY . .
RUN turbo prune "${APP}" --docker

# --- installer: install from pruned manifests, then add full source ---
FROM base AS installer
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir=/pnpm/store
COPY --from=pruner /app/out/full/ .

# --- dev: live-reload Astro dev server; Compose watch syncs source over this ---
FROM installer AS dev
ARG APP
ENV APP=${APP}
ENV NODE_ENV=development
# Synced files don't reliably emit inotify events inside containers; poll instead.
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ["sh", "-lc", "turbo run dev --filter=${APP} -- --host 0.0.0.0 --port 3000"]

# --- builder: production Astro build ---
FROM installer AS builder
ARG APP
ENV NODE_ENV=production
RUN --mount=type=cache,id=turbo-cache,target=/app/.turbo/cache \
  turbo run build --filter="${APP}"

# --- runner: production Node.js server for the Astro standalone output ---
FROM node:${NODE_VERSION} AS runner
ARG APP_DIR
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
# The @astrojs/node standalone adapter bundles runtime dependencies into
# dist/server/ alongside the entry point — no node_modules copy needed.
COPY --from=builder /app/${APP_DIR}/dist ./dist
USER node
EXPOSE 3000/tcp
ENTRYPOINT ["node", "dist/server/entry.mjs"]
