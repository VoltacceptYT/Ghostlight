/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bungie.net',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Additional configuration options can be added here
}

export default nextConfig
