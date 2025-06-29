import type { Metadata } from 'next'

interface SEOData {
  title?: string
  description?: string
  image?: {
    url: string
    alt: string
  }
}

interface PageData {
  title: string
  meta?: SEOData
}

interface SettingsData {
  siteName: string
  siteDescription: string
  ogImage?: {
    url: string
    alt: string
  }
}

export function generateMetadata(
  page: PageData,
  settings: SettingsData,
  pathname: string = '/'
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const url = `${baseUrl}${pathname}`
  
  const title = page.meta?.title || page.title
  const description = page.meta?.description || settings.siteDescription
  const siteName = settings.siteName
  
  const ogImage = page.meta?.image?.url || settings.ogImage?.url
  const ogImageAlt = page.meta?.image?.alt || settings.ogImage?.alt || title

  return {
    title: title === siteName ? title : `${title} | ${siteName}`,
    description,
    applicationName: siteName,
    
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName,
      images: ogImage ? [
        {
          url: ogImage,
          alt: ogImageAlt,
          width: 1200,
          height: 630,
        }
      ] : undefined,
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: url,
    },
  }
}

export function generateJsonLd(page: PageData, settings: SettingsData) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.meta?.description || settings.siteDescription,
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: settings.siteName,
    },
  }
}