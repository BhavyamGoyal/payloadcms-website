import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle live preview authorization
  if (request.nextUrl.pathname.startsWith('/next/preview')) {
    const token = request.nextUrl.searchParams.get('token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Allow preview requests with valid tokens to proceed
    // The actual role verification happens in the preview route handler
    return NextResponse.next()
  }

  // Handle admin panel access
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/next/preview/:path*', '/admin/:path*']
}