import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eric Fletcher - Senior / Fractional Product Manager',
  description: 'Eric Fletcher is a Senior Product Manager available for fractional and contract work — 15+ years shipping products in healthcare, fintech, and enterprise SaaS.',
  keywords: ['Product Manager', 'Fractional Product Manager', 'Contract Product Manager', 'Product Strategy', 'Product Owner', 'Roadmap'],
  authors: [{ name: 'Eric Fletcher' }],
  metadataBase: new URL('https://ericfletcher.xyz'),
  openGraph: {
    title: 'Eric Fletcher - Senior / Fractional Product Manager',
    description: 'Eric Fletcher is a Senior Product Manager available for fractional and contract work — 15+ years shipping products in healthcare, fintech, and enterprise SaaS.',
    url: 'https://ericfletcher.xyz',
    siteName: 'Eric Fletcher Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eric Fletcher Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>{children}</Providers>
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
