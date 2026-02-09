# AGENTS

## Project overview
- Monorepo with npm workspaces: Next.js App Router in `frontend/` and Sanity Studio in `studio/`.
- Root scripts orchestrate both apps; Sanity schema/typegen outputs are shared via `sanity.schema.json`.

## Key locations
- `frontend/app/`: Next.js App Router pages, layout, API routes.
- `frontend/sanity/`: Sanity client, queries, and helpers used by the frontend.
- `studio/src/schemaTypes/`: Sanity schemas (documents/objects/singletons).
- `studio/src/structure/`: Studio desk structure.
- `sanity.schema.json`: generated schema snapshot used for typegen.

## Commands (root)
- `npm run dev`: runs Next.js and Studio in parallel.
- `npm run dev:next`: Next.js only (workspace `frontend`).
- `npm run dev:studio`: Studio only (workspace `studio`).
- `npm run lint`: frontend lint.
- `npm run type-check`: type-check both workspaces.
- `npm run import-sample-data`: imports `studio/sample-data.tar.gz` into Sanity.

## Commands (frontend)
- `npm run dev`: Next.js dev server (pre-runs Sanity typegen).
- `npm run build`: Next.js build (pre-runs Sanity typegen).
- `npm run sanity:typegen`: extracts schema from Studio and generates types.

## Commands (studio)
- `npm run dev`: Sanity Studio dev server (pre-runs Sanity typegen).
- `npm run build`: build Studio.
- `npm run deploy`: deploy Studio.

## Env setup
- `frontend/.env.example` -> `frontend/.env` (NEXT_PUBLIC_* + SANITY_API_READ_TOKEN).
- `studio/.env.example` -> `studio/.env` (SANITY_STUDIO_*).

## Generated files (do not edit directly)
- `sanity.schema.json`
- `frontend/sanity.types.ts`
- `studio/sanity.types.ts`

## Notes
- Update schemas in `studio/src/schemaTypes/` and re-run typegen to refresh generated types.
- Frontend content queries live in `frontend/sanity/lib/queries.ts` (GROQ).
