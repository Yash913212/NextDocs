---
title: Frequently Asked Questions
description: Common questions about NextDocs
---

# Frequently Asked Questions

## General Questions

### What is NextDocs?

NextDocs is a modern documentation portal built with Next.js that provides fast, multi-language support for technical documentation. It's designed for both static content and dynamic features.

### Who should use NextDocs?

NextDocs is ideal for:
- Software projects requiring comprehensive documentation
- Teams serving global audiences
- Organizations needing API reference documentation
- Companies with multiple product versions

### Is NextDocs open source?

Yes, NextDocs is open source and available on GitHub under the MIT license.

## Technical Questions

### What technology stack does NextDocs use?

NextDocs is built with:
- **Next.js 14**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **next-i18next**: Internationalization
- **Zustand**: State management
- **React Markdown**: Markdown rendering

### How does ISR (Incremental Static Regeneration) work?

ISR allows documentation pages to be:
1. Pre-built at build time for fast initial load
2. Automatically regenerated in the background every 60 seconds
3. Served from the cache while updates are being generated

This provides the best of both worlds: fast performance and fresh content.

### How do I add a new language?

1. Update `next-i18next.config.ts` to include the new locale
2. Create translation files in `public/locales/{locale}/`
3. Create documentation content in `_docs/{locale}/`

### Can I use NextDocs for non-technical documentation?

Yes! While NextDocs is optimized for technical documentation, it can be used for any type of content that benefits from multi-language support, versioning, and search functionality.

## Internationalization (i18n)

### How many languages are supported?

NextDocs comes pre-configured for 4 languages:
- English (en)
- Spanish (es)
- French (fr)
- German (de)

You can add more languages by modifying the configuration.

### How do I translate the UI strings?

UI translations are stored in `public/locales/{locale}/common.json`. Edit these files to translate:
- Navigation items
- Buttons
- Messages
- Other UI text

### Do I need to create content in all languages?

No, NextDocs gracefully handles missing translations. Users will see a fallback to the default language (English).

## Documentation Management

### How do I add a new documentation page?

1. Create a Markdown file in `_docs/{locale}/{version}/`
2. Add front matter with title and description
3. Write the content
4. The page is automatically available at `/{locale}/docs/{version}/{slug}`

### How do I organize large documentation sets?

Use semantic file naming and organize by:
- Topic area
- Feature
- Product section

Example:
```
_docs/en/v1/
├── getting-started.md
├── api-reference.md
├── guides/
│   ├── authentication.md
│   ├── error-handling.md
│   └── best-practices.md
└── references/
    ├── cli.md
    └── sdk.md
```

### Can I include images in documentation?

Yes, store images in `public/` and reference them:

```markdown
![Alt text](/images/my-image.png)
```

### How do I handle code examples?

Use fenced code blocks with language specification:

```python
def example():
    return "This has syntax highlighting"
```

## Versioning

### How do I manage multiple versions?

Documentation for each version lives in its own directory:

```
_docs/en/
├── v1/    # Version 1
├── v2/    # Version 2
└── v3/    # Version 3
```

Users can switch versions using the version selector.

### Can I deprecate an old version?

You can mark pages as deprecated by adding a notice in the Markdown content. You can also redirect old version URLs to the latest version if desired.

## Search & Discovery

### How does search work?

NextDocs uses client-side full-text search powered by flexsearch:
- Indexes all documentation content
- Searches in real-time as you type
- Returns relevant results with highlighting

### Can I customize search?

Yes, you can modify the search implementation in `lib/search.ts` to:
- Change the search library
- Add filters
- Customize indexing
- Change result display

## Deployment

### Can I deploy to Vercel?

Yes! Vercel is the recommended hosting platform for Next.js applications. Deployment is as simple as:

1. Connect your GitHub repository
2. Vercel automatically detects Next.js
3. Deploy with one click

### What about Docker deployment?

NextDocs includes:
- A `Dockerfile` for containerization
- A `docker-compose.yml` for local development
- Ready for production deployment

### What's the recommended way to update documentation?

For live documentation:
1. Make changes to Markdown files
2. Push to your main branch
3. ISR automatically regenerates pages within 60 seconds
4. No full rebuild required

## Performance

### How fast is NextDocs?

Very fast! NextDocs achieves:
- Sub-100ms first page load (for static content)
- Automatic image optimization
- CSS-in-JS optimization
- Code splitting per page

### How does performance compare to other documentation platforms?

NextDocs is significantly faster than:
- Server-rendered documentation sites
- Heavy SPA documentation apps
- Database-backed documentation systems

All due to static generation and edge caching.

### Can I measure performance?

Use built-in Next.js analytics or integrate:
- Google Analytics
- Vercel Analytics
- Custom tracking

## Customization

### Can I change the theme colors?

Yes, edit `app/globals.css` to customize:
- Background colors
- Text colors
- Accent colors
- Dark mode colors

### Can I add custom components?

Yes, you can:
1. Create components in `components/`
2. Import in Markdown using MDX (add `@mdx-js/react`)
3. Or embed via HTML in Markdown

### Can I add tracking/analytics?

Yes, add analytics in your layout:

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* Your content */}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
```

## Troubleshooting

### Pages not showing up?

Check:
1. File exists in correct `_docs/` directory
2. File has `.md` extension
3. Front matter is valid YAML
4. Slug doesn't contain special characters

### Search returning no results?

- Ensure documentation files are in `_docs/`
- Check that content includes searchable text
- Verify search index is built

### Theme toggle not working?

- Check `useThemeStore` is properly initialized
- Verify localStorage is enabled
- Check browser console for errors

### Docker container won't start?

- Check port 3000 isn't already in use
- Verify `.env` file exists
- Check Docker logs: `docker-compose logs app`

## Getting Help

### Where can I get support?

- Check the FAQ (you are here!)
- Search the documentation
- Open an issue on GitHub
- Visit our community forum

### How can I contribute?

We welcome contributions! See the CONTRIBUTING.md file for guidelines.

## Future Roadmap

We're planning:
- Full-text search with Algolia integration
- Versioned API endpoints
- Advanced analytics
- Multi-team support
- Custom domain support

---

**Still have questions?** Use the feedback widget on any page to suggest improvements!
