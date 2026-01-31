import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function handler(req, res) {
  const locale = req.query.locale || 'en'
  // scan all versions
  const baseLocales = path.join(process.cwd(), '_docs', locale)
  let items = []
  if (fs.existsSync(baseLocales)) {
    const versions = fs.readdirSync(baseLocales)
    versions.forEach((v) => {
      const dir = path.join(baseLocales, v)
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir)
        files.forEach((f) => {
          const full = path.join(dir, f)
          const raw = fs.readFileSync(full, 'utf8')
          const { data, content } = matter(raw)
          const slug = f.replace(/\.mdx?$|\.md$/i, '')
          items.push({
            version: v,
            slug,
            title: data.title || slug,
            content,
            path: `/docs/${v}/${slug}`
          })
        })
      }
    })
  }
  res.status(200).json({ items })
}
