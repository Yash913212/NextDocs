'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const segments = pathname.split('/')
  const currentLocale = segments[1] || 'en'

  const currentLanguage = languages.find((lang) => lang.code === currentLocale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="language-switcher"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Select language"
      >
        <span className="text-sm font-medium">{currentLanguage?.name || 'Language'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname.replace(`/${currentLocale}/`, `/${lang.code}/`) || `/${lang.code}`}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                currentLocale === lang.code ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {lang.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
