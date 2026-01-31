import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to NextDocs</h1>
      <p className="mt-4">Start with <Link href="/en/docs/v1/introduction">docs</Link>.</p>
    </div>
  )
}
