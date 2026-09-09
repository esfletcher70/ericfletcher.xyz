'use client'

import { useEffect } from 'react'

/**
 * Global error boundary — the last line of defense. Renders when the root
 * layout itself throws, so it supplies its own <html>/<body> and relies on no
 * app styling.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[global error boundary]', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
          minHeight: '100vh',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <div style={{ maxWidth: 420, padding: 24, textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ fontSize: 14, color: '#475569', marginBottom: 16 }}>
            The site hit an unexpected error while loading. Please try again.
          </p>
          {error.digest && (
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#1d4ed8',
              color: '#fff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
