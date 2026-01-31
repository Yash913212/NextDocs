import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const match = pathname.match(/^\/(en|es|fr|de)\/docs\/v[1-3]\/.+/)
  if (match) {
    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59')
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/en/docs/:path*', '/es/docs/:path*', '/fr/docs/:path*', '/de/docs/:path*']
}
