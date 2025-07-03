import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const session = request.cookies.has('better-auth.session_token')
	const path = request.nextUrl.pathname

	const isPublickPath =
		path === '/auth/forgot-password' ||
		path === '/auth/magic-link/verify' ||
		path === '/auth/otp-code/verify' ||
		path === '/auth/reset-password' ||
		path.startsWith('/auth/reset-password/') ||
		path === '/'

	// It won't allow user visit public page if user is authed
	if (session && isPublickPath) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (!session && !isPublickPath) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/', '/auth/:path*'],
}
