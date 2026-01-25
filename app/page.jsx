import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white">
            NextDocs
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern, high-performance documentation portal with multi-language support, ISR, and advanced features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/en/docs/v1/introduction"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Read the Docs
            </Link>
            <Link
              href="/api-reference"
              className="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              API Reference
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Static generation with ISR for lightning-fast page loads
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support for English, Spanish, French, and German
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rich Features</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search, versioning, dark mode, and interactive components
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Started in Minutes</h2>
            <div className="text-left space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-semibold mb-2">1. Explore the Documentation</h4>
                <p>Start with the introduction and get familiar with NextDocs</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Check the API Reference</h4>
                <p>View interactive API documentation with Swagger UI</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Try Different Languages</h4>
                <p>Use the language switcher to see content in Spanish, French, or German</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Switch Versions</h4>
                <p>Explore different documentation versions with the version selector</p>
              </div>
            </div>

            <Link
              href="/en/docs/v1/introduction"
              className="inline-block mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
