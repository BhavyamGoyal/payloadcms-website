'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import RichText from '@/components/RichText'

interface FAQ {
  question?: string
  answer?: object
}

interface FAQData {
  title?: string
  subtitle?: string
  faqs?: FAQ[]
}

interface FAQSectionProps {
  data: FAQData | null
}

export function FAQSection({ data }: FAQSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [openItems, setOpenItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('faq-section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  if (!data || !data.faqs?.length) {
    return null
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="faq-section" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {data.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {data.faqs.map((faq, index) => {
              const isOpen = openItems.includes(index)
              
              return (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${index * 100} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-blue-600 transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-200" />
                        )}
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out ${
                      isOpen 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                      <div className="px-8 pb-6">
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                          {faq.answer ? (
                            <div className="prose dark:prose-invert max-w-none">
                              <RichText content={faq.answer} />
                            </div>
                          ) : (
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              Answer content would go here.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Still have questions CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Contact Support
                </button>
                <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}