'use client'

import { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  name?: string
  position?: string
  company?: string
  testimonial?: string
  avatar?: object
  rating?: number
}

interface TestimonialsData {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

interface TestimonialsSectionProps {
  data: TestimonialsData | null
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('testimonials-section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (data?.testimonials && data.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [data?.testimonials])

  if (!data || !data.testimonials?.length) {
    return null
  }

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <section id="testimonials-section" className="py-20 bg-gray-50 dark:bg-gray-800">
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

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Testimonial */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-100 dark:text-gray-700" />
              
              {data.testimonials[currentSlide] && (
                <div className="relative z-10">
                  <div className="flex mb-6">
                    {renderStars(data.testimonials[currentSlide].rating)}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium leading-relaxed mb-8">
                    &ldquo;{data.testimonials[currentSlide].testimonial}&rdquo;
                  </blockquote>
                  
                  <div className="flex items-center">
                    {data.testimonials[currentSlide].avatar ? (
                      <Media 
                        resource={data.testimonials[currentSlide].avatar} 
                        className="w-16 h-16 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold text-lg">
                          {data.testimonials[currentSlide].name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {data.testimonials[currentSlide].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {data.testimonials[currentSlide].position}
                        {data.testimonials[currentSlide].company && (
                          <span> at {data.testimonials[currentSlide].company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Testimonial Grid */}
          {data.testimonials.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.testimonials.slice(1, 7).map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${(index + 1) * 100} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </p>
                    
                    <div className="flex items-center">
                      {testimonial.avatar ? (
                        <Media 
                          resource={testimonial.avatar} 
                          className="w-12 h-12 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">
                            {testimonial.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">
                          {testimonial.position}
                          {testimonial.company && (
                            <span> at {testimonial.company}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Slide indicators */}
          {data.testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {data.testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}