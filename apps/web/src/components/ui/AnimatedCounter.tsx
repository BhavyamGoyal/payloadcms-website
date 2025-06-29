'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      if (ref.current) {
        const element = ref.current as HTMLElement
        element.textContent = `${prefix}${Math.floor(latest)}${suffix}`
      }
    })

    return unsubscribe
  }, [springValue, prefix, suffix])

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}0{suffix}
    </motion.span>
  )
}