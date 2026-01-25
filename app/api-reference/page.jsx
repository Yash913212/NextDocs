'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function APIReferencePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="p-8">Loading API documentation...</div>
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">API Reference</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Interactive API documentation for the NextDocs platform
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SwaggerUI url="/openapi.json" />
        </div>
      </div>
    </div>
  )
}
