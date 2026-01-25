'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function VersionSelector() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const versionMatch = pathname.match(/\/v(\d)\//)
  const currentVersion = versionMatch ? versionMatch[1] : '1'
  const versions = ['1', '2', '3']

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="version-selector"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
        aria-label="Select version"
      >
        <span>v{currentVersion}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {versions.map((version) => {
            const newPathname = pathname.replace(/\/v\d\//, `/v${version}/`)
            return (
              <Link
                key={version}
                href={newPathname}
                data-testid={`version-option-v${version}`}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  currentVersion === version ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                v{version}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
