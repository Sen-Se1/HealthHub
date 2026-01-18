import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Check for auth_token cookie
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/patient', '/doctor']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/patient/:path*', 
    '/doctor/:path*'
  ],
}
