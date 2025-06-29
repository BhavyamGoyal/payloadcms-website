import { Hero, Features, CTA, Testimonials, Pricing, FAQ } from './index'

interface Block {
  blockType: string
  [key: string]: any
}

interface RenderBlocksProps {
  blocks: Block[]
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return (
              <Hero
                key={index}
                title={block.title}
                subtitle={block.subtitle}
                backgroundImage={block.backgroundImage}
                ctaButton={block.ctaButton}
              />
            )
          
          case 'features':
            return (
              <Features
                key={index}
                title={block.title}
                subtitle={block.subtitle}
                features={block.features || []}
              />
            )
          
          case 'cta':
            return (
              <CTA
                key={index}
                title={block.title}
                description={block.description}
                button={block.button}
                backgroundImage={block.backgroundImage}
              />
            )
          
          case 'testimonials':
            return (
              <Testimonials
                key={index}
                title={block.title}
                testimonials={block.testimonials || []}
              />
            )
          
          case 'pricing':
            return (
              <Pricing
                key={index}
                title={block.title}
                subtitle={block.subtitle}
                plans={block.plans || []}
              />
            )
          
          case 'faq':
            return (
              <FAQ
                key={index}
                title={block.title}
                faqs={block.faqs || []}
              />
            )
          
          default:
            return null
        }
      })}
    </>
  )
}