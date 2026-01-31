export const dynamic = 'force-dynamic'
import { getDoc, getDocSlugs, getAvailableVersions, getAvailableLocales } from '@/lib/docs'
import { TableOfContents } from '@/components/TableOfContents'
import { CodeBlock } from '@/components/CodeBlock'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'

function extractCodeBlocks(content) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  const blocks = []
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    })
  }

  return blocks
}

function createMarkdownComponents(content) {
  const codeBlocks = extractCodeBlocks(content)
  let codeBlockIndex = 0

  return {
    code: ({ inline, className, children }) => {
      if (inline) {
        return <code className={className}>{children}</code>
      }

      const block = codeBlocks[codeBlockIndex] || { code: String(children), language: 'text' }
      codeBlockIndex++

      return <CodeBlock code={block.code} language={block.language} />
    },
    h1: ({ children }) => (
      <h1 id={`heading-${String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={`heading-${String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={`heading-${String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 id={`heading-${String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`}>
        {children}
      </h4>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table>{children}</table>
      </div>
    ),
  }
}

export async function generateStaticParams() {
  const locales = getAvailableLocales()
  const versions = getAvailableVersions() // Use versions as-is (with 'v' prefix)
  const params = []

  for (const locale of locales) {
    for (const version of versions) {
      const slugs = getDocSlugs(locale, version)
      slugs.forEach((slug) => {
        params.push({
          locale,
          version,
          slug: [slug],
        })
      })
    }
  }

  return params
}

export async function generateMetadata({ params }) {
  const slug = params.slug[0]
  const doc = getDoc(params.locale, params.version, slug)

  if (!doc) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${doc.metadata.title} | NextDocs`,
    description: doc.metadata.description,
  }
}

export default function DocPage({ params }) {
  const slug = params.slug[0]
  const doc = getDoc(params.locale, params.version, slug)

  if (!doc) {
    notFound()
  }

  const components = createMarkdownComponents(doc.content)

  return (
    <div>
      <article className="prose dark:prose-invert max-w-none">
        <h1>{doc.metadata.title}</h1>

        <div data-testid="doc-content" className="space-y-6">
          <Markdown remarkPlugins={[remarkGfm]} components={components}>
            {doc.content}
          </Markdown>
        </div>
      </article>

      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-8">
        <FeedbackWidget />
      </div>

      <TableOfContents content={doc.content} />
    </div>
  )
}

export const revalidate = 60
