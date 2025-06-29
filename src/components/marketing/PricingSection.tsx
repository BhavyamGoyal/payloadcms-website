'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Check, X, Star } from 'lucide-react'

interface PricingFeature {
  feature?: string
  included?: boolean
}

interface PricingPlan {
  name?: string
  price?: string
  period?: string
  description?: string
  features?: PricingFeature[]
  buttonText?: string
  buttonUrl?: string
  featured?: boolean
}

interface PricingData {
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
}

interface PricingSectionProps {
  data: PricingData | null
}

export function PricingSection({ data }: PricingSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('pricing-section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  if (!data || !data.plans?.length) {
    return null
  }

  return (
    <section id="pricing-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {data.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {data.subtitle}
            </p>
          )}

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Yearly
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 delay-${index * 100} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.featured 
                  ? 'ring-2 ring-blue-600 scale-105' 
                  : 'border border-gray-200 dark:border-gray-700'
              }`}>
                
                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    {plan.name && (
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                    )}
                    {plan.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {plan.description}
                      </p>
                    )}
                    
                    {/* Price */}
                    <div className="mb-6">
                      {plan.price && (
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="text-gray-600 dark:text-gray-400 ml-2">
                              {isYearly && plan.period.includes('month') ? '/year' : plan.period}
                            </span>
                          )}
                        </div>
                      )}
                      {isYearly && plan.period?.includes('month') && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Billed annually
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        plan.featured
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      asChild
                    >
                      <a href={plan.buttonUrl || '#'}>
                        {plan.buttonText || 'Get Started'}
                      </a>
                    </Button>
                  </div>

                  {/* Features */}
                  {plan.features && plan.features.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-4">
                        What&apos;s included:
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            {feature.included ? (
                              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${
                              feature.included 
                                ? 'text-gray-700 dark:text-gray-300' 
                                : 'text-gray-400 dark:text-gray-500 line-through'
                            }`}>
                              {feature.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Background Gradient for Featured */}
                {plan.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl -z-10"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              30-Day Money Back Guarantee
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try risk-free. If you&apos;re not completely satisfied, get a full refund within 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}