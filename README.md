# NextDocs

A sample multi-language documentation portal built with Next.js (App Router), Tailwind CSS, ISR, client-side search, Swagger UI integration, and Docker.

---

## 🚀 Features

- Incremental Static Regeneration (ISR) with revalidate = 60s for documentation pages
- Locale sub-paths: **en**, **es**, **fr**, **de** (sub-path routing)
- Client-side full-text search (FlexSearch) with a server-generated index
- API Reference rendered with **Swagger UI** from `/public/openapi.json`
- Theme switcher (light/dark) with persistent preference (localStorage)
- Copy-to-clipboard code blocks, Table of Contents (TOC) with active-section highlighting, collapsible sidebar navigation, and feedback widget
- Containerized via Docker + docker-compose for consistent development and testing

---

## 🧩 Project Structure (important files)

- `_docs/` — Markdown docs organized by `locale/version/slug.md` (e.g. `_docs/en/v1/introduction.md`)
- `pages/docs/[version]/[...slug].jsx` — Dynamic docs rendering with ISR (revalidate: 60)
- `components/` — UI components (Sidebar, Header, TOC, CodeBlock, FeedbackWidget, Search, ThemeToggle, LanguageSwitcher)
- `pages/api/search-index.js` — Search index generator endpoint
- `pages/api/nav.js` — Navigation endpoint for the sidebar
- `public/openapi.json` — Sample OpenAPI spec used by Swagger UI
- `Dockerfile`, `docker-compose.yml`, `docker/nginx.conf` — Containerization + proxy and healthcheck setup
- `scripts/verify.sh` — Quick verification script that validates core requirements

---

## 📦 Environment variables (`.env.example`)

The application reads its public configuration from environment variables. Copy `.env.example` to `.env` and update values as needed.

Variables in `.env.example`:

- NEXT_PUBLIC_BASE_URL (default: http://localhost:3000)
- NEXT_PUBLIC_APP_NAME (default: NextDocs)
- NEXT_PUBLIC_ALGOLIA_APP_ID (optional)
- NEXT_PUBLIC_ALGOLIA_API_KEY (optional)
- NEXT_PUBLIC_ALGOLIA_INDEX (optional)
- NODE_ENV (development|production)

> Note: Do not commit secrets. Only public/placeholder values are in `.env.example`.

---

## ⚙️ Quick start

### Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   # open http://localhost:3000
   ```

### Docker (recommended for a production-like environment)

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Build and start the services:

   ```bash
   docker-compose up --build -d
   ```

3. Check services and health:

   ```bash
   docker-compose ps
   ```

4. Visit: http://localhost:3000

---

## ✅ Verification (automated)

A quick verification script is included to validate the core requirements (ISR headers, i18n pages, sidebar & links, search, Swagger UI, data-testids, etc.). Run:

```bash
chmod +x scripts/verify.sh
./scripts/verify.sh
```

All checks should pass (the script reports failures with details).

---

## 📄 How to add documentation content

Docs are simple Markdown files with optional frontmatter:

- Path convention: `_docs/{locale}/{version}/{slug}.md`
- Example: `_docs/en/v1/introduction.md`
- Frontmatter fields supported: `title` (used for page title and sidebar)

After adding/editing docs, you can rebuild Docker images or run in dev mode. ISR will revalidate pages at runtime (s-maxage=60).

---

## 🧪 Tests & CI

- A simple verification script is provided (`scripts/verify.sh`).
- I can add **Cypress** E2E tests or **Jest + React Testing Library** unit tests on request; tell me if you prefer one and I’ll add them to the repo and CI.

---

## 🛠 Troubleshooting

- If sidebar nav is empty in the initial HTML, ensure `_docs` is present before build. The Dockerfile now copies `_docs` when building the image.
- If a Docker build fails during `npm run build`, try building locally with `npm run build` to see PostCSS/Tailwind errors.
- If healthcheck fails, inspect logs:

  ```bash
  docker-compose logs --tail=200 app
  ```

---

## ✅ Core requirements implemented

- Dockerized app with `docker-compose.yml` + healthcheck (port 3000) ✅
- `.env.example` present and documented ✅
- Documentation pages use ISR with revalidate = 60 ✅
- i18n sub-paths for en, es, fr, de ✅
- Language switcher `data-testid="language-switcher"` ✅
- Collapsible Sidebar with `data-testid="sidebar"` and links `sidebar-nav-link-{slug}` ✅
- Client-side full-text search (`data-testid="search-input"`, `search-results`, `search-no-results`) ✅
- API Reference using `swagger-ui-react` and `/public/openapi.json` with `.swagger-ui` container ✅
- Version selector (`data-testid="version-selector"`) and options ✅
- Dark/light theme toggle (`data-testid="theme-toggle"`) that persists ✅
- Table of Contents with active link markers (`data-testid="table-of-contents"`, `toc-link-{slug}`) ✅
- Feedback widget (`feedback-input`, `feedback-submit`, `feedback-success-message`) ✅
- Copy-to-clipboard code blocks (`data-testid="code-block"`, `copy-code-button`) ✅

---

## 🙋‍♂️ Need help or want tests added?

If you want me to add automated E2E tests (Cypress) or unit tests (Jest + RTL) and wire them into a CI (GitHub Actions), say the word and I’ll add them and a CI workflow now.

---

Thanks — if anything is missing or you want a CI integration or screenshots/video for the README, I can add those quickly.
