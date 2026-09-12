# Zam Zama Food

An image-led restaurant website for Zam Zama Food in Gulshan-e-Hadeed, Karachi.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
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

- `artifacts/zam-zama-food/` — the deployable React + Vite restaurant website
- `attached_assets/` — supplied restaurant and menu photography used by the site
- `artifacts/api-server/` — shared API service scaffold; not needed by the current static site
- `artifacts/mockup-sandbox/` — reusable mockup preview tooling

## Architecture decisions

- The first release is a static, presentation-first website; restaurant details and menu highlights are intentionally local content.
- Supplied restaurant photography is used directly to keep the website grounded in the real Zam Zama dining experience.
- The page uses anchor navigation and direct phone/WhatsApp/Facebook actions instead of introducing a backend reservation system.

## Product

- Restaurant introduction and story
- Menu highlights plus full menu image viewer
- Food and restaurant photo gallery with lightbox viewing
- Reviews, hours, location, phone, WhatsApp, and Facebook contact actions
- Reservation/contact prompt

## User preferences

No additional preferences recorded.

## Gotchas

- The web artifact relies on the managed workflow to provide `PORT` and `BASE_PATH`.
- Keep restaurant contact details and photo asset references aligned with the current business information.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
