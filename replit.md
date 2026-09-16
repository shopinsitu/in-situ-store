# IN SITU

An editorial ecommerce concept for a curated collection of antique furniture, objects, lighting, art, and domestic goods.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/in-situ-store run dev` — run the storefront through its managed workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/in-situ-store/src/App.tsx` — storefront routes, sample catalog, search, filters, cart, and editorial content
- `artifacts/in-situ-store/src/index.css` — IN SITU typography, color tokens, texture, and interaction styling

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Editorial homepage and category navigation
- Searchable, sortable shop with grid/list views and multi-dimensional filters
- Product, collection, about, and visit pages
- Responsive menu, search, filter, favorite, and cart interactions

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
