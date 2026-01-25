'use client'

import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { VersionSelector } from './VersionSelector'
import { SearchComponent } from './SearchComponent'
import Link from 'next/link'

export function Header({ locale, version }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href={`/${locale}`} className="text-xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            NextDocs
          </Link>

          <SearchComponent locale={locale} version={version} />

          <div className="flex items-center gap-3">
            <VersionSelector />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
