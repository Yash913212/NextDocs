'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CodeBlock({ code, language = 'text' }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div
      data-testid="code-block"
      className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{language}</span>
        <button
          onClick={copyToClipboard}
          data-testid="copy-code-button"
          className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
