'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: {
    url: string
    alt: string
  }
  ctaButton?: {
    text: string
    url: string
  }
}

export function Hero({ title, subtitle, backgroundImage, ctaButton }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Gradient Background */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900" />
      )}

      {/* Content */}
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="heading-1 text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {ctaButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                asChild
              >
                <a href={ctaButton.url}>
                  {ctaButton.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}