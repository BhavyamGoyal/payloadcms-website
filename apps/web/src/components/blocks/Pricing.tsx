'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Plan {
  name: string
  price: number
  period?: string
  description?: string
  features: Array<{ feature: string }>
  button?: {
    text: string
    url: string
  }
  featured?: boolean
}

interface PricingProps {
  title: string
  subtitle?: string
  plans: Plan[]
}

export function Pricing({ title, subtitle, plans }: PricingProps) {
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                'relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300',
                plan.featured && 'ring-2 ring-primary-500 scale-105'
              )}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="heading-4 text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {plan.description}
                    </p>
                  )}
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.button && (
                  <Button
                    className={cn(
                      'w-full',
                      plan.featured
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
                    )}
                    asChild
                  >
                    <a href={plan.button.url}>
                      {plan.button.text}
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}