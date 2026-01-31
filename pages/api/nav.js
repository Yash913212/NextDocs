import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const locale = req.query.locale || 'en'
  const version = req.query.version || 'v1'
  const base = path.join(process.cwd(), '_docs', locale, version)
  let items = []
  if (fs.existsSync(base)) {
    const files = fs.readdirSync(base)
    items = files.map((f) => ({
      slug: f.replace(/\.mdx?$|\.md$/i, ''),
      title: f.replace(/\.mdx?$|\.md$/i, '')
    }))
  }
  res.status(200).json({ items })
}
