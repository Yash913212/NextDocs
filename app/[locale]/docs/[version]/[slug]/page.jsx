import { getDoc, getDocSlugs, getAllDocs } from '@/lib/docs'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { TableOfContents } from '@/components/TableOfContents'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { CodeBlock } from '@/components/CodeBlock'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export async function generateStaticParams() {
  const locales = ['en', 'es', 'fr', 'de']
  const versions = ['v1', 'v2', 'v3']
  const params = []

  for (const locale of locales) {
    for (const version of versions) {
      const slugs = getDocSlugs(locale, version)
      for (const slug of slugs) {
        params.push({ locale, version, slug })
      }
    }
  }

  return params
}

export async function generateMetadata({ params }) {
  const { locale, version, slug } = params
  const doc = getDoc(locale, version, slug)

  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${doc.metadata?.title || slug} - NextDocs`,
    description: doc.metadata?.description || '',
  }
}

export default function DocPage({ params }) {
  const { locale, version, slug } = params
  const doc = getDoc(locale, version, slug)
  const allDocs = getAllDocs(locale, version)

  if (!doc) {
    notFound()
  }

  // Custom renderers for markdown
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')

      if (!inline && match) {
        return <CodeBlock code={codeString} language={match[1]} />
      }

      return (
        <code
          className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      )
    },
    h2({ children, ...props }) {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return (
        <h2 id={id} className="text-2xl font-bold mt-8 mb-4 scroll-mt-20" {...props}>
          {children}
        </h2>
      )
    },
    h3({ children, ...props }) {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return (
        <h3 id={id} className="text-xl font-semibold mt-6 mb-3 scroll-mt-20" {...props}>
          {children}
        </h3>
      )
    },
    a({ href, children, ...props }) {
      const isExternal = href?.startsWith('http')
      return (
        <a
          href={href}
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="w-3 h-3" />}
        </a>
      )
    },
    ul({ children, ...props }) {
      return <ul className="list-disc list-inside space-y-2 my-4" {...props}>{children}</ul>
    },
    ol({ children, ...props }) {
      return <ol className="list-decimal list-inside space-y-2 my-4" {...props}>{children}</ol>
    },
    p({ children, ...props }) {
      return <p className="my-4 leading-7" {...props}>{children}</p>
    },
    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300"
          {...props}
        >
          {children}
        </blockquote>
      )
    },
  }

  const githubEditUrl = `https://github.com/yourusername/nextdocs/edit/main/_docs/${locale}/${version}/${slug}.md`

  return (
    <>
      <Header docs={allDocs} locale={locale} version={version} />
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          <Sidebar docs={allDocs} locale={locale} version={version} />

          <main className="flex-1 min-w-0 py-8">
            <article data-testid="doc-content" className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                {doc.content}
              </ReactMarkdown>
            </article>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href={githubEditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                <ExternalLink className="w-4 h-4" />
                Edit this page on GitHub
              </a>
            </div>

            <div className="mt-8">
              <FeedbackWidget />
            </div>
          </main>

          <TableOfContents content={doc.content} />
        </div>
      </div>
    </>
  )
}
