# SHYAAM P — INTERACTIVE PORTFOLIO / MASTER IMPLEMENTATION PLAN

> **Status:** DESIGN + ENGINEERING PROPOSAL ONLY · **Date:** 2026-11-15  
> **Owner:** Shyaam P · **GitHub:** https://github.com/ShyaamPrakash  
> **Instruction to coding CLI:** **DO NOT IMPLEMENT YET.** Read this entire plan, inspect the repository and installed skills, present a short design/architecture recap and request explicit owner approval. Once approved, implement in defined phases. This document is the source of truth unless the owner changes it.

---

## 0. Non-negotiable brief

Create a high-end, distinctive **interactive developer portfolio** for Shyaam P, combining the visual languages of the three supplied screenshots: **(A) charcoal topographic-vector editorial design**, **(B) saturated-red cinematic glitch/motion collage**, and **(C) monochrome experimental gallery/point-cloud composition**. Add a controlled **ASCII-art / terminal / computational graphics** layer throughout. The result should feel like a custom award-quality creative-developer experience, not a standard developer template, SaaS landing page, dashboard, or copy of the references.

The site must:

1. Tell Shyaam's actual academic/developer story accurately; highlight systems programming, AI/ML, algorithms, backend and databases.
2. Feature a **dynamic project slideshow fed by the public repositories of `ShyaamPrakash`**, enhanced by hand-authored editorial metadata and visuals, rather than permanently hardcoding repo cards.
3. Provide a **protected owner-only admin path** where Shyaam can include/exclude individual GitHub projects from the public gallery; exclusions persist across redeploys and syncs. Support prioritization, pinning, display order and optionally editorial overrides.
4. Use **Lenis**, **GSAP + ScrollTrigger**, **Rive**, and **Three.js** (prefer React Three Fiber), each with a clear purpose and appropriate fallbacks.
5. Make the final product visually comparable in attention to typography, art direction, transitions and composition to the supplied references. **Do not merely paste screenshots, imitate their exact layouts, or use generic gradient blobs.**
6. Be responsive, accessible, fast enough to use on a midrange phone and integrated-GPU laptop, secure, and deployable on Vercel.
7. Respect the supplied resume; do not invent professional employment, internships, production deployment claims, or precise expertise not supported by evidence. New domains requested by Shyaam are **skills / hands-on academic exposure**, not fabricated job experience.
8. **Discover and use the owner's locally installed CLI skills** for Vercel, frontend design, Impeccable, Ponytail/Pony Tail and other relevant skills. The present planning environment could **not verify those skill files**, so the CLI must locate and read them before coding; never pretend they were executed already.

### Approval gate

Before writing app code, show Shyaam:
- a concise site map and animation storyboard;
- the chosen color/type/ASCII treatment and one proposed hero composition;
- a concrete database/authentication design for the admin area;
- the discovered skill files and their relevant requirements;
- any genuinely blocking credentials or design decisions.

**Then ask:** “Do you approve this direction, or should I change the aesthetic, sections, GitHub gallery behavior, or admin design before implementation?” No build begins before approval.

---

## 1. Source material and reliability rules

### 1.1 Uploaded inspiration (review all three visually)

The three screenshots supplied in the conversation are visual reference material. If available to the CLI in its workspace, use these exact filenames (copy only if provided; do not assume they exist on the CLI host):

- `Screenshot 2026-11-15 112727.png` — **Reference A:** near-black wide editorial canvas, graceful thin gray contour / topographic line work, highly organized asymmetrical typography, small supporting floating panels and technical micro-labels.
- `Screenshot 2026-11-15 112747.png` — **Reference B:** intense red-orange filmic field, discontinuous vertical panel slices, high contrast, red light-trail / glitch texture, physical depth, collage layering and experimental image framing.
- `Screenshot 2026-11-15 112803.png` — **Reference C:** stark grayscale monochrome panel, negative space, organic point-cloud/particle shape, oversized editorial composition and dense grainy stipple visual language.

**Synthesis rather than collage:** A is the permanent visual system; B supplies one memorable accent / project transition; C supplies the hero's procedural visualization and microtexture. ASCII art is an additional 4th connective motif, used selectively.

### 1.2 Resume: verified facts (uploaded `25pw32resume (1).pdf`, two pages)

- Display name: **Shyaam P**. GitHub username given by owner: **ShyaamPrakash**.
- Current education: **2nd year, five-year Integrated M.Sc. Software Systems**, Department of Applied Mathematics and Computational Sciences, **PSG College of Technology**; program **2025–2030**; **CGPA 9.47** as of the supplied resume.
- Earlier academics: Class XII **95.8%** (2025), Class X **95.8%** (2023). Optional detail, not mandatory on home page.
- Resume-listed languages: **Python, C, C++, JavaScript, HTML, CSS**.
- Platforms/tools: **Linux, Windows, Git, GitHub, VS Code**.
- Resume-listed DBs: **MySQL, PostgreSQL**.
- Focus areas: **Data Structures & Algorithms; Machine Learning**.
- Academic projects: **MediCare** (Flask hospital operations portal), **Cash Flow Minimizer** (graph algorithms / priority queues), **Canteen Operations Console** (C; preorders/accounts), **Neighborhood Marketplace Portal** (C++ OOP).
- Non-academic projects: **NotesBot** (FastAPI, Streamlit, semantic search) and **House Price Prediction System** (ML, Streamlit).
- Activities: **Class Representative, 2nd year**, **CS50x completed**, School Pupil Leader in Class XII, coding problem-solving platforms.

**Privacy rule:** The PDF contains date of birth, home address, mobile number, university ID and personal email. **Do not publish DOB, home address, mobile or student ID.** Email is optional and must be explicitly approved by owner before appearing on site. Do not display school-level leadership or marks automatically just to fill space.

### 1.3 Owner-requested additions (not all separately substantiated by resume)

Include the following in the skills narrative, **subject to owner confirmation of proficiency and specific tools used**:

| Area | Proposed representation | Honesty constraint |
|---|---|---|
| Embedded systems | Academic / practical exposure; embedded fundamentals, interrupts, scheduling, microprocessor/microcontroller concepts | Do not invent named hardware boards or deployments |
| Microcontrollers | Coursework / lab familiarity | Mark specific devices (8051, AVR, ARM, STM32, ESP32, etc.) **TBD**, not assumed |
| Oracle Database / SQL | SQL, relational design, Oracle database work / reporting where demonstrated | Do not equate Oracle familiarity with DBA expertise |
| PostgreSQL | Relational database development | Already listed on resume |
| Supabase | Backend-as-a-service, Postgres, Auth, RLS where actually used | Ask owner what shipped vs learned |
| FastAPI | Python APIs, backend routes | NotesBot described as using FastAPI |
| Flask | Python web application development | MediCare project |
| MySQL / SQLite | Relational database experience | MySQL on resume; SQLite supported by project context, verify |

Optional owner-confirmed content: **PyTorch, scikit-learn, pandas, NumPy, Streamlit, semantic search/RAG, C++ STL, API integration, data structures/algorithms**. Do not put a technology in the mastery grid simply because it sounds impressive. Skill labels should be based on supported projects/coursework.

### 1.4 No fabricated work experience

Do **not** generate an “Experience — Software Engineer @ ...” timeline from these facts. Preferred section title: **“Experience / Practice”**, containing **Academic work**, **Engineering projects**, **Leadership** and **Explorations**, with precise descriptions. When actual internships/employment exist, add them through structured data later.

### 1.5 GitHub status at planning time

Public profile https://github.com/ShyaamPrakash was accessible at planning time and showed **11 repositories**. Examples visibly listed on profile: `firstproject`, `edaNotebook`, `MLHousePricesEstimator`, `CriticsLens`, `SemanticSearcher`, `Bucktracker`. **This is not a verified exhaustive repo inventory.** On implementation, fetch actual public repositories through the GitHub API and let the owner choose visibility. Do not assume resume project names map to identically named repositories or that all listed repos deserve publication.

---

## 2. Experience goal: the creative direction

**Art-direction working title:** `SIGNAL / SYSTEM` — “From logic to living systems.” (Working title: owner may rename.)

### Mood

- Computational, cinematic, precise, inventive, slightly rebellious, never chaotic for chaos's sake.
- A **dark editorial canvas**, monumental condensed typography, generous negative space, white/off-white text, minimal burnt-red/orange focal accents, delicate technical marks.
- More like an interactive digital art exhibition built by a systems-minded engineer than a conventional portfolio.
- Every motion must communicate depth, transition, state, or system behavior; avoid animation merely because the library is installed.

### Color tokens (proposed; tune after visual proof)

```css
--bg:            #101012; /* deep graphite */
--surface:       #19191b;
--surface-hi:    #262428;
--ink:           #f1efea; /* soft ivory */
--muted:         #9d9996;
--hairline:      #5b575b;
--signal:        #ef402f; /* vivid signal red */
--signal-hot:    #ff7b4a; /* warm secondary highlights */
--light-scene:   #e7e5df; /* occasional inverted editorial canvas */
--light-ink:     #1c1a1a;
```

**Palette ratio:** approximately 75% charcoal / 18% ivory-gray / 7% high-intensity red. Do not turn every component red. Use a single dramatic red editorial sequence for emotional contrast.

### Typography

- **Display:** striking grotesk / condensed neo-grotesk, very large, tight tracking, responsive optical sizing. Candidate fonts require license and bandwidth review (e.g., open-licensed `Space Grotesk` for display or `Archivo Narrow` for condensed contrast).
- **Body:** readable clean sans (e.g., `Inter` or `Manrope`).
- **Code / ASCII / coordinates:** `IBM Plex Mono` or `JetBrains Mono`.
- Use at most 3 families; locally optimize weights; avoid ornamental cyberpunk fonts and text illegibility.

### Ascii art visual system

- Hero: an ASCII **signal field** — a sparse, animated grid of characters (`. : + * # @ / \\ | _`) shaping a contour / orbital signal; ASCII cells align to a predictable typographic grid.
- Section markers: `(01) / INIT`, `(02) / SELECTED_WORK`, `// SYSTEM_STATUS`, `[ESC TO CLOSE]`.
- Projects: occasional ASCII loading frames and low-key pixel-to-vector transition; subtle monospace indices and coordinates.
- Footer: visually pleasing ASCII terminal sign-off, **decorative only**; proper accessible alternative text.
- All ASCII treatments are deterministic or seeded; no random full-page rerendering causing hydration mismatch, flashing or layout shift.
- ASCII contrast remains readable; never embed essential content only in ASCII pixels.

---

## 3. Intended visitor journey and information architecture

**Site model:** one curated immersive home page, separate deep-linkable project detail pages, protected admin app. Navigation uses semantic anchors. The site is not a mandatory full-page scroll-jacking experience.

| Chapter | Route / anchor | Audience-facing purpose | Dominant visual language |
|---|---|---|---|
| 00 | `/` intro | Instant, unmistakable identity and specialty | A + C + subtle ASCII |
| 01 | `/#about` | Human story and academic grounding | A, editorial typography |
| 02 | `/#work` | **GitHub-backed project slideshow** | B transitions / layered visual cards |
| 03 | `/#capabilities` | Clearly grouped technical capabilities | Terminal ASCII + restrained graphics |
| 04 | `/#journey` | Academic journey, leadership and verified experience | A technical timeline |
| 05 | `/#contact` | Ways to connect | A + statement-size type |
| — | `/projects/[slug]` | Project case study from GitHub + curated data | Hybrid per project |
| — | `/admin` | **Owner-only editorial console** | Functional dark tool interface |
| — | `/admin/login` | Secure authenticated access | Minimal, deliberately non-showcase |

### 3.1 Intro / hero — first 5 seconds

**Desktop storyboard:**

1. Minimal, short, purposeful boot sequence: `SYSTEM ONLINE / SHYAAM P`. Duration roughly 0.6–1.2 s, **skip on return visits**; do not force a fake long preloader.
2. Hero composition settles into a substantial dark scene. Left/center has oversized stacked **“SHYAAM / P.”** and an editorial subhead such as **“I build where algorithms meet real-world systems.”** (draft; owner approval needed).
3. A right-side **procedural monochrome contour/particle object** floats in depth; as cursor moves, a shallow parallax response is shown. A slice of the shape disintegrates into ASCII. Do not obscure copy.
4. Tiny status ribbon: `SOFTWARE SYSTEMS / PSG COLLEGE OF TECHNOLOGY / 2025—2030` and `AVAILABLE FOR COLLABORATION` only if owner confirms availability.
5. Vertical / diagonal red accent line briefly reveals a secondary red composition during transition to selected work; not constant flashing.
6. Clear button: `EXPLORE SELECTED WORK →`; secondary: `VIEW GITHUB ↗`.

**Mobile:** shortened large typography, static/pre-rendered visualization or low-cost canvas, no hover dependency; immediate visible CTA. Avoid full-height fixed content that traps scrolling.

### 3.2 About — technical identity

- Three concise, sincere paragraphs; no exaggerated claims.
- Main thread: integrated Software Systems student exploring **algorithms, backend engineering, machine learning, embedded systems and data-intensive applications**.
- Pull quote / status line about solving practical problems.
- Academic facts in a compact, well-composed editorial block, not a generic resume card.
- If owner supplies photograph later, optional editorial portrait treatment; **do not invent a photographic likeness**.

### 3.3 Featured work — dynamic cinematic slideshow (main attraction)

**Functional requirements:**

- Load **public repositories from `ShyaamPrakash`** via a server-side GitHub integration.
- Join GitHub repo data with persisted **editorial overrides** and **visibility preferences** in Supabase.
- Present a **curated, meaningful slide sequence**. Prioritize user-pinned / featured repositories, then order by explicit `sort_order`, then a sensible recency fallback. Do **not** rank purely by GitHub stars.
- Controls: click prev/next, keyboard left/right when gallery is focused, swipe/pan on touch, clickable slide counter (`01 / 07`), progress rail, `View case study` and `GitHub ↗` links.
- Slide content: repo title / editorial title, one-sentence challenge or outcome, verified stack tags, visual asset (curated screenshot/video/graphic), repository link, optional live demo, lightweight repo metadata (last updated etc.).
- Transitions: split image shutters, horizontal/vertical travel, constrained GSAP perspective layering and subtle red scanline motif on **one** key reveal; text motion must stay legible.
- Include loading skeleton, empty state (“Projects are being curated”), explicit API failure handling with server-side **last-good cached snapshot**, and missing-image fallback based on generated geometric/ASCII art.
- Visibility changes show up after admin save (immediate revalidation or short controlled cache invalidation). Hidden repos **must never enter the public slideshow or public project routes**, even if returned by GitHub.
- Allow an editorial “case study only” project only if owner explicitly adds it as a manual project with independently provided evidence; do not claim it is synced from GitHub.
- Do not autoplay rapidly. Default: manual, user-controlled. Optional gentle autoplay **only when visible and not interacted with**, plus pause on hover/focus and reduced-motion support, if approved.
- The gallery is **real content driven by public repo state**, while artwork is curated; dynamically changing metadata must not wreck typography.

**Slide art-direction variants:**

1. **Monochrome topology:** procedural lines and restrained black/ivory geometry (fits C/C++/algorithms projects).
2. **Signal-red cinematic:** red stacked frames + dotted data trace (fits AI/computer vision/ML projects).
3. **Terminal/ASCII document:** fragmenting monospace texture with diagram grids (fits backend/DBMS tools).

Design variant chosen by stored editorial `art_direction` value, not arbitrary “guess by language” alone. Preview variants in admin.

### 3.4 Capabilities / skills — structured, verifiable

Group the skills meaningfully (avoid 40 floating pill badges):

- **Programming & algorithms:** C, C++, Python, JavaScript; DSA, graphs, STL / OOP as demonstrated.
- **Backend & APIs:** Flask, FastAPI, REST API development, Python web services.
- **Data platforms & DBMS:** PostgreSQL, MySQL, **Oracle SQL / Oracle Database**, SQLite (confirm), **Supabase**, relational modeling, queries.
- **AI & machine learning:** semantic search, applied ML, PyTorch / scikit-learn / Pandas / NumPy when confirmed.
- **Embedded / low-level:** embedded systems fundamentals, **microcontrollers**, interrupts, assembly / RTOS / tools **only to actual depth confirmed**.
- **Tools & environments:** Git, GitHub, Linux, Windows, VS Code; Streamlit where supported.

**Do not show fabricated 95% skill meters**. Instead show evidence labels: `USED IN PROJECT`, `ACADEMIC`, `EXPLORING`, based on confirmed status. Some skill panels may expand to reveal the specific projects that demonstrate the skill.

### 3.5 Journey / credible experience

- Main anchor: `2025—2030 / Integrated M.Sc. Software Systems / PSG College of Technology`.
- Academic performance: `9.47 CGPA` (explicitly as of supplied resume, updateable).
- Leadership: 2nd-year Class Representative; earlier School Pupil Leader optional.
- Learning milestone: Harvard CS50x completed.
- Highlight embedded systems and DBMS **coursework / labs**, not employment.
- Support later addition of genuine internships, assistantships or jobs via `experience_items` content data.

### 3.6 Contact

- Large final invitation to connect, GitHub link, optional LinkedIn (ask URL), optional email (ask permission/address to publish), downloadable public-safe resume (owner-approved sanitized copy; **never publish the raw PDF with DOB, home address and phone**).
- No database-backed public contact form in V1 unless owner specifically wants it. A mailto link avoids spam and storage obligations.
- Footer includes small ASCII flourish, credits, current year and social links.

---

## 4. Technology architecture

### 4.1 Preferred stack

| Concern | Choice | Reason / constraints |
|---|---|---|
| App | **Next.js (App Router), TypeScript, React** | SEO, server-only API access, dynamic routes, Vercel fit |
| Styling | **Tailwind CSS + CSS custom properties**; hand-authored selective CSS | Fast token consistency without generic component aesthetics |
| UI primitives | Accessible low-level primitives as needed | Prioritize bespoke art direction, not a stock component library |
| Animation | **GSAP + ScrollTrigger** | Timeline choreography and scroll-linked reveals |
| Scrolling | **Lenis** | Gentle smooth scrolling, integrated GSAP ticker |
| Procedural scene | **Three.js via @react-three/fiber** (+ drei only if needed) | One memorable interactive canvas in hero / case study |
| Interactive vector art | **Rive React runtime** | One intentional animated glyph/controller, state-machine-driven |
| Data / admin | **Supabase Postgres + Auth + RLS** | Persistent per-repo inclusion/exclusion and editorial overrides |
| Source of truth for repos | **GitHub REST API** | Source-managed public repositories and live metadata |
| Hosting | **Vercel** | Server routes, ISR/revalidation, deployment previews |
| Forms/validation | **Zod**, React Hook Form if warranted | Typed admin editing and secure validation |
| QA | **Vitest / React Testing Library / Playwright** | Data correctness, admin protection and visual behavior |

**Dependency discipline:** check installed versions and actual APIs at build time; pin compatible versions. Avoid adding extra motion libraries to do GSAP's job. Avoid loading Three + Rive + GSAP on every route if not needed.

### 4.2 Module ownership

- **Lenis:** controls scroll easing **only**. Must never force scrolling on users with reduced motion.
- **GSAP:** section enters, hero text, slide transitions, red shutters, focus-safe reveals. Use `gsap.context()` and proper teardown; prefer `@gsap/react` integration.
- **ScrollTrigger:** activates/pins a single controlled visual sequence where it improves understanding. Avoid aggressive pinning on mobile.
- **Rive:** small branded “signal status” interactive emblem, navigational icon or hover-reactive signal gauge; animate via state machine. **No fake placeholder .riv file.** Author/provide a valid asset, validate its runtime support/licensing; if asset unavailable, make a high-quality SVG fallback and defer Rive-specific hero enhancement rather than breaking site.
- **Three.js:** beautiful black-and-white noise/point-cloud topology field / parametric contour object in hero; responsive camera, sensible DPR cap and no excessive geometry churn. No giant 3D website just to use the package.
- **ASCII:** lightweight DOM / SVG / canvas layer built from monospace glyphs; procedural shapes can map to ASCII but should not run an expensive per-character React render each frame.

### 4.3 Lenis / GSAP integration checklist

- Use package `lenis`; import `lenis/dist/lenis.css`.
- One requestAnimationFrame owner: with GSAP, `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `gsap.ticker.lagSmoothing(0)` per documented integration where appropriate.
- **Do not enable both `autoRaf` and a GSAP-driven RAF loop.** Clean up ticker listener on unmount.
- `ScrollTrigger.refresh()` after fonts/image dimensions or gallery content materially affect layout.
- Use native scroll behavior as graceful fallback; test browser back, hash links, nested scrollable admin, dialogs and iOS touch.

### 4.4 Three.js performance & fallback contract

- Render lazily using client-only code splitting and IntersectionObserver; avoid shipping all graphics to initial HTML.
- Keep total geometry, shaders, postprocessing and pixel ratio limited; adapt to reduced GPU capability and tab visibility.
- Prefer monochrome point sprite / signed-distance-field-inspired artifact over complex photorealistic GL.
- Stop rendering for offscreen/hidden tabs; consider frameloop demand when motion allows.
- If WebGL unavailable or canvas context lost, show polished static SVG/PNG/ASCII fallback matching composition.
- Avoid global scroll listeners inside the Three render loop; pipe only necessary damped state.
- Performance objective: usable on Windows laptop with integrated Intel GPU and midrange Android/iPhone.

---

## 5. GitHub integration: model and synchronization

### 5.1 Required behavior

- GitHub account source: `ShyaamPrakash` (public repositories only in V1).
- Fetch from GitHub REST `GET /users/ShyaamPrakash/repos` with proper pagination (`per_page=100` and follow Link headers where applicable); handle growth beyond first page.
- Only expose actual **public, non-deleted** repositories. Exclude forks and archived repositories by **configurable default**, but offer owner-controlled inclusion if desired.
- Normalize GitHub `id`, `name`, `full_name`, `description`, `html_url`, `homepage`, `language`, `topics`, `stargazers_count`, `updated_at`, `pushed_at`, `fork`, `archived`, `visibility` (public only) and any needed license fields.
- Treat GitHub content as untrusted external data: sanitize output/links, allow only http/https, avoid rendering arbitrary README HTML unsanitized.
- Use a server-side fine-grained token **only if necessary** (rate limits / appropriate GitHub access). NEVER put GitHub API secrets in the client or `NEXT_PUBLIC_*` env vars.
- Paginated API failures or rate limits should serve last successful snapshot when possible, report staleness in admin and retry safely.

### 5.2 Data composition and visibility precedence

For each GitHub repository:

1. Fresh/last-good GitHub facts are read from cached snapshot.
2. Attach user-maintained `portfolio_project_settings` by immutable `github_repo_id` (not only name, which can change).
3. Visibility rule: **`is_visible === false` always wins**. A newly discovered repo defaults **hidden/pending review** (privacy-first, owner must explicitly include); if owner later elects automatic inclusion, change with an explicit setting.
4. Featured and sort order come from editorial settings, with stable deterministic fallbacks.
5. Override title, summary, stack, visual treatment, hero media, live demo and case study content only if manually saved by owner. Otherwise derive sensible public metadata; never fabricate outcomes or metrics.
6. Public pages query only the composed visibility-filtered set. Unpublished case-study routes return `404`/not-found and are not indexed.
7. Deleting a settings row must not accidentally expose a hidden repo: absent settings means hidden pending review.

**Important distinction:** This is a dynamic gallery, not a GitHub feed where every new repo automatically shows up before quality review.

### 5.3 Synchronization strategy

- Public gallery uses server-side caching with a defined interval (proposed 15–60 minutes), optional on-demand revalidation after admin edits. Tune for GitHub limits.
- Persist last good snapshot (in DB or durable cache) so repository cards survive transient GitHub outages. Do not rely exclusively on an ephemeral process memory cache.
- Admin has `Sync GitHub now`, `Last fetched`, `Sync status`, `New repos awaiting review`, `Archived/fork flags` and useful error messages.
- A sync **never overwrites** owner visibility/order/editorial settings.
- No need for GitHub webhooks in V1; optional later if instant metadata updates are genuinely important.
- On rename, match immutable repo ID and update slug strategy / redirects as appropriate.
- On deletion/private conversion, stop serving public item at next successful sync, and make it unavailable immediately when known; do not reveal formerly cached private code/media.

### 5.4 Data shape (suggested Postgres tables)

```sql
-- Conceptual schema. Implement real types/check constraints/RLS in migrations.
create table github_repo_snapshots (
  github_repo_id bigint primary key,
  repo_name text not null,
  full_name text not null,
  is_public boolean not null default true,
  is_fork boolean not null default false,
  is_archived boolean not null default false,
  github_payload jsonb not null,
  synced_at timestamptz not null default now()
);

create table portfolio_project_settings (
  github_repo_id bigint primary key references github_repo_snapshots(github_repo_id),
  is_visible boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer,
  slug text unique,
  display_title text,
  tagline text,
  problem_statement text,
  solution_summary text,
  tech_tags text[],
  art_direction text check (art_direction in ('topology','signal-red','ascii-terminal')),
  cover_asset_path text,
  demo_url text,
  case_study_markdown text,
  updated_at timestamptz not null default now()
);

create table portfolio_admin_allowlist (
  user_id uuid primary key,
  added_at timestamptz not null default now()
);

create table portfolio_site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
```

**Implementation caveats:** `github_repo_snapshots` lifecycle must account for removed/private repos and trustworthy public metadata; keep relevant `is_public` flags updated. Store only safe public fields in public-readable views, not token-bearing responses. For project media use Supabase Storage or Vercel-hosted optimized assets; choose permissions deliberately. `case_study_markdown` requires safe markdown renderer; do not execute embedded HTML. Use explicit migrations and types, not loose JSON in every component.

---

## 6. Owner-only admin: secure private control path

### 6.1 Routes and authentication

- Public discovers no admin CTA; owner navigates to `/admin` (path obscurity is **not security**).
- `/admin/login` uses **Supabase Auth**. Prefer GitHub OAuth if provider configuration and account linking are set up, or email magic link for simpler setup.
- **Crucial:** signing in with GitHub **does NOT automatically grant admin**. Server-side authorization requires the authenticated Supabase user ID to exist in `portfolio_admin_allowlist` (optionally also validate linked GitHub identity `ShyaamPrakash`).
- Never rely on a browser-only “isAdmin” flag, GitHub username supplied from client, path secret, or hardcoded password in frontend.
- Protect SSR admin routes, server actions and route handlers. Use Supabase SSR cookie/session patterns and verify auth **on every mutation**. Use RLS as a second boundary.
- Admin sign-out, session expiry, clean redirect and no-cache responses. Never leak unpublished content through public JSON or metadata.
- Setup/bootstrap: provision exactly one allowlisted owner via secure admin migration/bootstrap in Supabase console or privileged one-time script; no public self-registration to admin.

### 6.2 Admin UX

Layout should feel like a well-crafted instrument panel; **admin functionality takes priority over cinematic motion**.

**Repository list:** sortable table/cards with GitHub name, description, source update, visibility `ON/OFF` toggle, feature/pin, drag order, cover thumbnail, warnings (fork/archived/missing description) and quick links.

**Filters:** All / Published / Hidden / New / Featured / Archived. Search by repo name/language/topic.

**Project editor:** display title, short summary, tags, visual mode, cover image, case-study markdown, demo URL, and editorial preview.

**Controls:** `Sync GitHub`, `Save changes`, `Preview published gallery`, `Reset overrides`, `Sign out`. Give clear saved state, optimistic updates only with rollback, and accessible confirmations for destructive actions.

**Preview:** optional dedicated preview authenticated route; respect unpublished data only behind auth. Display how a slide looks on desktop/mobile.

### 6.3 Security requirements

- Public GET endpoints return only published fields; default RLS denies writes for anonymous and non-allowlisted users.
- Admin changes require verified authenticated owner at server and RLS levels; use Supabase service-role key **only within narrow server execution paths** if absolutely needed, never client-side.
- Prevent CSRF as applicable to chosen authentication/mutation design, validate origin and auth cookies; use input validation and URL/media allowlists.
- Add basic rate limits to force-sync and asset upload endpoints.
- Prevent stored XSS from editor fields/README data. Validate files, MIME, dimensions, sizes and storage paths on uploads.
- Keep tokens only in Vercel/Supabase secret manager; `.env.local` gitignored and `.env.example` contains placeholders only.
- Avoid publishing raw source resume containing private details.

---

## 7. Case study architecture

Each visible repo may have `/projects/[slug]` if enough useful content exists. Detail structure:

- Project masthead and strong editorial cover.
- **Problem / Intent** — from verified README or owner-written editorial data.
- **Architecture / Key Decisions** — supported modules, database and algorithms, with hand-drawn diagram if source supports it.
- **Implementation Notes** — key stack, constraints, genuinely implemented features.
- **Challenges / Next Iteration** — precise and truthful; distinguish planned vs shipped work.
- Links: GitHub, demo if valid, next featured project.

Missing editorial content should fall back to an elegant short project sheet, **not AI-written fictional metrics**. Generated text should never claim a project is used by hospitals, businesses or “thousands of users” without evidence.

**Suggested initial project candidates for owner selection (not auto-published):** MediCare/MediCore, Cash Flow Minimizer, Canteen Operations Console/CanteenLedger, Neighborhood Marketplace Portal, NotesBot, CriticsLens, SemanticSearcher, Bucktracker, MLHousePricesEstimator, and any other **actual matching** GitHub repos. Reconcile names only after API inspection.

---

## 8. Detailed motion storyboard / interaction specification

### Global motion language

- Transitions are composed from **scale, parallax, masking, type clipping, and opacity**; hard cuts used intentionally between monochrome and red.
- Motion curves: mainly smooth, restrained ease-outs with occasional sharper editorial snap. Avoid spring bouncing and SaaS card wiggles.
- Establish consistent durations: micro 120–240ms, component 300–650ms, cinematic section ~650–1100ms. Refine through actual testing, not fixed dogma.
- All navigation accessible during animation. Do not block user input for animation completion.

### Motion beats

| Beat | Trigger | Primary technology | Reduced-motion equivalent |
|---|---|---|---|
| Boot title | First visit | GSAP | Immediate hero |
| Headline rise / mask | Initial mount | GSAP | Static headline |
| Contour/point field | Hero visible | Three.js | Static SVG/ASCII fallback |
| ASCII dissolve | Subtle hero interaction | CSS/canvas + GSAP | Static ASCII frame |
| Signal emblem | Hover/tap/focus | Rive state machine | Plain SVG state |
| Topographic section reveal | Scroll in | GSAP ScrollTrigger | Nonanimated reveal |
| Red split-shutter slide | Next/previous | GSAP | Direct slide replacement |
| Project counter/progress | Gallery change | GSAP/CSS | Instant update |
| Skill signal lines | Section entry | SVG + GSAP | Fully drawn lines |
| Timeline chapter enter | Scroll in | GSAP | Static timeline |
| Footer terminal cursor | Footer in view | CSS (subtle) | Nonblinking cursor |

**Accessibility/performance:** `prefers-reduced-motion`, accessible focus rings, visible labels, pause controls where needed, scroll state preserved on back navigation, no seizure-risk flashing. A transition must never create a blank site if JS fails.

---

## 9. Responsive, accessibility and SEO requirements

### Responsive art direction

- **≥ 1440px:** editorial overlapping composition, 2-column hero, full visual texture; gallery oversized and immersive.
- **1024–1439px:** scaled composition; fewer overlays, strong readable hierarchy.
- **768–1023px:** compact 2-column or single-column; simplify scroll effects and pinning.
- **≤ 767px:** mobile-first typography, thumb-accessible slideshow controls, constrained media, no long forced horizontal scroll / massive preloader / hover-only content.

### Accessibility baseline

- Semantic sections, exactly one primary `<h1>`, clear nav landmarks and meaningful headings.
- Screen reader alt/captions for project media; hide decorative ASCII/topo/3D canvas from accessibility tree.
- Keyboard-accessible carousel with focus management; use arrow keys only while focused in carousel; announce slide changes carefully (`aria-live=polite` without noise).
- Text contrast WCAG AA targets; use off-white body on dark background and red primarily as accent, not small body copy.
- Visible keyboard focus and mobile tap targets, form errors, loading and save feedback.
- Respect `prefers-reduced-motion`; do not assume touch/pointer or WebGL availability.

### Search / social

- Metadata, OpenGraph image, canonical URL after owner chooses domain, sitemap, robots, structured project metadata only when truthful.
- Admin/auth/preview routes `noindex` and excluded from sitemap.
- Provide accessible, indexable SSR descriptions even if motion/visuals load after hydration.
- Avoid indexing hidden projects or deleted repo slugs.

---

## 10. Performance budgets / engineering standards

Target **excellent perceived performance without sacrificing the hero**:

- Functional text/navigation visible before costly visuals; avoid a persistent loading screen.
- LCP desktop target <2.5s and reasonable mobile Core Web Vitals on typical networks; test real performance rather than promise a score.
- CLS target <0.1: reserve aspect ratios, font fallbacks, fixed cover dimensions.
- Avoid unnecessary main-thread long tasks; GPU render capped; pause effects when hidden.
- Lazy load noncritical media, routes, Rive runtime and 3D assets.
- Next.js `<Image>` where appropriate; compressed AVIF/WebP; poster images for videos; no autoplaying heavy background movie on cellular.
- Dynamic imports with proper stable fallback, and server fetches with caching/revalidation.
- Avoid per-frame React `setState` for thousands of points / chars.
- QA on Chrome, Firefox, Safari/iOS, touch and keyboard; at least one integrated-GPU Windows and midrange mobile test profile.
- Add error and not-found states that retain the site art direction.

---

## 11. Vercel and data lifecycle

### Environment variables (example names; actual SDK requirements verified during implementation)

```dotenv
# Public, safe to expose
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # or current publishable key from installed SDK
NEXT_PUBLIC_SITE_URL=...

# Server only — NEVER NEXT_PUBLIC_*
GITHUB_TOKEN=...                   # optional, fine-grained / minimal scope
SUPABASE_SERVICE_ROLE_KEY=...      # optional, server-only if truly required
REVALIDATION_SECRET=...
```

- GitHub username is an app config constant, not a secret.
- Supabase URL and publishable/anon key are **not admin authorization**; enforce RLS.
- Vercel preview/prod environments need explicit Supabase and OAuth redirect allowlists.
- Automatic deploys via GitHub; safe schema migrations; never mutate production schema unintentionally during preview deploy.
- Admin changes persisted in Supabase and visible after invalidating server cache; not tied to redeployment.
- Add README runbook for auth setup, GitHub sync, seed owner allowlist, storage policy, environment configuration and recovery from API outage.

---

## 12. CLI skill discovery and mandatory quality workflow

**Owner has specifically asked to use existing CLI skills called or resembling:** Vercel / Vercel best practices, Frontend Design, Impeccable, and Ponytail / Pony Tail; also any directly relevant browser testing, animation/3D, accessibility and deployment skills already installed. **These were named by the owner but their actual files were not available to this planning assistant.**

Before coding, CLI must:

1. Inspect project workspace instructions (`AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `.codex/`, `.cursor/`, relevant global skill directories, or CLI-native skill discovery). Do not assume every directory exists.
2. Find **exact** names and README/SKILL.md files for Vercel, frontend-design, impeccable, ponytail and equivalents. Do not invent requirements from skill names; ask only if genuinely inaccessible.
3. Read each applicable skill **in full**. Record paths and actionable requirements in a short `docs/skill-compliance.md` generated **after approval**.
4. Resolve conflicting skills in this order: owner instructions + privacy/security > this accepted plan > project-specific instructions > general visual/style advice.
5. Use frontend-design skills to generate multiple genuinely different art-direction explorations before settling; **Impeccable** specifically as a systematic visual audit / polish pass (actual tasks according to the installed skill, not speculation).
6. Use verified Vercel / React / Next.js skill guidance for runtime architecture, efficient component composition, image/font loading, caching and deployment.
7. Use verified Ponytail skill according to its **actual documented purpose**; do not assume what it does based on name.
8. Check final output against reference screenshots at matching aspect ratios, not just general intuition.
9. Repeat visual audit after implementation; record issues and remedy them before declaring finished.

**Hard restriction:** Do not claim “applied all skills” if a named skill was not found or could not be executed. Report precisely which were applied and which remain unavailable.

---

## 13. Concrete component / directory design (proposed)

```text
app/
  (site)/
    page.tsx                    # public immersive home
    projects/[slug]/page.tsx    # published case studies only
  admin/
    layout.tsx                  # authenticated owner guard
    page.tsx                    # repo curation dashboard
    projects/[id]/page.tsx     # editorial project editor
    login/page.tsx             # depending on auth layout, outside guarded group
  api/
    github/sync/route.ts       # authenticated owner-only sync
    admin/projects/...         # owner-only mutations (or server actions)
  sitemap.ts
  robots.ts
components/
  site/
    Header.tsx Hero.tsx SignalField3D.tsx AsciiSignal.tsx
    About.tsx ProjectShowcase.tsx ProjectSlide.tsx
    Capabilities.tsx Journey.tsx Contact.tsx Footer.tsx
  motion/
    SmoothScrollProvider.tsx  MotionPreferences.tsx
    SplitReveal.tsx             # strictly reusable animations
  admin/
    RepoTable.tsx RepoVisibilityToggle.tsx ProjectEditor.tsx
    EditorPreview.tsx SyncStatus.tsx
  ui/                          # only accessible base primitives
lib/
  github/
    client.ts normalize.ts sync.ts
  projects/
    compose.ts types.ts queries.ts visibility.ts
  supabase/
    client.ts server.ts admin.ts
  auth/
    requireAdmin.ts
  validations/
    project.ts
  motion/
    gsap.ts
  design/
    tokens.ts
public/
  art/                         # optimized custom illustration assets
  rive/                        # real valid assets only
  preview/                     # non-sensitive images
supabase/
  migrations/
tests/
  unit/ integration/ e2e/
docs/
  decisions.md
  skill-compliance.md          # generated after skill discovery
  performance-audit.md
  visual-qa.md
.env.example
README.md
```

Architecture can evolve, but the following separations must remain: **GitHub ingestion ≠ public composition ≠ owner settings ≠ UI animations**.

---

## 14. Implementation phases and acceptance gates

### Phase 0 — Discovery + approval (**stop here now**)

- [ ] Re-read owner images and resume; catalog actual GitHub repos (names/visibility/README evidence).
- [ ] Discover all requested installed skills and read instructions.
- [ ] Present 1–2 art-direction frames / hero storyboard and architecture recap.
- [ ] Confirm decisions in Section 16.
- [ ] Obtain explicit approval before generating code.

### Phase 1 — Foundations

- [ ] Create Next.js/TS architecture, token system, base typography and layouts.
- [ ] Build semantic, navigable, responsive static content placeholders using **verified facts**, no fabrication.
- [ ] Set up Supabase, initial migrations and owner allowlist bootstrapping guide.
- [ ] Set up lint, types, tests and deployment preview.

**Gate:** static public site renders on desktop and mobile; no sensitive resume information leaks.

### Phase 2 — Data engine + owner dashboard

- [ ] GitHub ingestion, pagination, validation and persistent cache.
- [ ] Default-hidden repo settings and visibility composition.
- [ ] Supabase Auth / owner authorization + RLS.
- [ ] Admin list, show/hide toggle, reorder/feature and sync controls.
- [ ] Public route visibility protection, revalidation and admin tests.

**Gate:** newly discovered repos stay hidden; Shyaam alone can show/hide; toggle persists across redeploys and is reflected on site.

### Phase 3 — Portfolio visual construction

- [ ] Build hero, about, project gallery, capability blocks, journey and contact.
- [ ] Assemble custom artwork / textures; no stock template.
- [ ] Add project detail pages and shareable links.
- [ ] Review reference parity: charcoal topology, restrained red moment, monochrome particles, ASCII.

**Gate:** striking visual experience even with animations disabled and before Rive/Three load.

### Phase 4 — Motion systems

- [ ] Integrate Lenis and GSAP/ScrollTrigger with one RAF clock.
- [ ] Create gallery split/shutter transitions and robust interaction controls.
- [ ] Implement efficient Three.js hero signal field.
- [ ] Add a valid Rive state-machine asset for one deliberate interaction, with SVG fallback.
- [ ] Full reduced-motion + mobile simplified behavior.

**Gate:** transitions polished, no animation leaks, no blank frames, no touch scroll traps, keyboard interactions fully functional.

### Phase 5 — Content, hardening and final quality

- [ ] Owner curates first visible projects, supplies/approves authentic screenshot assets and project descriptions.
- [ ] Apply skill-based design/performance audits, including actual Impeccable procedure when found.
- [ ] Security review: auth, RLS, XSS, CSRF, secrets, route visibility, private personal data.
- [ ] Performance/SEO/accessibility/visual regressions; screenshots at desktop/tablet/mobile.
- [ ] Vercel deploy, production OAuth config, domain, env/secrets and admin docs.

**Gate:** production-ready; owner can manage published projects without editing source code.

### Required tests

```text
[DATA] New GitHub repo -> pending/hidden.
[DATA] Visible repo -> appears in public slideshow.
[DATA] Hidden repo -> absent from slideshow, sitemap, JSON, case study route.
[DATA] Rename -> settings remain attached by GitHub repo ID.
[DATA] GitHub outage -> last-good public snapshot + admin stale indicator.
[AUTH] Anonymous/non-owner -> 401/403 on every admin read/write/sync.
[AUTH] Logged-in GitHub user other than owner -> no admin permission.
[AUTH] Allowed owner -> can save inclusion/order/art direction; persists after reload.
[SEC] Secrets never appear in client bundle; raw resume PII never published.
[UI] Next/prev, keyboard, swipe, deep links, focus state, mobile controls.
[A11Y] Reduced-motion, no WebGL, keyboard-only, screen reader landmarks.
[PERF] Scroll with Three visible; resume after tab sleep; no memory/ticker leaks.
[SEO] Published case studies indexable, hidden/admin excluded.
[VISUAL] Compare section screenshots against all 3 references + original goals.
```

---

## 15. Definition of done

The project is complete only when:

1. Public home feels like a custom cinematic digital portfolio blending the **three references + disciplined ASCII**, with strong art direction and legible content.
2. All four technologies — **Lenis, GSAP, Three.js, Rive** — have real, documented functional uses, **or** a limitation preventing Rive asset authoring is clearly reported and an approved fallback is delivered; no fake assets.
3. Portfolio accurately reflects **Shyaam P** and the verified education/projects/skills; extended technical skills are owner-confirmed rather than invented.
4. Gallery **dynamically synchronizes public GitHub repositories** from `ShyaamPrakash` and remains useful during GitHub API outages.
5. Owner has a **secure private admin route** to show/hide/pin/order projects, and can manage publication after launch without making code changes.
6. Hidden projects are filtered **on the server** from all public pages and endpoints.
7. Experience is usable on mobile, keyboard accessible, honors reduced motion, and has tested performance fallbacks.
8. CI/test coverage, architecture documentation, admin setup, Vercel deployment and secrets handling are documented.
9. Named CLI skills were genuinely discovered/read/applied and their outcomes are reported without fabrication.
10. Shyaam reviews and approves the design before implementation and reviews actual repo publication selections before launch.

---

## 16. Decisions to ask Shyaam at the approval gate

Do not delay presenting the plan because of these; these are **questions for approval, not blockers for planning**:

1. **Visual direction:** Do you approve charcoal + monochrome topographic/point-cloud art with **red-orange cinematic interrupts** and ASCII accents? Should the site be more aggressively experimental or more readable/editorial?
2. **Project visibility:** Recommended default is **new GitHub repos hidden until you approve them**. Do you want that, or auto-show new repos by default?
3. **Admin sign-in:** Prefer GitHub OAuth linked to your GitHub identity, or Supabase email magic-link? Both require a server-side one-user allowlist.
4. **Skills accuracy:** Which **microcontroller families/dev boards, embedded tools, Oracle components, Supabase and FastAPI capabilities** have you actually used? Are these academic/coursework exposures or project-demonstrated experience?
5. **Personal links:** Provide LinkedIn URL, intended domain, and whether to publicly show an email. Do you want a sanitized downloadable resume?
6. **Project content:** Which repos should be featured first, and can you provide screenshots/videos for the strongest projects? Missing assets can use intentionally designed vector/ASCII art, not fictitious interface mockups.
7. **Text positioning:** Approve / edit proposed tagline: “I build where algorithms meet real-world systems.”
8. **Motion intensity:** The recommendation is **cinematic but controlled** (one dramatic red work transition, restrained remainder). Do you want a more radical gallery installation?

### CLI final action for this stage

**Do not start the implementation.** Report what you found about skills and current GitHub repository inventory, summarize the intended hero/work/admin experience, surface these approval questions in compact form, then wait for Shyaam's approval.

---

## Technical reference links to verify during implementation

- GitHub API repos: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
- GitHub user: https://github.com/ShyaamPrakash
- Next.js: https://nextjs.org/docs
- Supabase Auth / SSR / RLS: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Lenis: https://github.com/darkroomengineering/lenis
- GSAP / ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Three.js: https://threejs.org/docs/
- React Three Fiber: https://r3f.docs.pmnd.rs/
- Rive React: https://rive.app/docs/runtimes/react/react

**These are orientation links, not a substitute for installed skill instructions or checking latest version-specific APIs.**
