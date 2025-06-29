import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PreviewProvider } from '@/components/providers/PreviewProvider'
import { getPage, getNavigation, getSettings } from '@/lib/payload'
import { getPreviewData } from '@/lib/preview'
import { generateMetadata as generateSEOMetadata, generateJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [pageData, settings] = await Promise.all([
      getPage('home'),
      getSettings(),
    ])

    const page = pageData.docs?.[0]
    if (!page) {
      return {
        title: 'Home | Marketing Site',
        description: 'Modern marketing website built with Payload CMS and Next.js',
      }
    }

    return generateSEOMetadata(page, settings, '/')
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Home | Marketing Site',
      description: 'Modern marketing website built with Payload CMS and Next.js',
    }
  }
}

export default async function HomePage() {
  const previewData = await getPreviewData()
  
  try {
    const [pageData, navigation, settings] = await Promise.all([
      getPage('home', previewData.isPreview),
      getNavigation(),
      getSettings(),
    ])

    const page = pageData.docs?.[0]
    if (!page) {
      notFound()
    }

    const jsonLd = generateJsonLd(page, settings)

    return (
      <PreviewProvider isEnabled={previewData.isPreview} token={previewData.token || undefined}>
        <div className="min-h-screen flex flex-col">
          <Header navigation={navigation} settings={settings} />
          
          <main className="flex-1">
            <RenderBlocks blocks={page.blocks || []} />
          </main>
          
          <Footer navigation={navigation} settings={settings} />
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </PreviewProvider>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    notFound()
  }
}