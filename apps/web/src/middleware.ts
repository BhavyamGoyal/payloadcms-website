import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Handle preview mode
  const previewCookie = request.cookies.get('payload-preview')
  if (previewCookie) {
    response.headers.set('X-Preview-Mode', 'true')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (uploaded media files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
}