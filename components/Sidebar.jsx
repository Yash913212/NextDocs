'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useSidebarStore } from '@/lib/store'

export function Sidebar({ links }) {
  const { isOpen, toggle } = useSidebarStore()
  const pathname = usePathname()

  const segments = pathname.split('/')
  const locale = segments[1] || 'en'
  const versionMatch = pathname.match(/\/v(\d)\//)
  const version = versionMatch ? `v${versionMatch[1]}` : 'v1'

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggle}
        className="lg:hidden fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        data-testid="sidebar"
        className={`fixed left-0 top-0 pt-20 w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:pt-4 z-30`}
      >
        <nav className="p-4 space-y-2">
          <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-4">Navigation</h3>
          {links.map((link) => {
            const href = `/${locale}/docs/${version}/${link.slug}`
            const isActive = pathname === href

            return (
              <Link
                key={link.slug}
                href={href}
                data-testid={`sidebar-nav-link-${link.slug}`}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    useSidebarStore.setState({ isOpen: false })
                  }
                }}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
