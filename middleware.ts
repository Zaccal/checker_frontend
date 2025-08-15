import { type NextRequest, NextResponse } from 'next/server'
import { PUBLIC_PATHS } from './lib/constants/constants'

export function middleware(request: NextRequest) {
  const session = request.cookies.has(
    process.env.SESSION_COOKIE_NAME ?? 'better-auth.session_token',
  )
  const path = request.nextUrl.pathname

  const isPublicPath = PUBLIC_PATHS.some(publicPath => publicPath === path)

  // It won't allow user visit public page if user is authed
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/auth/:path*', '/login'],
}
