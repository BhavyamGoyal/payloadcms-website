import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

interface FooterProps {
  navigation?: {
    footerNav: Array<{
      label: string
      url: string
    }>
    socialLinks: Array<{
      platform: string
      url: string
    }>
  }
  settings?: {
    siteName: string
    siteDescription: string
    logo?: {
      url: string
      alt: string
    }
    contact?: {
      email?: string
      phone?: string
      address?: string
    }
  }
}

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
}

export function Footer({ navigation, settings }: FooterProps) {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
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
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                {settings?.siteDescription || 'Modern marketing website built with Payload CMS and Next.js'}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {navigation?.socialLinks?.map((social) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                  if (!Icon) return null
                  
                  return (
                    <Link
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{social.platform}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigation?.footerNav?.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Contact
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {settings?.contact?.email && (
                  <li>
                    <Link
                      href={`mailto:${settings.contact.email}`}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {settings.contact.email}
                    </Link>
                  </li>
                )}
                {settings?.contact?.phone && (
                  <li>
                    <Link
                      href={`tel:${settings.contact.phone}`}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {settings.contact.phone}
                    </Link>
                  </li>
                )}
                {settings?.contact?.address && (
                  <li className="text-sm leading-relaxed">
                    {settings.contact.address}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {settings?.siteName || 'Marketing Site'}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}