import { cookies } from 'next/headers'

export async function getPreviewData() {
  const cookieStore = await cookies()
  const previewCookie = cookieStore.get('payload-preview')
  
  if (!previewCookie?.value) {
    return { isPreview: false, token: null }
  }

  try {
    // Verify the token is still valid
    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'
    const response = await fetch(`${payloadUrl}/api/users/me`, {
      headers: {
        Authorization: `JWT ${previewCookie.value}`,
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      return { isPreview: false, token: null }
    }

    const user = await response.json()
    
    if (!user || !['admin', 'editor', 'previewer'].includes(user.role)) {
      return { isPreview: false, token: null }
    }

    return { isPreview: true, token: previewCookie.value }
  } catch (error) {
    console.error('Preview verification error:', error)
    return { isPreview: false, token: null }
  }
}

export function generatePreviewUrl(slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/api/preview?slug=${slug}`
}