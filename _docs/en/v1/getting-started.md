---
title: Getting Started
description: Quick start guide for NextDocs
---

# Getting Started with NextDocs

This guide will help you get up and running with NextDocs in minutes.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18 or higher
- npm or yarn package manager
- A code editor (VS Code recommended)
- Basic understanding of Next.js

## Installation

### Local Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nextdocs.git
cd nextdocs
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

### Docker Setup

1. Build and run with Docker Compose:

```bash
docker-compose up --build
```

2. Access the application at:

```
http://localhost:3000
```

## Project Structure

```
nextdocs/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── _docs/           # Documentation content
├── lib/             # Utilities and helpers
├── public/          # Static assets
└── ...
```

## Your First Documentation Page

Documentation pages are written in Markdown and stored in the `_docs` directory.

### File Organization

```
_docs/
├── en/              # English documentation
│   ├── v1/         # Version 1
│   ├── v2/         # Version 2
│   └── v3/         # Version 3
├── es/             # Spanish documentation
├── fr/             # French documentation
└── de/             # German documentation
```

### Creating a New Page

1. Create a new Markdown file in the appropriate directory:

```bash
touch _docs/en/v1/my-page.md
```

2. Add front matter with metadata:

```yaml
---
title: My Page Title
description: Brief description of the page
---

# Page Content

Your content goes here...
```

3. The page will be automatically available at:

```
/en/docs/v1/my-page
```

## Markdown Features

NextDocs supports full Markdown with syntax highlighting:

### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Lists

```markdown
- Item 1
- Item 2
  - Nested item

1. First
2. Second
3. Third
```

### Code Blocks

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('NextDocs');
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

## Multi-Language Support

To add a page in a different language:

1. Create the file in the appropriate language directory:

```bash
touch _docs/es/v1/mi-pagina.md
```

2. Use the same slug but create translations:

```yaml
---
title: Mi Título de Página
description: Breve descripción de la página
---

# Contenido en Español
```

3. Access it at:

```
/es/docs/v1/mi-pagina
```

## Customize Your Documentation

### Update Site Metadata

Edit `.env` to customize site information:

```env
NEXT_PUBLIC_SITE_NAME=MyDocs
NEXT_PUBLIC_SITE_URL=https://docs.example.com
```

### Add Custom Styling

Modify `app/globals.css` to customize colors and styles.

### Change Translations

Update translation files in `public/locales/`:

```
public/locales/
├── en/common.json
├── es/common.json
├── fr/common.json
└── de/common.json
```

## Building for Production

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Deployment

### Docker Deployment

Build the Docker image:

```bash
docker build -t nextdocs:latest .
```

Run the container:

```bash
docker run -p 3000:3000 nextdocs:latest
```

### Cloud Deployment

NextDocs can be deployed to:
- Vercel (recommended for Next.js)
- AWS
- Google Cloud
- Azure
- Any platform supporting Node.js

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

### Build Fails

Clear the cache and reinstall:

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Search Not Working

Ensure documentation files exist in `_docs/en/v1/` directory.

## Next Steps

- [Configuration Guide](./configuration) - Learn advanced setup
- [API Reference](/api-reference) - Explore the API
- [Contributing](./contributing) - Help improve NextDocs

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Markdown Guide](https://www.markdownguide.org)

---

*Happy documenting!*
