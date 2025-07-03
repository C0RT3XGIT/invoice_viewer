/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Preserve console statements in production for debugging
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? false : false,
  },
}

export default nextConfig