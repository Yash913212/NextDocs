'use client'

import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { useParams } from 'next/navigation'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })
import 'swagger-ui-react/swagger-ui.css'

export default function APIReferencePage() {
  const params = useParams()
  const locale = params?.locale || 'en'

  return (
    <>
      <Header locale={locale} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">API Reference</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete API documentation for NextDocs platform
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <SwaggerUI url="/openapi.json" />
        </div>
      </div>
    </>
  )
}
