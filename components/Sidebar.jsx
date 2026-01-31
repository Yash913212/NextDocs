import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const { locale } = router
  const [items, setItems] = useState([])

  // Server-side render: if running on server, synchronously read files so HTML contains nav links
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs')
      const path = require('path')
      const base = path.join(process.cwd(), '_docs', locale || 'en', 'v1')
      if (fs.existsSync(base)) {
        const files = fs.readdirSync(base)
        const serverItems = files.map((f) => ({ slug: f.replace(/\.mdx?$|\.md$/i, ''), title: f.replace(/\.mdx?$|\.md$/i, '') }))
        return (
          <aside className="w-64 border-r border-gray-800 p-4 hidden md:block bg-gray-900 text-gray-100" data-testid="sidebar">
            <nav>
              <ul>
                {serverItems.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/docs/v1/${it.slug}`} locale={locale}>
                      <a data-testid={`sidebar-nav-link-${it.slug}`} className="block px-2 py-1 rounded hover:bg-white/5 transition-colors duration-150 text-gray-200 font-medium">{it.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )
      }
    } catch (e) {
      // fallback to client-side
    }
  }

  useEffect(() => {
    fetch(`/api/nav?locale=${locale}&version=v1`)
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
  }, [locale])

  return (
    <aside className="w-64 p-4 hidden md:block bg-gray-900 border-r border-gray-800 text-gray-100" data-testid="sidebar" aria-label="Documentation navigation">
      <div className="mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-vite-600 to-vite-400 rounded flex items-center justify-center"> 
          <span className="text-white font-bold">ND</span>
        </div>
        <div className="text-gray-100 font-semibold">Docs</div>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.slug}>
              <Link href={`/docs/v1/${it.slug}`} locale={locale}>
                <a data-testid={`sidebar-nav-link-${it.slug}`} className="block px-2 py-1 rounded hover:bg-white/5 transition-colors duration-150 text-gray-200 font-medium">{it.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
