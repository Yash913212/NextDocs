/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es', 'fr', 'de'],
    defaultLocale: 'en'
  },
  experimental: {
    appDir: true
  },
  async headers() {
    return [
      {
        // Apply cache-control for docs pages (supports locale subpaths)
        source: '/:locale/docs/:version/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=59'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
