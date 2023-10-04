import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
	const { pathname } = request.nextUrl

	const isPublicPath = pathname === '/login' || pathname === '/signup'

	const token = request.cookies.get('token')?.value

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL('/profile', request.nextUrl))
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL('/login', request.nextUrl))
	}
}

export const config = {
	matcher: ['/', '/profile/:id*', '/login', '/signup'],
}
