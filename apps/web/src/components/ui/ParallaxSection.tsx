'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%'])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}