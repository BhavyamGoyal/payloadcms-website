import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PreviewProvider } from '@/components/providers/PreviewProvider'
import { getPage, getPages, getNavigation, getSettings } from '@/lib/payload'
import { getPreviewData } from '@/lib/preview'
import { generateMetadata as generateSEOMetadata, generateJsonLd } from '@/lib/seo'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const pages = await getPages()
    return pages.docs
      ?.filter((page: any) => page.slug !== 'home')
      .map((page: any) => ({
        slug: page.slug,
      })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const [pageData, settings] = await Promise.all([
      getPage(slug),
      getSettings(),
    ])

    const page = pageData.docs?.[0]
    if (!page) {
      return {
        title: 'Page Not Found | Marketing Site',
        description: 'The page you are looking for does not exist.',
      }
    }

    return generateSEOMetadata(page, settings, `/${slug}`)
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Page Not Found | Marketing Site',
      description: 'The page you are looking for does not exist.',
    }
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const previewData = await getPreviewData()
  
  try {
    const [pageData, navigation, settings] = await Promise.all([
      getPage(slug, previewData.isPreview),
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
          
          <main className="flex-1 pt-16">
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