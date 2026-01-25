
# Welcome to NextDocs!

NextDocs is your all-in-one, high-performance documentation portal, designed for teams and projects that need beautiful, multi-language docs with zero hassle. Built on Next.js, it brings you lightning-fast pages, seamless internationalization, and all the features you wish every docs site had—right out of the box.

## Features at a Glance

- **Multi-Language**: English, Spanish, French, and German—switch with a click!
- **Blazing Fast (ISR)**: Pages update every 60 seconds, always fresh, always fast.
- **Versioned Docs**: Effortlessly manage v1, v2, and v3 side-by-side.
- **Full-Text Search**: Find anything, instantly.
- **Dark/Light Mode**: Follows your system, or pick your favorite.
- **Smart Table of Contents**: Auto-generated, scroll-aware, and clickable.
- **API Reference**: Interactive Swagger UI for your API docs.
- **Feedback Widget**: Let your users help you improve.
- **Copyable Code Blocks**: One click, code copied.
- **Mobile-Ready**: Looks great everywhere.
- **Dockerized**: Easy to run anywhere, anytime.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-i18next
- **Search**: flexsearch
- **API Docs**: swagger-ui-react
- **State**: Zustand
- **Icons**: Lucide React
- **Markdown**: react-markdown + remark-gfm
- **Container**: Docker & docker-compose

## Quick Start

Ready to get going? Here’s how:

### Prerequisites
- Node.js 18+ **or** Docker

### Local Development
1. **Clone this repo:**
	```bash
	git clone <repository-url>
	cd NextDocs
	```
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Set up your environment:**
	```bash
	cp .env.example .env
	```
4. **Start the dev server:**
	```bash
	npm run dev
	```
5. Open [http://localhost:3000](http://localhost:3000) and you’re live!

### Docker
1. **Build and run:**
	```bash
	docker-compose up --build
	```
2. Visit [http://localhost:3000](http://localhost:3000) in your browser.
3. The container will auto-check its health for you.


---

## Project Structure (at a glance)

```
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── [locale]/
│   │   ├── layout.tsx             # Locale-specific layout
│   │   └── docs/
│   │       ├── v[version]/
│   │       │   └── [...slug]/
│   │       │       └── page.tsx    # Dynamic documentation pages
│   │       └── layout.tsx          # Docs layout
│   └── api-reference/
│       └── page.tsx                # Swagger UI API reference page
├── components/
│   ├── LanguageSwitcher.tsx        # Language switcher component
│   ├── ThemeToggle.tsx             # Theme toggle button
│   ├── Sidebar.tsx                 # Navigation sidebar
│   ├── VersionSelector.tsx         # Version selector dropdown
│   ├── TableOfContents.tsx         # TOC with scroll tracking
│   ├── Search.tsx                  # Full-text search component
│   ├── CodeBlock.tsx               # Code block with copy button
│   ├── FeedbackWidget.tsx          # Feedback form
│   ├── Header.tsx                  # Page header
│   └── ...other components
├── _docs/
│   ├── en/
│   │   ├── v1/
│   │   ├── v2/
│   │   └── v3/
│   ├── es/
│   ├── fr/
│   └── de/
├── public/
│   ├── locales/                    # Translation files
│   │   ├── en/
│   │   ├── es/
│   │   ├── fr/
│   │   └── de/
│   ├── openapi.json                # OpenAPI specification
├── lib/
│   ├── docs.ts                     # Documentation utilities
│   ├── store.ts                    # Zustand stores
│   └── search.ts                   # Search functionality
├── Dockerfile                      # Docker configuration
├── docker-compose.yml              # Docker Compose setup
├── .env.example                    # Environment variables example
└── README.md                       # This file
```

## Why You’ll Love NextDocs

### 1. Multi-Language, No Hassle
Docs in English, Spanish, French, and German. Just use the language switcher in the header, or go straight to URLs like:
- `/en/docs/v1/introduction`
- `/es/docs/v1/introduction`
- `/fr/docs/v1/introduction`
- `/de/docs/v1/introduction`

### 2. Always Fresh with ISR
Pages are statically generated and auto-refreshed every 60 seconds. Fast, scalable, and always up-to-date. Want to check? Try:
```bash
curl -I http://localhost:3000/en/docs/v1/introduction | grep Cache-Control
# Output: Cache-Control: public, s-maxage=60, stale-while-revalidate
```

### 3. Versioned Docs
Switch between v1, v2, and v3 with the version selector. Each version has its own structure and content.

### 4. Lightning Search
Type in the search bar—results appear instantly, searching all headings, text, and code.

### 5. Theme Your Way
Dark or light, it’s your call. Follows your system by default, but you can always toggle and it’ll remember.

### 6. Smart Table of Contents
Every doc page gets a clickable, scroll-aware TOC. Jump to any section, see where you are.

### 7. Sidebar Navigation
Collapsible, version-aware sidebar for easy browsing.

### 8. API Reference, Interactive
Swagger UI at `/api-reference`—explore, test, and learn your API right in the browser.

### 9. Copyable Code Blocks
Every code example has a copy button. One click, done.

### 10. Feedback Widget
Let your users send feedback on any page. Help us help you!

## Environment Variables

Copy `.env.example` to `.env` and tweak as needed:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_NAME=NextDocs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Docker Deployment

### Build the Docker image
```bash
docker build -t nextdocs:latest .
```

### Run with docker-compose
```bash
docker-compose up --build -d
```

### Check container health
```bash
docker-compose ps
```
The health check runs every 30 seconds. The container is healthy after one successful check.

## Development

### Start the dev server
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm start
```

### Run tests
```bash
npm test
npm run test:watch
```

### Lint your code
```bash
npm run lint
```

## API Endpoints

### Documentation
- `GET /[locale]/docs/v[1-3]/[slug]` — Get a specific doc page
  
Example:
```bash
curl http://localhost:3000/en/docs/v1/introduction
```

### API Reference
- `GET /api-reference` — Interactive API docs

### Health Check
- `GET /health` — App health check (for Docker)

## Performance

- **Image Optimization**: Uses next/image for fast, crisp images
- **Font Optimization**: No layout shift, just clean text
- **Code Splitting**: Only loads what you need
- **ISR**: Docs update in the background
- **Caching**: Smart headers for speed

## Accessibility

- Semantic HTML5 for structure
- Keyboard navigation everywhere
- ARIA labels where it matters
- High-contrast, readable colors
- 100% mobile-friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## Troubleshooting

### App won’t start in Docker?
1. Is Docker running?
	```bash
	docker ps
	```
2. Check logs:
	```bash
	docker-compose logs app
	```
3. Make sure port 3000 isn’t in use:
	```bash
	lsof -i :3000
	```

### Build fails?
1. Clear Next.js cache:
	```bash
	rm -rf .next
	```
2. Reinstall dependencies:
	```bash
	rm -rf node_modules package-lock.json
	npm install
	```

### Search not working?
1. Make sure the search index builds on startup
2. Check your browser console for errors
3. Confirm docs are in the right folder

## Contributing

We love contributions! Here’s how to get started:
1. Fork this repo
2. Create a feature branch
3. Make your changes
4. Open a pull request

## License

MIT — use it, share it, build something awesome!
