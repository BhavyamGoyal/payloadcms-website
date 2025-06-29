'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { ArrowRight, Play } from 'lucide-react'

import type { Hero } from '@/payload-types'

interface HeroSectionProps {
  data: Hero | null
}

export function HeroSection({ data }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!data) {
    return null
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute top-0 right-0 -mt-40 -mr-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-40 -ml-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-600 rounded-full opacity-20 blur-3xl" />
      
      {data.backgroundImage && (
        <div className="absolute inset-0">
          <Media resource={data.backgroundImage} className="w-full h-full object-cover opacity-10" />
        </div>
      )}

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {data.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {data.title.split(' ').map((word, index) => (
                  <span key={index} className={index % 2 === 1 ? 'text-blue-600 dark:text-blue-400' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
            )}
            
            {data.subtitle && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
                {data.subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {data.primaryButton?.text && (
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <a href={data.primaryButton.url || '#'}>
                    {data.primaryButton.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
              
              {data.secondaryButton?.text && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  asChild
                >
                  <a href={data.secondaryButton.url || '#'}>
                    <Play className="mr-2 h-5 w-5" />
                    {data.secondaryButton.text}
                  </a>
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {data.heroImage ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 transform rotate-6"></div>
                <Media 
                  resource={data.heroImage} 
                  className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 transform rotate-6"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Hero Image Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}