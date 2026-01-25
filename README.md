# NextDocs - Multi-Language Documentation Portal

A high-performance, multi-language documentation portal built with Next.js, featuring Incremental Static Regeneration (ISR), internationalization (i18n), and comprehensive documentation features.

## Features

- 🌍 **Multi-Language Support**: English, Spanish, French, and German with sub-path routing
- ⚡ **Incremental Static Regeneration (ISR)**: Pages regenerate automatically every 60 seconds
- 📚 **Version Management**: Support for v1, v2, and v3 documentation versions
- 🔍 **Full-Text Search**: Client-side search across all documentation
- 🎨 **Dark/Light Theme**: System preference detection and persistent storage
- 📖 **Table of Contents**: Auto-generated with scroll-based active section highlighting
- 🔧 **API Reference**: Interactive Swagger UI for API documentation
- 💬 **Feedback Widget**: User feedback collection on each page
- 📋 **Code Blocks**: Copy-to-clipboard functionality for code examples
- 🎯 **Responsive Design**: Mobile-friendly layout with collapsible sidebar
- 🐳 **Docker Support**: Containerized setup with docker-compose

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Internationalization**: next-i18next
- **Search**: flexsearch
- **API Documentation**: swagger-ui-react
- **State Management**: Zustand
- **Icons**: Lucide React
- **Markdown**: react-markdown with remark-gfm
- **Container**: Docker & docker-compose

## Quick Start

### Prerequisites

- Node.js 18+ or Docker

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd NextDocs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

1. Build and run with docker-compose:
```bash
docker-compose up --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

3. The container includes a health check that monitors application availability.

## Project Structure

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

## Key Features

### 1. Multi-Language Support

All documentation is available in English, Spanish, French, and German. Navigate using locale sub-paths:
- `/en/docs/v1/introduction`
- `/es/docs/v1/introduction`
- `/fr/docs/v1/introduction`
- `/de/docs/v1/introduction`

Use the language switcher in the header to change languages.

### 2. Incremental Static Regeneration

Documentation pages are statically generated at build time and automatically regenerated every 60 seconds. This ensures:
- **Fast performance**: Pages are served from the CDN
- **Fresh content**: Updates are deployed within 60 seconds
- **Scalability**: Reduced server load compared to server-side rendering

Verify ISR with the `Cache-Control` header:
```bash
curl -I http://localhost:3000/en/docs/v1/introduction | grep Cache-Control
# Output: Cache-Control: public, s-maxage=60, stale-while-revalidate
```

### 3. Version Management

Switch between documentation versions using the version selector dropdown. Each version maintains its own documentation structure:
- v1: Original documentation
- v2: Updated features and changes
- v3: Latest version with newest features

### 4. Full-Text Search

Search across all documentation pages using the search input in the header. Results are displayed in real-time as you type. The search indexes all content including headings, paragraphs, and code blocks.

### 5. Theme Support

The application automatically detects the system's dark/light preference on first load. Use the theme toggle button in the header to switch themes. Your preference is saved in localStorage.

### 6. Table of Contents

Each documentation page displays an auto-generated table of contents that:
- Lists all headings on the page
- Highlights the current section based on scroll position
- Provides quick navigation to any section

### 7. Sidebar Navigation

The collapsible sidebar displays available documentation pages for the current version. Click a link to navigate to that page.

### 8. API Reference

Visit `/api-reference` to view interactive API documentation rendered from the OpenAPI specification. The Swagger UI allows you to:
- Explore all available endpoints
- View request/response schemas
- Try out API calls directly

### 9. Code Blocks

All code examples include a copy-to-clipboard button. Click the button to copy the code to your clipboard.

### 10. Feedback Widget

Provide feedback on documentation pages using the feedback widget. Your feedback helps improve the documentation.

## Environment Variables

Copy `.env.example` to `.env` and configure the variables:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_NAME=NextDocs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Docker Deployment

### Build the Docker image:

```bash
docker build -t nextdocs:latest .
```

### Run with docker-compose:

```bash
docker-compose up --build -d
```

### Check container health:

```bash
docker-compose ps
```

The health check runs every 30 seconds. The container is considered healthy after successfully passing 1 health check.

## Development

### Run the development server:

```bash
npm run dev
```

### Build for production:

```bash
npm run build
npm start
```

### Run tests:

```bash
npm test
npm run test:watch
```

### Linting:

```bash
npm run lint
```

## API Endpoints

### Documentation

- `GET /[locale]/docs/v[1-3]/[slug]` - Get a specific documentation page

Example:
```bash
curl http://localhost:3000/en/docs/v1/introduction
```

### API Reference

- `GET /api-reference` - Interactive API documentation

### Health Check

- `GET /health` - Application health check (for docker-compose)

## Performance Optimization

- **Image Optimization**: Uses next/image for automatic image optimization
- **Font Optimization**: Next.js font optimization reduces layout shift
- **Code Splitting**: Components are automatically code-split by Next.js
- **ISR**: Documentation pages are regenerated in the background
- **Caching**: Browser caching with appropriate Cache-Control headers

## Accessibility

- Semantic HTML5 elements for better structure
- Keyboard navigation support for all interactive elements
- ARIA labels and descriptions where appropriate
- High contrast colors for readability
- Mobile-friendly responsive design

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## Troubleshooting

### Application won't start in Docker

1. Check Docker is running:
```bash
docker ps
```

2. Check container logs:
```bash
docker-compose logs app
```

3. Verify ports are not in use:
```bash
lsof -i :3000
```

### Build fails

1. Clear Next.js cache:
```bash
rm -rf .next
```

2. Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Search not working

1. Verify search index is built during initialization
2. Check browser console for errors
3. Ensure documentation files are in the correct location

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
