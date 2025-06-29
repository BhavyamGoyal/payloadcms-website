'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'

interface HeaderProps {
  navigation?: {
    mainNav: Array<{
      label: string
      url: string
    }>
  }
  settings?: {
    siteName: string
    logo?: {
      url: string
      alt: string
    }
  }
}

export function Header({ navigation, settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-transparent'
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {settings?.logo?.url ? (
              <Image
                src={settings.logo.url}
                alt={settings.logo.alt}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            ) : (
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {settings?.siteName?.charAt(0) || 'M'}
                </span>
              </div>
            )}
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {settings?.siteName || 'Marketing Site'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation?.mainNav?.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="py-4 space-y-4">
              {navigation?.mainNav?.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}