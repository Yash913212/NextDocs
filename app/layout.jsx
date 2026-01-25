import './globals.css'

export const metadata = {
  title: 'NextDocs - Multi-Language Documentation Portal',
  description: 'A high-performance, multi-language documentation portal built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
