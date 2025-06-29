import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { HeroSection } from '@/components/marketing/HeroSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { PricingSection } from '@/components/marketing/PricingSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import { CallToActionSection } from '@/components/marketing/CallToActionSection'
import type { Hero, Feature, Testimonial, Pricing, Faq } from '@/payload-types'

export default async function MarketingPage() {
  const { isEnabled: draft } = await draftMode()
  
  const [hero, features, testimonials, pricing, faq] = await Promise.all([
    getGlobalData('hero'),
    getGlobalData('features'),
    getGlobalData('testimonials'),
    getGlobalData('pricing'),
    getGlobalData('faq'),
  ])

  return (
    <main className="min-h-screen">
      {draft && <LivePreviewListener />}
      
      <HeroSection data={hero as Hero | null} />
      <FeaturesSection data={features as Feature | null} />
      <TestimonialsSection data={testimonials as Testimonial | null} />
      <PricingSection data={pricing as Pricing | null} />
      <FAQSection data={faq as Faq | null} />
      <CallToActionSection />
    </main>
  )
}

const getGlobalData = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.findGlobal({
      slug,
      draft,
      overrideAccess: draft,
    })
    return result
  } catch (error) {
    console.error(`Error fetching global: ${slug}`, error)
    return null
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getGlobalData('hero')
  
  return {
    title: hero?.title || 'Marketing Platform',
    description: hero?.subtitle || 'The best marketing platform for your business',
    openGraph: {
      title: hero?.title || 'Marketing Platform',
      description: hero?.subtitle || 'The best marketing platform for your business',
      type: 'website',
    },
  }
}