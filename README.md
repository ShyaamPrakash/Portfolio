# Shyaam P — Signal / System

Next.js portfolio with a GitHub-backed curated gallery and a Supabase owner console. See `plan.md` for the full product brief and `docs/implementation-status.md` for verification limits.

## Run locally

Use Node.js 22.18+ (Node 24 recommended). On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. With no Supabase variables, the public site displays its curation empty state and the admin login explains configuration. It never substitutes fake published projects.

```sh
npm test           # dependency-free publication and URL safety tests
npm run typecheck  # TypeScript, after installation
npm run build      # production Next.js build
npx playwright install chromium webkit
npm run test:e2e   # desktop/mobile navigation, access and screenshots
```

Dependency ranges are provisional because registry access was blocked during implementation. Install, review resolved versions, run checks and commit the generated lockfile before deployment. No lockfile is fabricated.

## Supabase and owner setup

1. Create a Supabase project. Apply `supabase/migrations/001_portfolio.sql` in the SQL editor as the database owner.
2. Configure the public URL and publishable key in `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the exact local or deployed origin.
3. Enable GitHub OAuth in Supabase. Configure the GitHub OAuth app callback to the URL shown by Supabase, then allow your site's `/auth/callback` URL in Supabase Auth redirect settings.
4. Sign in once at `/admin/login`. Access remains denied until the Supabase user UUID is allowlisted.
5. In the Supabase SQL editor, run `insert into public.portfolio_admin_allowlist(user_id) values ('YOUR-SUPABASE-USER-UUID');`. Never allowlist a user based on a browser-submitted username.
6. Sign in again. Click **Sync GitHub**, open a project, edit its presentation, select **Publish project**, and save.

No service-role key is required. Owner requests use the verified user's session and RLS. The public database view exposes only explicitly published public repositories. A settings row missing from the join is hidden.

## Sync and recovery

Sync reads all GitHub pages before a single database transaction updates the snapshot. Removed/private repositories become unavailable; editorial settings remain attached to their immutable IDs. Failed fetches or writes preserve the previous snapshot. Sync attempts are limited to once per minute in persistent storage. Add an optional server-only `GITHUB_TOKEN` for higher API limits.

This first implementation uses owner-triggered sync. Until another successful sync, GitHub changes (including private/deleted repositories) cannot be discovered. Hide a project immediately in admin when needed. Automated refresh is an outstanding plan requirement.

## Motion and assets

Lenis shares GSAP's ticker. Three.js renders the hero only while visible and motion is enabled. SVG linework remains as a static fallback. Reduced motion and the footer pause control disable decorative motion. UI transitions are 100–280ms; continuous decorative movement is separate and can be paused.

Supply a licensed `.riv` in `public/rive/`, set `NEXT_PUBLIC_RIVE_SRC=/rive/your-file.riv` and its state machine name, then rebuild. Until then the signal emblem uses an authored SVG. The Rive integration is present but no valid asset was available to validate it.

Case-study content is rendered as plain text; raw HTML and Markdown execution are deliberately excluded. Font files are served locally through Fontsource once dependencies are installed.

## Deploy to Vercel

Import the repository, select Next.js, configure the Supabase variables and production site URL, and run the migration separately. Set production OAuth redirect allowlists. Preview deployments must use a separate test database or intentionally configured access. Run the checks above and verify anonymous/non-owner/owner behavior against Supabase before launch. The owner must approve initial project publication and any public personal links.
