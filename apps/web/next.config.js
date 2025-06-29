/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: 'http://localhost:3001/admin/:path*',
      },
    ]
  },
}

module.exports = nextConfig