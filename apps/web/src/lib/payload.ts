const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

export async function getPayloadData<T = any>(
  endpoint: string,
  options?: {
    cache?: RequestCache
    next?: NextFetchRequestConfig
    draft?: boolean
  }
): Promise<T> {
  const url = `${PAYLOAD_URL}/api/${endpoint}`
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (options?.draft) {
    // Add draft headers if needed
    headers['X-Draft-Mode'] = 'true'
  }

  try {
    const response = await fetch(url, {
      headers,
      cache: options?.cache || 'force-cache',
      next: options?.next,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

export async function getPage(slug: string, draft = false) {
  return getPayloadData(`pages?where[slug][equals]=${slug}&limit=1&draft=${draft}`)
}

export async function getPages(draft = false) {
  return getPayloadData(`pages?draft=${draft}`)
}

export async function getGlobal(slug: string, draft = false) {
  return getPayloadData(`globals/${slug}?draft=${draft}`)
}

export async function getSettings() {
  return getGlobal('settings')
}

export async function getNavigation() {
  return getGlobal('navigation')
}