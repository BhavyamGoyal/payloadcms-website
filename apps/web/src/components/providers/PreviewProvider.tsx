'use client'

import { createContext, useContext, ReactNode } from 'react'

interface PreviewData {
  isEnabled: boolean
  token?: string
}

const PreviewContext = createContext<PreviewData>({
  isEnabled: false,
})

interface PreviewProviderProps {
  children: ReactNode
  isEnabled: boolean
  token?: string
}

export function PreviewProvider({
  children,
  isEnabled,
  token,
}: PreviewProviderProps) {
  return (
    <PreviewContext.Provider value={{ isEnabled, token }}>
      {children}
    </PreviewContext.Provider>
  )
}

export function usePreview() {
  return useContext(PreviewContext)
}