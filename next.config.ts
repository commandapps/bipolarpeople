import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy self-management tools → BipolarAware app page
      { source: '/tools', destination: '/app', permanent: false },
      { source: '/tools/:path*', destination: '/app', permanent: false },
      // Legacy auth routes → homepage (no accounts on this site)
      { source: '/login', destination: '/', permanent: false },
      { source: '/register', destination: '/', permanent: false },
      { source: '/register/:path*', destination: '/', permanent: false },
      { source: '/profile', destination: '/', permanent: false },
      { source: '/verify-email', destination: '/', permanent: false },
      { source: '/verify-email/:path*', destination: '/', permanent: false },
      // Legacy story URL
      { source: '/stories/1', destination: '/stories/marcus-disclosure', permanent: false },
    ]
  },
}

export default nextConfig
