'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface CTAProps {
  title: string
  description?: string
  button?: {
    text: string
    url: string
  }
  backgroundImage?: {
    url: string
    alt: string
  }
}

export function CTA({ title, description, button, backgroundImage }: CTAProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section relative overflow-hidden" ref={ref}>
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900" />
      )}

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/10" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-2 text-white mb-6">
            {title}
          </h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-xl text-white/90 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {button && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                asChild
              >
                <a href={button.url}>
                  {button.text}
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}