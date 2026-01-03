import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eric Fletcher - Scrum Master & Project Manager',
  description: 'Professional portfolio of Eric Fletcher - Experienced Scrum Master, Project Manager, and Agile Leader specializing in healthcare and enterprise solutions.',
  keywords: ['Scrum Master', 'Project Manager', 'Agile', 'Product Owner', 'RTE', 'Release Train Engineer'],
  authors: [{ name: 'Eric Fletcher' }],
  metadataBase: new URL('https://ericfletcher.xyz'),
  openGraph: {
    title: 'Eric Fletcher - Scrum Master & Project Manager',
    description: 'Professional portfolio of Eric Fletcher - Experienced Scrum Master, Project Manager, and Agile Leader.',
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
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
