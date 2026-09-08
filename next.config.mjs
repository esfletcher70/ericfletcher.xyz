/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma must stay external so it bundles correctly for the Cloudflare
  // workerd runtime (https://opennext.js.org/cloudflare/howtos/db).
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/favicon.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

export default nextConfig

// Enables getCloudflareContext() / bindings under `next dev`.
import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
