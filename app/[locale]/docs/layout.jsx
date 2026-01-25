import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { getDocSlugs } from '@/lib/docs'

export default function DocsLayout({ children, params }) {
  const links = getDocSlugs(params.locale, params.version).map((slug) => ({
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
  }))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header locale={params.locale} version={params.version} />
      <div className="max-w-7xl mx-auto pt-16 lg:flex gap-8 px-4 sm:px-6 lg:px-8">
        <Sidebar links={links} />
        <div className="flex-1 lg:max-w-3xl py-8">{children}</div>
      </div>
    </div>
  )
}
