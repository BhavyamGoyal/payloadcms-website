'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
  role?: string
  company?: string
  avatar?: {
    url: string
    alt: string
  }
}

interface TestimonialsProps {
  title: string
  testimonials: Testimonial[]
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
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
    <section className="section bg-white dark:bg-gray-800" ref={ref}>
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800" />
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar.url}
                      alt={testimonial.avatar.alt}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' at '}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}