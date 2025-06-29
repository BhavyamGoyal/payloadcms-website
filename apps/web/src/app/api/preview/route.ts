import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const slug = searchParams.get('slug') || ''

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 })
  }

  try {
    // Verify the token with Payload CMS
    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'
    const response = await fetch(`${payloadUrl}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const user = await response.json()
    
    // Check if user has preview permissions
    if (!user || !['admin', 'editor', 'previewer'].includes(user.role)) {
      return NextResponse.json({ message: 'Insufficient permissions' }, { status: 403 })
    }

    // Set preview cookie
    const cookieStore = await cookies()
    cookieStore.set('payload-preview', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    // Redirect to the page
    const redirectUrl = slug === 'home' ? '/' : `/${slug}`
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error('Preview error:', error)
    return NextResponse.json({ message: 'Preview error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Exit preview mode
    const cookieStore = await cookies()
    cookieStore.delete('payload-preview')
    
    return NextResponse.json({ message: 'Preview mode disabled' })
  } catch (error) {
    console.error('Error exiting preview:', error)
    return NextResponse.json({ message: 'Error exiting preview' }, { status: 500 })
  }
}