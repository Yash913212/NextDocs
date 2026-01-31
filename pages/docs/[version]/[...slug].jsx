import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import CodeBlock from '../../../components/CodeBlock'
import TOC from '../../../components/TOC'
import FeedbackWidget from '../../../components/FeedbackWidget'

export default function DocPage({ content, frontmatter, headings, locale, version, slug }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-6">
      <article className="prose dark:prose-invert" data-testid="doc-content">
        <h1>{frontmatter.title}</h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Render inline code normally
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) return <code>{children}</code>
              // block-level code will be handled by the `pre` override below
              return <code>{children}</code>
            },
            // Replace the default <pre><code>...</code></pre> wrapper with our CodeBlock component
            pre: ({ node, children }) => {
              // children[0] is the <code> element rendered by `code` above
              const codeElement = children?.[0]
              const raw = (codeElement && codeElement.props && codeElement.props.children) || ''
              // Flatten nested React elements (eg. highlighted spans) into plain text
              const flatten = (node) => {
                if (node == null) return ''
                if (typeof node === 'string') return node
                if (Array.isArray(node)) return node.map(flatten).join('')
                if (typeof node === 'object' && node.props && node.props.children) return flatten(node.props.children)
                return ''
              }
              const value = flatten(raw)
              return <CodeBlock value={value.replace(/\n$/, '')} />
            },
            h1: ({ node, children }) => {
              const text = children[0] || ''
              const id = String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
              return <h1 id={id}>{children}</h1>
            },
            h2: ({ node, children }) => {
              const text = children[0] || ''
              const id = String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
              return <h2 id={id}>{children}</h2>
            },
            h3: ({ node, children }) => {
              const text = children[0] || ''
              const id = String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
              return <h3 id={id}>{children}</h3>
            }
          }}
        >
          {content}
        </ReactMarkdown>
        <FeedbackWidget />
      </article>
      <aside>
        <TOC headings={headings} />
      </aside>
    </div>
  )
}

export async function getStaticPaths() {
  const docsRoot = path.join(process.cwd(), '_docs')
  const locales = fs.readdirSync(docsRoot)
  const paths = []

  locales.forEach((locale) => {
    const localeDir = path.join(docsRoot, locale)
    if (!fs.existsSync(localeDir)) return
    const versions = fs.readdirSync(localeDir)
    versions.forEach((v) => {
      const vdir = path.join(localeDir, v)
      if (!fs.existsSync(vdir)) return
      const files = fs.readdirSync(vdir)
      files.forEach((f) => {
        const slug = f.replace(/\.mdx?$|\.md$/i, '')
        paths.push({ params: { version: v, slug: [slug] }, locale })
      })
    })
  })

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, locale }) {
  const version = params.version
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const filePath = path.join(process.cwd(), '_docs', locale || 'en', version, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return { notFound: true }
  }

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  // Find headings
  const lines = content.split('\n')
  const headings = lines
    .filter((l) => l.startsWith('#'))
    .map((l) => {
      const text = l.replace(/^#+\s*/, '')
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return { text, slug }
    })

  return {
    props: {
      content,
      frontmatter: data || {},
      headings,
      locale: locale || 'en',
      version,
      slug
    },
    revalidate: 60
  }
}
