import Link from 'next/link'

export default function LocaleHomePage({ params }) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">NextDocs</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Welcome to the documentation portal</p>

          <Link
            href={`/${params.locale}/docs/v1/introduction`}
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </main>
  )
}
