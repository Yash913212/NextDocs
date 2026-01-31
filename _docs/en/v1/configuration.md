---
title: Configuration
description: Configure NextDocs to suit your needs
---

# Configuration

Learn how to customize and configure NextDocs for your documentation needs.

## Environment Variables

NextDocs uses environment variables for configuration. Create a `.env.local` file:

```bash
# Application Environment
NODE_ENV=development

# Site Configuration
NEXT_PUBLIC_SITE_NAME=NextDocs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_SEARCH_ENABLED=true
NEXT_PUBLIC_ENABLE_API_REFERENCE=true
```

## Next.js Configuration

Customize Next.js behavior in `next.config.js`:

```javascript
module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'es', 'fr', 'de'],
    defaultLocale: 'en',
  },
}
```

## Internationalization

Configure supported languages in `next-i18next.config.js`:

```javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de'],
  },
  localePath: './public/locales',
}
```

## Styling

Customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#7928ca',
      },
    },
  },
}
```

## Documentation Structure

Organize your documentation files:

```
_docs/
  ├── en/
  │   ├── v1/
  │   │   ├── introduction.md
  │   │   ├── installation.md
  │   │   └── quick-start.md
  │   └── v2/
  ├── es/
  ├── fr/
  └── de/
```

## Advanced Options

### ISR Revalidation

Control how often pages are regenerated:

```javascript
export async function getStaticProps() {
  return {
    props: { /* data */ },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
```

### Custom Components

Create custom MDX components for enhanced documentation.
