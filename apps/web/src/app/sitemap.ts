import { MetadataRoute } from 'next'
import { getPages } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const currentDate = new Date()

  try {
    const pages = await getPages()
    
    const sitemapEntries: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1,
      },
    ]

    // Add dynamic pages
    if (pages.docs) {
      pages.docs.forEach((page: any) => {
        if (page.slug !== 'home') {
          sitemapEntries.push({
            url: `${baseUrl}/${page.slug}`,
            lastModified: new Date(page.updatedAt),
            changeFrequency: 'weekly',
            priority: 0.8,
          })
        }
      })
    }

    return sitemapEntries
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}