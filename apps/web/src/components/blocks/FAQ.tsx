'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title: string
  faqs: FAQItem[]
}

export function FAQ({ title, faqs }: FAQProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="section bg-white dark:bg-gray-800" ref={ref}>
      <div className="container max-w-4xl">
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
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index)
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="heading-4 text-gray-900 dark:text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        'w-6 h-6 text-gray-500 transition-transform duration-200 flex-shrink-0',
                        isOpen && 'transform rotate-180'
                      )}
                    />
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <div
                      className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}