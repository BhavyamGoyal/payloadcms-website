'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import * as Icons from 'lucide-react'

interface Feature {
  title: string
  description?: string
  icon?: string
  image?: {
    url: string
    alt: string
  }
}

interface FeaturesProps {
  title: string
  subtitle?: string
  features: Feature[]
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="section bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lead max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon && (Icons as any)[feature.icon]

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon or Image */}
                <div className="mb-6">
                  {feature.image ? (
                    <div className="w-16 h-16 relative rounded-2xl overflow-hidden">
                      <Image
                        src={feature.image.url}
                        alt={feature.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : IconComponent ? (
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                      <Icons.Star className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                </div>

                <h3 className="heading-4 text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                {feature.description && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}