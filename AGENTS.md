# Repository Guidelines

## Current Status & Scope

This workspace currently contains only `plan.md`, the implementation proposal for Shyaam P’s interactive developer portfolio. No application, package manifest, test configuration, or Git history exists yet. Read the plan before contributing. Obtain the owner’s design and architecture approval before writing application code; creating this guide does not authorize implementation.

## Project Structure & Module Organization

The proposed stack is Next.js App Router, React, TypeScript, and Supabase. Follow the layout in `plan.md` once implementation is approved:

- `app/`: public pages, project details, protected admin routes, and API handlers.
- `components/`: site sections, motion components, admin controls, and accessible UI primitives.
- `lib/`: GitHub ingestion, public project composition, authentication, validation, and Supabase clients.
- `public/`: optimized artwork, Rive assets, and preview images.
- `supabase/migrations/`: database schema and access policies.
- `tests/unit/`, `tests/integration/`, `tests/e2e/`: automated checks.
- `docs/`: architecture decisions and quality audits.

Keep GitHub ingestion, public composition, owner settings, and animations separate.

## Build, Test, and Development Commands

No commands run yet. After scaffolding, document the chosen package manager and actual scripts in `README.md`. If npm is selected, establish `npm run dev` for local development, `npm run build` for production compilation, and `npm test` for automated checks. Do not assume these scripts exist today.

## Coding Style & Naming Conventions

For new TypeScript files, use two-space indentation, PascalCase component filenames such as `ProjectSlide.tsx`, and camelCase helpers such as `requireAdmin.ts`. Follow Next.js route filenames (`page.tsx`, `layout.tsx`, `route.ts`). No formatter or linter is configured; establish shared tooling during foundations and follow its configuration thereafter.

## Testing Guidelines

The plan proposes Vitest, React Testing Library, and Playwright. Use descriptive `*.test.ts`/`*.test.tsx` unit tests and `*.spec.ts` browser tests. Prioritize owner authorization, hidden-project filtering, persistent curation, GitHub outage fallback, keyboard access, and reduced motion. No numeric coverage threshold is defined.

## Commit & Pull Request Guidelines

No historical commit convention can be inferred. Use concise imperative subjects, for example `Add project visibility validation`. PRs should describe behavior, reference relevant plan sections or issues, report checks performed, and include screenshots for visual changes.

## Security & Content

Keep secrets server-side. Enforce owner authorization and database access policies. New repositories default to hidden. Never publish private resume details or unverified experience; public email requires owner approval.
